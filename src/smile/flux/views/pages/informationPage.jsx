import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../../stores/UserStore';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleListContainer from '../components/articleListContainer.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

class InformationPage extends React.Component {
  static getStores() {
    return [ArticleStore, UserStore];
  }

  static getPropsFromStores() {
    return {
      article: ArticleStore.getState(),
      user: UserStore.getState(),
    };
  }

  render() {
    return <SmileLayout>
      <div className="information-container">
        <h1>健康資訊</h1>
      </div>
    </SmileLayout>;
  }
};

export default connectToStores(InformationPage);