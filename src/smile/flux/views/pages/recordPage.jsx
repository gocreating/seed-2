import React from 'react';
// import connectToStores from 'alt/utils/connectToStores';
// import MessageStore from '../../stores/MessageStore';
// import UserStore from '../../stores/UserStore';
// import MessageActions from '../../actions/MessageActions';
// import UserActions from '../../actions/UserActions';
// import MessageItem from '../components/messageItem.jsx';
import TabPanel from 'react-tab-panel'
import SmileLayout from '../layouts/smileLayout.jsx';

export default class RecordPage extends React.Component{

	static getInitialState(){
        return {
            activeIndex: 1
        }
    }

    static handleChange (index){
        this.setState({
            activeIndex: index
        });
    }

	render() {
		return(
				<TabPanel activeIndex={this.state.activeIndex}
                onChange={this.handleChange}
                titleStyle={{padding: 10}}
            	>
                <div title="One">first</div>
                <div title="Two">second</div>
                <div title="Three">third</div>
            </TabPanel>
		)
		// return <SmileLayout>
		// <div className="chat-container">
		
		// </div>
		// </SmileLayout>;
	}
};
