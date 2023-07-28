import styled from "styled-components";

export default function Footer() {
  return (
    <>
      <ContainerDiv>
        <FooterDiv>
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>문의하기</span>
        </FooterDiv>
        <Logo>ⓒ 애호박마켓</Logo>
      </ContainerDiv>
    </>
  );
}

const ContainerDiv = styled.div`
  padding: 1rem 9rem;
  margin-top: 4rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
  border-top: solid 1px lightgray;
`;

const Logo = styled.span``;

const FooterDiv = styled.span`
  display: flex;
  justify-content: space-between;
  width: 20rem;
`;
