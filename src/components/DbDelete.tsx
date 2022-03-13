import axios from "axios"
import React from "react"
import Error from "./Error"
import { useRouter } from "next/router"
import { Form, Alert, Button } from "react-bootstrap"

function DbDelete() {
    const router = useRouter()
    const { id, controller } = router.query
    const [error, setError] = React.useState<string>()

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault()

        axios.delete(`/api/${controller}/${id}`)
            .then(_response => router.push(`/${controller}`))
            .catch(err => {
                if (err.response) setError(err.response.data)
            })
    }

    return (
        <Form className="text-center" onSubmit={handleSubmit}>
            {error && <Error text={error} />}
            <Alert variant="light">
                Are you sure you wish to delete this record?

                <div className="d-grid gap-2 btn-responsive mx-auto">
                    <Button variant="dark" type="submit">Delete</Button>
                </div>
            </Alert>
        </Form>
    )
}

export default DbDelete