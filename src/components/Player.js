import React, {PropTypes} from "react";


export const Player = (props) => {
  return (<div>{props.name} - {props.chips})</div>);
};

Player.propTypes = {
  name: PropTypes.string, 
  chips: PropTypes.number
};