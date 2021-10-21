import React, { useState } from "react";
import styled from "styled-components";

import { COLUMNS, PLAYER_COLORS } from "../../constants";
import useGame from "../../hooks/useGame";
import Cell from "./Cell";
import StartForm from "../StartForm/StartForm";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #00187a;
  opacity: ${(props) => (props.gameEnded ? 0.7 : 1.0)};
  justify-content: center;
  align-items: center;
`;

const WinnerText = styled.span`
  color: black;
  font-size: 30px;
  margin-bottom: 10px;
`;

const EndWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const GameRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ConnectFour = () => {
  const [initialGameSettings, setInitialGameSettings] = useState({
    rows: 7,
    columns: 6,
    numberPlayers: 2,
    winCondition: 4,
    started: 0,
  });
  const gameStarted = initialGameSettings.started;
  const game = useGame(initialGameSettings, setInitialGameSettings);
  const { board, currentPlayer, dropIndicator, gameEnded, winner } = game.state;
  const PLAYERS = PLAYER_COLORS.slice(0, initialGameSettings.numberPlayers);
  const nextPlayer =
    PLAYERS.find((player) => player.id === currentPlayer + 1) || PLAYERS[0];

  const determineDropLocation = (hoveredColumn) => {
    if (!hoveredColumn && hoveredColumn !== 0) {
      return game.handleDrop(null);
    }
    const bottomRowIndex = initialGameSettings.rows - 1; //iterate from bottom to top to find first free spot
    for (let i = bottomRowIndex; i >= 0; i--) {
      if (board[i][hoveredColumn] === 0) {
        game.handleDrop({ col: hoveredColumn, row: i });
        break;
      }
    }
  };

  const handleDropLocation = (droppedColumn) => {
    const bottomRowIndex = initialGameSettings.rows - 1; //iterate from bottom to top to find first free spot
    const newBoard = [...board];
    let lastMove = null;
    for (let i = bottomRowIndex; i >= 0; i--) {
      if (board[i][droppedColumn] === 0) {
        newBoard[i][droppedColumn] = currentPlayer;
        lastMove = { col: droppedColumn, row: i };
        break;
      }
    }
    if (lastMove) {
      game.handleDrop(null); //remove droppable indicator before dropping piece.
      game.handleEndTurn(newBoard, lastMove, nextPlayer.id);
    }
  };

  return (
    <Wrapper>
      <h1>Connect Four</h1>
      {gameStarted ? null : (
        <StartForm
          initialGameSettings={initialGameSettings}
          setInitialGameSettings={setInitialGameSettings}
          reset={() => game.handleStartGame()}
        />
      )}
      {gameEnded ? (
        <EndWrapper>
          <WinnerText>
            {winner !== "draw"
              ? `${
                  PLAYERS.find((player) => player.id === winner).name
                } is the winner!`
              : "Draw!"}
          </WinnerText>
          <button onClick={() => game.handleRestartGame()}>Restart</button>
        </EndWrapper>
      ) : null}
      {gameStarted ? (
        <GameGrid gameEnded={gameEnded} columns={initialGameSettings.columns}>
          {board.map((row, rowIndex) => (
            <GameRow key={rowIndex}>
              {row.map((_, colIndex) => (
                <Cell
                  currentPlayer={currentPlayer}
                  determineDropLocation={determineDropLocation}
                  disabled={gameEnded}
                  dropIndicator={dropIndicator}
                  handleDropLocation={handleDropLocation}
                  key={`${rowIndex}:${colIndex}`}
                  location={{ col: colIndex, row: rowIndex }}
                  token={board[rowIndex][colIndex]}
                  players={PLAYERS}
                />
              ))}
            </GameRow>
          ))}
        </GameGrid>
      ) : null}
    </Wrapper>
  );
};

export default ConnectFour;
