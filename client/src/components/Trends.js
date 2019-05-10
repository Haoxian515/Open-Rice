import React, { Component } from 'react';
import {connect} from "react-redux";

import "./Trends.css"

import image from "../assets/matcha.jpg"



class Trends extends Component{


    render(){
        return(
            <div className="trends" >
                <img className="trend-img" src={image} 
                    alt={image}
                />
            </div>
        )
    }
}

function mapStateToProps(){
    return {}
}

export default connect(mapStateToProps,{} )(Trends)
