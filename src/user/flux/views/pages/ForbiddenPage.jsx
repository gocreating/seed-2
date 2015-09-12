import React from 'react';

import AppLayout from '../layouts/AppLayout.jsx';

export default class ForbiddenPage extends React.Component {
  render() {
    return <AppLayout>
      <h1>Forbidden</h1>
      <p>You don't have enough permission to access this page.</p>
    </AppLayout>;
  }
};