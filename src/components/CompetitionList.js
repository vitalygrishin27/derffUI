import React, {Component} from "react";

import {Card, Table, Image, ButtonGroup, Button, Dropdown, DropdownButton} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faAddressBook} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {Link} from "react-router-dom";

export default class CompetitionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            competitions: [],
            competitionId: -1,
            competitionName: '',
            isLoadingCompetitions: false,
            isErrorLoading: false,
        };
    }

//Вставить анотацию на класс контроллер @CrossOrigin(origins="http://.....")
    componentDidMount() {
        this.getCompetitionList();
    }

    getCompetitionList() {
        this.setState({
            isLoadingCompetitions: true,
        });
        axios.get(localStorage.getItem("host") + "competitions")
            // axios.get("http://localhost:8092/ui/currentSeason")
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({
                    competitions: data,
                    isLoadingCompetitions: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isErrorLoading: true,
                isLoadingCompetitions: false,
            });
        });
    };

    /*  deleteTour = (tourId) => {
          axios.delete(localStorage.getItem("host")+"tour/" + tourId)
              //  axios.delete("http://localhost:8092/ui/team/" + teamId)
              .then(response => {
                  if (response.data != null) {
                      console.log("Delete OK");
                      console.log(response.data);
                      this.setState({"error": false, "show": true, "blockScreen": false});
                      setTimeout(() => this.setState({"show": false}), 3000);
                      this.setState({
                          teams: this.state.teams.filter(team => team.id !== teamId)
                      });
                  }
              }).catch(() => {
              this.setState({"error": true, "show": true, "blockScreen": false});
              setTimeout(() => this.setState({"show": false}), 3000);
              console.log("Error during deletion");
          });
      };
  */
    render() {
        const isLoadingCompetitions = this.state.isLoadingCompetitions;
        const isErrorLoading = this.state.isErrorLoading;
        let info;
        /*  if (isLoadingSeason || isLoadingTeamList) {
              info = <tr align={"center"}>
                  <td colSpan={"5"}>Идет загрузка</td>
              </tr>;
          }*/
        if (isErrorLoading) {
            info = <tr align={"center"}>
                <td colSpan={"4"}>Ошибка загрузки</td>
            </tr>;
        }
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ToastMessage
                        show={this.state.show}
                        error={this.state.error}
                        message={!this.state.error ? "Удаление прошло успешно!" : "Ошибка при удалении"}
                    />
                </div>
                <Card className={"text-white"} style={{backgroundColor: 'transparent'}}>
                    <div style={{"display": "inline"}}>
                    <Card.Header><FontAwesomeIcon icon={faList}/>Змагання сезону</Card.Header>
                    <Link style={{"display": "inline"}} className="nav-link"
                          to={"competition/-1/ "}>{' '}

                        <Button size="sm" variant="info" type="button"
                                style={{"display": (localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR")) ? "inline" : "none"}}
                            //  onClick={this.addNewGame.bind()}
                        >
                            <FontAwesomeIcon icon={faList}/> Створити нове змагання
                        </Button>
                    </Link>
                    </div>
                    <Card.Body>
                        <Table striped bordered hover variant={"dark"}>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Назва</th>
                                <th>Використовується турнірною таблицею</th>
                                <th>Дії</th>
                            </tr>
                            </thead>
                            <tbody>
                            {info}
                            {
                                this.state.competitions.length === 0 && !isLoadingCompetitions ?
                                    <tr align={"center"}>
                                        <td colSpan={"4"}>Нема зареєстрованих змагань</td>
                                    </tr> :
                                    isLoadingCompetitions ?
                                        <tr align={"center"}>
                                            <td colSpan={"4"}>Процес завантаження...</td>
                                        </tr> :
                                        this.state.competitions.map((competition, count) => (
                                            <tr key={competition.id}>
                                                <td>{count + 1}</td>
                                                <td>{competition.name}</td>
                                                <td>{competition.forStandings?"Так":""}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link className="btn btn-sm btn-outline-warning"
                                                              style={{"display": (localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR")) ? "block" : "none"}}
                                                              to={"competition/"+competition.id+"/"+competition.name}>{' '}
                                                            <FontAwesomeIcon icon={faAddressBook}/>
                                                        </Link>{' '}

                                                    </ButtonGroup>


                                                </td>

                                            </tr>
                                        ))
                            }

                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}