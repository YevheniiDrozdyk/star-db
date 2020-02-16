import React, {Component} from 'react';

import './styles.css';

export default class ItemList extends Component {

    render() {
        const {items} = this.props;
        const listItems = items.map((item) => {
            return (
                <li className="list-group-item" id={item.id}>
                    {item.name}
                </li>
            );
        });

        return (
            <ul className="item-list list-group">
                {listItems}
            </ul>
        );
    }
};