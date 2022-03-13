import axios from "axios"
import React from "react"
import Loading from "./Loading"
import SomethingWentWrong from "./SomethingWentWrong"
import Link from "next/link"
import { useRouter } from "next/router"
import { PlusCircleFill } from "react-bootstrap-icons"
import { FormSelect, Table } from "react-bootstrap"
import { ModelRecord, TableInfo } from "../types"
import { Pagination } from '@mui/material'

function DbTable() {
    const pageSizes = [5, 10, 15, 20]
    const router = useRouter()
    const { controller } = router.query
    const [tableInfo, setTableInfo] = React.useState<TableInfo>()
    const [pgIndex, setPgIndex] = React.useState<number>(1)
    const [pgSize, setPgSize] = React.useState<number>(20)
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (controller) {
            const path = `/api/${controller}?skip=${(pgIndex - 1) * pgSize}&top=${pgSize}`

            axios.get<TableInfo>(path)
                .then(response => {
                    const totalPages = Math.ceil(response.data.totalCount / pgSize)
                    if (pgIndex > totalPages) setPgIndex(totalPages)
                    setTableInfo(response.data)
                    setLoading(false)
                })
                .catch(err => {
                    if (err.response) setError(err.response.data)
                })
        }
    }, [controller, pgIndex, pgSize])

    const changePgSize = (e: React.ChangeEvent<HTMLSelectElement>) => setPgSize(parseInt(e.currentTarget.value))
    const changePgIndex =  (e: React.ChangeEvent<unknown>, page: number) => setPgIndex(page)

    function getDisplayValue(record: ModelRecord) {
        const property = tableInfo?.schema?.find(p => p.propertyName === record.propertyName)

        switch (property?.type) {
            case 'Dropdown':
                return property.dropdown?.find(d => d.value === record.value)?.name
            default:
                return record.value
        }
    }

    return ((loading && !error) ? <Loading /> : (error && loading) ? <SomethingWentWrong /> :
        <>
            <div className="text-start ms-2 mt-4 mb-4">
                <Link href={`/${controller}/new`}><PlusCircleFill className="cursor-pointer" color="black" size={25} /></Link>
            </div>

            <Table hover responsive>
                <thead>
                    <tr>
                        {
                           tableInfo?.schema?.filter(s => !s.isHidden).map(p => <th key={p.propertyName}>{p.displayName}</th>) 
                        }
                    </tr>
                </thead>

                <tbody> 
                    {
                        tableInfo?.rows.map((row, index) => {
                            const keyRecord = row.find(r => r.propertyName === tableInfo.schema.find(s => s.isKey)?.propertyName)
                            
                            return (<tr 
                            key={index}
                            className="table-row cursor-pointer">
                                {
                                    row.filter(r => r.propertyName !== keyRecord?.propertyName).map(record => <td key={record.propertyName}>
                                        <Link href={`/${controller}/${keyRecord?.value}`}>
                                            <a className="table-link">
                                                {getDisplayValue(record)}
                                            </a>
                                        </Link>
                                    </td>)
                                }
                            </tr>)
                        })
                    }
                </tbody>
            </Table>

            <div className="ms-2">
                <Pagination page={pgIndex} onChange={changePgIndex} count={Math.ceil((tableInfo?.totalCount ?? 0) / pgSize)} />

                <span>Pg. Size</span>
                <FormSelect style={{display: 'inline'}} className="ms-1 mt-2 mw-10em" onChange={changePgSize} value={pgSize}>
                    {
                        pageSizes.map(ps => <option key={ps} value={ps}>{ps}</option>)
                    }
                </FormSelect>
            </div>
        </>
    )
}

export default DbTable