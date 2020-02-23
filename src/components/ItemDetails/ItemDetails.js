import React, {Component} from 'react';

import './styles.css';
import SwapiService from "../../services/swapiService";
import Spinner from "../Spinner";

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        isLoaded: true
    };

    updatePerson() {
        this.setState({isLoaded: false});
        const {personId} = this.props;

        if (!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({person, isLoaded: true});
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <Spinner/>
        }

        if (!this.state.person) {
            return <span>Select a person from a list</span>
        }

        const {
            person: {
                id, name, gender, birthday, eyeColor
            }
        } = this.state;


        return (
            <div className="item-details card">
                <img className="item-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthday}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
};