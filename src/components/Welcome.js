import React, {Component} from "react";
import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component {
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