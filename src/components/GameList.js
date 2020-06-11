import React, {Component} from 'react';
import axios from 'axios';
import {Dropdown, DropdownButton} from "react-bootstrap";

export default class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host: localStorage.getItem("host"),
            tours: [],
            activeTour: '',
        };
    }

    componentDidMount() {
        this.setState({
            isLoadingTourList: false,
            isErrorLoading: false,
        });
        this.getToursList();
    }

    getToursList = () => {
        this.setState({
            isLoadingTourList: true,
            isErrorLoading: false,
        });
        axios.get(this.state.host + "tours")
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({
                    tours: data,
                    isLoadingTourList: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isErrorLoading: true,
                isLoadingTourList: false,
            });
        });
    }

    render() {
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title=
                    {this.state.isLoadingTourList ? "Идет загрузка" : "Обрати тур"}>
                    {this.state.tours.map((tour) => (
                        <Dropdown.Item onClick={() => this.setState({activeTour: tour})}>
                            {tour}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
        );
    }
}