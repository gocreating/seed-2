import React from 'react';
import RecordMain from '../components/record/recordmain.jsx';
// import connectToStores from 'alt/utils/connectToStores';
// import MessageStore from '../../stores/MessageStore';
// import UserStore from '../../stores/UserStore';
// import MessageActions from '../../actions/MessageActions';
// import UserActions from '../../actions/UserActions';
// import MessageItem from '../components/messageItem.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

export default class RecordPage extends React.Component{

	render() {
		return <SmileLayout>
		<div className="chat-container">
		<h1>hello</h1>
			<RecordMain />
		</div>
		</SmileLayout>
	}
};

