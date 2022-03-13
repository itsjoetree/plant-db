import Head from "next/head"
import DbTable from "../components/DbTable"
import Heading from "../components/Heading"
import { useRouter } from "next/router"

function TableIndex() {
    const router = useRouter()
    const { controller } = router.query
    
    return (<>
        <Head>
            <title>{`${controller ? controller + ' -' : ''} Plant DB`}</title>
        </Head>

        <Heading heading={controller as string ?? ''} />

        <DbTable />
    </>)
}

export default TableIndex