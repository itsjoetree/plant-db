import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

function SomethingWentWrong() {
    return (
        <>
            <Helmet>
                <title>Not Found - Plant DB</title>
            </Helmet>
            <div className="text-center">
                <h2>Something went wrong!</h2>

                <p>
                    It appears that there was an issue processing your request.
                </p>

                <div className="m-2">
                    <Link to="/" role="button" className="btn btn-dark btn-responsive mx-auto">Go Home</Link>
                </div>
            </div>
        </>
    )
}

export default SomethingWentWrong