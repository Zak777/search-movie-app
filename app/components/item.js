import React from 'react';
import {Link} from 'react-router';

export default class Item extends React.Component {
    render() {
        return (
            <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="well text-center">
                    <img src={this.props.poster != 'N/A' ? this.props.poster : './img/not_found2.png'} alt={this.props.title} />
                    <ul className="list-inline">
                        <li><h5>{this.props.title} ({this.props.year})</h5></li>
                        
                    </ul>
                    <Link to={/movie/+this.props.imdbID} className="btn btn-primary">More info</Link>
                </div>
            </div>
        );
    }
}