import React, {PropTypes} from 'react';
import {GameBoard, Status} from "../components/GameStructure";

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      player1: {name:'', chips:0},
      player2: {name:'', chips:0},
      board: this.getBoard(),
      winner: false,
      hasMove: false,
      currentPlayer: 1,
      lastPosition: null,
      goodLocation: false,
      gameStarted:false,
      waitingForOpponent: true,
    };
    this.processMove = this.processMove.bind(this);
    this.processCurrentPosition = this.processCurrentPosition.bind(this);
  }

  getBoard(){
    let board = [];
    for(let row = 0; row < 8; row++) {
       let newRow = [];
      for(let column = 0; column < 8; column++) {
          let newColumn = 0;
          if (row == 3 && column == 3) newColumn = 1;
          if (row == 3 && column == 4) newColumn = -1;
          if (row == 4 && column == 3) newColumn = -1;
          if (row == 4 && column == 4) newColumn = 1;
          newRow.push(newColumn);
        }
        board.push(newRow);
      }
    return board;
  }

  processMove(row, column){

  }

  processCurrentPosition(row, column){
    console.log("row, board hover", row, column);
      let board = this.state.board;
      board[row[column]] = this.state.currentPlayer;
      this.setState({board: board});

  }

  render(){
    return (<div>
              <div style={{float:"left", width:"200px"}}><Status player1={this.state.player1} player2={this.state.player2} /></div>
              <div style={{float:"left",minWidth:"800px"}}>
                <GameBoard board={this.state.board} clicked={this.processMove} hover={this.processCurrentPosition} />
              </div>
            </div>);
  }





}
