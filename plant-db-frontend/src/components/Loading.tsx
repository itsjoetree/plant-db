import { Spinner } from "react-bootstrap"

function Loading() {
    return (<div className="mt-4 text-center">
        <Spinner className="color-midnightblue" animation="border" />
    </div>)
}

export default Loading