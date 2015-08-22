import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

export default class Tab extends React.Component {

  handleClick(e){
  	e.preventDefault();
    this.props.handleClick();
  }

  render() {
    return  
    		<div>
	            <li className={this.props.isCurrent ? 'current' : null}>
	                <a onClick={this.handleClick} href={this.props.url}>
	                    {this.props.name}
	                </a>
	            </li>
            </div>
  }
};

