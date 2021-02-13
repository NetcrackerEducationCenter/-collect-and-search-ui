import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Modal from '../Components/Modal'
import Field from '../Field';
import logo from '../assets/logo512.png';


export default class WorkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            issues: [],
            shawIssues: false,
            download: false
        }
    }

    setActive = (activeted) => {
        this.setState(() => {return{ modalActive: activeted }})
    }

    setIssuesActive = (activeted) => {
        this.setState({ shawIssues: activeted })
    }

    setIssues = (newIssues) => {
        this.setState({ issues: newIssues });
    }

    setDownload = (value) => {
        this.setState(() => { return {download: value}});
    }



    render() {
        return (
            <div>

                <Field shawIssues={this.state.shawIssues} issues={this.state.issues} setDownload={this.setDownload} />

                {/* <div className={this.state.download ? "logo active" : "logo"}>
                    <img className="App-logo" src={logo} alt="download" />
                </div> */}


                <Button className='btn-success   boto'
                    onClick={() => this.setState({ modalActive: true })}
                >
                    +
                </Button>

                <Modal active={this.state.modalActive}
                    setActive={this.setActive}
                    setIssues={this.setIssues}
                    setIssuesActive={this.setIssuesActive}
                    setDownload={this.setDownload}
                />

            </div>
        )
    }
}

// const styles = {
//     fixed_button: {
//         position: 'fixed', /*задаём тип позиции, в нашем случае - фиксированная*/
//         top: '100px',     /* отступ сверху*/
//         left: '0px',       /* отступ слева*/
//         width: '100px',    /* ширина кнопки*/
//         height: '35px',    /* высота кнопки*/
//         'z-index': '999'    /*позиция относительно дальности*/
//     }
// }
