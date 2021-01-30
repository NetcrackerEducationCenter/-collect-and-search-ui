import React from 'react';
import axios from 'axios';

import '../css/Modal.css';
import '../css/Form.css';
// import '../css/select.css';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketSystem: 'JIRA',
      url: 'https://netcrackereducation.atlassian.net/',
      email: 'kakashka_am@mail.ru',
      tocken: 'IdBigXbJL2aIgrJhGGg2B1A8'
    };
  }

  email = () => {
    return (
      <div>
        <label className="label-email">
          <span className="required">Email</span>
          <input type="email" defaultValue="kakashka_am@mail.ru" onChange={((event) => this.setState({ email: event.target.value }))} className="text" name="email" placeholder="Email" tabIndex="1" required />

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

  ticketSystem = () => {

    // return (
    //   <form id="app-cover">
    //     <div id="select-box">
    //       <input type="checkbox" id="options-view-button" />
    //       <div id="select-button" class="brd">
    //         <div id="selected-value">
    //           <span>Select a platform</span>
    //         </div>
    //         <div id="chevrons">
    //           <i class="fas fa-chevron-up"></i>
    //           <i class="fas fa-chevron-down"></i>
    //         </div>
    //       </div>
    //       <div id="options">
    //         <div class="option">
    //           <input class="s-c top" type="radio" name="platform" value="codepen" />
    //           <input class="s-c bottom" type="radio" name="platform" value="codepen" />
    //           <i class="fab fa-codepen"></i>
    //           <span class="label">CodePen</span>
    //           <span class="opt-val">CodePen</span>
    //         </div>
    //         <div class="option">
    //           <input class="s-c top" type="radio" name="platform" value="dribbble" />
    //           <input class="s-c bottom" type="radio" name="platform" value="dribbble" />
    //           <i class="fab fa-dribbble"></i>
    //           <span class="label">Dribbble</span>
    //           <span class="opt-val">Dribbble</span>
    //         </div>
    //         <div class="option">
    //           <input class="s-c top" type="radio" name="platform" value="behance" />
    //           <input class="s-c bottom" type="radio" name="platform" value="behance" />
    //           <i class="fab fa-behance"></i>
    //           <span class="label">Behance</span>
    //           <span class="opt-val">Behance</span>
    //         </div>
    //         <div class="option">
    //           <input class="s-c top" type="radio" name="platform" value="hackerrank" />
    //           <input class="s-c bottom" type="radio" name="platform" value="hackerrank" />
    //           <i class="fab fa-hackerrank"></i>
    //           <span class="label">HackerRank</span>
    //           <span class="opt-val">HackerRank</span>
    //         </div>
    //         <div class="option">
    //           <input class="s-c top" type="radio" name="platform" value="stackoverflow" />
    //           <input class="s-c bottom" type="radio" name="platform" value="stackoverflow" />
    //           <i class="fab fa-stack-overflow"></i>
    //           <span class="label">StackOverflow</span>
    //           <span class="opt-val">StackOverflow</span>
    //         </div>
    //         <div class="option">
    //           <input class="s-c top" type="radio" name="platform" value="freecodecamp" />
    //           <input class="s-c bottom" type="radio" name="platform" value="freecodecamp" />
    //           <i class="fab fa-free-code-camp"></i>
    //           <span class="label">FreeCodeCamp</span>
    //           <span class="opt-val">FreeCodeCamp</span>
    //         </div>
    //         <div id="option-bg"></div>
    //       </div>
    //     </div>
    //   </form>
    // );

    return (
      <>
        <label className="label-email">
          <span className="required">Ticket System</span>
          <select className="custom-select table-hover" onChange={(event)=>this.setState({ticketSystem: event.target.value})}>
            <option selected value="JIRA">JIRA (new)</option>
            <option value="lime">YouTrack (new)</option>
          </select>
        </label>
      </>
    );

    // return (
    //   <div>
    //    <label className="label-email">
    //       <span className="required">Ticket System</span>
    //       <input type="text" defaultValue="JIRA" onChange={((event) => this.setState({ ticketSystem: event.target.value }))} className="text" name="email" placeholder="Ticket System" tabIndex="1" required />

    //     </label>
    //   </div>
    // );
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

  render() {
    return (
      <div className={this.props.active ? "mymodal active" : "mymodal"} onClick={() => this.props.setActive(false)}>
        <div className="modal__content" onClick={e => e.stopPropagation()}>

          <form method="get" action={void (0)} id="login-form" className="login-form" autoComplete="off" role="main">
            <h1 className="a11y-hidden">Login Form</h1>

            {this.ticketSystem()}
            {this.url()}
            {this.email()}

            <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
            <label className="label-show-password" htmlFor="show-password">
              <span>Show Tocken</span>
            </label>

            {this.tocken()}

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