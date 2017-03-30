import React from 'react';
import {Link} from 'react-router';

export default class Movie extends React.Component {

    constructor() {
        super();
        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        let url = 'http://www.omdbapi.com/?i=' + this.props.params.id;
        fetch(url)
        .then((resp) => resp.json())
        .then((json) => this.setState({data: json}))
        .catch(function(error) {
            console.log('Fetch error: ', error);
        });
    }

    render() {
        let url = 'http://imdb.com/title/' + this.props.params.id;
        return (
            <div className="container well" id="movie">
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.state.data.Poster != 'N/A' ? this.state.data.Poster : './img/not_found2.png'} alt={this.state.data.Title} />
                    </div>
                    <div className="col-md-8">
                        <h3>{this.state.data.Title} ({this.state.data.Year})</h3>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div><strong>Genre: </strong>{this.state.data.Genre}</div>
                                <div><strong>IMDB Rating: </strong>{this.state.data.imdbRating}/10 ({this.state.data.imdbVotes})</div>
                                <div><strong>Rated: </strong>{this.state.data.Rated}</div>
                                <div><strong>Type: </strong>{this.state.data.Type}</div>
                                <div><strong>Released: </strong>{this.state.data.Released}</div>
                                <div><strong>Runtime: </strong>{this.state.data.Runtime}</div>
                                <div><strong>Country: </strong>{this.state.data.Country}</div>
                                <div><strong>Director: </strong>{this.state.data.Director}</div>
                                <div><strong>Writer: </strong>{this.state.data.Writer}</div>
                                <div><strong>Actors: </strong>{this.state.data.Actors}</div>
                                <div><strong>Plot: </strong>{this.state.data.Plot}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="text-center">
                        <a href={url} className="btn btn-primary" target="_blank">View on IMDB</a>&nbsp;
                        <Link to={'/'} className="btn btn-default">Home</Link>
                    </div>
                </div>
            </div>
        );
    }
}
