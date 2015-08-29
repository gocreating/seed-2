import React from 'react';

import BaseLayout from '../../../../core/flux/views/layouts/BaseLayout.jsx';
import Navbar from '../../../../core/flux/views/components/Navbar.jsx';

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      '/js/user/bundle.js',
    ];

    const styles = [
      '/css/user/bundle.css',
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