import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
  render() {
    const links = [
      {title: 'Home', to: '/'},
      {title: 'About', to: '/about'},
    ];
    return <nav>
      <ul>
        {links.map(link => (
          <li>
            <Link to={link.to}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>;
  }
};