import * as Yup from "yup"
import React from "react"
import axios from "axios"
import Error from "./Error"
import Loading from "./Loading"
import SomethingWentWrong from "./SomethingWentWrong"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { ArrowLeftCircleFill } from "react-bootstrap-icons"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Button, Col, Row } from "react-bootstrap"
import { ModelInfo, Property } from "../types"

type DbFormProps = {
    formInfo: ModelInfo,
    heading: string
}

function DbForm({ formInfo, heading } : DbFormProps) {
    const router = useRouter()
    const { id, controller } = router.query
    const [initialValues, setInitialValues] = React.useState<any>()
    const [validationSchema, setValidationSchema] = React.useState<any>()
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [hasInitialError, setHasInitialError] = React.useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>()

    React.useEffect(() => {
        if (formInfo) {
            const initVals: {[key: string] : any} = {}
            const valSchema: {[key: string] : any} = {}

            formInfo.schema.filter(s => !s.isHidden).forEach(p => {
                const options: string[] = []

                p.dropdown?.forEach(d => {
                    options.push(d.value)
                })

                switch (p.type) {
                    case 'Dropdown':
                        initVals[p.propertyName] = formInfo.records?.find(r => r.propertyName === p.propertyName)?.value ?? options[0]
                        break
                    default:
                        initVals[p.propertyName] = formInfo.records?.find(r => r.propertyName === p.propertyName)?.value ?? ''
                        break
                }

                // As the application supports more types they will be added here
                switch (p.type) {
                    case 'Dropdown':
                        valSchema[p.propertyName] =  Yup.string().oneOf(options)
                        break
                    case 'Number':
                        valSchema[p.propertyName] = Yup.number()
                        break
                    default: // Default case will be string
                        valSchema[p.propertyName] = Yup.string()
                        break
                }

                if (p.isRequired) {
                    valSchema[p.propertyName] = valSchema[p.propertyName].required(p.displayName + ' is required.')
                }
            })

            setInitialValues(initVals)
            setValidationSchema(Yup.object(valSchema))
            setLoading(false)
        }
    }, [formInfo])

    const typeDict = new Map([
        ['String', 'text'],
        ['Number', 'number'],
    ])

    function getField(p: Property) {
        switch (p.type) {
            case 'Dropdown':
                return <Field name={p.propertyName} className="form-select" as="select">
                    {
                        p.dropdown?.map(d => <option key={d.value} value={d.value}>{d.name}</option>)
                    }
                </Field>
             default:
             return <Field className="form-control" type={typeDict.get(p.type)} name={p.propertyName} />
        }
    }

    return (<>
        {hasInitialError ? <SomethingWentWrong /> : loading ? <Loading /> : <>
                <div className="ms-3 mt-1">
                    <h1>{controller}</h1>
                    <h3 className="ms-1">{heading}</h3>
                </div>

                {error && <Error text={error} />}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        setIsSubmitting(true)
                        setError('')

                        // Let's determine if this will be an edit or create
                        // action through the useParams id.

                        if (id) axios.put(`/api/${controller}/${id}`, values)
                            .then(_response => router.push(`/${controller}/${id}`))
                            .catch(err => {
                                if (err.response) {
                                    setError(err.response.data)
                                    setIsSubmitting(false)
                                }
                            })
                        else axios.post<string>(`/api/${controller}`, values)
                            .then(response => router.push(`/${controller}/${response.data}`))
                            .catch(err => {
                                if (err.response) {
                                    setError(err.response.data)
                                    setIsSubmitting(false)
                                }
                            })
                    }}
                    >
                    {() => (
                        <Form>
                            <Row className="m-3">
                                {
                                    formInfo?.schema.filter(p => !p.isHidden).map(p => <Col className="mb-2" key={p.propertyName} md={6}>
                                        <span>{p.displayName}</span>
                                        {getField(p)}

                                        <div className="text-danger f-12">
                                            <ErrorMessage name={p.propertyName} />
                                        </div>
                                    </Col>)
                                }
                            </Row>

                            <div className="m-2 d-grid gap-2">
                                <Button disabled={isSubmitting} className="btn-responsive mx-auto" variant="dark" type="submit">Submit</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                
                <div className="mt-4 ms-2">
                    <Link href={`/${controller}${id ? `/${id}` : ''}`}>
                        <ArrowLeftCircleFill color="black" size={30} />
                    </Link>
                </div>
            </>
        }
    </>)
}

export default DbForm