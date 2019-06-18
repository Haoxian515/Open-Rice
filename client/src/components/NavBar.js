import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./NavBar.css"

//COMPONENTS
import InputFormArea from "./inputFormArea";

class NavBar extends Component{


    render(){

        return(
            <div className="nav-bar">
                <div className="nav-bar-inner">
                    <div className="nav-item">
                        <Link className="text-link" to="/"><h3>Open Rice</h3></Link>
                    </div>
                    <div className="nav-item">
                        <h3>Offers</h3>
                    </div>
                    <div className="nav-item">
                        <h3>Recipes</h3>
                    </div>
                </div>
                <InputFormArea />
            </div>
        )
    }

}

export default NavBar;