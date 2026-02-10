import { NavLink } from "react-router";
import style from "./navbar.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface navBarProps {
    navLogo: string;
    navLinks: Array<{ name: string, path: string }>;
};

export function Navbar(props: navBarProps) {

    const { navLogo, navLinks } = props;
    /* The useContext hook is taking a context as an argument so that a deconstructing assignment can be performed. */
    const { userData, logout } = useContext(AuthContext);

    return (
        <nav className={style.navbarStyle}>
            <h3>{navLogo.toUpperCase()}</h3>
            <ul>
                {navLinks.map((item) => {
                    /* Older version of code-along said: 
                    return(
                        <li key={item.path}>
                            <NavLink to={item.path}>{item.name.toUpperCase()}</NavLink>
                        </li>
                    )
                    */
                    /* Array for navbar list items is in file mainLayout. */
                    /* This corresponds to saying:
                    if the name property of the list item is strictly equal to "Log ind" and if userData exists/is true,
                    then return that list item with the following text instead (Log ud);
                    otherwise, i.e. for any list item where this conditional does not apply, 
                    display the list item the normal way. */
                    return item.name === "Log ind" && userData ? (
                        /* Because the other list items are in upper case. */
                        <li onClick={logout}>LOG UD</li>
                    ) : (
                        <li key={item.path}>
                            <NavLink to={item.path}>{item.name.toUpperCase()}</NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
};