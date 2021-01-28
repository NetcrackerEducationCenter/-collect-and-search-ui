import '../css/Form.css';
import React from 'react';
import '../css/Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketSystem: '234354',
      url: 'http://localhost:3000/',
      email: '234@354',
      tocken: '234354'
    };
  }

  email = () => {
    return (
      <div>
        <label className="label-email">
          <span className="required">Email</span>
          <input type="email" defaultValue="234@354" onChange={((event) => this.setState({ email: event.target.value }))} className="text" name="email" placeholder="Email" tabIndex="1" required />

        </label>
      </div>
    );
  }

  url = () => {
    return (
      <div>
        <label className="label-email">
          <span className="required">URL</span>
          <input type="url" defaultValue="http://localhost:3000/" onChange={((event) => this.setState({ url: event.target.value }))} className="text" name="email" placeholder="URL" tabIndex="1" required />

        </label>
      </div>
    );
  }

  ticketSystem = () => {
    return (
      <div>
        <label className="label-email">
          <span className="required">Ticket System</span>
          <input type="text" defaultValue="234354" onChange={((event) => this.setState({ ticketSystem: event.target.value }))} className="text" name="email" placeholder="Ticket System" tabIndex="1" required />

        </label>
      </div>
    );
  }

  tocken = () => {
    return (
      <div>
        <label className="label-password">
          <span className="required">Token</span>
          <input type="text" defaultValue="234354" onChange={((event) => this.setState({ tocken: event.target.value }))} className="text" name="password" placeholder="Token" tabIndex="2" required />

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

  doRequest = (e) => {
    e.preventDefault()
    alert("dodo");
    this.props.newRequest(
      this.state.ticketSystem,
      this.state.email,
      this.state.tocken,
      this.state.url
    );
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

            <input type="submit" value="Find all issues" onClick={e => this.doRequest(e)} />
            <div className="email"> 
            {/* forgot password */}
            </div>

            {this.drawFigure()}

          </form>
        </div>
      </div>
    );
  }
}

export default Modal;