import { HouseFill } from "react-bootstrap-icons"
import Link from "next/link"

function SiteNavBar() {
    return <div className="text-center bg-midnightblue p-2">
        <Link href="/">
            <HouseFill size={25} color="white" />
        </Link>
    </div>
}

export default SiteNavBar