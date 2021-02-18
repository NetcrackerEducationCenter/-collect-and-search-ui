import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import '../css/Modal.css';
import '../css/Form.css';
import "react-datepicker/dist/react-datepicker.css";


const animatedComponents = makeAnimated();

class AddSearchModal extends React.Component {
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

      checkboxChecked: false,

      checkedFilters: [],
      checkedExtensions: []
    };
  }

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

        <Form.Group className='required'>
          <Form.Text className='text-muted'>Choose file date</Form.Text>
          <Form.Control type='date' placeholder='Enter date...' />
          <DatePicker  />
        </Form.Group>

      </Form.Group>


    );
  }

  jiraFilters = () => {

    if (this.state.checkboxChecked) {
      return (
        <Form.Group>

          <Form.Group>
            <Form.Label>JIRA filters</Form.Label>
            <Form.Group>
              <Form.Check
                type='switch'
                id="custom-switch"
                defaultChecked={this.state.checkboxChecked}
                label='Use JQL'
                className='left'
                controlId="formBasicCheckbox"
                onChange={(e) => {
                  this.setState({ checkboxChecked: e.target.checked })
                }}

              />
            </Form.Group>
          </Form.Group>

          <Form.Text className='text-muted'>JQL request</Form.Text>
          <Form.Control type='text' placeholder='Enter JQL ...' />
        </Form.Group>);
    }
    else {
      return (

        <Form.Group>
          <Form.Group>
            <Form.Label>JIRA filters</Form.Label>

            <Form.Group>

              <Form.Check
                type='switch'
                id="custom-switch"
                label='Use JQL'
                className='left'
                controlId="formBasicCheckbox"
                onChange={(e) => {
                  this.setState({ checkboxChecked: e.target.checked })
                }}

              />

            </Form.Group>

          </Form.Group>

          <Form.Group>
            <Form.Text className='text-muted'>Date of issue</Form.Text>
            <Form.Control type='date' language='en' value='DD/MM/YYYY' placeholder='DD.MM.YYYY' />
          </Form.Group>

          <Form.Group>
            <Form.Text className='text-muted'>Status of issue</Form.Text>
            <Form.Control as='select'>
              <option>None</option>
              <option>Done</option>
              <option>In process</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>
      );
    }
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
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
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
  }
}

export default AddSearchModal;