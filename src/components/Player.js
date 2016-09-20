import React, {PropTypes} from "react";


export const Player = (props) => {
  console.log("Player", props);
  return (<div>{props.player.name} - {props.player.chips}</div>);
};

Player.propTypes = {
  name: PropTypes.string,
  chips: PropTypes.number
};
