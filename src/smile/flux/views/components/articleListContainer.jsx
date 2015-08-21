import React from 'react';
import ArticleItem from './articleItem.jsx';

export default class ArticleListContainer extends React.Component {
  render() {
    return <ul className="article-list">
      {this.props.articles.map((article, idx) => (
        <ArticleItem key={idx} {...article} />
      ))}
    </ul>;
  }
};