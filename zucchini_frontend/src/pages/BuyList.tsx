import styled from "styled-components";
import Search from "../components/List/Search";
import watch from "../assets/images/watch.png";

export default function BuyList() {
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

  const LowerDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  `;

  const ItemsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `;

  const ItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 16rem;
    padding: 0.7rem 0.7rem 1.7rem 0.7rem;
    margin-bottom: 1rem;
    border: solid 1px #aeb9ad;
    border-radius: 2rem;
    position: relative;
  `;

  const ReplayBtn = styled.button`
    position: absolute;
    right: 1.6rem;
    bottom: 9rem;
    width: 5.5rem;
    height: 2.5rem;
    color: white;
    background-color: red;
    border: transparent;
    border-radius: 0.4rem;
    font-size: 0.9rem;
    letter-spacing: 0.08rem;
    cursor: pointer;

    &:hover {
      background-color: transparent;
      border: solid 2px red;
      color: red;
    }
  `;

  const ItemImg = styled.img`
    border-radius: 1.5rem;
  `;

  const ItemTitle = styled.span`
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    margin: 0.4rem 0.1rem;
  `;

  const ItemContent = styled.span`
    color: gray;
    margin: 0.2rem;
  `;

  const NoticeDiv = styled.div`
    width: 100%;
    height: 6rem;
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
    margin: 0.3rem;
  `;

  const AlertSvg = styled.svg`
    color: #ff6600;
  `;

  return (
    <ContainerDiv>
      <div>
        <TitleSpan>나의 구매 목록</TitleSpan>
        <Search />
        <NoticeDiv>
          <AlertSvg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="#ff6600"
          >
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </AlertSvg>
          <AlertTitle>거래 후 주의사항 안내</AlertTitle>
          <span>영상 통화 녹화영상은 구매 후 2주 동안만 보관됩니다.</span>
        </NoticeDiv>
      </div>
      <LowerDiv>
        <ItemsContainer>
          <ItemDiv>
            <ItemImg src={watch} />
            <ReplayBtn>다시보기</ReplayBtn>
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>백조이김</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ReplayBtn>다시보기</ReplayBtn>
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>춘식이</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ReplayBtn>다시보기</ReplayBtn>
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>swan</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>seoulA209</ItemContent>
          </ItemDiv>
          <ItemDiv>
            <ItemImg src={watch} />
            <ItemTitle>
              갤럭시 워치5 PRO 골드에디션 블랙 45MM 판매합니다(미개봉)
            </ItemTitle>
            <ItemContent>365,000원</ItemContent>
            <ItemContent>김싸피</ItemContent>
          </ItemDiv>
        </ItemsContainer>
      </LowerDiv>
    </ContainerDiv>
  );
}
