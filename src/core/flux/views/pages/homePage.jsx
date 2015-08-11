import React from 'react';

export default class Home extends React.Component {
  handleClick() {
    alert('It works');
  }

  render() {
    return <div>
      <h1>Home</h1>
      <button onClick={this.handleClick}>Click me</button>
    </div>;
  }
};