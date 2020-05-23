import React, {Component} from "react";
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle, faSave, faUndo, faUpload} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ToastMessage from "./ToastMessage";

export default class Team extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.teamChange = this.teamChange.bind(this);
        this.submitTeam = this.submitTeam.bind(this);
    }

    initialState = {
        teamName: '',
        date: '',
        boss: '',
        phone: '',
        village: '',
        symbol: '',
    };

    resetForm = () => {
        this.setState(() => this.initialState);
    }

    submitTeam = event => {
        event.preventDefault();

        let data = new FormData();
        data.append('file', this.state.symbol);
        data.append('teamName', this.state.teamName);
        data.append('date', (new Date(this.state.date)).toUTCString());
        data.append('boss', this.state.boss);
        data.append('phone', this.state.phone);
        data.append('village', this.state.village);

        console.log("Send POST with: ");
        for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
      //  axios.post("http://localhost:8092/ui/team", data)
        axios.post("https://derff.herokuapp.com/ui/team", data)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                this.setState({"show": true});
                setTimeout(() => this.setState({"show": false}), 3000);
            })
            .catch((err) => {
                alert("Error on Server");
                console.log("AXIOS ERROR: ", err);
            })
        this.setState(this.initialState);
    }

    teamChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    fileChose = event => {
        this.setState({
            symbol: event.target.files[0]
        });
    }

    render() {
        const {
            teamName,
            date,
            boss,
            phone,
            village,
        } = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ToastMessage children={{show: this.state.show, message: "Сохранение прошло успешно!"}}/>

                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusCircle}/> Добавить команду</Card.Header>
                    <Form onReset={this.resetForm} onSubmit={this.submitTeam} id="teamFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTeamName">
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={teamName}
                                        onChange={this.teamChange}
                                        required
                                        autoComplete="off"
                                        name="teamName"
                                        placeholder="Название"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridVillage">
                                    <Form.Label>Населенный пункт</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={village}
                                        onChange={this.teamChange}
                                        required
                                        autoComplete="off"
                                        name="village"
                                        placeholder="Населенный пункт"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridBoss">
                                    <Form.Label>Руководитель</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={boss}
                                        onChange={this.teamChange}
                                        required
                                        autoComplete="off"
                                        name="boss"
                                        placeholder="Руководитель"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={phone}
                                        onChange={this.teamChange}
                                        name="phone"
                                        autoComplete="off"
                                        placeholder="Телефон"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDate">
                                    <Form.Label>Дата основания</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="date"
                                        value={date}
                                        onChange={this.teamChange}
                                        name="date"
                                        autoComplete="off"
                                        placeholder="Дата основания"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridSymbol">
                                    <Form.Label>Эмблема</Form.Label>
                                    <input style={{display: "none"}}
                                           type="file"
                                           onChange={this.fileChose}
                                           ref={fileInput => this.fileInput = fileInput}/>
                                    <br/>
                                    <Button size="sm"
                                            variant="secondary"
                                            type="button"
                                            onClick={() => this.fileInput.click()}
                                    >
                                        <FontAwesomeIcon icon={faUpload}/> Выбрать
                                    </Button>

                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Сохранить
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Очистить
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>


        );
    }
}


/*  const axiosConfig = {
      headers: {
          "Content-Type": "image/jpeg",
          "Access-Control-Allow-Origin": "*",
      }
  };*/
//contentType: "image/jpeg"
//  application/octet-stream
//  const formData = new FormData()
//  formData.append("team",team.toString());