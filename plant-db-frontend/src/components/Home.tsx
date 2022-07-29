import React from "react"
import Heading from "./Heading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

function Home() {
    const databases = [
        {name: 'ferns', displayName: 'Ferns'},
    ]
    
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
                databases.map(db => <div key={db.name} className="d-grid gap-2 m-2">
                        <Link to={'/' + db.name} key={db.name} role="button" className="btn btn-dark btn-responsive mx-auto">
                            {db.displayName}
                        </Link>
                    </div>)
            }
        </>
    )
}

export default Home