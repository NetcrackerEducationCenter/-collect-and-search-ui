import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import analytics from '../assets/analytics.jpg';
import komp from '../assets/komp.jpg';
import lupa from '../assets/lupa.jpg';
import vkomp from '../assets/v-komp.jpg';

export default class CarouselBox extends Component {
    render() {
        return (
            <Carousel>
                
                <Carousel.Item>
                    <img 
                        className="d-block w-100 h-100"
                        src={komp}
                        alt="analytics"
                    />
                    <Carousel.Caption>
                        <h3>Find issues</h3>
                        <p>We can saw answers from any ticket systems</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img 
                        className="d-block w-100 h-100"
                        src={analytics}
                        alt="analytics"
                    />
                    <Carousel.Caption>
                        <h3>Analyze text</h3>
                        <p>Founder answers will analyze for better understanding</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img 
                        className="d-block w-100 h-100"
                        src={lupa}
                        alt="analytics"
                    />
                    <Carousel.Caption>
                        <h3>Save answers </h3>
                        <p>You can save founded answers on your own history</p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        )
    }
}
