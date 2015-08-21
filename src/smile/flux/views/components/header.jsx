import React from 'react';

if (process.env.BROWSER) {
  require('../../../public/less/header.less');
}

export default class Header extends React.Component {
  render() {
    return <div className="header">
      {this.props.title}
    </div>;
  }
};