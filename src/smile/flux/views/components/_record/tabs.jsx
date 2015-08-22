import React from 'react';
import Tab from './tab.jsx';

export default class Tabs extends React.Component {
   handleClick() {
     this.props.changeTab(tab);
   }

  render() {
    return <div>
      <ul>
        {(this.props.tabList || []).map((tab) => {
          return (
            <Tab
              handleClick={this.handleClick.bind(this, tab)}
              key={tab.id}
              name={tab.name}
              isCurrent={(this.props.currentTab === tab.id)} />
          );
        })}
      </ul>
    </div>;
  }
};

