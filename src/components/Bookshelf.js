/**
 *
 * Bookshelf
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
    constructor() {
        super();
        this.renderBook = this.renderBook.bind(this);
    }

    renderBook(book) {
        return (
            <li key={book.id}>
                <Book
                    book={book}
                    onBookshelfChange={this.props.onBookshelfChange}
                />
            </li>
        );
    }

    render() {
        const { title, books, className } = this.props;
        return (
            <div className={className}>
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(this.renderBook)}
                    </ol>
                </div>
            </div>
        );
    }
}

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookshelfChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

Bookshelf.defaultProps = {
    className: 'bookshelf',
};

export default Bookshelf;