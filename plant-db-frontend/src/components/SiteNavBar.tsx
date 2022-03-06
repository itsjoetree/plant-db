import { HouseFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

function SiteNavBar() {
    return <div className="text-center bg-midnightblue p-2">
        <Link to ="/">
            <HouseFill size={25} color="white" />
        </Link>
    </div>
}

export default SiteNavBar