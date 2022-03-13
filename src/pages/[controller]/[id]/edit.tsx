import React from "react"
import Head from "next/head"
import axios from "axios"
import SomethingWentWrong from "../../../components/SomethingWentWrong"
import Loading from "../../../components/Loading"
import { useRouter } from "next/router"
import { ModelInfo } from "../../../types"
import DbForm from "../../../components/DbForm"

function EditForm() {
    const router = useRouter()
    const [formInfo, setFormInfo] = React.useState<ModelInfo>()
    const [hasInitialError, setHasInitialError] = React.useState<boolean>(false)
    const { id, controller } = router.query
    const identifier = formInfo?.records.find(r => r.propertyName === formInfo?.schema.find(p => p.isIdentifier)?.propertyName)?.value ?? ''

    React.useEffect(() => {
        if (controller && id)
            axios.get(`/api/${controller}/${id}`)
                .then(response => setFormInfo(response.data))
                .catch(_err => setHasInitialError(true))
    }, [controller, id])

    return (hasInitialError ? <SomethingWentWrong /> : !formInfo ? <Loading /> : <>
        <Head>
            <title>{`${controller} (Edit ${identifier}) - Plant DB`}</title>
        </Head>

        <DbForm formInfo={formInfo} heading={`Edit ${identifier}`}  />
    </>)
}

export default EditForm