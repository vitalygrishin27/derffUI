import React, {Component} from 'react';
import {Button, Card, Col, Form,} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSave} from "@fortawesome/free-solid-svg-icons";

export default class PlayersGoalsForm extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {values, handleChange} = this.props;
        const {countMasterGoals, countSlaveGoals} = values;
        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon
                        icon={faEdit}/> {"Гравці, які забили голи"}
                    </Card.Header>
                    <Form onReset={this.back} onSubmit={this.continue}
                          id="playersGoals">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridMasterTeamPlayersGoals">
                                    <Form.Label>{this.props.masterTeamName}</Form.Label>
                                    {Array(parseInt(countMasterGoals)).fill(null).map((value, index) => (
                                        <div>
                                        <select className="form-control" onSelect={this.onSelect}>
                                            {this.props.masterPlayersList.map((player) => (
                                                <option>{player.playerName}</option>
                                            ))}
                                        </select>
                                            <br/>
                                        </div>
                                    ))}

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSlaveTeamPlayersGoals">
                                    <Form.Label>{this.props.slaveTeamName}</Form.Label>
                                    {Array(parseInt(countSlaveGoals)).fill(null).map((value, index) => (
                                        <div>
                                            <select className="form-control" onSelect={this.onSelect}>
                                                {this.props.slavePlayersList.map((player) => (
                                                    <option>{player.playerName}</option>
                                                ))}
                                            </select>
                                            <br/>
                                        </div>
                                    ))}

                                </Form.Group>

                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {"Продовжити"}
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );

    }
}