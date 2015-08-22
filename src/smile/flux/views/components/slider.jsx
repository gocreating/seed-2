import React from 'react';

export default class Slider extends React.Component{
  componentDidMount() {
    $('#' + this.props.id).CircularSlider({
      min: 50,
      max: 200,
      radius: 120,
      labelSuffix: ' mg/dl',
    });
  }

  render() {
    return <div className="slider" id={this.props.id}>
    </div>;
  }
};