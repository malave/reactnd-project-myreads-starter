import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Search from './containers/Search';

class BooksApp extends React.Component {
    render() {
        return (
            <div>
                {/*Configure routing for each of the main containers*/}
                <Route exact path='/' component={Home} />
                <Route path='/search' component={Search} />
            </div>
        );
    }

}

export default BooksApp;
