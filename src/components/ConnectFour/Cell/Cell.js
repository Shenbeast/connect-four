import React from "react";
import styled from "styled-components";

const CellWrapper = styled.button`
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.tokenColor};
  opacity: ${(props) => (props.isDroppable ? 0.75 : 1.0)};
  cursor: pointer;
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
}) => {
  const isDroppable =
    dropIndicator &&
    location.row === dropIndicator.row &&
    location.col === dropIndicator.col;

  const determineTokenColor = () => {
    if (isDroppable) {
      return players.find((player) => player.id === currentPlayer).color;
    }
    const playerFound = players.find((player) => player.id === token);
    return playerFound ? playerFound.color : "gray";
  };

  const tokenColor = determineTokenColor();

  return (
    <CellWrapper
      disabled={disabled}
      isDroppable={isDroppable}
      onClick={() => handleDropLocation(location.col, location)}
      onMouseEnter={() => determineDropLocation(location.col)}
      onMouseLeave={() => determineDropLocation(null)}
      tokenColor={tokenColor}
    ></CellWrapper>
  );
};

export default Cell;
