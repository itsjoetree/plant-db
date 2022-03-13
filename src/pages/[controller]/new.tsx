import React from "react"
import Head from "next/head"
import axios from "axios"
import SomethingWentWrong from "../../components/SomethingWentWrong"
import Loading from "../../components/Loading"
import { useRouter } from "next/router"
import { ModelInfo } from "../../types"
import DbForm from "../../components/DbForm"

function CreateForm() {
    const router = useRouter()
    const [formInfo, setFormInfo] = React.useState<ModelInfo>()
    const [hasInitialError, setHasInitialError] = React.useState<boolean>(false)
    const { controller } = router.query

    React.useEffect(() => {
        axios.get(`/api/${controller}/schema`)
            .then(response => setFormInfo(response.data))
            .catch(_err => setHasInitialError(true))
    }, [controller])

    return (hasInitialError ? <SomethingWentWrong /> : !formInfo ? <Loading /> : <>
        <Head>
            <title>{`${controller} (Create) - Plant DB`}</title>
        </Head>

        <DbForm formInfo={formInfo} heading="Create"  />
    </>)
}

export default CreateForm