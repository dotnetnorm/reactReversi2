import React, {PropTypes} from 'react';
import {Player} from "./Player";

export const GameStatus = (props) => {

      return (<div>
                <Player player={props.player1} />
                <Player player={props.player2} />
              </div>);
};

GameStatus.propTypes = {
  player1: PropTypes.object,
  player2: PropTypes.object
};

