import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "react-dom";

export class NavMenu extends React.Component {
  render() {
    return (
      <div className="main-nav">
        <button>
          <Link className="navbar-brand" to={"/fetchproducts"}>
            Click here to see all Products
          </Link>
        </button>
      </div>
    );
  }
}

export default NavMenu;
