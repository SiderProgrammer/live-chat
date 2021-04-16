import styled from "styled-components";

export const Wrapper = styled.div``;

export const Message = styled.div`
  display: flex;
  align-items: flex-end;
  color: white;
  margin-left: 20px;
  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  & > div > img {
    width: 60px;
    height: 60px;
  }

  & > div {
    margin-left: 20px;
    border-radius: 5px;
    padding-left: 15px;
    padding-right: 15px;
    background: rgba(0, 0, 0, 0.6);
  }
`;

export const CurrentUserMessage = styled(Message)`
  flex-direction: row-reverse;
  align-self: flex-end;
  margin-right: 20px;
  & > div {
    margin-right: 20px;
    margin-left: 0px;
  }
`;
