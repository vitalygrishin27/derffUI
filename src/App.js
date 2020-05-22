import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container, Row, Col} from 'react-bootstrap';
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Team from "./components/Team";
import TeamList from "./components/TeamList";

function App() {
    const marginTop = {
        marginTop: "20px"
    };

    return (
        <div className="App">
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                   <Welcome/>
                   <Team/>
                   <TeamList/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default App;
