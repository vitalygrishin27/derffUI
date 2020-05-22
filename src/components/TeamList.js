import React, {Component} from "react";

import {Card, Table, Image, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class TeamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };
    }

//Вставить анотацию на класс контроллер @CrossOrigin(origins="http://.....")
    componentDidMount() {
        axios.get("https://cors-anywhere.herokuapp.com/https://derff.herokuapp.com/teamNames")
            .then(response => response.data)
            .then((data) => {
                this.setState({teams: data});
            });
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList}/> Команды сезона</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant={"dark"}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Руководитель</th>
                            <th>Эмблема</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.teams.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"5"}>Нет зарегистрированных команд</td>
                                </tr> :
                                this.state.teams.map((team,count) => (
                                    <tr key={team.id}>
                                        <td>{count+1}</td>
                                        <td>{team.teamName}</td>
                                        <td></td>
                                        <td>
                                            <Image src={team.symbol} roundedCircle width={"25"} height={"25"}>

                                            </Image>
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size={"sm"} variant={"outline-primary"}><FontAwesomeIcon icon={faEdit}/></Button>{' '}
                                                <Button size={"sm"} variant={"outline-danger"}><FontAwesomeIcon icon={faTrash}/></Button>{' '}
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