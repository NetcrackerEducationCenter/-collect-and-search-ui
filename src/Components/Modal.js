import React from 'react';
import axios from 'axios';

import '../css/Modal.css';
import '../css/Form.css';
// import '../css/select.css';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: '',

      jiraChecked: false,
      ticketSystem: 'JIRA',
      url: 'https://netcrackereducation.atlassian.net/',
      email: 'kakashka_am@mail.ru',
      tocken: 'IdBigXbJL2aIgrJhGGg2B1A8',

      ftpChecked: false,
      ftpLogin: '',
      ftpPassword: '',
      ftpServer: '',
      ftpDirPath: '',
      ftpExtention: '',

    };
  }

  search = () => {
    return (
      <div>
        <label className="label-email">
          <span className="required">Search</span>
          <input type="text" onChange={((event) => this.setState({ request: event.target.value }))} className="text" name="email" placeholder="Type your request" tabIndex="1" required />

        </label>
      </div>
    );
  }

  url = () => {
    return (
      <div>
        <label className="label-email">
          <span className="required">URL</span>
          <input type="url" defaultValue="https://netcrackereducation.atlassian.net/" onChange={((event) => this.setState({ url: event.target.value }))} className="text" name="email" placeholder="URL" tabIndex="1" required />

        </label>
      </div>
    );
  }

  selector = () => {
    return (
      <>
        <label className="label-email">
          <span className="">Filters</span>
          <select className="custom-select table-hover" onChange={(event) => this.setState({ ticketSystem: event.target.value })}>

            <option onClick={() => {
              if (this.state.jiraChecked) {
                this.setState({ jiraChecked: false })
              } else {
                this.setState({ jiraChecked: true })
              }
            }}
              value="JIRA"> Add JIRA filters
            </option>

            <option onClick={() => {
              if (this.state.ftpChecked) {
                this.setState(() => { return { ftpChecked: false } })
              } else {
                this.setState(() => { return { ftpChecked: true } })
              }
            }}
              value="FTP"> Add FTP filters
            </option>

          </select>
        </label>
      </>
    );
  }

  tocken = () => {
    return (
      <div>
        <label className="label-password">
          <span className="required">Token</span>
          <input type="text" defaultValue="IdBigXbJL2aIgrJhGGg2B1A8" onChange={((event) => this.setState({ tocken: event.target.value }))} className="text" name="password" placeholder="Token" tabIndex="2" required />

        </label>
      </div>
    );
  }

  drawFigure = () => {
    return (
      <figure aria-hidden="true">
        <div className="person-body"></div>
        <div className="neck skin"></div>
        <div className="head skin">
          <div className="eyes"></div>
          <div className="mouth"></div>
        </div>
        <div className="hair"></div>
        <div className="ears"></div>
        <div className="shirt-1"></div>
        <div className="shirt-2"></div>
      </figure>
    );
  }

  newRequest = (e) => {
    e.preventDefault();

    this.props.setActive(false);
    this.props.setDownload(true);

    var data;
    axios.post("http://142.93.122.167:9090/tickets/find", {
      //body: {
      ticketSystem: this.state.ticketSystem, //"JIRA",
      login: this.state.email, //"kakashka_am@mail.ru",
      password: this.state.tocken, //'IdBigXbJL2aIgrJhGGg2B1A8',
      url: this.state.url //"https://netcrackereducation.atlassian.net"
      //}
      //accept: "application/json"
    }).then(response => {
      data = response.data;
      console.log('data: ', data);
      console.log('responce.data: ', response.data);
      this.props.setIssues(data);
      this.props.setActive(false);
      this.props.setIssuesActive(true);
    }).catch(error => {
      console.log("request error: ", error)
    });
  }

  ftpFilters = () => {
    return (
      <div>
        <div>
          <div>

            <label className="label-email">
              <span className="required">Directory path</span>
              <input type="text"
                onChange={(event) => this.setState(() => { return { request: event.target.value } })}
                className="text"
                name="email"
                placeholder="Type your request"
                tabIndex="1" required

              />
            </label>

          </div>
        </div>
      </div>
    )
  }

  jiraFilters = () => {
    return (
      <div>
        JIRA FILTERS
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.active ? "mymodal active" : "mymodal"} onClick={() => this.props.setActive(false)}>
        <div className="modal__content" onClick={e => e.stopPropagation()}>

          <form method="get" action={void (0)} id="login-form" className="login-form" autoComplete="off" role="main">
            <h1 className="a11y-hidden">Login Form</h1>

            {this.search()}

            {this.selector()}

            {() => {
              if (this.state.jiraChecked) {
                this.jiraFilters();
              }
            }}

            {() => {
              if (this.state.ftpChecked) {
                this.ftpFilters();
              }
            }}

            {/* {this.url()} */}

            {/* 
            <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
            <label className="label-show-password" htmlFor="show-password">
              <span>Show Tocken</span>
            </label> */}

            {/* {this.tocken()} */}

            <input type="submit" value="Find all issues" onClick={e => this.newRequest(e)} />
            <div className="email">
              {/* forgot password */}
            </div>

            {/* {this.drawFigure()} */}

          </form>
        </div>
      </div>
    );
  }
}

export default Modal;