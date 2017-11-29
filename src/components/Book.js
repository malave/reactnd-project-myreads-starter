/**
 *
 * Book
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import BookshelfChanger from './BookshelfChanger';
import noCoverFound from '../images/nove-cover-found.jpg'

class Book extends React.Component {
    constructor() {
        super();
        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }

    renderAuthor(author, index) {
        return (
            <div
                key={index}
                className="book-authors"
            >{author}</div>
        );
    }

    onBookshelfChange(bookshelf) {
        const { book } = this.props;
        this.props.onBookshelfChange(bookshelf, book);
    }

    render() {
        const { book } = this.props;
        const backgroundImage = book.imageLinks ? book.imageLinks.thumbnail : noCoverFound;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${backgroundImage}")` }} />
                    <BookshelfChanger bookshelf={book.shelf} onBookshelfChange={this.onBookshelfChange} />
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map(this.renderAuthor)}
            </div>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onBookshelfChange: PropTypes.func.isRequired,

};

export default Book;