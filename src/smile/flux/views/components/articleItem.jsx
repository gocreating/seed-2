import React from 'react';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';

export default class ArticleItem extends React.Component {
  render() {
    return <li>
      <Link to={`/smile/blog/${this.props.id}?${UserStore.getState().userParams}`}>{this.props.title}</Link>
    </li>;
  }
};