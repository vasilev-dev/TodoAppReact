import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    state = {
        statusFilter: this.props.statusFilter
    };

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ]

    render() {
        const {statusFilter, onFilterChange} = this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = statusFilter === name;
            const buttonClass = isActive ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button type="button"
                        key={name}
                        className={`btn ${buttonClass}`}
                        onClick={() => onFilterChange(name)}
                >
                    {label}
                </button>
            );
        });

        return (
            <div className="btn-groups">
                {buttons}
            </div>
        );
    }
}
