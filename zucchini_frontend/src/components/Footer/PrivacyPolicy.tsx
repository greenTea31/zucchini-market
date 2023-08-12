import styled from "styled-components";
import Logo from "./Logo";

export default function PrivacyPolicy() {
  return (
    <ContainerDiv>
      <TitleSpan>개인정보 처리방침</TitleSpan>
      <SubSpan>애호박마켓 개인정보 처리방침</SubSpan>
      <span>
        “애호박마켓”(이하 “회사” 또는 “애호박마켓” 이라 함)은 개인정보보호법,
        정보통신망 이용촉진 및 정보보호에 관한 법률, 통신비밀보호법 등
        정보통신서비스제공자가 준수하여야 할 관련 법령상의 규정을 준수하며, 관련
        법령에 의거한 개인정보 처리방침을 정하여 이용자의 권익 보호에 최선을
        다하고 있습니다. 본 개인정보 처리방침은 회사가 제공하는 서비스 이용에
        적용되고 다음과 같은 내용을 담고 있습니다.
      </span>
      <SubSpan>개인정보 수집 및 이용 현황</SubSpan>
      <span>
        애호박마켓은 원활한 서비스 제공을 위해 다음과 같은 이용자의 개인정보를
        처리하고 있습니다.
      </span>
      <StyledTable>
        <tr>
          <StyledTh>서비스</StyledTh>
          <StyledTh>수집 및 이용목적</StyledTh>
          <StyledTh>구분</StyledTh>
          <StyledTh>수집 및 이용 항목</StyledTh>
          <StyledTh>보유 및 이용기간</StyledTh>
        </tr>
        <tr>
          <StyledTd>회원 가입</StyledTd>
          <StyledTd>
            서비스 이용을 위한 이용자 식별 이용자 개별적 통지 및 고지
          </StyledTd>
          <StyledTd>필수</StyledTd>
          <StyledTd>휴대폰번호, 닉네임, User ID</StyledTd>
          <StyledTd>
            회원탈퇴시 까지 ※ 단, 관계 법령 위반에 따른 수사, 조사 등이 진행중인
            경우에는 해당 수사, 조사 종료 시 까지 보관 하며 내부규정 혹은
            관련법령에 따라 일정기간 보관됨.
          </StyledTd>
        </tr>
        <tr>
          <StyledTd>채팅</StyledTd>
          <StyledTd>
            이용자간 채팅 서비스 제공, 중고거래 분쟁 조정, 법령이나 이용약관에
            반하여 이용자에게 피해를 줄 수 있는 잘못된 이용행위의 방지
          </StyledTd>
          <StyledTd>필수</StyledTd>
          <StyledTd>앱 내 채팅 기능을 사용한 채팅 내용</StyledTd>
          <StyledTd></StyledTd>
        </tr>
        <tr>
          <StyledTd>영상통화</StyledTd>
          <StyledTd>영상통화 서비스 시청 확인 및 서비스 제공</StyledTd>
          <StyledTd>필수</StyledTd>
          <StyledTd>닉네임, 채팅내역, 구매내역</StyledTd>
          <StyledTd></StyledTd>
        </tr>
        <tr>
          <StyledTd>고객문의</StyledTd>
          <StyledTd>
            본인확인 및 고객요청사항 처리 및 처리결과에 대한 회신
          </StyledTd>
          <StyledTd>필수</StyledTd>
          <StyledTd>
            휴대폰번호, 이메일, 상담내역 (필요시) 생년월일, 성명
          </StyledTd>
          <StyledTd>3년</StyledTd>
        </tr>
      </StyledTable>
      <span>
        애호박마켓에서 수집 및 이용되는 개인정보는 다음과 같은 경로로 수집 되고
        있습니다.
      </span>
      <SubTitleSpan>⦁ 개인정보 수집 방법</SubTitleSpan>
      <SubContentSpan>
        ∘ 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해
        동의하고 직접 정보를 입력하는 경우
      </SubContentSpan>
      <SubContentSpan>
        ∘ 고객센터를 통한 상담과정에서 앱, 메일, 전화, 팩스 등을 통해 개인정보를
        수집하는 경우
      </SubContentSpan>
      <SubContentSpan>
        ∘ 서비스 이용과정에서 이용자로부터 수집하는 경우
      </SubContentSpan>
      <span>
        애호박마켓은 원칙적으로 정해진 보유 및 이용기간에 따라 개인정보를
        처리하고 있으나, 다음의 정보에 대해서는 아래의 보존 사유에 의해 명시한
        기간 동안 보존합니다.
      </span>
      <SubTitleSpan>⦁ 회사 내부 방침에 의한 사유</SubTitleSpan>
      <StyledTable>
        <tr>
          <StyledTh>보존항목</StyledTh>
          <StyledTh>보존사유</StyledTh>
          <StyledTh>보유기간</StyledTh>
        </tr>
        <tr>
          <StyledTd>
            휴대전화번호, 이메일주소, 거래기록(판매 게시물 및 채팅내용)
          </StyledTd>
          <StyledTd>
            동일인 식별 및 중복가입방지, 휴대전화 번호 변경에 따른
            탈퇴처리로인한 계정복구요청
          </StyledTd>
          <StyledTd>6개월</StyledTd>
        </tr>
        <tr>
          <StyledTd>휴대전화번호, 기기식별값</StyledTd>
          <StyledTd>거래 관련 분쟁 해결</StyledTd>
          <StyledTd>3개월</StyledTd>
        </tr>
        <tr>
          <StyledTd>거래기록(판매 게시물 및 채팅 내용)</StyledTd>
          <StyledTd>거래 관련 사기 방지 및 분쟁 해결</StyledTd>
          <StyledTd>5년</StyledTd>
        </tr>
      </StyledTable>
      <SubTitleSpan>⦁ 관련 법령에 의한 사유</SubTitleSpan>
      <StyledTable>
        <tr>
          <StyledTh>보존항목</StyledTh>
          <StyledTh>근거법령</StyledTh>
          <StyledTh>보유기간</StyledTh>
        </tr>
        <tr>
          <StyledTd>계약 또는 청약철회 등에 관한 기록</StyledTd>
          <StyledTd>전자상거래 등에서의 소비자보호에 관한 법률</StyledTd>
          <StyledTd>5년</StyledTd>
        </tr>
        <tr>
          <StyledTd>대금결제 및 재화 등의 공급에 관한 기록</StyledTd>
          <StyledTd>전자상거래 등에서의 소비자보호에 관한 법률</StyledTd>
          <StyledTd>5년</StyledTd>
        </tr>
        <tr>
          <StyledTd>소비자의 불만 또는 분쟁처리 기록</StyledTd>
          <StyledTd>전자상거래 등에서의 소비자보호에 관한 법률</StyledTd>
          <StyledTd>3년</StyledTd>
        </tr>
        <tr>
          <StyledTd>세법이 규정하는 모든 거래에 관한 장부 및 증빙서류</StyledTd>
          <StyledTd>국세기본법</StyledTd>
          <StyledTd>5년</StyledTd>
        </tr>
        <tr>
          <StyledTd>전자금융 거래에 관한 기록</StyledTd>
          <StyledTd>전자금융거래법</StyledTd>
          <StyledTd>5년</StyledTd>
        </tr>
        <tr>
          <StyledTd>서비스 방문기록</StyledTd>
          <StyledTd>통신비밀보호법</StyledTd>
          <StyledTd>3개월</StyledTd>
        </tr>
      </StyledTable>
      <SubSpan>만 14세 미만 아동의 개인정보 처리</SubSpan>
      <span>
        애호박마켓은 법정대리인의 동의가 필요한 만14세 미만 아동에 대한 정보를
        수집 및 이용하지 않습니다.
      </span>
      <SubSpan>개인정보 파기 절차 및 방법</SubSpan>
      <span>
        이용자의 개인정보는 수집 및 이용목적이 달성되면 지체없이
        파기합니다.(여기서 ‘이용목적이 달성된 때’란 철회요청, 서비스계약 만료,
        탈퇴 시를 의미.) 다만, 회사 내부 방침 또는 관계 법령에서 정한 보관기간이
        있을 경우 일정 기간동안 보관 후 파기 됩니다.
      </span>
      <span>
        종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기하고, 전자적
        파일 형태로 저장된 기록은 재생할 수 없는 기술적 방법을 사용하여
        삭제합니다.
      </span>
      <SubSpan>장기 미이용 회원에 대한 조치</SubSpan>
      <span>
        장기 미이용회원은 애호박마켓의 서비스를 1년간 이용하지 않은 이용자를
        말합니다. 애호박마켓은 이 회원의 개인정보를 별도로 분리 보관 또는
        삭제하고 있으며, 분리 보관된 개인정보는 9년간 보관 후 지체없이
        파기합니다.
      </span>
      <SubSpan>정보주체와 법정대리인의 권리 의무 및 행사 방법</SubSpan>
      <span>
        이용자는 언제든지 개인정보를 조회하거나 수정할 수 있고 수집/이용에 대한
        동의 철회 또는 가입 해지를 요청 할 수 있습니다.
      </span>
      <span>
        서비스 내 설정 기능을 통한 변경, 가입해지(동의철회)를 위해서 아래의
        경로를 따를 수 있습니다.
      </span>
      <SubContentSpan>⦁ 개인정보 조회 : 마이페이지 - 내 정보</SubContentSpan>
      <SubContentSpan>
        ⦁ 개인정보 변경 : 마이페이지 - 내 정보 - 내 정보 수정
      </SubContentSpan>
      <SubContentSpan>
        ⦁ 동의철회 : 마이페이지 - 내 정보 - 내 정보 수정 - 탈퇴하기
      </SubContentSpan>
      <span>
        혹은 운영자에게 이메일이나 문의하기를 통해 문의주시면 지체없이 조치 해
        드리도록 하겠습니다.
      </span>
      <span>
        이용자는 법정대리인이나 위임을 받은 자 등 대리인을 통해서도 권리행사를
        하실 수 있으며, 이 경우 『개인정보 처리 방법에 관한 고시』 별지 제11호
        서식에 따른 위임장을 제출하여야 합니다.
      </span>
      <span>
        개인정보 열람 및 처리정지 요구는 「개인정보보호법」 제 35조 제4항,
        제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있으며, 개인정보의
        정정 및 삭제 요구 시 다른 법령에서 그 개인정보가 수집 대상으로 명시되어
        있는 경우에는 삭제 해 드릴 수 없습니다.
      </span>
      <span>
        애호박마켓은 정보주체 권리에 따른 열람의 요구 정정 삭제의 요구
        처리정지의 요구 시 요구를 한 이용자가 본인이거나 대리인인지 확인합니다.
      </span>
      <SubSpan>개인정보처리방침의 시행 및 변경에 관한 사항</SubSpan>
      <span>
        이 개인정보 처리방침은 2023년 6월 16일부터 시행되며 애호박마켓은
        법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로
        개인정보처리방침이 변경되는 경우 최소 7일 전부터 공지사항을 통해 변경
        사항을 고지 해드리도록 하겠습니다.
      </span>
      <Logo />
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 10rem;
  margin: 0 6rem 0 6rem;
  letter-spacing: 0.08rem;
  line-height: 1.4rem;
  gap: 0.4rem;
`;

const TitleSpan = styled.span`
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 2rem;
`;

const SubSpan = styled.span`
  font-weight: 500;
  padding: 1.9rem 0 0.8rem 0;
  font-size: 1.1rem;
`;

const StyledTable = styled.table`
  text-align: center;
  border: solid 1px black;
  padding: 1rem;
  border-collapse: collapse;
`;

const StyledTd = styled.td`
  text-align: center;
  border: 1px solid #000;
  vertical-align: top;
  vertical-align: bottom;
  vertical-align: middle;
  padding: 0.5rem;
`;

const StyledTh = styled.th`
  min-width: 6rem;
  text-align: center;
  border: 1px solid #000;
  vertical-align: top;
  vertical-align: bottom;
  vertical-align: middle;
  font-weight: 500;
`;

const SubContentSpan = styled.span`
  padding-left: 2rem;
`;

const SubTitleSpan = styled.span`
  padding-left: 1rem;
`;
