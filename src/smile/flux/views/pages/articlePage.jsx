import React from 'react';
import Router from 'react-router';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import SmileLayout from '../layouts/smileLayout.jsx';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';

module.exports = React.createClass({
  mixins: [ReactStateMagicMixin, Router.State],
  statics: {
    registerStores: {
      articleStore: ArticleStore,
    },
  },
  componentDidMount: function() {
    ArticleActions.downloadById(
      this.getParams().articleId
    );
  },
  render: function() {
    const name = this.state.articleStore.article.author?
      this.state.articleStore.article.author.name:
      '';
    return <SmileLayout>
      <div className="blog-container">
        <h1 className="title">{this.state.articleStore.article.title}</h1>
        <p className="author">{name}</p>
        <p className="content">{this.state.articleStore.article.content}</p>
      </div>
    </SmileLayout>;
  },
});