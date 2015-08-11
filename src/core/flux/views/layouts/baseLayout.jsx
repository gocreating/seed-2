import React from 'react';

export default class BaseLayout extends React.Component {
  render() {
    var scripts = this.props.scripts.map((src, idx) => {
      return <script key={idx} src={src}/>;
    });

    var styles = this.props.styles.map((src, idx) => {
      return <link key={idx} rel="stylesheet" href={src}/>;
    });

    // return (
    //   <html>
    //     <head>
    //       <meta charSet="utf-8" />
    //       <meta
    //         name="viewport"
    //         content="width=device-width, initial-scale=1.0" />
    //       <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    //       <title>{this.props.title}</title>
    //       {styles}
    //     </head>

    //     <body>
    //       {this.props.children}
    //       {scripts}
    //     </body>
    //   </html>
    // );
    return (
      <div>
        {styles}
        {this.props.children}
        {scripts}
      </div>
    );
  }
};

BaseLayout.defaultProps = {
  title: '',
  scripts: [],
  styles: [],
};