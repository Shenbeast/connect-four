import React, { useState } from "react";
import styled from "styled-components";
import { PLAYER_COLORS } from "../../../constants";

const CurrentPlayerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  font-size: 30px;
  margin-bottom: 25px;
`;

const CurrentPlayerToken = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: ${(props) => props.tokenColor};
`;

const CurrentPlayer = ({ currentPlayer }) => {
  const player = PLAYER_COLORS.find((player) => player.id === currentPlayer);
  return (
    <CurrentPlayerWrapper>
      <span>Current player: {player.name} </span>
      <CurrentPlayerToken tokenColor={player.color} />
    </CurrentPlayerWrapper>
  );
};

export default CurrentPlayer;
