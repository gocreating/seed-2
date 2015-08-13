import React from 'react';
import {RouteHandler} from 'react-router';

import BaseLayout from './baseLayout.jsx';
import Navbar from '../components/navbar.jsx';

// jscs:disable
/**
 * Ref:
 *   - http://stackoverflow.com/questions/30347722/importing-css-files-in-isomorphic-react-components
 *   - https://github.com/gpbl/isomorphic500
 */
// jscs:enable

if (process.env.BROWSER) {
  require('../../../public/less/test.less');
  // require('../../../../../build/debug/public/css/core/bundle.css');
}

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      // 'https://code.jquery.com/jquery-2.1.4.min.js',
      'http://localhost:8080/js/core/bundle.js',
      'http://localhost:8080/webpack-dev-server.js',
      // 'http://localhost:7000/browser-sync/browser-sync-client.2.8.2.js',
    ];

    const styles = [
      // 'http://localhost:8080/css/core/bundle.css',
      // 'http://localhost:8080/css/user/bundle.css',
    ];

    const navLinks = [
      {title: 'Home', to: '/'},
      {title: 'About', to: '/about'},
    ];

    return (
      <BaseLayout
        title="Seed"
        scripts={scripts}
        styles={styles} >
        <Navbar
          links={navLinks} />
        <RouteHandler/>
      </BaseLayout>
    );
  }
};