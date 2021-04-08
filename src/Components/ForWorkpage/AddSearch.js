import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { config } from '../../Config.js';


const animatedComponents = makeAnimated();

class AddSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {

            jiraChecked: false,
            jiraIssuesDate: '',
            jiraJQLRequest: '',
            jiraIssuesStatus: '',

            ftpChecked: false,
            ftpDirPath: '',
            ftpExtention: [],
            ftpDate: '',

            keywords: [],

            filters: [
                { value: 'jira', label: 'JIRA' },
                { value: 'ftp', label: 'FTP' }

            ],
            validated: false,

            checkboxChecked: false,

            checkedFilters: [],
            checkedExtensions: []
        };
    }

    /**
    * Send messages to kafka topic 'ui-search-requests'
    */
    newRequest = (e) => {
        axios.post(`${config.url}/api/request/push`, {

            "jiraChecked": this.state.jiraChecked,
            "jiraJQLRequest": this.state.jiraJQLRequest,
            "jiraIssuesDate": this.state.jiraIssuesDate,
            "jiraIssuesStatus": this.state.jiraIssuesStatus,

            "ftpChecked": this.state.ftpChecked,
            "pathToDir": this.state.ftpDirPath,
            "ftpExtention": this.state.ftpExtention,
            "ftpDate": this.state.ftpDate,

            "keywords": this.state.keywords

            // "userId": '123212321323'
        }).then(res => {
            if (res.status === 200) {
                //Return states to begin
                this.setState({
                    jiraChecked: false,
                    jiraIssuesDate: '',
                    jiraJQLRequest: '',
                    jiraIssuesStatus: '',

                    ftpChecked: false,
                    ftpDirPath: '',
                    ftpExtention: [],
                    ftpDate: '',

                    keywords: [],
                    checkboxChecked: false,

                    checkedFilters: [],
                    checkedExtensions: []
                })
                alert('Request sended');
            }
            else {
                alert('Anything went wrong!');
            }
        });
    }

    handleChange(e) {
        this.setState({ checkedFilters: e })
    }

    /**
     * Selector for sources JIRA and FTP
     * @returns JSX selector
     */
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

    /**
     * @returns JSX for FTP filters
     */
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
                        onChange={(e) =>
                            this.setState({ checkedExtensions: e })
                        }
                    />
                </Form.Group>

                <Form.Group className='required'>
                    <Form.Text className='text-muted'>Choose file date</Form.Text>
                    <Form.Control
                        type='date'
                        onChange={e => this.setState({
                            ftpDate: new Date(e.target.value).toLocaleDateString()
                        })}
                        placeholder='Enter date...'
                    />
                </Form.Group>

            </Form.Group>




        );
    }

    /**
     * @returns JSX for JIRA filters
     */
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
                                    this.setState({
                                        jiraJQLRequest: '',
                                        checkboxChecked: e.target.checked
                                    })
                                }}

                            />
                        </Form.Group>
                    </Form.Group>

                    <Form.Text className='text-muted'>JQL request</Form.Text>
                    <Form.Control
                        type='text'
                        placeholder='Enter JQL ...'
                        onChange={e => {
                            this.setState({ jiraJQLRequest: e.target.value });
                        }}
                    />
                </Form.Group>);

        } else {

            return (
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
                                this.setState({
                                    jiraIssuesStatus: '',
                                    jiraIssuesDate: '',
                                    checkboxChecked: e.target.checked
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Text className='text-muted'>Date of issue</Form.Text>
                        <Form.Control
                            type='date'
                            onChange={e => {
                                this.setState({
                                    jiraIssuesDate: new Date(e.target.value).toLocaleDateString()
                                });
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Text className='text-muted'>Status of issue</Form.Text>
                        <Form.Control
                            as='select'
                            onChange={e => {
                                this.setState({
                                    jiraIssuesStatus: e.target.value
                                });
                            }}
                        >
                            <option >None</option>
                            <option >Open</option>
                            <option >In process</option>
                            <option >Done</option>
                            <option >To Do</option>
                            <option >Cancelled</option>
                            <option >Rejected</option>
                            <option >In Review</option>
                            <option >Approved</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
            );
        }
    }

    /**
     * @param {*} filter state
     * @returns JSX filters
     */
    shawFilters = (filter) => {
        if (filter === this.state.filters[0].value) {
            return this.jiraFilters();
        }

        if (filter === this.state.filters[1].value) {
            return this.ftpFilters();
        }
    }

    /**
     * This method should send request and hide this modal window
     * @param {*} event  
     */
    validation = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.preventDefault();
            event.stopPropagation();
        
            return null;
            
        } else {
            this.newRequest();
        }

        this.setState({ validated: true });
        try{
            this.props.onHide();

        } catch(e){
            console.log(`e: `, e)
        }
    };

    render() {

        return (

            <Form noValidate validated={this.state.validated} onSubmit={this.validation}>

                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Add filters</Form.Label>
                    {this.selector()}
                </Form.Group>
                {this.state.checkedFilters === null ? '' : this.state.checkedFilters.map(v => this.shawFilters(v.value))}

                <Form.Group>
                    <Form.Label>Request</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='enter request'
                        onChange={e => {
                            this.setState({
                                keywords: e.target.value.trim().split(" ")

                            });
                        }}
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please write your request
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Button type='submit'>Add</Button>
                </Form.Group>
            </Form>

        );
    }
}

export default AddSearch;