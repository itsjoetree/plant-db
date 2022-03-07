type ErrorProps = {
    text: string
}

function Error({ text }: ErrorProps) {
    return (
        <div className="text-danger ms-2"> &bull; {text}</div>
    )
}

export default Error