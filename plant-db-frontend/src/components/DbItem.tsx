import axios from "axios"
import React, { Fragment } from "react"
import { useParams } from "react-router"
import { ModelInfo, Property } from "../types"
import { ArrowLeftCircleFill, PenFill, TrashFill } from "react-bootstrap-icons"
import DbDelete from "./DbDelete"
import Loading from "./Loading"
import { Link } from "react-router-dom"
import SomethingWentWrong from "./SomethingWentWrong"

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
    const identifier = itemInfo?.records.find(r => r.propertyName === itemInfo?.schema.find(p => p.isIdentifier)?.propertyName)?.value

    React.useEffect(() => {
        document.title = `${controller} (${identifier}) - Plant DB`
        axios.get<ModelInfo>(`/api/${controller}/${id}`)
            .then(response => { 
                setItemInfo(response.data)
                setLoading(false)
            })
            .catch(err => {
                if (err.response) setError(err.response.data)
            })
    }, [controller, id, identifier])

    function getDisplayValue(p: Property) {
        switch (p.type) {
            case 'Dropdown':  
                return p.dropdown?.find(d => d.value === itemInfo?.records.find(r => r.propertyName === p.propertyName)?.value)?.name
            default:
                return itemInfo?.records.find(r => r.propertyName === p.propertyName)?.value
        }
    }

    return ((loading && !error) ? <Loading /> : 
        (loading && error) ? <SomethingWentWrong /> :
        <>
            <div className="ms-3 mt-1">
                <h1>{controller}</h1>
                <h3 className="ms-1">
                    {identifier}
                </h3>
            </div>

            <div className="m-4">
                <dl className="border rounded p-2 mx-auto">
                    {
                        itemInfo?.schema.filter(f => !f.isHidden).map(p => <Fragment key={p.propertyName}>
                            <dt>{p.displayName}</dt>
                            <dd>{getDisplayValue(p)}</dd>
                        </Fragment>)
                    }
                </dl>
            </div>

            {
                action === 'delete' && <DbDelete />
            }

            <div className="p-4 text-center">
                <Link className="me-2" to={`/${controller}`}>
                    <ArrowLeftCircleFill color="black" size={30} />
                </Link>

                <Link className="me-2" to={`/${controller}/${id}/edit`}>
                    <PenFill color="black" size={30} />
                </Link>

                <Link to={`/${controller}/${id}/delete`}>
                    <TrashFill color="black" size={30} />
                </Link>
            </div>
        </>
    )
}

export default DbItem