import React, {Component} from 'react';

import './styles.css';
import Header from "../Header";
import Hero from "../Hero";
import ItemList from "../ItemList";
import ItemDetails from "../ItemDetails";
import SwapiService from "../../services/swapiService";
import ErrorButton from "../ErrorBanner";
import ErrorIndicator from "../ErrorIndicator";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        selectedPerson: null,
        hasError: false
    };

    componentDidMount() {
        this.loadItems();
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    loadItems() {
        this.swapiService
            .getAllPeople()
            .then(this.onItemsLoaded)
    }

    onItemsLoaded = (items) => {
        this.setState({items})
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const hero = this.state.showRandomPlanet ? <Hero/> : null;
        return (
            <div>
                <Header/>
                {hero}
                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton/>
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <ItemDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        );
    }

};