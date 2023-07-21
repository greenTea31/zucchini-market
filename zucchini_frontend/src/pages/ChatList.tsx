import styled from "styled-components";

export default function ChatList() {
  const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5rem;
    margin: 0 6rem 13rem 6rem;
    font-family: "IBM Plex Sans KR", sans-serif;
  `;

  const TitleSpan = styled.span`
    font-size: 2.5rem;
    font-weight: 500;
  `;
  return (
    <ContainerDiv>
      <TitleSpan>나의 채팅 목록</TitleSpan>
    </ContainerDiv>
  );
}
