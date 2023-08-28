import { type ReactNode } from "react";
import { css } from "styled-system/css";
import { Link } from "react-router-dom";
import { styles } from "./HeaderBar";

export type NavBarItem = {
  text: string;
  to: string;
};

type NavBarProps = {
  logo: ReactNode;
  items: NavBarItem[];
};

/**
 * Navigation placed at top of app.
 */
function NavBar({ logo, items } : NavBarProps) {

  return (<nav className={styles}>
    <ul className={css({
      color: "secondary",
      display: "flex",
      gap: "4",
      alignItems: "center",
    })}>
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