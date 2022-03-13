import axios from "axios"
import React, { Fragment } from "react"
import Loading from "../../components/Loading"
import SomethingWentWrong from "../../components/SomethingWentWrong"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { ModelInfo, Property } from "../../types"
import { ArrowLeftCircleFill, PenFill, TrashFill } from "react-bootstrap-icons"
import { upperCase } from "../../helpers"

type DbItemProps = {
    children: any
}

function DbItem({ children } : DbItemProps) {
    const router = useRouter()
    const acceptableActions = ['delete']
    const { controller, id, action } = router.query
    const [itemInfo, setItemInfo] = React.useState<ModelInfo>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [hasInitialError, setHasInitialError] = React.useState<boolean>(action !== undefined && acceptableActions.indexOf(action as string ?? '') === -1)
    const identifier = itemInfo?.records.find(r => r.propertyName === itemInfo?.schema.find(p => p.isIdentifier)?.propertyName)?.value

    React.useEffect(() => {
        axios.get<ModelInfo>(`/api/${controller}/${id}`)
            .then(response => { 
                setItemInfo(response.data)
                setLoading(false)
            })
            .catch(_err => setHasInitialError(true))
    }, [controller, id])

    function getDisplayValue(p: Property) {
        switch (p.type) {
            case 'Dropdown':  
                return p.dropdown?.find(d => d.value === itemInfo?.records.find(r => r.propertyName === p.propertyName)?.value)?.name
            default:
                return itemInfo?.records.find(r => r.propertyName === p.propertyName)?.value
        }
    }
    
    return (hasInitialError ? <SomethingWentWrong /> : loading ? <Loading /> : 
        <>
            <Head>
                <title>{ `${controller} ${identifier ? `(${action ? `${upperCase(action as string)} ` : ''}${identifier})` : ''} - Plant DB`}</title>
            </Head>
            
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

            {children && children}

            <div className="p-4 text-center">
                <span className="me-2">
                    <Link href={`/${controller}`}>
                        <ArrowLeftCircleFill color="black" size={30} />
                    </Link>
                </span>

                <span className="me-2">
                    <Link href={`/${controller}/${id}/edit`}>
                        <PenFill color="black" size={30} />
                    </Link>
                </span>

                <Link href={`/${controller}/${id}/delete`}>
                    <TrashFill color="black" size={30} />
                </Link>
            </div>
        </>
    )
}

export default DbItem