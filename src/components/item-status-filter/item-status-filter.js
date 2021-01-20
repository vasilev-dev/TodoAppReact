import React from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({statusFilter, onFilterChange}) => {
    const buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ];

    const renderButtons = () => {
        return buttons.map(({name, label}) => {
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
    };

    return (
        <div className="btn-groups">
            {renderButtons()}
        </div>
    );
};

export default ItemStatusFilter;
