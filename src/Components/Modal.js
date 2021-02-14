import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

import '../css/Modal.css';
import '../css/Form.css';

// import '../css/select.css';


const animatedComponents = makeAnimated();

class NewModal extends React.Component {
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

      filters: [
        { value: 'jira', label: 'JIRA' },
        { value: 'ftp', label: 'FTP' }

      ],

      checkedFilters: [],
      checkedExtensions: []
    };
  }

  // search = () => {
  //   return (
  //     <div>
  //       <label className="label-email">
  //         <span className="required">Search</span>
  //         <input type="text" onChange={((event) => this.setState({ request: event.target.value }))} className="text" name="email" placeholder="Type your request" tabIndex="1" required />

  //       </label>
  //     </div>
  //   );
  // }

  // url = () => {
  //   return (
  //     <div>
  //       <label className="label-email">
  //         <span className="required">URL</span>
  //         <input type="url" defaultValue="https://netcrackereducation.atlassian.net/" onChange={((event) => this.setState({ url: event.target.value }))} className="text" name="email" placeholder="URL" tabIndex="1" required />

  //       </label>
  //     </div>
  //   );
  // }

  // tocken = () => {
  //   return (
  //     <div>
  //       <label className="label-password">
  //         <span className="required">Token</span>
  //         <input type="text" defaultValue="IdBigXbJL2aIgrJhGGg2B1A8" onChange={((event) => this.setState({ tocken: event.target.value }))} className="text" name="password" placeholder="Token" tabIndex="2" required />

  //       </label>
  //     </div>
  //   );
  // }

  // drawFigure = () => {
  //   return (
  //     <figure aria-hidden="true">
  //       <div className="person-body"></div>
  //       <div className="neck skin"></div>
  //       <div className="head skin">
  //         <div className="eyes"></div>
  //         <div className="mouth"></div>
  //       </div>
  //       <div className="hair"></div>
  //       <div className="ears"></div>
  //       <div className="shirt-1"></div>
  //       <div className="shirt-2"></div>
  //     </figure>
  //   );
  // }


  handleChange(e) {
    this.setState({ checkedFilters: e })
  }

  selector = () => {

    return (
      <Form.Group>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={this.state.filters}
          isMulti
          onChange={(e) => this.setState({ checkedFilters: e })}
        />
      </Form.Group>
    );
  }


  newRequest = (e) => {
    e.preventDefault();

    // this.props.shawModal(false);
    this.props.shawDownload(true);

    var data;
    axios.post("http://142.93.122.167:9090/tickets/find", {
      ticketSystem: this.state.ticketSystem, //"JIRA",
      login: this.state.email, //"kakashka_am@mail.ru",
      password: this.state.tocken, //'IdBigXbJL2aIgrJhGGg2B1A8',
      url: this.state.url //"https://netcrackereducation.atlassian.net"
    }).then(response => {
      data = response.data;
      console.log('data: ', data);
      console.log('responce.data: ', response.data);
      this.props.setIssues(data);
      this.props.shawIssuesActive(true);
    }).catch(error => {
      console.log("request error: ", error)
    });
  }

  
  ftpFilters = () => {
    const pp = [
      { value: 'txt', label: '.txt' },
      { value: 'pdf', label: '.pdf' },
      { value: 'doc', label: '.doc' }
    ];

    return (

      <Form.Group>

        <Form.Label>FTP filters</Form.Label>

        <Form.Group>
          <Form.Text className='text-muted'>Select file extention</Form.Text>
          <Select
            closeMenuOnSelect={false}
            options={pp}
            isMulti
            components={animatedComponents}
            onChange={(e) => this.setState({ checkedExtensions: e })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Text className='text-muted'>Choose file date</Form.Text>
          <Form.Control type='date' placeholder='Enter date...' />
        </Form.Group>

      </Form.Group>


    );
  }

  jiraFilters = () => {
    return (


      <Form.Group>


        <Form.Label>JIRA filters</Form.Label>

        <Form.Group>
          <Form.Text className='text-muted'>Date of issue</Form.Text>
          <Form.Control type='date' placeholder='Enter date...' />
        </Form.Group>

        <Form.Group>
          <Form.Text className='text-muted'>Status of issue</Form.Text>
          <Form.Control as='select'>
            <option>None</option>
            <option>Done</option>
            <option>In process</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Text className='text-muted'>JQL request</Form.Text>
          <Form.Control type='text' placeholder='Enter JQL ...' />
        </Form.Group>

      </Form.Group>




    )
  }

  shawFilters = (filter) => {
    if (filter === this.state.filters[0].value) {
      return this.jiraFilters();
    }

    if (filter === this.state.filters[1].value) {
      return this.ftpFilters();
    }
  }

  doRequestAndHide = (e) => {
    this.newRequest(e);
    this.props.onHide();
  }

  render() {

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            New request
          </Modal.Title> 
        </Modal.Header> */}
        <Modal.Body>
          <Form>

            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Add filters</Form.Label>
              {this.selector()}
            </Form.Group>
            {
              this.state.checkedFilters === null ? '' : this.state.checkedFilters.map(v => this.shawFilters(v.value))
            }

            <Form.Text className='text-muted'>
              Чем подробнее тем лучше
            </Form.Text>

            <Form.Group>
              <Form.Label>Request</Form.Label>
              <Form.Control type='text' placeholder='enter request' />
            </Form.Group>


          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.doRequestAndHide}>Add</Button>
        </Modal.Footer>
      </Modal>
    );

    // return (
    //   <div className={this.props.active ? "mymodal active" : "mymodal"} onClick={() => this.props.setActive(false)}>
    //     <div className="modal__content" onClick={e => e.stopPropagation()}>

    //       <form method="get" action={void (0)} id="login-form" className="login-form" autoComplete="off" role="main">
    //         <h1 className="a11y-hidden">Login Form</h1>

    //         {this.search()}

    //         {this.selector()}

    //         {() => {
    //           if (this.state.jiraChecked) {
    //             this.jiraFilters();
    //           }
    //         }}

    //         {() => {
    //           if (this.state.ftpChecked) {
    //             this.ftpFilters();
    //           }
    //         }}

    //         {/* {this.url()} */}

    //         {/* 
    //         <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
    //         <label className="label-show-password" htmlFor="show-password">
    //           <span>Show Tocken</span>
    //         </label> */}

    //         {/* {this.tocken()} */}

    //         <input type="submit" value="Find all issues" onClick={e => this.newRequest(e)} />
    //         <div className="email">
    //           {/* forgot password */}
    //         </div>

    //         {/* {this.drawFigure()} */}

    //       </form>
    //     </div>
    //   </div>
    // );
  }
}

export default NewModal;