import React from 'react';
import Router from 'react-router';
import ReactStateMagicMixin from 'alt/mixins/ReactStateMagicMixin';
import SmileLayout from '../layouts/smileLayout.jsx';
import InformationStore from '../../stores/InformationStore';
import InformationActions from '../../actions/InformationActions';

module.exports = React.createClass({
  mixins: [ReactStateMagicMixin, Router.State],
  statics: {
    registerStores: {
      informationStore: InformationStore,
    },
  },
  componentDidMount: function() {
    InformationActions.downloadById(
      this.getParams().informationId
    );
  },
  render: function() {
    return <SmileLayout>
      <div className="information-container">
        <h1 className="title">{this.state.informationStore.article.title}</h1>
        <p className="content">{this.state.informationStore.article.content}</p>
      </div>
    </SmileLayout>;
  },
});