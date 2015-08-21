import React from 'react';
import {Link} from 'react-router';
import connectToStores from 'alt/utils/connectToStores';
import ArticleStore from '../../stores/ArticleStore';
import UserStore from '../../stores/UserStore';
import ArticleActions from '../../actions/ArticleActions';
import ArticleListContainer from '../components/articleListContainer.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

class BlogPage extends React.Component {
  static getStores() {
    return [ArticleStore, UserStore];
  }

  static getPropsFromStores() {
    return {
      article: ArticleStore.getState(),
      user: UserStore.getState(),
    };
  }

  componentDidMount() {
    ArticleActions.downloadAll();
  }

  render() {
    return <SmileLayout>
      <div className="blog-container">
        <h1>交流</h1>
        <ArticleListContainer articles={this.props.article.articles} />
        <Link to={`/smile/blog/new?${this.props.user.userParams}`}>新增</Link>
      </div>
    </SmileLayout>;
  }
};

export default connectToStores(BlogPage);