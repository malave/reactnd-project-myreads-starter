import async from 'async';
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import Bookshelf from '../components/Bookshelf';
import SearchInput from '../components/SearchInput';

class Search extends React.Component {

    constructor() {
        super();
        this.onBookshelfChange = this.onBookshelfChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    state = {
        books: [],
        error: false,
        errorMessage: undefined,
    };

    /*
    * Updates the bookshelf of a book
    * */
    onBookshelfChange(bookshelf, book) {
        return BooksAPI.update(book, bookshelf);
    }

    /*
    * Handles the search query and updates the state based on the response.
    * The getAll function is called each time in case a books are updated on the backend,
    * instead of doing the query once during componentDidMount.
    *
    * */
    onSearch(query) {
        const _this = this;
        if (!query.trim()) {
            return this.setState({
                    books: [],
                    error: false,
                    errorMessage: undefined,
                },
            );
        }
        async.parallel({
            all: function (next) {
                BooksAPI.getAll().then((books => next(null, books)));
            },
            search: function (next) {
                BooksAPI.search(query).then((books => next(books.error, books)));
            },
        }, function (err, results) {
            if (err) {
                return _this.setState({
                        books: [],
                        error: true,
                        errorMessage: `No books found for '${query}'`,
                    },
                );
            }
            const books = results.search.map(book => {
                //Look for the book in the `all` results
                const found = _.find(results.all, { id: book.id });

                //if found then update the shelf, else put it in none
                book.shelf = found ? found.shelf : 'none';
                return book;
            });
            return _this.setState({
                    books,
                    error: false,
                    errorMessage: '',
                },
            );
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <SearchInput onChange={this.onSearch} />
                </div>
                {this.state.error ?
                    <div className='search-books-results not-found'>{this.state.errorMessage}</div>
                    :
                    <Bookshelf
                        title={''}
                        books={this.state.books}
                        onBookshelfChange={this.onBookshelfChange}
                        className='search-books-results'
                    />
                }
            </div>
        );
    }
}

export default Search;
