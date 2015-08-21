import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import InformationStore from '../../stores/InformationStore';
import InformationActions from '../../actions/InformationActions';
import InformationListContainer from '../components/informationListContainer.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

class InformationPage extends React.Component {
  static getStores() {
    return [InformationStore];
  }

  static getPropsFromStores() {
    return InformationStore.getState();
  }

  componentDidMount() {
    InformationActions.downloadAll();
  }

  render() {
    return <SmileLayout>
      <div className="information-container">
        <h1>健康資訊</h1>
        <InformationListContainer informations={this.props.articles} />
      </div>
    </SmileLayout>;
  }
};

export default connectToStores(InformationPage);