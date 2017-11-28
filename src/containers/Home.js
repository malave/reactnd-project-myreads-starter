import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import Bookshelf from '../components/Bookshelf';
import * as constants from '../config/constants';

class Home extends React.Component {

    constructor() {
        super();
        this.refreshBooks = this.refreshBooks.bind(this);
        this.onBookshelfChange = this.onBookshelfChange.bind(this);
    }

    state = {
        books: [],
    };

    componentDidMount() {
        this.refreshBooks();
    }

    /*
    * Gets all the books for all bookshelves
    * */
    refreshBooks() {
        BooksAPI.getAll().then(books => this.setState({ books }));
    }

    /*
    * Updates the bookshelf of a book
    * */
    onBookshelfChange(bookshelf, book) {
        BooksAPI.update(book, bookshelf).then(() => this.refreshBooks());
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <Bookshelf
                        title={constants.BOOKSHELF_LABEL_CURRENTLY_READING}
                        books={_.filter(this.state.books, { shelf: constants.BOOKSHELF_ID_CURRENTLY_READING })}
                        onBookshelfChange={this.onBookshelfChange}
                    />
                    <Bookshelf
                        title={constants.BOOKSHELF_LABEL_WANT_TO_READ}
                        books={_.filter(this.state.books, { shelf: constants.BOOKSHELF_ID_WANT_TO_READ })}
                        onBookshelfChange={this.onBookshelfChange}
                    />
                    <Bookshelf
                        title={constants.BOOKSHELF_LABEL_READ}
                        books={_.filter(this.state.books, { shelf: constants.BOOKSHELF_ID_READ })}
                        onBookshelfChange={this.onBookshelfChange}
                    />
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}

export default Home;
