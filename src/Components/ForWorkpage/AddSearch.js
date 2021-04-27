import React from "react";
import { Form, Input, Button, Select, Switch, DatePicker, Divider, message } from "antd";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import axios from "axios";
import { config } from "../../Config";
import { keycloak } from "../..";
import Modal from "antd/lib/modal/Modal";

const { Option } = Select;

class AddSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jiraChecked: false,
            jiraBoxChecked: false,
            jiraIssuesDate: "",
            jiraJQLRequest: "",
            jiraIssuesStatus: "",

            ftpChecked: false,
            ftpDirPath: "",
            ftpExtention: [],
            ftpDate: "",
            checkedExtensions: [],

            confChecked: false,
            confBoxChecked: false,
            confPagesDate: "",
            cql: "",

            keywords: [],

            filters: [
                "JIRA", 'FTP', 'CONFLUENCE'
            ],


            checkedFilters: [],
            sources: [
                {
                    source: 'JIRA',
                    credentials: {
                        id: 'https://jira'
                    }
                },
                {
                    source: 'CONFLUENCE',
                    credentials: {
                        id: 'https://conf'
                    }
                },
                {
                    source: 'FTP',
                    credentials: {
                        id: '21.21.21.1'
                    }
                },
            ],
            selectedSources: []
        };
    }

    layout = {
        labelCol: {
            span: 2,
        },
        wrapperCol: {
            span: 20,
        },
    };

    formRef = React.createRef();

    onSourcesChange = (value) => {
        const vs = value.map(e => {
            let data = {
                source: JSON.parse(e).sourceType,
                id: JSON.parse(e).id
            }
            return data;
        });
        this.setState({ selectedSources: vs });
        let filters = [];
        vs.forEach(e => {
            if (!filters.includes(e.source)) {
                filters.push(e.source);
            }
        });
        this.setState({ checkedFilters: filters });
    };

    /**
     * @param {*} filter state
     * @returns JSX filters
     */
    shawFilters = (filter) => {
        if (filter === this.state.filters[0]) {
            return this.jiraFilters();
        }

        if (filter === this.state.filters[1]) {
            return this.ftpFilters();
        }

        if (filter === this.state.filters[2]) {
            return this.confFilters();
        }
    }

    jiraFilters = () => {

        if (this.state.jiraBoxChecked) {
            return (
                <>
                    <Form.Item>
                        <Divider>JIRA filters</Divider>
                    </Form.Item>

                    <Form.Item label='Use JQL' name='jiraJQLCheckbox'>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={this.state.jiraBoxChecked}
                            onChange={(e) => {
                                this.setState({
                                    jiraJQLRequest: '',
                                    jiraBoxChecked: e
                                })
                            }}
                        />
                    </Form.Item>

                    <Form.Item label='JQL request' name='jiraJQL'>
                        <Input
                            placeholder='Enter JQL ...'
                            onChange={e => {
                                this.setState({ jiraJQLRequest: e.target.value });
                            }} />
                    </Form.Item>
                </>);

        } else {

            return (
                <>
                    <Form.Item>
                        <Divider>JIRA filters</Divider>
                    </Form.Item>

                    <Form.Item label='Use JQL' name='jiraJQLCheck'>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={this.state.jiraBoxChecked}
                            onChange={(e) => {
                                this.setState({
                                    jiraJQLRequest: '',
                                    jiraBoxChecked: e
                                })
                            }}
                        />
                    </Form.Item>

                    <Form.Item label='Date of issue' name='jiraIssueDate'>
                        <DatePicker
                            placeholder='enter date'
                            onChange={(value) => {
                                if (!!value) {
                                    this.setState({
                                        jiraIssuesDate: value.format('YYYY-MM-DD')
                                    });
                                } else {
                                    this.setState({
                                        jiraIssuesDate: ''
                                    });
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item label='Status of issue' name='jiraIssueStatus'>
                        <Select
                            placeholder='choose status'
                            onChange={value => {
                                this.setState({
                                    jiraIssuesStatus: value
                                });
                            }}
                        >
                            <Option key='Open'>Open</Option>
                            <Option key='In process'>In process</Option>
                            <Option key='Done'>Done</Option>
                            <Option key='To Do'>To Do</Option>
                            <Option key='Cancelled'>Cancelled</Option>
                            <Option key='Rejected'>Rejected</Option>
                            <Option key='In Review'>In Review</Option>
                            <Option key='Approved'>Approved</Option>
                        </Select>
                    </Form.Item>
                </>
            );
        }
    }

    confFilters = () => {

        if (this.state.confBoxChecked) {
            return (
                <>
                    <Form.Item>
                        <Divider>CONFLUENCE filters</Divider>
                    </Form.Item>

                    <Form.Item label='Use CQL' name='confPageCQL'>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={this.state.confBoxChecked}
                            onChange={(e) => {
                                this.setState({
                                    cql: '',
                                    confBoxChecked: e
                                })
                            }}
                        />
                    </Form.Item>

                    <Form.Item label='CQL request' name='confCQL'>
                        <Input
                            placeholder='enter CQL ...'
                            onChange={e => {
                                this.setState({ cql: e.target.value });
                            }} />
                    </Form.Item>
                </>);

        } else {

            return (
                <>
                    <Form.Item>
                        <Divider>CONFLUENCE filters</Divider>
                    </Form.Item>

                    <Form.Item label='Use CQL'>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={this.state.confBoxChecked}
                            onChange={(e) => {
                                this.setState({
                                    cql: '',
                                    confBoxChecked: e
                                })
                            }}
                        />
                    </Form.Item>

                    <Form.Item label='Date of issue'>
                        <DatePicker
                            placeholder='enter date'
                            onChange={(value) => {
                                if (!!value) {
                                    this.setState({
                                        confPagesDate: value.format('YYYY-MM-DD')
                                    });
                                } else {
                                    this.setState({
                                        confPagesDate: ''
                                    });
                                }
                            }}
                        />
                    </Form.Item>
                </>
            );
        }
    }

    /**
    * @returns JSX for FTP filters
    */
    ftpFilters = () => {
        return (

            <>

                <Form.Item>
                    <Divider>FTP filters</Divider>
                </Form.Item>

                <Form.Item label='Extention' name='ftpFileExt' >
                    <Select
                        mode="multiple"
                        placeholder='select file extention'
                        onChange={value => {
                            this.setState({ checkedExtensions: value });
                        }}
                        allowClear
                    >
                        <Option key='txt'>.txt</Option>
                        <Option key='doc'>.doc</Option>
                        <Option key='pdf'>.pdf</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Path to dir"
                    name='path'
                >
                    <Input
                        placeholder='enter files path'
                        onChange={e => {
                            this.setState({
                                ftpDirPath: e.target.value
                            });
                        }}
                    />
                </Form.Item>

                <Form.Item label='Choose file date' name='ftpfileDate'>
                    <DatePicker
                        placeholder='enter date'
                        onChange={(value) => {
                            if (!!value) {
                                this.setState({
                                    ftpDate: value.format('YYYY-MM-DD')
                                });
                            } else {
                                this.setState({
                                    ftpDate: ''
                                });
                            }
                        }}
                    />
                </Form.Item>

            </>




        );
    }

    onFinish = (values) => {
        axios.post(`${config.url}/api/request/push`, {

            "jiraChecked": this.state.jiraChecked,
            "jiraJQLRequest": this.state.jiraJQLRequest,
            "jiraIssuesDate": this.state.jiraIssuesDate,
            "jiraIssuesStatus": this.state.jiraIssuesStatus,

            "ftpChecked": this.state.ftpChecked,
            "pathToDir": this.state.ftpDirPath,
            "ftpExtention": this.state.ftpExtention,
            "ftpDate": this.state.ftpDate,

            "confChecked": this.state.confChecked,
            "confBoxChecked": this.state.confBoxChecked,
            "confPagesDate": this.state.confPagesDate,
            "cql": this.state.cql,

            "keywords": this.state.keywords,
            "userId": keycloak.tokenParsed.preferred_username,
            "selectedSources": this.state.selectedSources
        }).then(res => {
            if (res.status === 200) {
                //Return states to begin
                this.resetFieldsData();
                message.info('Request sended');
                this.props.form.resetFields();
            }
            else {
                alert('Anything went wrong!');
            }
        });
    };

    resetFieldsData = () => {
        this.setState({
            jiraChecked: false,
            jiraBoxChecked: false,
            jiraIssuesDate: "",
            jiraJQLRequest: "",
            jiraIssuesStatus: "",

            ftpChecked: false,
            ftpDirPath: "",
            ftpExtention: [],
            ftpDate: "",
            checkedExtensions: [],

            confChecked: false,
            confBoxChecked: false,
            confPagesDate: "",
            cql: "",

            keywords: [],

            checkedFilters: [],
            selectedSources: []
        });
    }

    handleCancel = () => {
        this.resetFieldsData();
        this.props.setIsModalVisible(false);
        this.props.form.resetFields();
    }

    render() {
        if (!!this.props.allSources) {
            return (
                <Modal width='70%' title="New request"
                    visible={this.props.isModalVisible}
                    onCancel={this.handleCancel}
                    bodyStyle={{ paddingBottom: 1 }}
                    footer={[
                        <Button key='back' danger ghost
                            onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key='Ok' type="primary" ghost onClick={this.onFinish}>
                            Send
                        </Button>
                    ]}
                >

                    <Form
                        layout='vertical'
                        form={this.props.form}
                        name="control-ref"
                        onFinish={this.onFinish}
                        style={{
                            border: 0,
                            boxShadow: 'none'
                        }}

                    >
                        <Divider />
                        <Form.Item label="Sources" name='sourceSelector'>
                            <Select
                                mode="multiple"
                                placeholder="Choose a sources"
                                onChange={this.onSourcesChange}
                                allowClear
                            >
                                {this.props.allSources.map((s, i) => {
                                    return <Option key={i.toString(36) + i} value={JSON.stringify(s)}>
                                        {s.id}
                                    </Option>
                                })}
                            </Select>
                        </Form.Item>

                        {this.state.checkedFilters === null ? '' : this.state.checkedFilters.map(v => this.shawFilters(v.value))}

                        {this.state.checkedFilters === null
                            ? ""
                            : this.state.checkedFilters.map((e) => this.shawFilters(e))}

                        <Form.Item
                            label="Request"
                            name='reqKeywords'
                            rules={[{
                                required: true,
                                message: 'Please input your request!'
                            }]}
                        >
                            <Input
                                placeholder='enter request'
                                onChange={e => {
                                    this.setState({
                                        keywords: e.target.value.trim().split(" ")
                                    });
                                }}
                            />
                        </Form.Item>

                        <Form.Item>

                        </Form.Item>
                    </Form>
                </Modal>
            );
        } else {
            return null;
        }
    }
}

export default AddSearch;