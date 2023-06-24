import { type ReactNode } from "react";
import { css } from "../../styled-system/css";
import { Link } from "react-router-dom";

const styles = css({
  padding: "1rem",
  position: "sticky",
  top: 0,

  borderBottomColor: "secondary",
  borderBottomStyle: "solid",
  borderBottomWidth: "0.25rem",

  backgroundColor: "primary",
});

const listStyles = css({
  color: "secondary",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

export type NavBarItem = {
  text: string;
  to: string;
};

type NavBarProps = {
  logo: ReactNode;
  items: NavBarItem[];
};

function NavBar({ logo, items } : NavBarProps) {

  return (<nav className={styles}>
    <ul className={listStyles}>
      <li>{logo}</li>
      {
        items.map(item => <li key={item.text}>
          <Link to={item.to}>{item.text}</Link>
        </li>)
      }
    </ul>
  </nav>);
}

export default NavBar;