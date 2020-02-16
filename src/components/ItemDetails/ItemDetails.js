import React, {Component} from 'react';

import './styles.css';

export default class ItemDetails extends Component {

    render() {
        const {item} = this.props;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/3.jpg`}/>

                <div className="card-body">
                    <h4>R2-D2</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>male</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>43</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>red</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
};