import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


import "./Slideshow.css"

import drone from "../assets/drone.jpg"
import image from "../assets/minced.jpg"
import image2 from "../assets/hotpot.jpg"



const Slide = ({ image }) => {

    const styles = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 60%'
      }
    

    return <div key={image} className="slide" style={styles} ></div>

}

class Slideshow extends Component{

    constructor(){
        super()
        this.state = {
            images: [image, image2, image],
            currentIndex: 0,
            translateValue: 0,
            ani: "slide-out-animation"
        }
    }
    

    goToPrevSlide = () => {
        console.log("go prev")
    }
    
    goToNextSlide = () => {
        console.log("go next")
        if(this.state.currentIndex === this.state.images.length - 1) {
            return this.setState({
              currentIndex: 0,
              translateValue: 0
            })
        }

          
        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            ani: this.state.ani ? "fade" : ""
            // translateValue: prevState.translateValue + -(this.slideWidth())
        }));
    }

    // style={{
    //     transform: `translateX(${this.state.translateValue}px)`,
    //     transition: 'transform ease-out 0.45s'
    // }}

    render(){

        setTimeout(this.goToNextSlide, 2000)

        let carousel = this.state.images.map((image, i) => (
            <Slide image={image} key={i} />
        ))         
        return(
            <div className="slider">

                <div class="slideshow-container" >

                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionEnter={true}
                        transitionLeave={false}
                    >
                        {carousel[this.state.currentIndex] }
                    </ReactCSSTransitionGroup>
                        

                </div>

            </div>
        )
    }
}

export default Slideshow;