import React from 'react';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';

export default class InformationItem extends React.Component {
  render() {
    return <li>
      <Link to={`/smile/information/${this.props.id}?${UserStore.getState().userParams}`}>{this.props.title}</Link>
      <p>
        {this.props.content.split(' ').slice(0, 20).join(' ')}
      </p>
    </li>;
  }
};