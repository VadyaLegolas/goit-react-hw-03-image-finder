
import { ButtonLabel, ButtonStyled } from './Button.styled';

export const Button = ({ children }) => {
  return (
    <ButtonStyled type="submit">
        
      <ButtonLabel>
        {children}
      </ButtonLabel>
    </ButtonStyled>
  );
};
