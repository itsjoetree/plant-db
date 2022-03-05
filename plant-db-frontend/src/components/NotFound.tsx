import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="text-center">
            <h2>Not Found</h2>

            <p>
                The resoure you are trying to load was not found.
            </p>
        
            <div className="m-2">
                <Link to="/" role="button" className="btn btn-dark btn-responsive mx-auto">Go Home</Link>
            </div>
        </div>
    )
}

export default NotFound