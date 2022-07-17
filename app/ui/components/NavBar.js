import * as React from "react";
import styles from "../styles/index.module.scss";
import Box from "@mui/material/Box";
import Link from "next/link";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";

const profile = ["Profile", "Logout"];
const menu = [
  {
    title: "Point of Sale",
    link: "/pos",
  },
  {
    title: "Inventory",
    link: "/pm",
  },
];

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">
                <a>Point of Sale</a>
              </Link>
            </li>
            <li>
              <Link href="/pm">
                <a>Inventory</a>
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">POS System</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/">
              <a>Point of Sale</a>
            </Link>
          </li>
          <li>
            <Link href="/pm">
              <a>Inventory</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href="/login">
          <a className="btn">Login</a>
        </Link>
      </div>
    </div>
  );
};
export default NavBar;
