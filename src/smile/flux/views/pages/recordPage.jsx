import React from 'react';
import {TabbedArea, TabPane} from 'react-bootstrap';
import Slider from '../components/slider.jsx';
import SmileLayout from '../layouts/smileLayout.jsx';

export default class RecordPage extends React.Component{
  // componentDidMount() {
  //   $('#slider-blood-pressure').CircularSlider({
  //     min: 50,
  //     max: 200,
  //     radius: 120,
  //     labelSuffix: ' mg/dl',
  //   });

  //   $('#slider-blood-sugar').CircularSlider({
  //     min: 0,
  //     max: 300,
  //     radius: 120,
  //     labelSuffix: ' mg/dl',
  //   });
  // }

  render() {
    return <SmileLayout>
      <div className="record-container">
        <TabbedArea defaultActiveKey={1}>
          <p />

          <TabPane eventKey={1} tab="Record">
            <TabbedArea defaultActiveKey={1}>

              <TabPane eventKey={1} tab="Blood Pressure">
                <Slider className="slider" id="slider-blood-pressure" />
              </TabPane>

              <TabPane eventKey={2} tab="Blood Sugar">
                <Slider className="slider" id="slider-blood-sugar" />
              </TabPane>

            </TabbedArea>
          </TabPane>

          <TabPane eventKey={2} tab="Chart">
            <Slider className="slider" id="slider-blood-zzz" />
          </TabPane>
        </TabbedArea>
      </div>
    </SmileLayout>;
  }
};