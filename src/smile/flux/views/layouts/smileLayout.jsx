import React from 'react';
import Header from '../components/header.jsx';
import NavTab from '../components/navTab.jsx';

export default class SmileLayout extends React.Component {
  render() {
    return <div>
      <Header />
      {this.props.children}
      <NavTab />
    </div>;
  }
};