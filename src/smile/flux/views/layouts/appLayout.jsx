import React from 'react';
import {RouteHandler} from 'react-router';

import BaseLayout from '../../../../core/flux/views/layouts/baseLayout.jsx';

if (process.env.BROWSER) {
  require('../../../public/less/app.less');
}

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      'https://code.jquery.com/jquery-2.1.4.min.js',
      '/smile/vendor/circular-slider.min.js',
      'http://localhost:8080/js/smile/bundle.js',
      // 'http://smile.ngrok.io/js/smile/bundle.js',
    ];

    const styles = [
      'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
      '/smile/vendor/circular-slider.min.css',
      // 'http://localhost:8080/css/smile/bundle.css',
      // 'http://smile.ngrok.io/css/smile/bundle.css',
    ];

    return (
      <BaseLayout
        title="Smile"
        scripts={scripts}
        styles={styles} >
        <RouteHandler {...this.props} />
      </BaseLayout>
    );
  }
};