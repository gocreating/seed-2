import React from 'react';
import {RouteHandler} from 'react-router';

import BaseLayout from './baseLayout.jsx';
import Navbar from '../components/navbar.jsx';

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      // 'https://code.jquery.com/jquery-2.1.4.min.js',
      'http://localhost:8080/core/js/bundle.js',
      'http://localhost:8080/webpack-dev-server.js',
      'http://localhost:7000/browser-sync/browser-sync-client.2.8.2.js',
    ];

    const styles = [
      '/core/css/core.css',
      '/user/css/user.css',
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