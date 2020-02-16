export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const res = await fetch(this._apiBase + url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    async getAllPeople() {
        const people = await this.getResource(`/people/`);
        return people.results.map((person) => this._transformPerson(person));
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}`);
        return this._transformPerson(person);
    }

    async getAllPlanets() {
        const planets = await this.getResource('/planets/');
        return planets.results.map((planet) => this._transformPlanet(planet));
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`);
        return this._transformPlanet(planet);
    }

    async getAllStarships() {
        const starships = await this.getResource('/starships/');
        return starships.results.map((starship) => this._transformStarship(starship));
    }

    async getStarship(id) {
        const starship = await this.getResource(`/starships/${id}`);
        return this._transformStarship(starship);
    }

    _extractId(item) {
        const idRegexp = /\/([0-9]*)\/$/;
        return item.url.match(idRegexp)[1];
    }

    _transformPerson(person) {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            eyeColor: person.eye_color,
            birthday: person.birth_year
        };
    }

    _transformPlanet(planet) {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        };
    }

    _transformStarship(starship) {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        };
    }
}
