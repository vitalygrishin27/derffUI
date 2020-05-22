import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';


class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/"><img src="../images/logo.png"></img></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#">Add Team</Nav.Link>
                    <Nav.Link href="#">Team List</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;