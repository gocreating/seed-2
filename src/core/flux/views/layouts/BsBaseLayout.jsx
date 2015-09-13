import React from 'react';

import Helmet from 'react-helmet';

export default class BaseLayout extends React.Component {
  render() {
    const defaultScripts = [
      '/js/common.js',
      'https://code.jquery.com/jquery-2.1.4.min.js',
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js',
    ];

    // jscs:disable
    const defaultStyles = [
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
    ];
    // jscs:enable

    let scripts = defaultScripts.concat(this.props.scripts).map((src, idx) => {
      return <script key={idx} src={src}/>;
    });

    let styles = defaultStyles.concat(this.props.styles).map((src, idx) => {
      return <link key={idx} rel="stylesheet" href={src}/>;
    });

    return (
      <Helmet
        title={this.props.title}
        meta={[
          {charSet: 'utf-8'},
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ]} >
        {styles}

        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">
                {this.props.title}
              </a>
            </div>

            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Todo App <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="/todo">App Home Page</a></li>
                  </ul>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li><a href="/about">About</a></li>
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    User <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="/user">User Space</a></li>
                    <li><a href="/user/profile">Profile</a></li>
                    <li><a href="/user/login">Login</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="/user/logout">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
        {scripts}
      </Helmet>
    );
  }
};

BaseLayout.defaultProps = {
  title: '',
  scripts: [],
  styles: [],
};