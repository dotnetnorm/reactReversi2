import React, {PropTypes} from 'react';
import {GameBoard, Status} from "../components/GameStructure";

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      player1: {name:'Player1', chips:2},
      player2: {name:'Player2', chips:2},
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
      let board = this.state.board;
      if (board[row][column] != 0){
        if (this.state.goodLocation){
         let updateResult =  this.updateBoardForMove(board, this.state.flipLocations, this.state.currentPlayer, this.state.lastPosition);
         let currentChipCount = this.calculateChips(updateResult.board);
         let player1 = this.state.player1;
         let player2 = this.state.player2;
         player1.chips = currentChipCount.player1;
         player2.chips = currentChipCount.player2;
         this.setState({board: updateResult.board,
                        currentPlayer: updateResult.currentPlayer,
                        goodLocation: false,
                        flipLocation: [],
                        lastPosition:null,
                        player1: player1,
                        player2: player2
                    });
        }
      }
  }
  calculateChips(board){
    let player1 = 0;
    let player2 = 0;
    board.forEach((row)=>{
        row.forEach((column)=>{
          if (column == 1) player1++;
          if (column == -1) player2++;
        });
    });
    return {player1, player2};
  }

  processCurrentPosition(row, column){


      let lastPosition = this.state.lastPosition;
      let board = this.state.board;
      if (board[row][column] ==0){
      let updateResult = this.updateBoard(board, lastPosition, this.state.currentPlayer, {row: row, column: column});
      this.setState({board: updateResult.board,
                       lastPosition: updateResult.lastPosition,
                       goodLocation: updateResult.goodLocation,
                       flipLocations: updateResult.flipLocations});

      }
  }

  render(){
    return (<div>
              <div style={{float:"left", width:"200px"}}><Status player1={this.state.player1} player2={this.state.player2} /></div>
              <div style={{float:"left",minWidth:"800px"}}>
                <GameBoard board={this.state.board} clicked={this.processMove} hover={this.processCurrentPosition} />
              </div>
            </div>);
  }

  moveIsPossible (location, player, board) {
    //we need to check the 9 spots around the location

    let row = location.row;
    let column = location.column;
    let otherPlayer = player == 1 ? 2 : 1;
    let locations = this.GetPossibleFlips(location.row, location.column, player, board);

    return locations;
  }

  GetPossibleFlips (row, column, player, board) {
    let locations = [];

    locations.push(this.processNorth(row, board, column, player));
    locations.push(this.processNorthEast(row, column, board, player));
    locations.push(this.processEast(column, board, row, player));
    locations.push(this.processSouthEast(row, column, board, player));
    locations.push(this.processSouth(row, board, column, player));
    //console.log("found locations", locations);
    locations.push(this.processSouthWest(row, column, board, player));
    locations.push(this.processWest(column, board, row, player));
    locations.push(this.processNorthWest(row, column, board, player));

    return locations;
  }

  processSouthEast (currentRow, currentColumn, board, player) {
    // console.log("processing South East");
    let locations = [];
    let found = false;
    currentRow = currentRow + 1;
    currentColumn = currentColumn + 1;
    while (currentRow < 8 && currentColumn < 8) {
      let value = board[currentRow][currentColumn];
      if (value == -player) {
        locations.push({row: currentRow, column: currentColumn});
      }
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentColumn++;
      currentRow++;
    }
    if (found) return locations;
    return [];
  }

  processNorthEast (row, column, board, player) {
    let locations = [];
    let found = false;
    let currentRow = row - 1;
    let currentColumn = column + 1;

    while (currentRow > 0 && currentColumn > 0) {
      let value = board[currentRow][currentColumn];
      if (value == -player) locations.push({row: currentRow, column: currentColumn});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentRow--;
      currentColumn++;
    }

    return found ? locations : [];
  }

  processNorth (row, board, column, player) {
    let locations = [];
    let found = false;
    for (let i = row - 1; i > -1; i--) {
      let value = board[i][column];
      if (value == -player) locations.push({row: i, column: column});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  processEast (column, board, row, player) {
    let locations = [];
    let found = false;
    for (let i = column + 1; i < 8; i++) {
      let value = board[row][i];
      if (value == -player) locations.push({row: row, column: i});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  processSouth (row, board, column, player) {
    let locations = [];
    // console.log("processing south", row, column);
    let found = false;
    for (let i = row + 1; i < 8; i++) {
      let value = board[i][column];
      // console.log(`${i}:${column}-${value}, player:${player}`);
      if (value == -(player)) {
        // console.log("good location going south");
        locations.push({row: i, column: column});
      }
      if (value == player) {
        // console.log("location is player");
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  processSouthWest (row, column, board, player) {
    let locations = [];
    let found = false;
    let currentRow = row + 1;
    let currentColumn = column - 1;
    while (currentRow < 8 && currentColumn < 8) {
      let value = board[currentRow][currentColumn];
      if (value == -player) locations.push({row: currentRow, column: currentColumn});
      if (board[currentRow][currentColumn] == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentRow++;
      currentColumn--;
    }
    return found ? locations : [];
  }

  processWest (column, board, row, player) {
    let locations = [];
    let found = false;
    for (let i = column - 1; i > -1; i--) {
      let value = board[row][i];
      if (value == -player) locations.push({row: row, column: i});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
    }
    return found ? locations : [];
  }

  processNorthWest (row, column, board, player) {
    let currentRow = row - 1;
    let currentColumn = column - 1;
    let locations = [];
    let found = false;
    while (currentRow > -1 && currentColumn > -1) {
      let value = board[currentRow][currentColumn];
      if (value == -player) locations.push({row: currentRow, column: currentColumn});
      if (value == player) {
        found = true;
        break;
      }
      if (value == 0) {
        return [];
      }
      currentRow--;
      currentColumn--;
    }
    return found ? locations : [];
  }




    resetPossibleMoves (board, lastPosition) {
      console.log("reset possible moves board", board, lastPosition);
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          let value = board[r][c];
          if (value != 0 && ((value % 10) == 0)) {
            board[r][c] = -(value / 10);
          }
        }

        if (lastPosition) {

          board[lastPosition.location.row][lastPosition.location.column] = 0;
        }
      }
      console.log("Resetted Board", board);
      return board;

    }

    updateBoard (board, lastPosition, currentPlayer, location) {

      let newBoard = this.resetPossibleMoves(board, lastPosition);
      let value = board[location.row][location.column];
      let goodLocation = false;
      let locations = this.moveIsPossible(location, currentPlayer, board);

      //console.log("locations found after move is possible", locations);
      let cellsSet = 0;
      if (locations.length > 0) {
        locations.forEach((l)=> {
          l.forEach((ll)=> {
            cellsSet++;
            board[ll.row][ll.column] = currentPlayer * 10;
          });
        });
      }
      if (cellsSet > 0) {
        goodLocation = true;
        board[location.row][location.column] = currentPlayer * 10;
      }

      lastPosition = {location: location, value: value};

      return {goodLocation, board: newBoard, lastPosition, flipLocations:locations};
    }

    updateBoardForMove (board, flipLocations, currentPlayer, lastPosition) {

      flipLocations.forEach((row)=> {
        row.forEach((location)=> {
          board[location.row][location.column] = currentPlayer;
        });
      });

      board[lastPosition.location.row][lastPosition.location.column] = currentPlayer;

      currentPlayer = -1 * currentPlayer;
      return {board: board, currentPlayer: currentPlayer};
    }

}

