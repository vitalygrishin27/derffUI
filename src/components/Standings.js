import React, {Component} from "react";
import axios from "axios";
import {Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";

export default class Standings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            standings: [],
        };
    }

    componentDidMount() {
        this.getStatisticFromBackEnd();
    }

    getStatisticFromBackEnd = () => {
        this.setState({
            isLoading: true,
        });
          axios.get(localStorage.getItem("host")+"standings")
      //  axios.get("http://localhost:8092/ui/standings")
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({
                    standings: data,
                    isLoading: false,
                });
            }).catch(() => {
            this.setState({
                isLoading: false,
                isErrorLoading: true,
            });
        });
    }

    render() {
        const isLoading = this.state.isLoading;
        const standings = this.state.standings;
        return (
            <div>
                <Card className={"text-white"} style={{ backgroundColor: 'transparent' }}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Турнірна таблиця
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant={"dark"}>
                            <thead>
                            <tr style={{"color": "#ffcb3b"}}>
                                <th>№</th>
                                <th>Команда</th>
                                <th>Ігри</th>
                                <th>П</th>
                                <th>Н</th>
                                <th>П</th>
                                <th>М’ячі</th>
                                <th>Очки</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.standings.length === 0 && !isLoading ?
                                    <tr align={"center"}>
                                        <td colSpan={"11"}>Нема даних</td>
                                    </tr> :
                                    isLoading ?
                                        <tr align={"center"}>
                                            <td colSpan={"11"}>Завантаження</td>
                                        </tr> :
                                        this.state.standings.map((standingsRow, count) => (
                                            <tr key={standingsRow.number} style={{
                                                "fontSize": "15pt",
                                                "fontWeight": "600",
                                                "textAlign": "center"
                                            }}>
                                                <td>{count + 1}</td>
                                                <td style={{"textAlign": "left"}}>{standingsRow.teamName}</td>
                                                <td>{standingsRow.games}</td>
                                                <td style={{"background": "#328734"}}>{standingsRow.wins}</td>
                                                <td style={{
                                                    "background": "#e3d432",
                                                    "color": "#252F48"
                                                }}>{standingsRow.draws}</td>
                                                <td style={{"background": "#9e1616"}}>{standingsRow.losses}</td>
                                                <td style={{"fontSize": "11pt"}}>{standingsRow.stringRatioGoals}</td>
                                                <td>{standingsRow.points}</td>
                                            </tr>
                                        ))
                            }

                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
                <div style={{"height": 50}}></div>
            </div>
        );
    }

}