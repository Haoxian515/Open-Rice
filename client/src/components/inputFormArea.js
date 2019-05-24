import React, { Component } from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';


import axios from "axios";

import {
    getVenueIds
} from "../actions/actionCreators";

import "./inputFormArea.css"

import OptionsList from "./OptionsList"


class InputFormArea extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputValue: "Coffee",
            searchArea: "San Francisco, CA",
            currInputFocus: "input-query",
            queryOptions: ["Rice", "Coffee", "Dessert"],
            searchAreaOptions: ["San Francisco, CA", "Berkeley, CA" , "San Jose, CA"]

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    handleChange(e){
        e.preventDefault()

        // this.setState({
        //     currInputFocus:e.target.name
        // })
        if(e.target.name === "input-query"){

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
        this.props.history.push("search_result");

        // this.callAPI()
        // this.props.history.push("about");
    }

    callAPI() {
        // alert("input form " + this.state.inputValue)
        // e.preventDefault()
        axios.get("http://localhost:3001/api/getdata", {   
            params: {
                "input": this.state.inputValue,
                "queryArea": this.state.searchArea
            }
        }).then( response => {
            this.props.getVenueIds(response.data)
            // console.log(response.data)
            this.props.history.push("search_result");
        }
        ).catch(err => {
            console.log("ERROR: " + err)
        })
    }

    render(){

        var queryOption;
        if(this.state.currInputFocus === "input-query"){
            queryOption = this.state.queryOptions.map( option => 
                    <OptionsList option={option} />
            )
        }else{
            queryOption = this.state.searchAreaOptions.map( option => 
                <OptionsList option={option} />
        )
        }
        return(
            <div id="input-form">
                <form id="form" onSubmit={this.handleSubmit}>
                    <label>
                    <input className="input-style" type="text" name="input-query" list="input-query"
                            value={this.state.inputValue}
                            onChange={this.handleChange}    
                            onFocus={this.handleChange}
                    />
                    </label>

                    <input  className="input-style" type="text" name="searchArea-query" list="searchArea-query"
                            value={this.state.searchArea}
                            onChange={this.handleChange}
                            onFocus={this.handleChange}
                    />

                    <datalist id={this.state.currInputFocus}>
                        {queryOption}
                    </datalist>

                    <input className="input-button" type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    // debugger
    console.log(reduxState );


    return {
        venue_ids: reduxState.venue_ids
    }
  }

export default connect(mapStateToProps, {getVenueIds} )(withRouter(InputFormArea));