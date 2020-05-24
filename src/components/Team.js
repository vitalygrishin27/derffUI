import React, {Component} from "react";
import {Card, Form, Button, Col, Row, Image, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle, faSave, faTrash, faUndo, faUpload} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import ScreenBlocker from "./ScreenBlocker";

export default class Team extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.blockScreen = false;
        this.state.filePreview = null;
        this.state.error = false;
        this.teamChange = this.teamChange.bind(this);
        this.submitTeam = this.submitTeam.bind(this);
        this.fileChose = this.fileChose.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    initialState = {
        teamName: '',
        date: '',
        boss: '',
        phone: '',
        village: '',
        symbol: '',
        error: '',
        blockScreen: false,
    };

    resetForm = () => {
        this.setState(() => this.initialState);
    }

    resetFileInput = () => {
        document.getElementById("fileBox").value = "";
        this.setState({
            filePreview: null,
            symbol: '',
        });
    }

    submitTeam = event => {
        event.preventDefault();

        let data = new FormData();
        data.append('file', this.state.symbol);
        data.append('teamName', this.state.teamName);
        data.append('date', this.state.date ? (new Date(this.state.date)).toUTCString() : new Date(2020, 0, 1));
        data.append('boss', this.state.boss);
        data.append('phone', this.state.phone);
        data.append('village', this.state.village);

        console.log("Send POST with: ");
        for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        this.setState({blockScreen: true});
    //    axios.post("http://localhost:8092/ui/team", data)
              axios.post("https://derff.herokuapp.com/ui/team", data)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                this.setState(this.initialState);
                this.setState({"show": true, "error": false});
                setTimeout(() => this.setState({"show": false}), 3000);
            })
            .catch((err) => {
                this.setState({"error": true, "show": true, "blockScreen": false});
                setTimeout(() => this.setState({"show": false}), 3000);
                console.log("AXIOS ERROR: ", err);
            })

    }

    teamChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    fileChose = event => {
        this.setState({
            filePreview: URL.createObjectURL(event.target.files[0]),
            symbol: event.target.files[0],
        });
    }

    render() {
        const {
            teamName,
            date,
            boss,
            phone,
            village,
            filePreview,
        } = this.state;

        return (
            <div>
                <div style={{"display": this.state.blockScreen ? "block" : "none"}}>
                    <ScreenBlocker children={{show: this.state.blockScreen}}/>
                </div>

                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ToastMessage children={{
                        show: this.state.show,
                        error: this.state.error,
                        message: !this.state.error ? "Сохранение прошло успешно!" : "Ошибка при сохранении"
                    }}/>
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
                                           id="fileBox"
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
                                    </Button> &nbsp;&nbsp;
                                    <Image style={{"display": filePreview ? "inline-block" : "none"}}
                                           src={this.state.filePreview} roundedCircle width={"50"}
                                           height={"50"}/>&nbsp;&nbsp;
                                    <Button size={"sm"}
                                            variant={"outline-danger"}
                                            style={{"display": filePreview ? "inline-block" : "none"}}
                                            onClick={this.resetFileInput}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
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