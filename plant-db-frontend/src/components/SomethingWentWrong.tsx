import { Container, Title, Button } from "@mantine/core"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

function SomethingWentWrong() {
    return (
        <>
            <Helmet>
                <title>Something went wrong - Plant DB</title>
            </Helmet>

            <Container sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                <Title sx={(theme) => ({color: theme.primaryColor, fontSize: "3em"})} order={1}>
                    Something went wrong!
                </Title>

                <Link style={{marginTop: "1em"}} to="/">
                    <Button>Return Home</Button>
                </Link>
            </Container>
        </>
    )
}

export default SomethingWentWrong