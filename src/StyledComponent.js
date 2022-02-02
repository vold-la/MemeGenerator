import styled from '@emotion/styled';

export const AppStyle = styled.div`
  background-color: #efefef;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  color: #666666;
  font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderOne = styled.h1`
  padding: 2rem;
  margin: 0;
  text-align: left;
  font-size: 32px;
  font-weight: bold;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`;

export const Button = styled.button`
  margin: 0 12px 0 0;
  padding: 12px;
  background-color: #000000;
  font-size: 16px;
  border-radius: 4px;
  border: 0px;
  color: white;
  font-weight: bold;
  font-family: inherit;
  &:hover {
    color: white;
  }
`;

export const Label = styled.label`
  text-transform: uppercase;
  text-align: left;
  font-weight: bolder;
  font-size: 16px;
  margin-bottom: 12px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const Input = styled.input`
  padding: 8px;
  width: 320px;
  border: 1px solid transparent;
  border-radius: 2px;
  background-color: white;
  font-size: 16px;
  font-family: inherit;
  color: #333333;
`;

export const DropdownPosition = styled.div`
  display: flex;
  justify-content: center;
`;

export const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  max-height: 200px;
  width: 336px;
  background-color: white;
  overflow-y: scroll;
  position: absolute;
  box-shadow: 0px 8px 8px 0px #e1e1e1;
`;

export const DropdownList = styled.li`
  display: flex;
  margin: 0;
  padding: 0;
  background-color: none;
  list-style: none;
`;

export const DropdownOption = styled.button`
  display: flex;
  margin: 0;
  padding: 12px;
  width: 100%;
  font-size: 12px;
  border: 0px;
  color: black;
  background-color: #dddddd;
  font-family: inherit;
  text-align: left;
  &:hover {
    color: deeppink;
    font-weight: bolder;
    font-size: 14px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0 24px 0;
  height: 200px;
  width: 336px;
  background-color: #dddddd;
`;

export const PreviewImage = styled.img`
  max-width: 336px;
  max-height: 200px;
`;

export const HistoryItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px 0;
  font-size: 12px;
`;

export const HistoryImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  margin-right: 12px;
  width: 50px;
  height: 50px;
`;

export const HistoryImage = styled.img`
  max-width: 50px;
  max-height: 50px;
`;
