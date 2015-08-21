import React from 'react';
import {Link} from 'react-router';

var installedApps = require('../../../settings').installedApps;

export default class Navbar extends React.Component {
  render() {
    const styles = {
      display: 'inline-block',
      padding: '15',
    };

    return <nav>
      <ul>
        {this.props.links.map((link, idx) => {
          // return <li key={idx} style={styles}>
          //   <Link to={link.to}>{link.title}</Link>
          //   <a href={link.to}>{link.title}</a>
          // </li>;
          return <li key={idx} style={styles}>
            <a href={link.to}>{link.title}</a>
          </li>;
        })}
      </ul>
    </nav>;
  }
};

Navbar.defaultProps = {
  links: [{
    title: 'Home',
    to: `${installedApps.core && installedApps.core.pathPrefix}`,
  }, {
    title: 'About',
    to: `${installedApps.core && installedApps.core.pathPrefix}/about`
        .replace('//', '/'),
  }, {
    title: 'User',
    to: `${installedApps.user && installedApps.user.pathPrefix}`,
  }, {
    title: 'Profile',
    to: `${installedApps.user && installedApps.user.pathPrefix}/profile`,
  }, {
    title: 'Todo',
    to: `${installedApps.todo && installedApps.todo.pathPrefix}`,
  }, {
    title: 'Smile',
    to: `${installedApps.smile && installedApps.smile.pathPrefix}`,
  }, ],
};