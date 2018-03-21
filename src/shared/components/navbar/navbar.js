import React from 'react';
import {Link} from "react-router-dom";
import './navbar.css';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (

      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavbarHeader header={this.state.header} />
          </div>


          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">

              {this.state.leftLinks.map(link => {
                return <RouterLink key={link.key} link={link} listRole="presentation" />
              })}

            </ul>

            <ul className="nav navbar-nav navbar-right">
              {
                this.state.dropDown &&
                <li className="dropdown">
                  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown
                        <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    {this.state.dropDown.map(link => {
                      if (link.type === 'separator') {
                        return (<li key={link.key} role="separator" className="divider"></li>);
                      }
                      
                      if (link.type === 'action') {
                        link.onClick = link.onClick.bind(link.this);
                        return (<button  key={link.key} type="button" name="button" onClick={link.onClick}> {link.displayName}</button>)
                      }

                      return <RouterLink key={link.key} link={link} listRole="presentation" listItemRole="menuitem" />
                    })}
                  </ul>
                </li>
              }
            </ul>
          </div>

        </div>

      </nav>


    );
  }
}

class NavbarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.header;
  }

  render() {
    return (
      <Link className="navbar-brand" to={this.state.path}>{this.state.displayName}</Link>
    );
  }
}

class RouterLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <li role={this.state.listRole}>
        <Link to={this.state.link.path} role={this.state.listItemRole}>
          {this.state.link.displayName}
        </Link>
      </li>
    );
  }
}

export default NavigationBar;