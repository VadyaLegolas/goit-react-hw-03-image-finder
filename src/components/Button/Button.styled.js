import styled from 'styled-components';

export const ButtonStyled = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
/*   
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center; */
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
  }
`;

export const ButtonLabel = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`;