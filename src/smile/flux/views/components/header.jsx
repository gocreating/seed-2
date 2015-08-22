import React from 'react';

export default class Header extends React.Component {
  render() {
    return <div className="header">
      <img className="logo" src="/smile/logo/smile.png" />
      {this.props.title}
    </div>;
  }
};