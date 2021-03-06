import React, {Component, Fragment} from 'react';

import './styles.css';
import SwapiService from "../../services/swapiService";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

export default class Hero extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true
    };

    componentDidMount() {
        this.loadRandomPlanet();
        this.interval = setInterval(this.loadRandomPlanet, 10000);
    }

    loadRandomPlanet = () => {
        const id = Math.floor(Math.random() * 25) + 2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    };

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false});
    };

    onError = (error) => {
        this.setState({error: true, loading: false});
    };

    render() {
        const {planet, loading, error} = this.state;

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
};

const PlanetView = ({planet}) => {

    const {id, name, population, rotationPeriod, diameter} = planet;

    return (
        <Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt='error image'/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};
