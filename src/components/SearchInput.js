/**
 *
 * SearchInput
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

class SearchInput extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);

    }

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.onChange} />
            </div>
        );
    }
}

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,

};

export default SearchInput;