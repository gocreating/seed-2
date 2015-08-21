import alt from '../alt';
import InformationActions from '../actions/InformationActions'

class InformationStore {
  constructor() {
    this.bindActions(InformationActions);
    this.article = {};
    this.articles = [];
  }

  onDownloadAllSuccess(articles) {
    this.articles = articles;
  }

  onDownloadByIdSuccess(article) {
    this.article = article;
  }
}

export default alt.createStore(InformationStore, 'InformationStore');