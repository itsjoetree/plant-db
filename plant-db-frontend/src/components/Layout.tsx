import { AppHeader } from "./AppHeader";

type OuterAppShellProps = {
    component: JSX.Element
}

const Layout = ({ component } : OuterAppShellProps) => {

    return (<>
        <AppHeader />
        {component}
    </>)
}

export default Layout