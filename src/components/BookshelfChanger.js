/**
 *
 * BookshelfChanger
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import * as constants from '../config/constants';

class BookshelfChanger extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    renderOptions() {
        return constants.BOOKSHELVES.map(bookshelf => <option key={bookshelf.id} value={bookshelf.id}>{bookshelf.label}</option>);
    }

    onChange(event) {
        this.props.onBookshelfChange(event.target.value);
    }

    render() {
        const { bookshelf } = this.props;
        return (
            <div className="book-shelf-changer">
                <select defaultValue={bookshelf} onChange={this.onChange}>
                    <option value="none" disabled>Move to...</option>
                    {this.renderOptions()}
                </select>
            </div>
        );
    }
}

BookshelfChanger.propTypes = {
    bookshelf: PropTypes.string,
    onBookshelfChange: PropTypes.func.isRequired,
};

BookshelfChanger.defaultProps = {
    bookshelf: 'none',
};
export default BookshelfChanger;