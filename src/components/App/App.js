import React, {Component} from 'react';

import './styles.css';
import Header from "../Header";
import Hero from "../Hero";
import ItemList from "../ItemList";
import ItemDetails from "../ItemDetails";
import SwapiService from "../../services/swapiService";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        items: []
    };

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        this.swapiService
            .getAllPeople()
            .then(this.onItemsLoaded)
    }

    onItemsLoaded = (items) => {
        this.setState({items})
    };

    render() {
        const {items} = this.state;
        return (
            <div>
                <Header/>
                <Hero/>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList items={items}/>
                    </div>
                    <div className="col-md-6">
                        <ItemDetails/>
                    </div>
                </div>
            </div>
        );
    }

};