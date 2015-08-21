import alt from '../alt';
import ArticleActions from '../actions/ArticleActions'

class MessageStore {
  constructor() {
    this.bindActions(ArticleActions);
    this.userInput = '';
    this.articles = [];
  }

  onDownloadSuccess(articles) {
    this.articles = articles;
  }

  onUpdateUserInput(userInput) {
    this.userInput = userInput;
  }

  onSendSuccess(msg) {
    this.articles.push(msg);
  }
}

export default alt.createStore(MessageStore, 'MessageStore');