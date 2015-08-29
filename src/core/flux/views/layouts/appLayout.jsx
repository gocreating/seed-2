import React from 'react';

import BaseLayout from './BaseLayout.jsx';
import Navbar from '../components/Navbar.jsx';

// jscs:disable
/**
 * Ref:
 *   - http://stackoverflow.com/questions/30347722/importing-css-files-in-isomorphic-react-components
 *   - https://github.com/gpbl/isomorphic500
 */
// jscs:enable

if (process.env.BROWSER) {
  // require('../../../public/less/test.less');
  // require('../../../../../build/debug/public/css/core/bundle.css');
}

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      // 'http://localhost:7000/browser-sync/browser-sync-client.2.8.2.js',
      // 'https://code.jquery.com/jquery-2.1.4.min.js',
      '/js/core/bundle.js',
    ];

    const styles = [
      '/css/core/bundle.css',
    ];

    return (
      <BaseLayout
        title="Seed"
        scripts={scripts}
        styles={styles} >
        <Navbar />
        {this.props.children}
      </BaseLayout>
    );
  }
};