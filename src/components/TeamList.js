import React, {Component} from "react";

import {Card, Table, Image, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class TeamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isErrorLoading: false,
            teams: [],
        };
    }

//Вставить анотацию на класс контроллер @CrossOrigin(origins="http://.....")
    componentDidMount() {
        this.setState({
            isErrorLoading: false,
            isLoading: true
        });
        this.getAllTeams();
    }

    getAllTeams() {
        axios.get("https://derff.herokuapp.com/ui/teams")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    teams: data,
                    isLoading: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
                this.setState({
                    isErrorLoading: true,
                    isLoading:false
            });
        });
    }

    render() {
        const isLoading = this.state.isLoading;
        const isErrorLoading = this.state.isErrorLoading;
        let info;
        if (isLoading) {
            info = <tr align={"center"}>
                <td colSpan={"5"}>Идет загрузка</td>
            </tr>;
        }
        if (isErrorLoading) {
            info = <tr align={"center"}>
                <td colSpan={"5"}>Ошибка загрузки</td>
            </tr>;
        }
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> Команды сезона</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant={"dark"}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Населенный пункт</th>
                            <th>Руководитель</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {info}
                        {
                            this.state.teams.length === 0 && !this.state.isLoading ?
                                <tr align={"center"}>
                                    <td colSpan={"5"}>Нет зарегистрированных команд</td>
                                </tr> :
                                this.state.teams.map((team, count) => (
                                    <tr key={team.id}>
                                        <td>{count + 1}</td>
                                        <td><Image src={team.symbolString} roundedCircle width={"50"} height={"50"}/>{' '}{team.teamName}</td>
                                        <td>{team.village}</td>
                                        <td>{team.boss}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size={"sm"} variant={"outline-primary"}><FontAwesomeIcon
                                                    icon={faEdit}/></Button>{' '}
                                                <Button size={"sm"} variant={"outline-danger"}><FontAwesomeIcon
                                                    icon={faTrash}/></Button>{' '}
                                            </ButtonGroup>


                                        </td>

                                    </tr>
                                ))
                        }

                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
        );
    }
}