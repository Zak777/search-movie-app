import React from 'react';

import Item from './item';

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            query: '',
            error: false,
            total: 0,
            pageCurrent: 0,
            pageTotal: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({query: ''});
        let url = 'http://www.omdbapi.com/?s=';
        let searchMovieTitle = document.getElementById('inp-search').value;
        if ( searchMovieTitle !== '' && searchMovieTitle !== undefined && searchMovieTitle !== null ) {
            url = url + searchMovieTitle + '&page=1';
            fetch(url)
                .then( (resp) => {
                    if (resp.status === 200) {
                        return resp.json();
                    }
                } )
                .then( (json) => {
                    if (json.Response === 'True') {
                        let allPage = Math.ceil(json.totalResults / 10);
                        this.setState({data: json.Search, query: searchMovieTitle, total: json.totalResults, error: false, pageCurrent: 1, pageTotal: allPage});
                    }
                    else {
                        this.setState({data: [], total: 0, error: true, pageCurrent: 0, pageTotal: 0});
                    }
                })
                .catch((err) => {
                    console.log('Fetch error: ', err);
                });
        }
    }

    handleNext() {
        let url = 'http://www.omdbapi.com/?s=';
        let page = this.state.pageCurrent + 1;
        url = url + this.state.query + '&page=' + page;
        fetch(url)
            .then( (resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
            } )
            .then( (json) => {
                if (json.Response === 'True') {
                    this.setState((prevState) => ({
                        data: prevState.data.concat(json.Search),
                        pageCurrent: prevState.pageCurrent + 1
                    }));
                }
                else {
                    this.setState({data: [], total: 0, error: true, pageCurrent: 0, pageTotal: 0});
                }
            })
            .catch((err) => {
                console.log('Fetch error: ', err);
            });
    }

    render() {
        let items = this.state.data.map( (item, index) => (<Item key={index} title={item.Title} year={item.Year} poster={item.Poster} imdbID={item.imdbID} />) );

        return (
            <div className="row">
                <h3 className="text-center">Search Movie App</h3>
                <div className="jumbotron">
                    <form id="form-search" className="" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <input type="text" className="form-control" id="inp-search" placeholder="Enter movie title" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-default">Find</button>
                                    </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="movies">
                    {(this.state.error === true) ? <h5 className="text-center">Not found</h5> : '' }
                    {(this.state.total > 0) ? <h5 className="text-center">Total found: {this.state.total}</h5> : '' }
                    {items}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center pad-bottom">
                            {(this.state.pageCurrent + 1 <= this.state.pageTotal) ? <button className="btn btn-default" onClick={this.handleNext}>Show more</button> : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
