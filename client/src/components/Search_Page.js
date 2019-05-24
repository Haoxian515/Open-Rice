import React, { Component } from 'react';
import {connect} from "react-redux";



class Search_Page extends Component {
    constructor(props){
        super(props)
        this.state = {
            venue_ids: ""
        }
        console.log("PRINTING SEACH PAGE")
        console.log(this.state)
    }

    render(){
        return(
            <div>
                Search_Page PlaceHolder
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    // debugger
    return {
        venue_ids: reduxState.venue_ids
    }
  }
  
  export default connect(mapStateToProps, {} )(Search_Page);