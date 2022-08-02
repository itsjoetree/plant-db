import { Box, Loader } from "@mantine/core"

function Loading() {
    return (<Box sx={{marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Loader sx={(theme) => ({color: theme.primaryColor})} />
    </Box>)
}

export default Loading