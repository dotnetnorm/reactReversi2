export const boardHelper = () => {
  let resetPossibleMoves = function (board, lastPosition) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let value = board[r][c];
        if (value != 0 && ((value % 10) == 0)) {
          board[r][c] = -(value / 10);
        }
      }

      if (lastPosition) {
          board[lastPosition.location.row][lastPosition.location.column] = lastPosition.value;
      }
    }

    return board;

  };

  let moveIsPossible = function (location, player, board) {
    //we need to check the 9 spots around the location

    let row = location.row;
    let column = location.column;
    let otherPlayer = player == 1 ? 2 : 1;
    let locations = GetPossibleFlips(location.row, location.column, player, board);

    return locations;
  };

  let GetPossibleFlips = function (row, column, player, board) {
    let locations = [];

    locations.push(processNorth(row, board, column, player));
    locations.push(processNorthEast(row, column, board, player));
    locations.push(processEast(column, board, row, player));
    locations.push(processSouthEast(row, column, board, player));
    locations.push(processSouth(row, board, column, player));
    //console.log("found locations", locations);
    locations.push(processSouthWest(row, column, board, player));
    locations.push(processWest(column, board, row, player));
    locations.push(processNorthWest(row, column, board, player));

    return locations;
  };

  let processSouthEast = function (currentRow, currentColumn, board, player) {
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
  };

  let processNorthEast = function (row, column, board, player) {
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
  };

  let processNorth = function (row, board, column, player) {
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
  };

  const processEast = function (column, board, row, player) {
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
  };

  const processSouth = function (row, board, column, player) {
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
  };

  const processSouthWest = function (row, column, board, player) {
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
  };

  const processWest = function (column, board, row, player) {
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
  };

  const processNorthWest = function (row, column, board, player) {
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
  };


  return {


    resetPossibleMoves: function (board, lastPosition) {
      //  console.log(board);
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          let value = board[r][c];
          if (value != 0 && ((value % 10) == 0)) {
            board[r][c] = -(value / 10);
          }
        }

        if (lastPosition) {

          board[lastPosition.location.row][lastPosition.location.column] = lastPosition.value;
        }
      }

      return board;

    },

    updateBoard: function (board, lastPosition, currentPlayer, location) {

      let newBoard = resetPossibleMoves(board, lastPosition);
      let value = board[location.row][location.column];
      let goodLocation = false;
      let locations = moveIsPossible(location, currentPlayer, board);

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
    },

    updateBoardForMove: function (board, flipLocations, currentPlayer, lastPosition) {

      flipLocations.forEach((row)=> {
        row.forEach((location)=> {
          board[location.row][location.column] = currentPlayer;
        });
      });

      board[lastPosition.row][lastPosition.column] = currentPlayer;

      currentPlayer = -1 * currentPlayer;
      return {board: board, currentPlayer: currentPlayer};
    }

  };
};

