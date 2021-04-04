import styled from "styled-components";

export const Wrapper = styled.div``;

export const Message = styled.div`
  display: flex;
  align-items: flex-end;
  color: white;

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
