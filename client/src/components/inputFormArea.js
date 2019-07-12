import React, { Component } from 'react';
import {connect} from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';


import axios from "axios";

import {
    getVenueIds,
    assignSearchInputs,
    getVenues,
    setRedirectState
} from "../actions/actionCreators";

import "./inputFormArea.css"

import OptionsList from "./OptionsList"


class InputFormArea extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputValue: "Brunch",
            searchArea: "San Francisco",

            queryOptions: ["Brunch", "Coffee", "Dessert", "Noodles","Dim Sum" ],
            searchAreaOptions: ["San Francisco", "Berkeley" , "San Mateo"],

            redirect: false
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    handleChange(e){
        e.preventDefault()

        // this.setState({
        //     currInputFocus:e.target.name
        // })
        if(e.target.name === "inputQ"){

            if(e.type === "change" ){
                this.setState({
                    inputValue: e.target.value
                    
                })
            }else if(e.type === "focus"){
                this.setState({
                    currInputFocus: e.target.name,
                    inputValue: ""
                })
            }
        }else{
            if(e.type === "change" ){
                this.setState({
                    searchArea: e.target.value
                    
                })
            }else if(e.type === "focus"){
                this.setState({
                    currInputFocus: e.target.name,
                    searchArea: ""
                })
            }
        }
    }

    handleSubmit(e){
        // callAPI()
        e.preventDefault()
        // console.log("Calling Api")
        this.props.assignSearchInputs(this.state.inputValue, this.state.searchArea)
        this.callAPI()

        this.setState({redirect:true})
        

    }

    callAPI() {
        // alert("input form " + this.state.inputValue)
        // e.preventDefault()
        axios.get("http://localhost:3001/api/search_restaurants", {   
            params: {
                "input": this.state.inputValue,
                "queryArea": this.state.searchArea
            }
        }).then( response => {
            this.props.getVenues(response.data)
            console.log("JUST GOT DATA")
            
            // this.props.history.push("search_result");
        })
        .catch(err => {
            console.log("ERROR: " + err)
        })
    }

    render(){

        const {redirect} = this.state;

        let inputOptions = [];
        let searchAreaOptions = [];
        
        inputOptions = this.state.queryOptions.map( option => 
            <OptionsList option={option} />
        )

        searchAreaOptions = this.state.searchAreaOptions.map( option => 
            <OptionsList option={option} />
        )

        if(redirect){
            return <Redirect to='/search_result'/>;
        }

        return(

            <div id="input-form">
                <form id="form" onClick={this.handleSubmit}>

                    <input className="input-style" type="text" name="inputQ" list="inputQ"
                            value={this.state.inputValue}
                            onChange={this.handleChange}    
                            onFocus={this.handleChange}
                    />
                    <datalist id="inputQ">
                        {inputOptions}
                    </datalist>


                    <input  className="input-style" type="text" name="searchAreaQ" list="searchAreaQ"
                            value={this.state.searchArea}
                            onChange={this.handleChange}
                            onFocus={this.handleChange}
                    />

                    <datalist id="searchAreaQ">
                        {searchAreaOptions}
                    </datalist>

                    <input className="submit-search" type="image" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-128.png" border="0" alt="Submit" />

                </form>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    // debugger
    // console.log(reduxState );

    return {
        // venue_ids: reduxState.venue_ids,
        inputValue: reduxState.inputKey
    }
  }

export default connect(mapStateToProps, {getVenues, assignSearchInputs} )(withRouter(InputFormArea));