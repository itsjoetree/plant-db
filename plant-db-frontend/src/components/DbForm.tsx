import * as Yup from "yup"
import React from "react"
import axios from "axios"
import Loading from "./Loading"
import SomethingWentWrong from "./SomethingWentWrong"
import { Link } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Alert, Button, Chip, Grid } from '@mantine/core'
import { useNavigate, useParams } from "react-router"
import { PlantDataType, PlantInfo, PlantProperty, PlantRecord } from "../types.d"
import { Helmet } from "react-helmet"
import { ActionIcon, Box, Container, Title, Text, Image } from "@mantine/core"
import { AppContext } from "../App"
import { IconAlertCircle, IconArrowBack } from "@tabler/icons"
import { getCurrentImage } from "../helpers"

type DbFormParams = {
    id: string,
    controller: string
}

type DbFormProps = {
    updateParentInfo?(info: PlantInfo): void
}

function DbForm({ updateParentInfo }: DbFormProps) {
    const navigate = useNavigate()
    const { id, controller } = useParams<DbFormParams>()
    const plantApiInfo = React.useContext(AppContext)?.plantApiInfo.find(pi => pi.path === controller)
    const [formInfo, setFormInfo] = React.useState<PlantInfo>()
    const [initialValues, setInitialValues] = React.useState<any>()
    const [validationSchema, setValidationSchema] = React.useState<any>()
    const [hasError, setHasError] = React.useState<boolean>()
    const [loading, setLoading] = React.useState<boolean>(true)

    const [currentImage, setCurrentImage] = React.useState<any>()
    const imageRef = React.useRef<any>()

    const [hasInitialError, setHasInitialError] = React.useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>()
    const identifier = React.useMemo(() => {
        return id && formInfo?.records[0].find(r => r.propertyName === formInfo?.schema.find(p => p.isIdentifier)?.propertyName)?.value
    }, [id, formInfo])

    React.useEffect(() => {
        axios.get<PlantInfo>(`/api/${controller}/${id ? id : ''}`)
            .then(response => setFormInfo(response.data))
            .catch(_err => setHasInitialError(true))
    }, [controller, id])

    React.useEffect(() => {
        if (formInfo) {
            const initVals: { [key: string]: any } = {}
            const valSchema: { [key: string]: any } = {}

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
                        valSchema[p.propertyName] = Yup.number().oneOf(options).typeError(p.displayName + " must be a number.")
                        break
                    case PlantDataType.Decimal:
                    case PlantDataType.Int:
                        valSchema[p.propertyName] = Yup.number().typeError(p.displayName + " must be a number.")
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

    const updateFileDep = (e: any) => {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            setCurrentImage(reader.result)
        }, false);

        if (imageRef.current.files[0]) {
            reader.readAsDataURL(imageRef.current.files[0]);
        }
    }

    const getField = (p: PlantProperty) => {
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
            <title>{`${plantApiInfo?.singularDisplayName} (${id ? `Edit ${identifier ?? ''}` : 'Create'}) - Plant DB`}</title>
        </Helmet>

        <Container>
            <Title sx={(theme) => ({ color: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, fontSize: "3rem" })} order={1}>
                {plantApiInfo?.singularDisplayName}
            </Title>

            <Title sx={(theme) => ({ marginLeft: 15, color: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, fontSize: "2rem" })} order={2}>
                {identifier}
            </Title>

            <Box sx={{ marginTop: 15, marginLeft: "auto", marginRight: "auto", width: 450, maxWidth: "100%" }}>
                <label style={{ maxWidth: "100%" }} title="Upload" htmlFor="file-input">
                    <Image
                        sx={{ width: 450, maxWidth: "100%", cursor: "pointer" }}
                        radius={20}
                        height={350}
                        src={currentImage ?? getCurrentImage(formInfo?.records[0])}
                        alt="With default placeholder"
                        caption={<Chip sx={{pointerEvents: "none"}}>Edit Photo</Chip>}
                        withPlaceholder
                    />
                </label>

                <input style={{ visibility: "hidden", width: 0, height: 0 }} ref={imageRef} onChange={(e: any) => updateFileDep(e)} id="file-input" type="file" accept="image/png, image/jpeg" />
            </Box>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    setIsSubmitting(true)
                    setHasError(false)

                    let records: PlantRecord[] = []

                    Object.entries(values).forEach((entry: [string, any]) => {
                        const record: PlantRecord = {
                            propertyName: entry[0],
                            value: entry[1]?.toString()
                        }

                        records.push(record)
                    })

                    if (currentImage != null) {
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
                        .then(_response => {
                            if (updateParentInfo) {
                                const formInfoCopy: PlantInfo = JSON.parse(JSON.stringify(formInfo))

                                // If we didn't upload a new image, let's make sure we preserve the previous data.
                                if (!records.find(r => r.propertyName === "Image")) {
                                    formInfoCopy.records[0] = formInfoCopy.records[0]
                                        .filter(r => r.propertyName === "Image" || r.propertyName === "ImageType")
                                        .concat(records)
                                }
                                else formInfoCopy.records[0] = records

                                updateParentInfo(formInfoCopy)
                            }
                            navigate(`/${controller}/${id}`)
                        })
                        .catch(_err => {       
                            setHasError(true)
                            setIsSubmitting(false)
                        })
                    else axios.post<string>(`/api/${controller}`, records, { headers: { "Content-Type": "application/json" } })
                        .then(response => navigate(`/${controller}/${response.data}`))
                        .catch(_err => {
                            setHasError(true)
                            setIsSubmitting(false)
                        })
                }}
            >
                {() => (
                    <Form>

                        {hasError && <Alert mt={10} icon={<IconAlertCircle size={16} />} title="Server Error" color="red">
                            Something went wrong!
                        </Alert>}
                        <Grid justify="center" sx={{ marginTop: 15 }}>
                            {
                                formInfo?.schema.filter(p => !p.isHidden).map(p => <Grid.Col key={p.propertyName} sm={6} xs={12}>
                                    <Text sx={{ 
                                        fontSize: 12,
                                        fontWeight: "bolder"
                                    }}>
                                        {p.displayName}
                                    </Text>
                                    {getField(p)}

                                    <Box sx={{ fontSize: 12, color: "red" }}>
                                        <ErrorMessage name={p.propertyName} />
                                    </Box>
                                </Grid.Col>)
                            }
                        </Grid>

                        <Box sx={{ marginTop: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Button sx={{ maxWidth: "10rem", width: "10rem" }} disabled={isSubmitting} type="submit">Submit</Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            <Box sx={{ marginTop: 5 }}>
                <Link className="ms-2" to={`/${controller}${id ? `/${id}` : ''}`}>
                    <ActionIcon size={35} sx={(theme) => ({ color: theme.primaryColor })}>
                        <IconArrowBack size={35} />
                    </ActionIcon>
                </Link>
            </Box>
        </Container>
    </>)
}

export default DbForm