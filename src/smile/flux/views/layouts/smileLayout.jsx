import React from 'react';
import UserActions from '../../actions/UserActions';
import Header from '../components/header.jsx';
import NavTab from '../components/navTab.jsx';

class SmileLayout extends React.Component {
  componentDidMount() {
    UserActions.setId();
  }

  render() {
    return <div>
      <Header />
      {this.props.children}
      <NavTab />
    </div>;
  }
};

export default SmileLayout;