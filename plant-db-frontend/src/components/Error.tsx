import React from "react"

type ErrorProps = {
    text: string
}

function Error({ text }: ErrorProps) {
    return (
        <div className="text-danger"> &bull; {text}</div>
    )
}

export default Error