import React from "react"
import { Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

type InitialLoadProps = {
    text: string
}

function InitialLoadError({ text } : InitialLoadProps) {
    return (
        <div className="text-center">
            <h2>Something went wrong!</h2>

            {text && <Alert variant="danger">
                <div className="text-start">Error:</div>
                {text}
            </Alert>}

            <p>
                There was an issue processing your request.
            </p>

            <div className="m-2">
                <Link to="/" role="button" className="btn btn-dark btn-responsive mx-auto">Go Home</Link>
            </div>
        </div>
    )
}

export default InitialLoadError