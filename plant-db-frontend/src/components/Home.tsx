import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { AppContext } from "../App"
import { Box, Container, Grid, Text, Title } from "@mantine/core"
import { IconCactus, IconFlower, IconLeaf } from "@tabler/icons"
import PlantCard from "./PlantCard"

function Home() {
    const plantApiInfo = React.useContext(AppContext)?.plantApiInfo

    return (
        <>
            <Helmet>
                <title>{document.title = 'Home - Plant DB'}</title>
            </Helmet>

            <Box sx={(theme) => (
                {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 350,
                    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background
                }
            )}>
                <Box>
                    <Title sx={{color: "white", fontSize: "4rem"}} order={1}>Plant DB</Title>

                    <Text sx={{color: "white", fontSize: "1.5rem"}} align="center">
                        Browse plants and contribute your findings.
                    </Text>

                    <Box sx={{marginTop: 30, display: "flex", gap: 15, color: "white", alignItems: "center", justifyContent: "center"}}>
                        <IconLeaf size={35} />
                        <IconCactus size={35} />
                        <IconFlower size={35} />
                    </Box>
                </Box>
            </Box>

            <Container sx={{
                marginTop: "2em",
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 15
            }}>
                <Title sx={(theme) => ({color: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, fontSize: "2rem"})} order={1}>browse our selection</Title>

                <Grid justify="center">
                {
                    plantApiInfo?.map(pi => <Grid.Col sx={{display: "flex", alignItems: "center", justifyContent: "center"}} lg={6} md={6} sm={6} xs={12} key={pi.path}>
                            <Link to={"/" + pi.path} style={{textDecoration: "none"}}>
                                <PlantCard info={pi} />
                            </Link>
                        </Grid.Col>
                    )
                }
                </Grid>

                <Title sx={(theme) => ({color: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, fontSize: "2rem"})} order={1}>we're growing <IconLeaf size={40} /></Title>
                <Text sx={{maxWidth: 500}}>
                    We're a database that keeps on growing. Join the nature community and contribute your findings, as time
                    goes on we will continue to add new species for you to document on.
                </Text>
            </Container>
        </>
    )
}

export default Home