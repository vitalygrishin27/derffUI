import React, {Component} from "react";
import {Card, Form, Button, Col, Image, DropdownButton, Dropdown} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle, faSave, faEdit, faTrash, faUndo, faList, faUpload} from '@fortawesome/free-solid-svg-icons';
import {MDBBadge, MDBContainer} from "mdbreact";
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import ScreenBlocker from "./ScreenBlocker";

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.loadingUnregisteredPlayer = false;
        this.state.blockScreen = false;
        this.state.filePreview = null;
        this.state.error = false;
        this.state.unRegisteredPlayers = [];
        this.state.isAuthenticated = false;
        this.playerChange = this.playerChange.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.submitPlayer = this.submitPlayer.bind(this);
        this.fileChose = this.fileChose.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.searchPlayers = this.searchPlayers.bind(this);
    }

    initialState = {
        //  teamId: null,
        //   teamName: '',
        id: '',
        firstName: '',
        secondName: '',
        lastName: '',
        birthday: '',
        isLegionary: false,
        registration: '',
        role: '',
        photo: '',
        idCard: '',
        inn: '',
        blockScreen: false,
        filePreview: '',
        photoString: '',
    };

    componentDidMount() {
        const playerId = +this.props.match.params.id;
        const teamId = +this.props.match.params.teamId;
        const teamName = this.props.match.params.teamName;
        this.setState({
            teamId: teamId,
            teamName: teamName,
        });
        if (playerId) {
            this.findPlayerById(playerId);
        }
        this.fillListUnRegisteredPlayer("А");
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.id !== prevState.id && this.state.id) {
            this.findPlayerById(this.state.id);
        }
    };

    searchPlayers(letter){
        this.fillListUnRegisteredPlayer(letter);
    }

    fillListUnRegisteredPlayer = (letter) => {
        this.setState({
            loadingUnregisteredPlayer: true,
        });

        axios.get(localStorage.getItem("host") + "unRegisteredPlayers/"+letter)
            //axios.get("http://localhost:8092/ui/unRegisteredPlayers")
            .then(response => {
                console.log(response);
                if (response.data != null) {
                    this.setState({
                        unRegisteredPlayers: response.data,
                        loadingUnregisteredPlayer: false,
                    });
                }
            })
            .catch((error) => {
                console.error("Error" + error);
                this.setState({
                    loadingUnregisteredPlayer: false,
                });
            });
    };

    findPlayerById = (playerId) => {
        this.setState({
            blockScreen: true
        });
        axios.get(localStorage.getItem("host") + "players/" + playerId)
            // axios.get("http://localhost:8092/ui/players/" + playerId)
            .then(response => {
                console.log(response);
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        firstName: response.data.firstName,
                        secondName: response.data.secondName,
                        lastName: response.data.lastName,
                        birthday: response.data.birthday ? (response.data.birthday).toString().substring(0, 10) : '',
                        isLegionary: response.data.isLegionary,
                        registration: response.data.registration,
                        role: response.data.role,
                        idCard: response.data.idCard,
                        inn: response.data.inn,
                        filePreview: response.data.photoString,
                        photoString: response.data.photoString,
                        blockScreen: false,
                    });
                }
            })
            .catch((error) => {
                console.error("Error" + error);
            });
    };

    resetForm = () => {
        this.setState({
            id: '',
            firstName: '',
            secondName: '',
            lastName: '',
            birthday: '',
            isLegionary: false,
            registration: '',
            role: '',
            photo: '',
            idCard: '',
            inn: '',
            blockScreen: false,
            filePreview: '',
            photoString: '',
        });
        //  this.fillListUnRegisteredPlayer();
    };

    resetFileInput = () => {
        document.getElementById("fileBox").value = "";
        this.setState({
            filePreview: null,
            photoString: '',
            photo: '',
        });
    };

    submitPlayer = event => {
        event.preventDefault();
        let data = new FormData();
        data.append('teamId', this.state.teamId);
        data.append('file', this.state.photo);
        data.append('photoString', this.state.photoString);
        data.append('firstName', this.state.firstName);
        data.append('secondName', this.state.secondName);
        data.append('lastName', this.state.lastName);
        data.append('birthday', this.state.birthday ? (new Date(this.state.birthday)).toUTCString() : new Date(2020, 0, 1));
        data.append('isLegionary', this.state.isLegionary);
        data.append('registration', this.state.registration);
        data.append('role', this.state.role);
        data.append('idCard', this.state.idCard);
        data.append('inn', this.state.inn);
        data.append('userName', localStorage.getItem("user"));

        console.log("Send POST with: ");
        for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        this.setState({blockScreen: true});
        // axios.post("http://localhost:8092/ui/player", data)
        axios.post(localStorage.getItem("host") + "player", data)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                // this.setState(this.initialState);
                this.setState({
                        id: '',
                        firstName: '',
                        secondName: '',
                        lastName: '',
                        birthday: '',
                        isLegionary: false,
                        registration: '',
                        role: '',
                        photo: '',
                        idCard: '',
                        inn: '',
                        blockScreen: false,
                        filePreview: '',
                        photoString: '',
                    }
                );
                this.setState({"show": true, "error": false, "method": 'post'});
                setTimeout(() => this.setState({"show": false}), 3000);
            })
            .catch((err) => {
                this.setState({"error": true, "show": true, "blockScreen": false});
                setTimeout(() => this.setState({"show": false}), 3000);
                console.log("AXIOS ERROR: ", err);
            })

    };

    updatePlayer = event => {
        event.preventDefault();
        let data = new FormData();
        //   alert(this.state.isLegionary);
        data.append('teamId', this.state.teamId);
        data.append('id', this.state.id);
        data.append('file', this.state.photo);
        data.append('photoString', this.state.photoString);
        data.append('firstName', this.state.firstName);
        data.append('secondName', this.state.secondName);
        data.append('lastName', this.state.lastName);
        data.append('birthday', this.state.birthday ? (new Date(this.state.birthday)).toUTCString() : new Date(2020, 0, 1));
        data.append('isLegionary', this.state.isLegionary);
        data.append('registration', this.state.registration);
        data.append('role', this.state.role);
        data.append('idCard', this.state.idCard);
        data.append('inn', this.state.inn);
        data.append('userName', localStorage.getItem("user"));

        console.log("Send POST with: ");
        for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        this.setState({blockScreen: true});
        //  axios.put("http://localhost:8092/ui/player", data)
        axios.put(localStorage.getItem("host") + "player", data)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                this.setState({
                    unRegisteredPlayers: this.state.unRegisteredPlayers.filter(player => player.id !== this.state.id)
                });
                this.setState({
                        id: '',
                        firstName: '',
                        secondName: '',
                        lastName: '',
                        birthday: '',
                        isLegionary: false,
                        registration: '',
                        role: '',
                        photo: '',
                        idCard: '',
                        inn: '',
                        blockScreen: false,
                        filePreview: '',
                        photoString: '',
                    }
                );

                this.setState({"show": true, "error": false, "method": 'put'});
                setTimeout(() => this.setState({"show": false}), 3000);
                //  setTimeout(() => this.playerList(), 3000);

            })
            .catch((err) => {
                this.setState({"error": true, "show": true, "blockScreen": false});
                setTimeout(() => this.setState({"show": false}), 3000);
                console.log("AXIOS ERROR: ", err);
            })

    };

    playerChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    playerList = () => {
        return this.props.history.goBack();
    };

    fileChose = event => {
        this.setState({
            filePreview: URL.createObjectURL(event.target.files[0]),
            photo: event.target.files[0],
        });
    };

    checkBoxChange = () => {
        this.setState({
            isLegionary: !this.state.isLegionary,
        });
    }

    render() {
        const {
            teamId,
            teamName,
            firstName,
            secondName,
            lastName,
            birthday,
            isLegionary,
            registration,
            role,
            idCard,
            filePreview,
        } = this.state;

        return (
            <div>
                <div style={{"display": this.state.blockScreen ? "block" : "none"}}>
                    <ScreenBlocker show={this.state.blockScreen}/>
                </div>

                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ToastMessage
                        show={this.state.show}
                        error={this.state.error}
                        message={!this.state.error ? (this.state.method === "put" ? "Обновление прошло успешно!" : "Сохранение прошло успешно!") : "Ошибка при сохранении"}
                    />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon
                        icon={this.state.id ? faEdit : faPlusCircle}/> {this.state.id ? "Обновить данные игрока команды " + this.state.teamName : "Зарегистрировать игрока в команду " + this.state.teamName}
                        <MDBContainer>
                            <h3 style={{"display": "inline", "cursor": "pointer"}}
                                onClick={this.searchPlayers.bind(this, "А")}><MDBBadge color="primary">А</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Б")}><MDBBadge
                                color="primary">Б</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "В")}><MDBBadge
                                color="primary">В</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Г")}><MDBBadge
                                color="primary">Г</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Д")}><MDBBadge
                                color="primary">Д</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Е")}><MDBBadge
                                color="primary">Е</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Є")}><MDBBadge
                                color="primary">Є</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Ж")}><MDBBadge
                                color="primary">Ж</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "З")}><MDBBadge
                                color="primary">З</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "И")}><MDBBadge
                                color="primary">И</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "І")}><MDBBadge
                                color="primary">І</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Ї")}><MDBBadge
                                color="primary">Ї</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Й")}><MDBBadge
                                color="primary">Й</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "К")}><MDBBadge
                                color="primary">К</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Л")}><MDBBadge
                                color="primary">Л</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "М")}><MDBBadge
                                color="primary">М</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Н")}><MDBBadge
                                color="primary">Н</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "О")}><MDBBadge
                                color="primary">О</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "П")}><MDBBadge
                                color="primary">П</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Р")}><MDBBadge
                                color="primary">Р</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "С")}><MDBBadge
                                color="primary">С</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Т")}><MDBBadge
                                color="primary">Т</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "У")}><MDBBadge
                                color="primary">У</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Ф")}><MDBBadge
                                color="primary">Ф</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Х")}><MDBBadge
                                color="primary">Х</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Ц")}><MDBBadge
                                color="primary">Ц</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Ч")}><MDBBadge
                                color="primary">Ч</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Ш")}><MDBBadge
                                color="primary">Ш</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Щ")}><MDBBadge
                                color="primary">Щ</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Ю")}><MDBBadge
                                color="primary">Ю</MDBBadge></h3>
                            <h3 style={{"display": "inline", "margin-left": "3px", "cursor": "pointer"}} onClick={this.searchPlayers.bind(this, "Я")}><MDBBadge
                                color="primary">Я</MDBBadge></h3>
                        </MDBContainer>
                        <h2></h2>
                        <DropdownButton id="dropdown-basic-button" title=
                            {this.state.loadingUnregisteredPlayer ? "Идет загрузка" : "Не заявленные игроки"}>
                            {this.state.unRegisteredPlayers.map((player, count) => (
                                <Dropdown.Item onClick={() => this.setState({id: player.id})}>
                                    {player.lastName}
                                    {' '}{player.firstName}
                                    {' '}{player.secondName}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Card.Header>
                    <Form onReset={this.resetForm} onSubmit={this.state.id ? this.updatePlayer : this.submitPlayer}
                          id="PlayerFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPlayerLastName">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={lastName}
                                        onChange={this.playerChange}
                                        required
                                        autoComplete="off"
                                        name="lastName"
                                        placeholder="Фамилия"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPlayerFirstName">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={firstName}
                                        onChange={this.playerChange}
                                        required
                                        autoComplete="off"
                                        name="firstName"
                                        placeholder="Имя"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPlayerSecondName">
                                    <Form.Label>Отчество</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={secondName}
                                        onChange={this.playerChange}
                                        required
                                        autoComplete="off"
                                        name="secondName"
                                        placeholder="Отчество"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridBirthday">
                                    <Form.Label>Дата рождения</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="date"
                                        value={birthday}
                                        onChange={this.playerChange}
                                        name="birthday"
                                        autoComplete="off"
                                        placeholder="Дата рождения"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPlayerRegistration">
                                    <Form.Label>Прописка</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={registration}
                                        onChange={this.playerChange}
                                        required
                                        autoComplete="off"
                                        name="registration"
                                        placeholder="Прописка"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPlayerLegionary">
                                    <Form.Label>Легионер</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="checkbox"
                                        //  defaultChecked={this.state.isLegionary}
                                        //  value={isLegionary}
                                        //   checked={isLegionary}
                                        checked={this.state.isLegionary}
                                        onChange={this.checkBoxChange}
                                        autoComplete="off"
                                        name="isLegionary"
                                        placeholder="Легионер"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPlayerRole">
                                    <Form.Label>Амплуа</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={role}
                                        onChange={this.playerChange}
                                        autoComplete="off"
                                        name="role"
                                        placeholder="Амплуа"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPlayerIdCard">
                                    <Form.Label>Номер ID карты</Form.Label>
                                    <Form.Control
                                        className={"bg-dark text-white"}
                                        type="text"
                                        value={idCard}
                                        onChange={this.playerChange}
                                        autoComplete="off"
                                        name="idCard"
                                        placeholder="Номер ID карты"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPhoto">
                                    <Form.Label>Фотография</Form.Label>
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
                                           src={this.state.filePreview} rounded width={"50"}
                                           height={"71"}/>&nbsp;&nbsp;
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
                                <FontAwesomeIcon
                                    icon={faSave}/> {this.state.id ? "Заявить игрока с обновленными данными" : "Заявить нового игрока"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Очистить
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.playerList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Состав команды
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
                <div style={{"height": 50}}></div>
            </div>

        );
    }
}
