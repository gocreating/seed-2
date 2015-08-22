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
    return <SmileLayout>
      <div className="blog-container">
        <h1>{this.state.articleStore.article.title}</h1>
        <p>- {this.state.articleStore.article.author.name}</p>
        <p>{this.state.articleStore.article.content}</p>
      </div>
    </SmileLayout>;
  },
});