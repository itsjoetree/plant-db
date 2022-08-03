import axios from "axios"
import React from "react"
import Loading from "./Loading"
import SomethingWentWrong from "./SomethingWentWrong"
import { Box, Container, Select, Table, Pagination, ActionIcon } from "@mantine/core"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { PlantRecord, PlantInfo, PlantDataType } from "../types.d"
import { Helmet } from "react-helmet"
import { Title } from "@mantine/core"
import { AppContext } from "../App"
import { IconCirclePlus, IconHash } from "@tabler/icons"
import { useLocation } from 'react-router-dom';


type DbTableParams = {
    controller: string,
    skip: string,
    top: string
}

const PAGE_SIZES = ["5", "10", "15", "20"]

function DbTable() {
    const location = useLocation();
    const { controller } = useParams<DbTableParams>()
    const plantApiInfo = React.useContext(AppContext)?.plantApiInfo.find(p => p.path === controller)

    const [plantInfo, setPlantInfo] = React.useState<PlantInfo | null>()
    const [pgIndex, setPgIndex] = React.useState<number>(1)
    const [pgSize, setPgSize] = React.useState<number>(20)
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [lastPath, setLastPath] = React.useState<string>()

    const changePgSize = (e: string) => setPgSize(parseInt(e))
    const changePgIndex = (page: number) => setPgIndex(page)

    const path = React.useMemo(() => {
        return `/api/${controller}?skip=${Math.abs((pgIndex - 1) * pgSize)}&top=${pgSize}`
    }, [controller, pgIndex, pgSize])

    React.useEffect(() => {
        // This if chain is used to reset top and skip if the user
        // navigates to another DbTable route from the current.
        if (lastPath == null) setLastPath(location.pathname)
        else if (location.pathname !== lastPath) {
            if (pgSize !== 20) return setPgSize(20)
            else if (pgIndex !== 1) return setPgIndex(1)

            return setLastPath(location.pathname)
        } 

        axios.get<PlantInfo>(path)
            .then(response => {
                const totalPages = Math.ceil(response.data.totalCount / pgSize)
                 if (pgIndex > totalPages && response.data.totalCount > 0) {
                    setPgIndex(totalPages)
                }

                setPlantInfo(response.data)
                setLoading(false)
            })
            .catch(_err => {
                setError("An error has occured.")
            })
    }, [location, lastPath, path, pgSize, pgIndex])

    const getDisplayValue = (record: PlantRecord | undefined) => {
        if (record === undefined) return

        const property = plantInfo?.schema.find(p => p.propertyName === record.propertyName)

        switch (property?.type) {
            case PlantDataType.Enum:
                return property.options?.find(d => d.value === parseInt(record.value))?.name
            default:
                return record.value
        }
    }

    if (loading && !error) return <Loading />
    else if (error && loading) return <SomethingWentWrong />

    return (<>
        <Helmet>
            <title>{`${plantApiInfo?.pluralDisplayName} - Plant DB`}</title>
        </Helmet>

        <Container>
            <Title sx={(theme) => ({ color: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background, fontSize: "3em" })} order={1}>{plantApiInfo?.pluralDisplayName}</Title>

            <Box sx={{ marginRight: "auto" }}>
                <Link to={`/${controller}/new`}>
                    <ActionIcon size={35} sx={(theme) => ({ color: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background })}>
                        <IconCirclePlus size={35} />
                    </ActionIcon>
                </Link>
            </Box>

            <Box sx={{ overflowX: "auto" }}>
                <Table styles={{ whitespace: "no-wrap", minHeight: "70vh", }} verticalSpacing="lg" striped highlightOnHover>
                    <thead>
                        <tr>
                            {
                                plantInfo?.schema.filter(s => !s.isHidden).map(p => <th key={p.propertyName}>{p.displayName}</th>)
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                            plantInfo?.records.map((row, index) => {
                                const keyRecord = row.find(r => r.propertyName === plantInfo.schema.find(s => s.isKey)?.propertyName)

                                return (<tr
                                    key={index}
                                    className="table-row cursor-pointer">
                                    {
                                        plantInfo?.schema.filter(s => !s.isHidden).map(s => <td style={{overflow: "hidden"}} key={s.propertyName}>
                                            <Link style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                                display: "block",
                                                margin: "-10em",
                                                padding: "10em",
                                            }} to={`/${controller}/${keyRecord?.value}`}>
                                                {getDisplayValue(row.find(r => r.propertyName === s.propertyName))}
                                            </Link>
                                        </td>)
                                    }
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </Box>

            <Box sx={{ marginTop: 20 }}>
                <Pagination page={pgIndex} onChange={changePgIndex} total={Math.ceil((plantInfo?.totalCount ?? 0) / pgSize)} />

                <Select
                    sx={{ marginLeft: "auto", maxWidth: "7em" }}
                    onChange={changePgSize}
                    value={pgSize.toString()}
                    placeholder="Page Size"
                    data={PAGE_SIZES}
                    icon={<IconHash size={14} />}
                />
            </Box>
        </Container>
    </>
    )
}

export default DbTable