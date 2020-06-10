import React, {Component} from "react";
import {Navbar, Nav, Card} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar variant="dark" className={"text-white"} style={{ backgroundColor: 'transparent' }}>
                <Link className="navbar-brand" to={""}>
                    <img alt="" src="/images/logo.png"/>
                </Link>
                <Nav className="mr-auto">
                    <Link className="nav-link" to={"/list"}>
                        Команди сезону
                    </Link>
                </Nav>
                <Nav className="mr-auto">
                    <Link className="nav-link" to={"/standings"}>
                        Турнірна таблиця
                    </Link>
                </Nav>
                <Nav className="mr-auto">
                    <Link className="nav-link" to={"/statistic"}>
                        Статистика гравців
                    </Link>
                </Nav>
                <Nav className="mr-auto">
                    <Link className="nav-link" to={"/login"}>
                        Увійти до системи
                    </Link>
                </Nav>
            </Navbar>
        );
    }
}