import { LoadMoreButton } from './Button.styled';

export const Button = ({ children, onLoadMore }) => {
 
  return (
    <LoadMoreButton type="button" onClick={()=>{onLoadMore()}}>
      {children}
    </LoadMoreButton>
  );
};
