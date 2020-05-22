import React, {Component} from "react";

import {Card, Table} from "react-bootstrap";

export default class TeamList extends Component {
    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>Команды сезона</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant={"dark"}>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Руководитель</th>
                            <th>Эмблема</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
        );
    }
}