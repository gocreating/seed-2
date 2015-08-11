import React from 'react';
import Router from 'react-router';
import routes from '../routes';

var rootInstance = null;

Router.run(routes, Router.HistoryLocation, (Handler) => {
  // React.render(<Handler />, document);
  rootInstance = React.render(
    <Handler />,
    document.getElementById('react-container')
  );
});

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function() {
      return [rootInstance];
    },
  });
}