import axios from "axios"
import React from "react"
import { FormSelect, Table } from "react-bootstrap"
import { useParams } from "react-router"
import { TableInfo } from "../types"
import InitialLoadError from "./IntialLoadError"
import Loading from "./Loading"

type DbTableParams = {
    controller: string,
}

function DbTable() {
    const pageSizes = [5, 10, 15, 20, 25]
    const { controller } = useParams<DbTableParams>()
    const [tableInfo, setTableInfo] = React.useState<TableInfo>()
    const [pgIndex, setPgIndex] = React.useState<number>(1)
    const [pgSize, setPgSize] = React.useState<number>(20)
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        const path = `/api/${controller}?skip=${(pgIndex - 1) * pgSize}&top=${pgSize}`

        axios.get<TableInfo>(path)
            .then(response => { 
                setTableInfo(response.data)
                setLoading(false)
            })
            .catch(err => {
                if (err.response) setError(err.response.data)
            })
    }, [controller, pgIndex, pgSize])

    const pgSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPgSize(parseInt(e.currentTarget.value))

    return ((loading && !error) ? <Loading /> : (error && loading) ? <InitialLoadError text={error} /> :
        <>
            <Table>
                <thead>
                    <tr>
                        {
                           tableInfo?.schema.map(p => <th key={p.propertyName}>{p.displayName}</th>) 
                        }
                    </tr>
                </thead>

                <tbody>
                    <th>
                        {
                            tableInfo?.rows.map((row, index) => <tr key={index}>
                                {
                                    row.map(record => <td key={record.propertyName}>
                                        {record.value}
                                        </td>)
                                }
                            </tr>)
                        }
                    </th>
                </tbody>
            </Table>

            <FormSelect onChange={pgSizeChange} value={pgSize}>
                {
                    pageSizes.map(ps => <option key={ps} value={ps}>{ps}</option>)
                }
            </FormSelect>
        </>
    )
}


export default DbTable