import alt from '../alt';
import ArticleActions from '../actions/ArticleActions'

class ArticleStore {
  constructor() {
    this.bindActions(ArticleActions);
    this.newTitle = '';
    this.newContent = '';
    this.article = {};
    this.articles = [];
  }

  onDownloadAllSuccess(articles) {
    this.articles = articles;
  }

  onDownloadByIdSuccess(article) {
    this.article = article;
  }

  onUpdateNewTitle(title) {
    this.newTitle = title;
  }

  onUpdateNewContent(content) {
    this.newContent = content;
  }

  onPostSuccess(article) {
    this.articles.push(article);
  }
}

export default alt.createStore(ArticleStore, 'ArticleStore');