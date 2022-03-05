import React from "react"
import { ModelInfo } from "../types"
import * as Yup from "yup"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Button, Col } from "react-bootstrap"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import InitialLoadError from "./IntialLoadError"
import Error from "./Error"
import Loading from "./Loading"

type DbFormParams = {
    id: string,
    controller: string
}

const enum DataType {
    String,
    Number
}

function DbForm() {
    const navigate = useNavigate()
    const { id, controller } = useParams<DbFormParams>()
    const [formInfo, setFormInfo] = React.useState<ModelInfo>()
    const [initialValues, setInitialValues] = React.useState<any>()
    const [validationSchema, setValidationSchema] = React.useState<any>()
    const [serverError, setServerError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>()
    
    React.useEffect(() => {
        axios.get<ModelInfo>(`/api/${controller}/${id ? id : 'schema'}`)
            .then(response => setFormInfo(response.data))
            .catch(err => {
                if (err.response) setServerError(err.response.data)
            })
    }, [controller, id])

    React.useEffect(() => {
        if (formInfo) {
            const initVals: {[key: string] : any} = {}
            const valSchema: {[key: string] : any} = {}

            formInfo.schema.forEach(p => {
                initVals[p.propertyName] = formInfo.records.find(r => r.propertyName === p.propertyName)?.value ?? ''
                
                // As the application supports more types they will be added here
                switch (p.type) {
                    case DataType.Number:
                    valSchema[p.propertyName] = Yup.number()
                    break;
                    default: // Default case will be string
                    valSchema[p.propertyName] = Yup.string()
                    break;
                }
            })

            setInitialValues(initVals)
            setValidationSchema(Yup.object(valSchema))
            setLoading(false)
        }
    }, [formInfo])

    return (<>
        {(loading && !serverError) ? <Loading /> :
            (loading && serverError) ? <InitialLoadError text={serverError} /> : <>
                <h2>{controller}</h2>
                <hr />

                {serverError && <Error text={serverError} />}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        setIsSubmitting(true)
                        setServerError('')

                        // Let's determine if this will be an edit or create
                        // action through the useParams id.

                        if (id) axios.put(`/api/${controller}/${id}`, values)
                            .then(_response => navigate(`/${controller}/${id}`))
                            .catch(err => {
                                if (err.response) {
                                    setServerError(err.response.data)
                                    setIsSubmitting(false)
                                }
                            })
                        else axios.post<number>(`/api/${controller}`, values)
                            .then(response => navigate(`/${controller}/${response.data}`))
                            .catch(err => {
                                if (err.response) {
                                    setServerError(err.response.data)
                                    setIsSubmitting(false)
                                }
                            })
                    }}
                    >
                    {({ errors }) => (
                        <Form>

                            {
                                formInfo?.schema.map(p => <Col key={p.propertyName} md={6}>
                                    <Field name={p.propertyName} />
                                    <ErrorMessage name={p.propertyName} />
                                </Col>)
                            }

                            <Button disabled={isSubmitting} className="responsive" variant="dark" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </>
        }
    </>)
}

export default DbForm