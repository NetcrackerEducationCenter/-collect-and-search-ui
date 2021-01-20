import './Main.css';
import './Form.css';
import React from 'react'


class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          ticketSystem: '',
          url: '',
          email: '',
          tocken: ''
        };
    }
    
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    email = () => {
        return(
            <div>
              <label className="label-email">
                <input type="email" onChange={((event)=> this.setState({email: event.target.value}))} className="text" name="email" placeholder="Email" tabIndex="1" required />
                <span className="required">Email</span>
              </label>
            </div>
        );
    }

    url = () => {
        return(
            <div>
                <label className="label-email">
                    <input type="url" onChange={((event)=> this.setState({url: event.target.value}))} className="text" name="email" placeholder="Email" tabIndex="1" required />
                    <span className="required">URL</span>
                </label>
            </div>
        );
    }

    ticketSystem = () => {
        return(
            <div>
              <label className="label-email">
                <input type="text" onChange={((event)=> this.setState({ticketSystem: event.target.value}))} className="text" name="email" placeholder="Email" tabIndex="1" required />
                <span className="required">Ticket System</span>
              </label>
            </div>
        );
    }

    tocken = () => {
        return(
            <div>
              <label className="label-password">
                <input type="text" onChange={((event)=> this.setState({tocken: event.target.value}))} className="text" name="password" placeholder="Password" tabIndex="2" required />
                <span className="required">Tocken</span>
              </label>
            </div>
        );
    }
    
    render() {
        return (
            <form method="get" onSubmit={alert(this.state.email)} action={void(0)} id="login-form" className="login-form" autoComplete="off" role="main">
            <h1 className="a11y-hidden">Login Form</h1>

            {this.ticketSystem()}
            {this.url()}
            {this.email()}

            <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
            <label className="label-show-password" htmlFor="show-password">
              <span>Show Tocken</span>
            </label>

            {this.tocken()}

            <input type="submit"  value="Find all issues" />
            <div className="email">
            </div>
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
          </form>
        );
    }
}

export default Form;