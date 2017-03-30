import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Root from './components/root';
import Home from './components/home';
import About from './components/about';
import Movie from './components/movie';

class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Root}>
                    <IndexRoute component={Home} />
                    <Route path='about' component={About} />
                    <Route path='movie(/:id)' component={Movie} />
                </Route>
            </Router>
        );
    }
}

render(<App />, document.getElementById('app'));

