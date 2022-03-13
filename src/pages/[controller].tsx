import Head from "next/head"
import router from "next/router"
import DbTable from "../components/DbTable"
import Heading from "../components/Heading"

function TableIndex() {
    const { controller } = router.query
    
    return (<>
        <Head>
            <title>{`${controller} - Plant DB`}</title>
        </Head>
        
        <Heading heading={controller as string ?? ''} />

        <DbTable />
    </>)
}

export default TableIndex