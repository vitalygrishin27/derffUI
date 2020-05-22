import React, {Component} from "react";
import {Card, Form, Button, Col} from "react-bootstrap";

export default class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
            description: '',
        };
        this.teamChange = this.teamChange.bind(this);
        this.submitTeam = this.submitTeam.bind(this);
    }

    submitTeam(event) {
        alert(this.state.teamName);
        event.preventDefault();
    }

    teamChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>Добавить команду</Card.Header>
                <Form onSubmit={this.submitTeam} id="teamFormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTeamName">
                                <Form.Label>Название</Form.Label>
                                <Form.Control
                                    className={"bg-dark text-white"}
                                    type="text"
                                    value={this.state.teamName}
                                    onChange={this.teamChange}
                                    required
                                    name="teamName"
                                    placeholder="Название"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDescription">
                                <Form.Label>Примечание</Form.Label>
                                <Form.Control
                                    className={"bg-dark text-white"}
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.teamChange}
                                    name="description"
                                    placeholder="Примечание"/>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign": "right"}}>
                        <Button size="sm" variant="success" type="submit">
                            Submit
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}