import React from 'react';
import {RouteHandler} from 'react-router';

import BaseLayout from '../../../../core/flux/views/layouts/baseLayout.jsx';
import Navbar from '../../../../core/flux/views/components/navbar.jsx';

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      'https://code.jquery.com/jquery-2.1.4.min.js',
      'http://localhost:8080/js/smile/bundle.js',
    ];

    const styles = [
      // 'http://localhost:8080/css/todo/bundle.css',
    ];

    return (
      <BaseLayout
        title="Seed"
        scripts={scripts}
        styles={styles} >
        <Navbar />
        <RouteHandler {...this.props} />
      </BaseLayout>
    );
  }
};