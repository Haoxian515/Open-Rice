import React, { Component } from 'react';
import {connect} from "react-redux";

import "./Trends.css"

class Trends extends Component{


    render(){
        return(
            <div className="trends">
                Trends place holder
            </div>
        )
    }
}

function mapStateToProps(){
    return {}
}

export default connect(mapStateToProps,{} )(Trends)
