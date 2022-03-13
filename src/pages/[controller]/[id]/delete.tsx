import DbDelete from "../../../components/DbDelete"
import DbItem from "../[id]"

function Delete() {
    return <DbItem children={<DbDelete />} />
}

export default Delete