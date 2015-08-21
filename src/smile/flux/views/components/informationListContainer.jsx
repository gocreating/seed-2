import React from 'react';
import InformationItem from './informationItem.jsx';

export default class InformationListContainer extends React.Component {
  render() {
    return <ul className="information-list">
      {this.props.informations.map((information, idx) => (
        <InformationItem key={idx} {...information} />
      ))}
    </ul>;
  }
};