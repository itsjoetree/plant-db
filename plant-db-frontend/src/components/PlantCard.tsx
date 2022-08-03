import { Box, Card, Image, Text } from "@mantine/core"
import { PlantApiInfo } from "../types"

type PlantCardProps = {
    info: PlantApiInfo
}

const PlantCard = ({ info } : PlantCardProps) => {
    return (<Card sx={(theme) => (
        {
            width: 350,
            maxWidth: "90vw",
            color: "white",
            backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background
        })}
        shadow="sm"
        p="lg"
        radius="md"
        withBorder>
        <Card.Section sx={{display: "flex", justifyContent: "space-between"}} p={15}>
            <Text sx={{fontSize: "2rem"}} weight={500}>{info.pluralDisplayName}</Text>

            <Box style={{width: 150, height: 150}}>
                <Image radius="xl" height={150} sx={{borderRadius: 10}} src={`/images/${info.imgUri}`} />
            </Box>
        </Card.Section>
    </Card>)
}

export default PlantCard
