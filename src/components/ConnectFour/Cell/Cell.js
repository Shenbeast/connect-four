import React from "react";
import styled, { keyframes } from "styled-components";

const winAnimation = keyframes`
 0% { height: 80px; width: 80px; }
 25% { height: 120px; width: 120px; }
 50% { height: 80px; width: 80px; }
 75% { height: 120px; width: 120px; }
 100% { height: 80px; width: 80px; }
`;

const winAnimationMobile = keyframes`
 0% { height: 40px; width: 40px; }
 25% { height: 80px; width: 80px; }
 50% { height: 40px; width: 40px; }
 75% { height: 80px; width: 80px; }
 100% { height: 40px; width: 40px; }
`;

const CellWrapper = styled.button`
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    animation-name: ${(props) =>
      props.winningToken ? winAnimationMobile : ""};
  }
  background-color: ${(props) => props.tokenColor};
  opacity: ${(props) => (props.isDroppable ? 0.35 : 1.0)};
  cursor: pointer;
  transition: 0.8s;
  animation-name: ${(props) => (props.winningToken ? winAnimation : "")};
  animation-duration: 2s;
  animation-iteration-count: 1;
`;

const Cell = ({
  currentPlayer,
  determineDropLocation,
  disabled,
  dropIndicator,
  handleDropLocation,
  location,
  token,
  players,
  winningMove,
}) => {
  const isDroppable =
    dropIndicator &&
    location.row === dropIndicator.row &&
    location.col === dropIndicator.col;

  const isWinningMove =
    winningMove &&
    location.row === winningMove.row &&
    location.col === winningMove.col;

  const determineTokenColor = () => {
    if (isDroppable) {
      return players.find((player) => player.id === currentPlayer).color;
    }
    const playerFound = players.find((player) => player.id === token);
    return playerFound ? playerFound.color : "white";
  };

  const tokenColor = determineTokenColor();

  return (
    <CellWrapper
      disabled={disabled}
      isDroppable={isDroppable}
      onClick={() => handleDropLocation(location.col, location)}
      onMouseEnter={() => determineDropLocation(location.col)}
      onFocus={() => determineDropLocation(location.col)}
      onMouseLeave={() => determineDropLocation(null)}
      tokenColor={tokenColor}
      winningToken={isWinningMove}
    ></CellWrapper>
  );
};

export default Cell;
