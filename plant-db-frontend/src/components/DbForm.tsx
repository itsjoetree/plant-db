import * as Yup from "yup"
import React from "react"
import axios from "axios"
import Loading from "./Loading"
import SomethingWentWrong from "./SomethingWentWrong"
import { Link } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Col, Row } from "react-bootstrap"
import { Button } from '@mantine/core'
import { useNavigate, useParams } from "react-router"
import { PlantDataType, PlantInfo, PlantProperty, PlantRecord } from "../types.d"
import { Helmet } from "react-helmet"
import { ActionIcon, Box, Container, Title, Text, Image } from "@mantine/core"
import { AppContext } from "../App"
import { IconArrowBack } from "@tabler/icons"
import { getCurrentImage } from "../helpers"

type DbFormParams = {
    id: string,
    controller: string
}

function DbForm() {
    const navigate = useNavigate()
    const { id, controller } = useParams<DbFormParams>()
    const plantApiInfo = React.useContext(AppContext)?.plantApiInfo.find(pi => pi.path === controller)
    const [formInfo, setFormInfo] = React.useState<PlantInfo>()
    const [initialValues, setInitialValues] = React.useState<any>()
    const [validationSchema, setValidationSchema] = React.useState<any>()
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(true)
    
    const [currentImage, setCurrentImage] = React.useState<any>()
    const imageRef = React.useRef<any>()

    const [hasInitialError, setHasInitialError] = React.useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>()
    const identifier = id && formInfo?.records[0].find(r => r.propertyName === formInfo?.schema.find(p => p.isIdentifier)?.propertyName)?.value

    const updateFileDep = (e: any) => {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            setCurrentImage(reader.result ?? undefined);
          }, false);

          if (imageRef.current.files[0]) {
            reader.readAsDataURL(imageRef.current.files[0]);
          }
    }

    React.useEffect(() => {
        axios.get<PlantInfo>(`/api/${controller}/${id ? id : ''}`)
            .then(response => setFormInfo(response.data))
            .catch(_err => setHasInitialError(true))
    }, [controller, id])

    React.useEffect(() => {
        if (formInfo) {
            const initVals: {[key: string] : any} = {}
            const valSchema: {[key: string] : any} = {}

            formInfo.schema.filter(s => !s.isHidden).forEach(p => {
                const options: any[] = []

                p.options?.forEach(o => {
                    options.push(o.value)
                })

                switch (p.type) {
                    case PlantDataType.Enum:
                        initVals[p.propertyName] = formInfo.records[0]?.find(r => r.propertyName === p.propertyName)?.value ?? options[0]
                        break
                    default:
                        initVals[p.propertyName] = formInfo.records[0]?.find(r => r.propertyName === p.propertyName)?.value ?? ''
                        break
                }

                // As the application supports more types they will be added here
                switch (p.type) {
                    case PlantDataType.Enum:
                        valSchema[p.propertyName] =  Yup.number().oneOf(options)
                        break
                    case PlantDataType.Decimal:
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

    function getField(p: PlantProperty) {
        switch (p.type) {
            case PlantDataType.Enum:
                return <Field name={p.propertyName} as="select" className="form-select">
                    {
                        p.options?.map(d => <option key={d.value} value={d.value}>{d.name}</option>)
                    }
                </Field>
             default:
             return <Field className="form-control" name={p.propertyName} />
        }
    }

    if (hasInitialError) return <SomethingWentWrong />
    else if (loading) return <Loading />

    return (<>
        <Helmet>
            <title>{`${controller} (${id ? `Edit ${identifier ?? ''}` : 'Create'}) - Plant DB`}</title>
        </Helmet>

        <Container>
            <Title sx={(theme) => ({color: theme.primaryColor, fontSize: "3rem"})} order={1}>
                {plantApiInfo?.singularDisplayName}
            </Title>

            <Title sx={(theme) => ({marginLeft: 15, color: theme.primaryColor, fontSize: "2rem"})} order={2}>
                {identifier}
            </Title>

            <Box sx={{marginTop: 15, marginLeft: "auto", marginRight: "auto", width: 450, maxWidth: "100%"}}>
                <label style={{maxWidth: "100%"}} title="Upload" htmlFor="file-input">
                    <Image
                        sx={{width: 450, maxWidth: "100%"}}
                        radius={20}
                        height={350}
                        src={currentImage ?? getCurrentImage(formInfo?.records[0])}
                        alt="With default placeholder"
                        withPlaceholder
                    />   
                </label>

                <input style={{visibility: "hidden", width: 0, height: 0}} ref={imageRef} onChange={(e: any) => updateFileDep(e)} id="file-input" type="file" accept="image/png, image/jpeg" />
            </Box>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    setIsSubmitting(true)
                    setError('')

                    let records: PlantRecord[] = []

                    Object.entries(values).forEach((entry : [string, any]) => {
                        const record: PlantRecord = {
                            propertyName: entry[0],
                            value: entry[1]?.toString()
                        }

                        records.push(record)
                    })

                    if (currentImage != null)
                    {
                        records = records.concat([
                            {
                                propertyName: "Image",
                                value: currentImage.split("base64,")[1]
                            },
                            {
                                propertyName: "ImageType",
                                value: currentImage.split(";")[0].split("data:")[1]
                            },
                        ])
                    }

                    // Let's determine if this will be an edit or create
                    // action through the useParams id.

                    if (id) axios.put(`/api/${controller}/${id}`, records, { headers: { "Content-Type": "application/json" } })
                        .then(_response => navigate(`/${controller}/${id}`))
                        .catch(err => {
                            if (err.response) {
                                setError(err.response.data)
                                setIsSubmitting(false)
                            }
                        })
                    else axios.post<string>(`/api/${controller}`, records, { headers: { "Content-Type": "application/json" } })
                        .then(response => navigate(`/${controller}/${response.data}`))
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
                                    <Text sx={(theme) => ({color: theme.primaryColor, fontSize: 12, fontWeight: "bolder"})}>{p.displayName}</Text>
                                    {getField(p)}

                                    <Box sx={{fontSize: 12, color: "red"}}>
                                        <ErrorMessage name={p.propertyName} />
                                    </Box>
                                </Col>)
                            }
                        </Row>

                        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Button sx={{maxWidth: "10rem", width: "10rem"}} disabled={isSubmitting} type="submit">Submit</Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            <Box sx={{marginTop: 5}}>
                <Link className="ms-2" to={`/${controller}${id ? `/${id}` : ''}`}>
                    <ActionIcon size={35} sx={(theme) => ({color: theme.primaryColor})}>
                        <IconArrowBack size={35} />
                    </ActionIcon>
                </Link>
            </Box>
        </Container>
    </>)
}

export default DbForm