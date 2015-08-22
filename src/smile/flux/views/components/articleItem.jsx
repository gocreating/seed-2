import React from 'react';
import {Link} from 'react-router';
import UserStore from '../../stores/UserStore';

export default class ArticleItem extends React.Component {
  render() {
    const to = `/smile/blog/${this.props.id}` +
      `?${UserStore.getState().userParams}`;
    return <li>
      <Link to={to}>
        <span className="author">
          {this.props.author.name}
        </span>
        <span className="title">
          {this.props.title}
        </span>
      </Link>
    </li>;
  }
};