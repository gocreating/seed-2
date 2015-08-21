import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import UserStore from '../../stores/UserStore';
import ArticleStore from '../../stores/ArticleStore';
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

  _onTitleChange(e) {
    ArticleActions.updateNewTitle(e.target.value);
  }

  _onContentChange(e) {
    ArticleActions.updateNewContent(e.target.value);
  }

  _onPost() {
    ArticleActions.post(
      this.props.user.userId,
      this.props.article.newTitle,
      this.props.article.newContent
    );
  }

  render() {
    return <SmileLayout>
      <div className="blog-container">
        <h1>發表新文章</h1>
        <input
          type="text"
          placeholder="標題"
          value={this.props.article.newTitle}
          onChange={this._onTitleChange.bind(this)} />
        <br />
        <textarea
          placeholder="內容"
          onChange={this._onContentChange.bind(this)}
          >{this.props.article.newContent}</textarea>
        <br />
        <button onClick={this._onPost.bind(this)}>發表</button>
      </div>
    </SmileLayout>;
  }
};

export default connectToStores(BlogPage);