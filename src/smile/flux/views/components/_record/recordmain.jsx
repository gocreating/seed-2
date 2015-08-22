import React from 'react';
import Tabs from './tabs.jsx';
import Content from './content.jsx';

var tabList = [
  {id: 1, name: 'time'},
  {id: 2, name: 'bloodpresure'},
  {id: 3, name: 'weight'},
  {id: 4, name: 'bloodsugar'},
];


export default class RecordMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: tabList,
      currentTab: 1,
    };
  }

  changeTab(tab) {
    this.setState({
      currentTab: tab.id,
    });
  }

  render() {
    return <div>
      <h1>fuckyou</h1>
      <Tabs
        currentTab={this.state.currentTab}
        tabList={this.state.tabList}
        changeTab={this.changeTab} />
      <Content currentTab={this.state.currentTab} />
    </div>;
  }
};

