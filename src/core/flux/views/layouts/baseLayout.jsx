import React from 'react';

import Helmet from 'react-helmet';

export default class BaseLayout extends React.Component {
  render() {
    var scripts = this.props.scripts.map((src, idx) => {
      return <script key={idx} src={src}/>;
    });

    var styles = this.props.styles.map((src, idx) => {
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