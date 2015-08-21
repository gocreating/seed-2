import alt from '../alt';
import ArticleActions from '../actions/ArticleActions'

class ArticleStore {
  constructor() {
    this.bindActions(ArticleActions);
    this.newTitle = '';
    this.newContent = '';
    this.readTitle = '';
    this.readContent = '';
    this.articles = [];
  }

  onDownloadAllSuccess(articles) {
    this.articles = articles;
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