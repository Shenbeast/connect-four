import { useReducer } from "react";

import {
  COLUMNS,
  PLAYERS,
  PLAYER_COLORS,
  ROWS,
  WIN_CONDITION,
} from "../constants";

const useGame = (initialGameSettings, setInitialGameSettings) => {
  const initialBoard = Array.from(Array(initialGameSettings.rows), () =>
    new Array(initialGameSettings.columns).fill(0)
  );
  const players = PLAYER_COLORS.slice(0, initialGameSettings.numberPlayers);
  const initialState = {
    board: initialBoard,
    currentPlayer: players[0].id,
    dropIndicator: null,
    gameEnded: false,
    winner: null,
  };

  const checkWinner = (board, currentPlayer, lastMove) => {
    //rather than iterate through the 2d array, we can just check the last move and it's surrounding (winCon - 1) tiles
    //check cols
    const rows = initialGameSettings.rows;
    const cols = initialGameSettings.columns;
    const numberToWin = initialGameSettings.winCondition;
    const surroundingToCheck = numberToWin - 1;
    let matches = 0; //counter for storing consecutive player tokens
    const boardValues = [].concat.apply([], board);
    if (!boardValues.includes(0)) {
      return "draw";
    }
    //check rows
    for (let i = 0; i < cols; i++) {
      const currentToken = board[lastMove.row][i];
      if (currentToken === currentPlayer) {
        matches++;
      } else {
        matches = 0;
      }
      if (matches === numberToWin) {
        return true;
      }
    }
    //check cols
    matches = 0;
    for (let i = 0; i < rows; i++) {
      const currentToken = board[i][lastMove.col];
      if (currentToken === currentPlayer) {
        matches++;
      } else {
        matches = 0;
      }
      if (matches === numberToWin) {
        return true;
      }
    }
    //check diagonals \
    matches = 0;
    for (let i = -surroundingToCheck; i <= surroundingToCheck; i++) {
      const row = lastMove.row + i;
      const col = lastMove.col + i;
      const currentToken = board[row] && board[row][col];
      if (currentToken === currentPlayer) {
        matches++;
      } else {
        matches = 0;
      }
      if (matches === numberToWin) {
        return true;
      }
    }

    //check diagonals /
    matches = 0;
    for (let i = -surroundingToCheck; i <= surroundingToCheck; i++) {
      const row = lastMove.row - i;
      const col = lastMove.col + i;
      const currentToken = board[row] && board[row][col];
      if (currentToken === currentPlayer) {
        matches++;
      } else {
        matches = 0;
      }
      if (matches === numberToWin) {
        return true;
      }
    }
  };

  const reducer = (state, action) => {
    const newState = { ...state };
    switch (action.type) {
      case "startGame":
        return initialState;
      case "restartGame":
        setInitialGameSettings({ ...initialGameSettings, started: 0 });
        return initialState;
      case "dropIndicator":
        newState.dropIndicator = action.dropCoordinates;
        return newState;
      case "endTurn":
        if (
          checkWinner(action.board, newState.currentPlayer, action.lastMove) ===
          true
        ) {
          newState.winner = newState.currentPlayer;
          newState.gameEnded = true;
        } else if (
          checkWinner(action.board, newState.currentPlayer, action.lastMove) ===
          "draw"
        ) {
          newState.winner = "draw";
          newState.gameEnded = true;
        }
        newState.currentPlayer = action.nextPlayer;
        newState.board = action.board;

        return newState;
      default:
        return newState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDrop = (dropCoordinates) =>
    dispatch({ dropCoordinates, type: "dropIndicator" });
  const handleEndTurn = (board, lastMove, nextPlayer) =>
    dispatch({ board, lastMove, nextPlayer, type: "endTurn" });
  const handleRestartGame = () => dispatch({ type: "restartGame" });
  const handleStartGame = () => dispatch({ type: "startGame" });

  return {
    handleDrop,
    handleEndTurn,
    handleRestartGame,
    handleStartGame,
    state,
  };
};

export default useGame;
