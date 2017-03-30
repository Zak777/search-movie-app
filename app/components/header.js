import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">Search Movie App</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right text-right">
                            <li><Link to="/" activeClassName={"active"} onlyActiveOnIndex={true}>Home</Link></li>
                            <li><Link to="/about" activeClassName={"active"}>About</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}