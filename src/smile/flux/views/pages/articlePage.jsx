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
      <h1>文章</h1>
      <p>{this.state.articleStore.article.content}</p>
    </SmileLayout>;
  },
});