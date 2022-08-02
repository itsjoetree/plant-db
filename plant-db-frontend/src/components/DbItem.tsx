import axios from "axios"
import React from "react"
import DbDelete from "./DbDelete"
import Loading from "./Loading"
import SomethingWentWrong from "./SomethingWentWrong"
import { useParams } from "react-router"
import { PlantDataType, PlantInfo, PlantProperty } from "../types.d"
import { getCurrentImage, upperCase } from "../helpers"
import { Helmet } from "react-helmet"
import { Box, Container, Title, Image, AppShell, Card, Text, Grid } from "@mantine/core"
import { AppContext } from "../App"
import { SideNavigation } from "./SideNavigation"
import { AppHeader } from "./AppHeader"
import DbForm from "./DbForm"

export type DbItemParams = {
    controller: string,
    id: string,
    action: string,
}

const ACCEPTABLE_ACTIONS = ['edit', 'delete']

function DbItem() {
    const { controller, id, action } = useParams<DbItemParams>()
    const plantApiInfo = React.useContext(AppContext)?.plantApiInfo.find(pi => pi.path === controller)
    
    const [contentView, setContentView] = React.useState<string | null>(action ?? null)
    const [itemInfo, setItemInfo] = React.useState<PlantInfo>()
    const [loading, setLoading] = React.useState<boolean>(true)

    const [hasInitialError, setHasInitialError] = React.useState<boolean>(
        action !== undefined && ACCEPTABLE_ACTIONS.indexOf(action ?? '') === -1
    )
    const identifier = itemInfo?.records[0]
        .find(r => r.propertyName === itemInfo?.schema.find(p => p.isIdentifier)?.propertyName)?.value

    React.useEffect(() => {
        axios.get<PlantInfo>(`/api/${controller}/${id}`)
            .then(response => { 
                setItemInfo(response.data)
                setLoading(false)
            })
            .catch(_err => setHasInitialError(true))
    }, [controller, id])

    React.useEffect(() => {
        setContentView(action ?? null)
    }, [action])

    const getDisplayValue = (p: PlantProperty) => {
        switch (p.type) {
            case PlantDataType.Enum:  
                return p.options?.find(d => d.value === itemInfo?.records[0].find(r => r.propertyName === p.propertyName)?.value)?.name
            default:
                return itemInfo?.records[0].find(r => r.propertyName === p.propertyName)?.value
        }
    }

    if (hasInitialError || 
        (action != null && ACCEPTABLE_ACTIONS.indexOf(action) === -1)
    ) 
        return (<>
            <AppHeader />
            <SomethingWentWrong />
        </>)
    else if (loading) return <Loading />

    const getBody = () => {
        if (contentView == null || contentView === "delete") return (<Container>
            <Title sx={(theme) => ({color: theme.primaryColor, fontSize: "3rem"})} order={1}>
                {plantApiInfo?.singularDisplayName}
            </Title>

            <Title sx={(theme) => ({marginLeft: 15, color: theme.primaryColor, fontSize: "2rem"})} order={2}>
                {identifier}
            </Title>

            <Box sx={{marginLeft: "auto", marginRight: "auto", width: 450, maxWidth: "100%"}}>
                <Image
                    radius={20}
                    width={450}
                    height={350}
                    src={getCurrentImage(itemInfo?.records[0]) ?? undefined}
                    alt="With default placeholder"
                    withPlaceholder
                />   
            </Box>

            <Grid justify="center" sx={{marginTop: 15}}>
                {
                    itemInfo?.schema.filter(s => !s.isHidden).map(s => <Grid.Col key={s.propertyName} sx={{display: "flex", alignItems: "center", justifyContent: "center"}} md={4} sm={6} xs={12}>
                        <Card sx={{width: 400, maxWidth: "100%", height: "100%"}} withBorder key={s.propertyName}>
                            <Title sx={{fontSize: "1rem"}} order={1}>{s.displayName}</Title>
                            <Text sx={{marginLeft: 10, fontSize: "1.5rem"}}>{getDisplayValue(s) ?? "N/A"}</Text>
                        </Card>
                    </Grid.Col>)
                }
            </Grid>
        </Container>)
        else if (contentView === "edit") return <DbForm />
    }
    
    return (<>
            <Helmet>
                <title>{ `${plantApiInfo?.singularDisplayName} ${identifier ? `(${action ? `${upperCase(action)} ` : ''}${identifier})` : ''} - Plant DB`}</title>
            </Helmet>

            <AppShell
                padding="md"
                navbar={<SideNavigation />}
                header={<AppHeader />}
                sx={{overflowX: "hidden"}}
            >
                {getBody()}
            </AppShell>
        </>
    )
}

export default DbItem