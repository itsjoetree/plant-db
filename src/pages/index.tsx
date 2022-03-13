import React from "react"
import Heading from "../components/Heading"
import Head from "next/head"
import { DbInfo } from "../types"
import Link from "next/link"

function Home() {
    const databases: DbInfo[] = [
        {name: 'ferns', displayName: 'Ferns'},
    ]
    
    return (
        <>
            <Head>
                <title>Home - Plant DB</title>
            </Head>

            <Heading 
                heading="Plant DB"
                text="An online database where nature enthusaists can share their findings 
                on different forms of plant life."
              />

            {
                databases.map(db => <div key={db.name} className="d-grid gap-2 m-2">
                        <Link href={'/' + db.name} key={db.name}>
                            <a role="button" className="btn btn-dark btn-responsive mx-auto">
                                {db.displayName}
                            </a>
                        </Link>
                    </div>)
            }
        </>
    )

}

export default Home