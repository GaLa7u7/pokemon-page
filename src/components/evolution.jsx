import React from "react";

const evolution = ({name, img}) => {

    return(
        <div>
            <div className="eName">{name}</div>
            <img className="eImg" src={img} alt="evolution img"/>
        </div>
    )
}

export {evolution}