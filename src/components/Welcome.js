import React from "react";
import {Jumbotron} from "react-bootstrap";

class Welcome extends React.Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Добро пожаловать на сайт ДРФФ</h1>
                <p>
                    Этот ресурс предназначен для менеджмента командами, игроками и статистикой.<br/>
                    Сезон 2020
                </p>
            </Jumbotron>
        );
    }
}
export default Welcome;