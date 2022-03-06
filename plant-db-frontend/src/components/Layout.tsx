import SiteNavBar from "./SiteNavBar"

type LayoutProps = {
    children: any,
}

function Layout({ children } : LayoutProps) {
    return (
        <>
            <SiteNavBar />
            {children}
        </>
    )
}

export default Layout