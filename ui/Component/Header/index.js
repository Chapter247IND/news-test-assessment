import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Button } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <header className="header">
      <div className="container-fluid">
        <nav className="nav">
          <Link href="/">
            <div className="navbar-brand">
              <img src="logo.svg" className="logo" alt="Article Application" />
              <label htmlFor="navbarBrand">Next Article App</label>
            </div>
          </Link>
          <Link href="/articles/add">
            <Button variant="outlined">Post an Article</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
