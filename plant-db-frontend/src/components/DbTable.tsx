import axios from "axios"
import React from "react"
import { PlusCircleFill } from "react-bootstrap-icons"
import { FormSelect, Table } from "react-bootstrap"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { TableInfo } from "../types"
import Heading from "./Heading"
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
            <Heading heading={controller ?? ''} />

            <div className="text-start ms-2 mt-4 mb-4">
                <Link to={`/${controller}/new`}><PlusCircleFill color="black" size={25} /></Link>
            </div>

            <Table hover responsive>
                <thead>
                    <tr>
                        {
                           tableInfo?.schema.filter(s => !s.isHidden).map(p => <th key={p.propertyName}>{p.displayName}</th>) 
                        }
                    </tr>
                </thead>

                <tbody> 
                    {
                        tableInfo?.rows.map((row, index) => {
                            const keyRecord = row.find(r => r.propertyName === tableInfo.schema.find(s => s.isKey)?.propertyName)
                            
                            return (<Link 
                            key={index}
                            className="table-row" 
                            to={`/${controller}/${keyRecord?.value}`}>
                                {
                                    row.filter(r => r.propertyName !== keyRecord?.propertyName).map(record => <td key={record.propertyName}>
                                        {record.value}
                                    </td>)
                                }
                            </Link>)
                        })
                    }
                </tbody>
            </Table>

            <div className="m-2">
                <FormSelect className="mx-auto" onChange={pgSizeChange} value={pgSize}>
                    {
                        pageSizes.map(ps => <option key={ps} value={ps}>{ps}</option>)
                    }
                </FormSelect>
            </div>
        </>
    )
}


export default DbTable