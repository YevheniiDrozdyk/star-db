import React, {Component} from 'react';

import './styles.css';
import SwapiService from "../../services/swapiService";
import Spinner from "../Spinner";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        peopleList: []
    };

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((peopleList) => {
                this.setState({peopleList});
            });
    }

    render() {
        const {peopleList} = this.state;

        const listItems = peopleList.map(({id, name}) => {
            return (
                <li className="list-group-item" key={id} onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </li>
            );
        });

        return (
            <ul className="item-list list-group">
                {listItems.length > 0 ? listItems : <Spinner/>}
            </ul>
        );
    }
};