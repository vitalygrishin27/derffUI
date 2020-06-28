import React, {Component} from 'react';
import CountGoalsForm from "./CountGoalsForm";
import PlayersGoalsForm from "./PlayersGoalsForm";
import axios from "axios";
import {Dropdown, DropdownButton} from "react-bootstrap";

export default class GameResultWizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isErrorLoading: false,
            step: 1,
            gameId: 0,
            countMasterGoals: 0,
            countSlaveGoals: 0,
            masterPlayersList: [],
            slavePlayersList: [],
            masterPlayersGoals: [],
            slavePlayersGoals: [],
            masterTeamName: '',
            slaveTeamName: ''
        }
    }

    componentDidMount() {
        const gameId = +this.props.match.params.gameId;
        const masterTeamName = this.props.match.params.masterTeamName;
        const slaveTeamName = this.props.match.params.slaveTeamName;
        this.setState({
            step: 1,
            gameId: gameId,
            masterTeamName: masterTeamName,
            slaveTeamName: slaveTeamName
        });
        this.getPlayersListForGame(gameId);
    }

    getPlayersListForGame = (gameId) => {
        this.setState({
            isLoading: true,
            isErrorLoading: false,
        });
        axios.get(localStorage.getItem("host") + "games/" + gameId)
            //  axios.get("http://localhost:8092/ui/standings")
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                data.map((list, count) => (
                count===0 ?
                    this.setState({
                        masterPlayersList: list,
                    }) :
                    this.setState({
                        slavePlayersList: list,
                    })
            ))
                this.setState({
                    isLoading: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isLoading: false,
                isErrorLoading: true,
            });
        });
    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    prevStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    }

    render() {
        const {step} = this.state;
        const {masterPlayersList, slavePlayersList, masterPlayersGoals, slavePlayersGoals, countMasterGoals, countSlaveGoals} = this.state;
        const values = {masterPlayersList, slavePlayersList, masterPlayersGoals, slavePlayersGoals, countMasterGoals, countSlaveGoals};

        switch (this.state.step) {
            case 1:
                return (
                    <div>
                        <CountGoalsForm nextStep={this.nextStep}
                                        masterTeamName={this.state.masterTeamName}
                                        slaveTeamName={this.state.slaveTeamName}
                                        handleChange={this.handleChange}
                                        values={values}
                        />
                    </div>
                );
                break;
            case 2:
                return (

                    <PlayersGoalsForm nextStep={this.nextStep}
                                      prevStep={this.prevStep}
                                      masterTeamName={this.state.masterTeamName}
                                      slaveTeamName={this.state.slaveTeamName}
                                      handleChange={this.handleChange}
                                      masterPlayersList={this.state.masterPlayersList}
                                      slavePlayersList={this.state.slavePlayersList}
                                      values={values}>
                    </PlayersGoalsForm>
                )
                break;
        }
    }

}