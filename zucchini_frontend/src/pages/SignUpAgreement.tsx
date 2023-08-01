import styled from "styled-components";
import Logo from "../components/Footer/Logo";

export default function SignUpAgreement() {
  return (
    <ContainerDiv>
      <TitleDiv>개인정보 수집 · 이용 동의서</TitleDiv>
      <hr />
      <SubContentDiv>
        <p>
          애호박마켓은 「개인정보보호법」에 의거하여, 아래와 같은 내용으로
          개인정보를 수집하고 있습니다. 귀하께서는 아래 내용을 자세히 읽어
          보시고, 모든 내용을 이해하신 후에 동의 여부를 결정해 주시기 바랍니다.
        </p>
      </SubContentDiv>
      <AgreementDiv>
        <FirstDiv>
          <SubTitleSpan>1. 개인정보의 수집 및 이용 동의서</SubTitleSpan>
          <SubSpan>
            - 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적
            이외의 용도로는 사용되지 않습니다.
          </SubSpan>
          <NumberSpan>① 개인정보 수집 항목 및 수집·이용 목적</NumberSpan>
          <NumberSubSpan>가) 수집 항목 (필수항목)</NumberSubSpan>
          <ContentP>
            - 성명(국문), 전화번호(휴대전화), 성별, 이메일, 회원가입란에 기재된
            정보 또는 신청자가 제공한 정보
          </ContentP>
          <NumberSubSpan>나) 수집 및 이용 목적</NumberSubSpan>
          <ContentP>- 애호박마켓에서 제공하는 서비스 이용</ContentP>
          <ContentP>- 애호박마켓 회원 관리</ContentP>
          <ContentP>- 화상 통화 자동녹화</ContentP>
          <ContentP>- 화상 통화 녹화영상 다시보기 제공</ContentP>
          <NumberSpan>② 개인정보 보유 및 이용기간</NumberSpan>
          <NumberSubSpan>
            - 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지
          </NumberSubSpan>
          <NumberSpan>③ 동의거부관리</NumberSpan>
          <NumberSubSpan>
            - 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를
            거부하실 권리가 있습니다. 다만, 귀하가 개인정보의 수집/이용에 동의를
            거부하시는 경우에 애호박마켓의 이용에 있어 제한을 받을 수 있음을
            알려드립니다.
          </NumberSubSpan>
        </FirstDiv>
        <SecondDiv>
          <input type="checkbox" id="agree" />
          본인은 위의 동의서 내용을 충분히 숙지하였으며, 개인정보 수집, 이용,
          제공하는 것에 동의합니다.
        </SecondDiv>
        <AgreeSubSpan>
          동의하기 버튼을 누르시면 회원가입 페이지로 이동합니다.
        </AgreeSubSpan>
        <Logo />
      </AgreementDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 10rem;
  margin: 0 6rem 11rem 6rem;
  letter-spacing: 0.08rem;
  line-height: 1.2rem;
`;

const TitleDiv = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
`;

const SubContentDiv = styled.div`
  border: solid 1px black;
  padding: 1.3rem;
  line-height: 1.4rem;
`;

const AgreementDiv = styled.div``;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const SecondDiv = styled.div`
  text-align: center;
  gap: 0.9rem;
  margin-top: 2rem;
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  font-weight: 500;
`;

const SubTitleSpan = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const SubSpan = styled.span`
  padding-left: 1rem;
`;

const NumberSpan = styled.span`
  padding-left: 2rem;
`;

const NumberSubSpan = styled.span`
  padding-left: 3rem;
`;

const ContentP = styled.p`
  padding-left: 4rem;
`;

const AgreeSubSpan = styled.div`
  text-align: center;
  color: gray;
  font-size: 0.9rem;
`;
