import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  render() {
    const styles = {
      display: 'inline-block',
      padding: '15',
    };

    return <nav>
      <ul>
        {this.props.links.map((link, idx) => (
          <li key={idx} style={styles}>
            <Link to={link.to}>{link.title}</Link>
            <a href={link.to}>{link.title}</a>
          </li>
        ))}
      </ul>
    </nav>;
  }
};

Navbar.defaultProps = {
  links: [
    {title: 'Home', to: '/core'},
    {title: 'About', to: '/core/about'},
    {title: 'User', to: '/user'},
  ],
};