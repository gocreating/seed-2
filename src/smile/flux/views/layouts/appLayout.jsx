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
      'http://localhost:8080/js/smile/bundle.js',
      // 'http://smile.ngrok.io/js/smile/bundle.js',
    ];

    const styles = [
      // 'http://localhost:8080/css/todo/bundle.css',
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