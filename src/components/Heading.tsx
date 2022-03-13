type HeadingProps = {
    heading: string,
    text?: string,
}

function Heading({ heading, text } : HeadingProps) {
    return (
        <div className="text-center text-white p-3 bg-midnightblue">
        <h2>{heading}</h2>

        <p>
            {text}
        </p>
    </div>)
}

export default Heading