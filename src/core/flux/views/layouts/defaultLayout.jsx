import React from 'react';
import {RouteHandler} from 'react-router';

import BaseLayout from './baseLayout.jsx';
import Navbar from '../components/navbar.jsx';

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      // 'https://code.jquery.com/jquery-2.1.4.min.js',
      'http://localhost:3001/core/js/bundle.js',
      'http://localhost:3001/webpack-dev-server.js',
    ];

    const styles = [
      // '/css/main.css',
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