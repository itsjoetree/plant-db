import axios from "axios"
import React, { Fragment } from "react"
import { useParams } from "react-router"
import { ModelInfo } from "../types"
import { ArrowLeftCircleFill, PenFill, TrashFill } from "react-bootstrap-icons"
import DbDelete from "./DbDelete"
import InitialLoadError from "./IntialLoadError"
import Loading from "./Loading"
import { Link } from "react-router-dom"

type DbItemParams = {
    controller: string,
    id: string,
    action: string,
}

function DbItem() {
    const { controller, id, action } = useParams<DbItemParams>()
    const [itemInfo, setItemInfo] = React.useState<ModelInfo>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>()

    React.useEffect(() => {
        axios.get<ModelInfo>(`/api/${controller}/${id}`)
            .then(response => { 
                setItemInfo(response.data)
                setLoading(false)
            })
            .catch(err => {
                if (err.response) setError(err.response.data)
            })
    }, [controller, id])

    return ((loading && !error) ? <Loading /> : 
        (loading && error) ? <InitialLoadError text={error} /> :
        <>
            <h2>{controller} {id}</h2>

            <dl>
                {
                    itemInfo?.schema.map(p => <Fragment key={p.propertyName}>
                        <dd>{p.propertyName}</dd>
                        <dt>{itemInfo.records.find(r => r.propertyName === p.propertyName)?.value}</dt>
                    </Fragment>)
                }
            </dl>
            
            {
                action === 'delete' && <DbDelete />
            }

            <div className="bg-light p-3">
                <Link className="me-2" to={`/${controller}`}>
                    <ArrowLeftCircleFill color="black" size={20} />
                </Link>

                <Link className="me-2" to={`/${controller}/${id}/edit`}>
                    <PenFill color="black" size={20} />
                </Link>

                <Link className="me-2" to={`/${controller}/${id}/delete`}>
                    <TrashFill color="black" size={20} />
                </Link>
            </div>
        </>
    )
}

export default DbItem