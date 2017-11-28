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
        error: true,
        errorMessage: undefined,
    };

    /*
    * Updates the bookshelf of a book
    * */
    onBookshelfChange(bookshelf, book) {
        return BooksAPI.update(book, bookshelf);
    }

    /*
    * Handles the search query and updates the state based on the response
    * */
    onSearch(query) {
        if (!query.trim()) {
            return this.setState({
                    books: [],
                    error: false,
                    errorMessage: ``,
                },
            );
        }
        BooksAPI.search(query).then(books => {
            if (books.error) {
                return this.setState({
                        books: [],
                        error: true,
                        errorMessage: `No books found for '${query}'`,
                    },
                );
            }
            return this.setState({
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
