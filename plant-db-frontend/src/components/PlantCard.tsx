import { Card, Text } from "@mantine/core"
import { IconCactus } from "@tabler/icons"
import { PlantApiInfo } from "../types"

type PlantCardProps = {
    info: PlantApiInfo
}

const PlantCard = ({ info } : PlantCardProps) => {

    return (<Card sx={(theme) => ({ width: 450, maxWidth: "90vw", color: "white", backgroundColor: theme.primaryColor})} shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section pt={10} pl={5}>
            <IconCactus size={30} />
            <Text sx={{fontSize: "2rem"}} weight={500}>{info.pluralDisplayName}</Text>
        </Card.Section>
        
        <Text>It's for sure a plant you feel me?</Text>  
    </Card>)
}

export default PlantCard
