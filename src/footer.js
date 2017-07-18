import React from 'react';
import './App.css';

class Footer extends React.Component {

  render() {

    return (
      <div className="footer"> Find out more:
        <br></br>
        <a href="https://www.linkedin.com/in/karuprice?trk=nav_responsive_tab_profile"><i className="fa fa-linkedin"></i></a>
        <a href="https://twitter.com/Karl_Price"><i className="fa fa-twitter"></i></a>
        <a href="https://github.com/karuprice"><i className="fa fa-github"></i></a>
      </div>
    );
  }
}

export default Footer;