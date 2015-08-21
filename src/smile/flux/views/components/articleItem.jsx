import React from 'react';
import UserStore from '../../stores/UserStore';

export default class ArticleItem extends React.Component {
  render() {
    return <li>
      {this.props.title}
    </li>;
  }
};