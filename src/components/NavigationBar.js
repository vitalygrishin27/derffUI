import React, {Component} from "react";
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link className="navbar-brand" to={""}>
                    <img alt="" src="../images/logo.png"/>
                </Link>
                <Nav className="mr-auto">
                    <Link className="nav-link" to={"/add"}>
                        Заявить команду на сезон
                    </Link>
                    <Link className="nav-link" to={"/list"}>
                        Команды сезона
                    </Link>
                </Nav>
            </Navbar>
        );
    }
}