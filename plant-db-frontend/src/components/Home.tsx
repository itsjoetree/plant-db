import React from "react"
import Heading from "./Heading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { AppContext } from "../App"

function Home() {
    const plantApiInfo = React.useContext(AppContext)?.plantApiInfo;

    return (
        <>
            <Helmet>
                <title>{document.title = 'Home - Plant DB'}</title>
            </Helmet>
            <Heading 
                heading="Plant DB"
                text="An online database where nature enthusaists can share their findings 
                on different forms of plant life."
              />

            {
                plantApiInfo?.map(p => <div key={p.path} className="d-grid gap-2 m-2">
                        <Link to={'/' + p.path} role="button" className="btn btn-dark btn-responsive mx-auto">
                            {p.pluralDisplayName}
                        </Link>
                    </div>)
            }
        </>
    )
}

export default Home