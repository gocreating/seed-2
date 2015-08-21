import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import ArticleStore from '../../stores/ArticleStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleListContainer from '../components/articleListContainer.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

class BlogPage extends React.Component {
  static getStores() {
    return [ArticleStore];
  }

  static getPropsFromStores() {
    return ArticleStore.getState();
  }

  componentDidMount() {
    ArticleActions.downloadAll();
  }

  render() {
    return <SmileLayout>
      <div className="blog-container">
        <h1>交流</h1>
        <ArticleListContainer articles={this.props.articles} />
      </div>
    </SmileLayout>;
  }
};

export default connectToStores(BlogPage);