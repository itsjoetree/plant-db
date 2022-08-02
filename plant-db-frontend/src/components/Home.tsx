import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { AppContext } from "../App"
import { Box, Container, Text, Title } from "@mantine/core"
import { IconLeaf } from "@tabler/icons"
import PlantCard from "./PlantCard"

function Home() {
    const plantApiInfo = React.useContext(AppContext)?.plantApiInfo;

    return (
        <>
            <Helmet>
                <title>{document.title = 'Home - Plant DB'}</title>
            </Helmet>

            <Container sx={{ 
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <Title sx={(theme) => ({color: theme.primaryColor, fontSize: "4rem"})} order={1}>Plant DB</Title>

                <Text align="center">
                    Browse plants and contribute your findings.
                </Text>

                <Box sx={{display: "flex", flexDirection: "column", gap: 10}} mt={10}>
                    {
                        plantApiInfo?.map(pai => <Link key={pai.path} style={{textDecoration: "none"}} to={"/" + pai.path}>
                            <PlantCard info={pai} />
                        </Link>)
                    }
                </Box>

                <Title mt={10} mb={10} sx={(theme) => ({color: theme.primaryColor, fontSize: "2rem"})} order={1}>we're growing <IconLeaf size={40} /></Title>
                <Text sx={{maxWidth: 500}}>
                    We're a database that keeps on growing. Join the nature community and contribute your findings, as time
                    goes on we will continue to add new species for you to document on.
                </Text>
            </Container>
        </>
    )
}

export default Home