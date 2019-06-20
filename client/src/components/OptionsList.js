import React from "react"

function OptionsList(props) {

    console.log(props)

    return (
            <option value = {props.option} />
        )
}

export default OptionsList;