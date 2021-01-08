import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    state = {
        filter: ''
    }

    onFilterChange = (e) => {
        this.setState({
            filter: e.target.value
        });

        this.props.onChange(e.target.value);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.filter}
                   onChange={this.onFilterChange}
            />
        );
    }
};
