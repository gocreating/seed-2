import React from 'react';
import BaseLayout from './baseLayout.jsx';
import Navbar from '../components/navbar.jsx';

export default class DefaultLayout extends React.Component {
  render() {
    var scripts = [
      // 'https://code.jquery.com/jquery-2.1.4.min.js',
      '/core/js/bundle.js',
      'http://localhost:3001/webpack-dev-server.js',
    ];

    var styles = [
      // '/css/main.css',
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