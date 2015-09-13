import React from 'react';

import BaseLayout from '../../../../core/flux/views/layouts/BsBaseLayout.jsx';

export default class DefaultLayout extends React.Component {
  render() {
    const scripts = [
      'https://code.jquery.com/jquery-2.1.4.min.js',
      '/js/todo/bundle.js',
    ];

    const styles = [
    ];

    return (
      <BaseLayout
        title="Seed"
        scripts={scripts}
        styles={styles} >
        {this.props.children}
      </BaseLayout>
    );
  }
};