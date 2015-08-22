import React from 'react';


export default class Content extends React.Component {
  render() {
    return 
    	<div className="content">
                {this.props.currentTab === 1 ?
                <div className="time">
                    <h1>H1</h1>
                </div>
                :null}

                {this.props.currentTab === 2 ?
                <div className="bloodpresure">
                    <h1>H2</h1>
                </div>
                :null}

                {this.props.currentTab === 3 ?
                <div className="weight">
                    <h1>H3</h1>
                </div>
                :null}
            
                {this.props.currentTab === 4 ?
                <div className="bloodsugar">
                    <h1>H4</h1>
                </div>
                :null}
        </div>
  }
};

