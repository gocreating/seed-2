import React from 'react';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';

export default class InformationItem extends React.Component {
  render() {
    const to = `/smile/information/${this.props.id}?` +
      `${UserStore.getState().userParams}`;
    const content1 = this.props.content.split(' ').slice(0, 20).join(' ');
    const content2 = this.props.content.split('，').slice(0, 2).join('，');
    return <li>
      <Link to={to}>
        <span className="title">
          {this.props.title}
        </span>
        <span className="content">
          {
            content1.length < content2.length?
            content1: content2
          }...
        </span>
      </Link>
    </li>;
  }
};