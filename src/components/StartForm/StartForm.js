import React from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { darken } from "../../theme/utils";

const Wrapper = styled.div`
  border-radius: 15px;
  background-color: white;
  padding: 25px;
`;

const StyledLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledInput = styled.input`
  all: unset;
  background-color: "#F4F4F4";
  &:focus {
    background-color: "#E8E8E8";
    border: 1px solid blue;
  }
  padding: 10px;
  margin-bottom: 10px;
  font-size: 24px;
  border: 1px solid lightgray;
  transition: 0.5s;
`;

const SubmitButton = styled.button`
  all: unset;
  background-color: ${(props) => (props.disabled ? "#CCCCCC" : "#0087FF")};
  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.disabled ? "#CCCCCC" : darken("#0087FF")};
  }
  color: ${(props) => (props.disabled ? "#555555" : "white")};
  border-radius: 15px;
  font-size: 24px;
  padding: 15px;
  text-align: center;
  margin-top: 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: 0.5s;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StartForm = ({ initialGameSettings, setInitialGameSettings, reset }) => {
  const rows = useInput(initialGameSettings.rows);
  const columns = useInput(initialGameSettings.columns);
  const numberPlayers = useInput(initialGameSettings.numberPlayers);
  const winCondition = useInput(initialGameSettings.winCondition);
  const buttonDisabled =
    !rows.value ||
    !columns.value ||
    !numberPlayers.value ||
    !winCondition.value;
  const handleSubmit = (e) => {
    e.preventDefault();
    setInitialGameSettings({
      rows: rows.value,
      columns: columns.value,
      numberPlayers: numberPlayers.value,
      winCondition: winCondition.value,
      started: 1,
    });
    reset();
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <StyledLabel>
          <span>Number rows (max 12)</span>
          <StyledInput
            id="rows"
            onChange={(e) => rows.handleInput(e)}
            required
            type="number"
            max="12"
            value={rows.value}
          />
        </StyledLabel>
        <StyledLabel>
          <span>Number columns (max 12)</span>
          <StyledInput
            id="cols"
            onChange={(e) => columns.handleInput(e)}
            required
            type="number"
            max="12"
            value={columns.value}
          />
        </StyledLabel>
        <StyledLabel>
          <span>Number players (2-6)</span>
          <StyledInput
            id="rows"
            onChange={(e) => numberPlayers.handleInput(e)}
            required
            type="number"
            min="2"
            max="6"
            value={numberPlayers.value}
          />
        </StyledLabel>
        <StyledLabel>
          <span>Number in a row to win</span>
          <StyledInput
            id="rows"
            onChange={(e) => winCondition.handleInput(e)}
            required
            type="number"
            value={winCondition.value}
          />
        </StyledLabel>
        <SubmitButton disabled={buttonDisabled} id="submit" type="submit">
          Start Game
        </SubmitButton>
      </StyledForm>
    </Wrapper>
  );
};

export default StartForm;
