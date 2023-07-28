import styled from "styled-components";
import watch from "../assets/images/watch.png";
import female from "../assets/images/female.jpg";
import Modal from "../components/Common/Modal";
import { useState } from "react";
import Calendar from "react-calendar";
import GoBackButton from "../components/Button/GoBackButton";

export default function ItemDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ContainerDiv>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalDiv>
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </StyledSvg>
        </ModalDiv>
        <ModalSpan>화상통화 일정 선택</ModalSpan>
        <SubSpan>일정은 하루만 선택 가능합니다</SubSpan>
        <CalendarDiv>
          <Calendar
            formatDay={(locale, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
        </CalendarDiv>
        <StyledBtn>확인</StyledBtn>
        <StyledBtn>취소</StyledBtn>
      </Modal>
      <GoBackButton />
      <SvgButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="red"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </SvgButton>
      <UpperDiv>
        <UpperLeftDiv>
          <StyledImg src={watch}></StyledImg>
        </UpperLeftDiv>
        <UpperRightDiv>
          <CategorySpan>전자제품</CategorySpan>
          <TitleSpan>갤럭시북2 프로 360 32GB, 1TB 최고 사양</TitleSpan>
          <ContentSpan>
            갤럭시북2 프로 360(NT950QED-KD72S) 최고 사양 풀박스 판매합니다. -
            CPU: 코어 i7-1260P(12세대) - 화면크기: 15.6인치 - RAM: 32GB - SSD:
            NVMe 1TB - GPU: Iris Xe Graphics - 운영체제: Windows 11 Home - 기타:
            360도 회전, 터치스크린, S펜 등 - 최초 활성화: 2022.10.16 - 배터리:
            100% - 구성품: 풀박스(젠더, 파우치, 마우스, S펜 등) 한글 2022 정품,
            MS Office 2021 정품, V3 정품 설치되어 있고, 바이오스 등 모든
            프로그램 업데이트 후 보관 중입니다. 설치된 프로그램은 원하시면 추후
            메일로 보내드립니다. 프로그램 가격만해도 상당한 가격이며, 바닥에
            거슬리지 않는 약간의 눌림(?)있습니다. 크게 거슬리지는 않지만 혹시나
            교체비용 생각해서 가격 정했습니다. 13세대 동일 기종보다 RAM이 커서
            작업속도 더 빠르고 강력합니다. 직거래, 택배거래, 안전거래 모두
            가능합니다.
          </ContentSpan>
          <PriceSpan>1,370,000원</PriceSpan>
          <SubSpan>8분 전 · 조회 5 · 찜 0</SubSpan>
          <SubSpan>
            신고하기
            <RedSvg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 24"
              stroke-width="1.5"
              stroke="red"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </RedSvg>
          </SubSpan>
          <SelectBtn>채팅하기</SelectBtn>
          <SelectBtn onClick={toggle}>일정 선택하기</SelectBtn>
        </UpperRightDiv>
      </UpperDiv>
      <LowerDiv>
        <LowerLeftDiv>
          <AlertSvg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="#ff6600"
          >
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </AlertSvg>
          <AlertTitle>거래 전 주의사항 안내</AlertTitle>
          <NoticeSpan>판매자가 별도의 메신저로 결제링크를 보내거나</NoticeSpan>
          <NoticeSpan>직거래(직접송금)을 유도하는 경우</NoticeSpan>{" "}
          <NoticeSpan>사기일 가능성이 높으니 거래를 자제해주시고</NoticeSpan>
          <NoticeSpan>신고하기 버튼을 눌러 신고해주시기 바랍니다.</NoticeSpan>
        </LowerLeftDiv>
        <LowerRightDiv>
          <SellerTitle>판매자 정보</SellerTitle>
          <SellerDiv>
            <SellerImg src={female}></SellerImg>
            <SellerSpanDiv>
              <SellerName>백조이김</SellerName>
              <span>Lv.1 애호박씨앗</span>
              <SubSpan>판매중 3 · 거래완료 2</SubSpan>
            </SellerSpanDiv>
            <SelectDiv>
              <StatusSelect>
                <option>판매중</option>
                <option>예약중</option>
                <option>판매완료</option>
              </StatusSelect>
            </SelectDiv>
          </SellerDiv>
        </LowerRightDiv>
      </LowerDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem;
  margin: 0 10rem 13rem 10rem;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const StyledSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: #849c80;
  margin-bottom: 1rem;
`;

const RedSvg = styled.svg`
  height: 1rem;
  width: 1rem;
`;

const UpperDiv = styled.div`
  height: 35rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LowerDiv = styled.div`
  display: flex;
  height: 11rem;
`;

const LowerLeftDiv = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d8d8d8;
  border-radius: 0.4rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AlertTitle = styled.span`
  font-weight: 700;
  font-size: 1rem;
  margin: 0.3rem 0 0.6rem 0;
`;

const AlertSvg = styled.svg`
  color: #ff6600;
`;

const LowerRightDiv = styled.div`
  width: 50%;
  height: 9.4rem;
  padding: 1rem 1rem 0 1rem;
  margin-top: 1.5rem;
`;

const UpperLeftDiv = styled.div`
  width: 50%;
`;

const UpperRightDiv = styled.div`
  width: 50%;
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`;

const CategorySpan = styled.span`
  font-size: 0.9rem;
`;

const TitleSpan = styled.span`
  height: 4.6rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.3rem;
  margin: 0.5rem 0;
`;

const ContentSpan = styled.span`
  line-height: 1.3rem;
  margin-bottom: 1.5rem;
  height: 13.6rem;
`;

const PriceSpan = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SubSpan = styled.span`
  color: gray;
  margin-bottom: 0.5rem;
`;

const SelectBtn = styled.button`
  height: 3rem;
  background-color: #cde990;
  border: transparent;
  color: #254021;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-top: 0.15rem;
`;

const NoticeSpan = styled.span`
  margin-bottom: 0.3rem;
`;

const SellerDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding-left: 1rem;
`;

const SellerImg = styled.img`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 5rem;
  border: solid 1px black;
  margin-top: 1rem;
`;

const SellerSpanDiv = styled.div`
  width: 50%;
  height: 8.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
  gap: 0.8rem;
`;

const SellerTitle = styled.span`
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
  padding-left: 1rem;
`;

const SellerName = styled.span`
  font-weight: 700;
`;

const ModalDiv = styled.div`
  float: right;
`;

const ModalSpan = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 0.5rem;
`;

const CalendarDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledBtn = styled.button`
  width: 9rem;
  height: 2.5rem;
  background-color: #cde990;
  border: solid 1px #cde990;
  border-radius: 0.4rem;
  cursor: pointer;
  margin-right: 0.4rem;

  &:hover {
    background-color: white;
  }
`;

const SvgButton = styled.button`
  position: absolute;
  right: 17rem;
  height: 3rem;
  width: 3rem;
  background-color: white;
  border: solid 2px #d3d2d2;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const StatusSelect = styled.select`
  height: 3rem;
  width: 7rem;
  padding-left: 1rem;
  border-radius: 0.4rem;
  font-size: 1rem;
`;

const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;
