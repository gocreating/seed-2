import React from 'react';

import Helmet from 'react-helmet';

export default class BaseLayout extends React.Component {
  render() {
    const defaultScripts = [
      'http://localhost:8080/webpack-dev-server.js',
      'http://localhost:8080/js/common.js',
    ];

    const defaultStyles = [
    ];

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
        {this.props.children}
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