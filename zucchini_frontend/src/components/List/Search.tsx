import styled from "styled-components";

export default function Search() {
  const SearchContainer = styled.div`
    width: 33rem;
    /* width: 100%; */
    height: 2.6rem;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    margin-top: 1rem;
  `;

  const StyledInput = styled.input`
    width: 30rem;
    padding-left: 1rem;
    border-radius: 0.4rem;
    border: transparent;
    background-color: #f4f4f4;

    &:focus {
      box-shadow: 0 0 10px #9ec4f2;
      outline: none;
      background-color: white;
    }
  `;

  const StyledButton = styled.button`
    width: 2.7rem;
    padding: 0.7rem;
    margin-left: 0.4rem;
    border: transparent;
    border-radius: 0.4rem;
    background-color: #aacb73;
  `;

  return (
    <SearchContainer>
      <StyledInput placeholder="검색어를 입력하세요.."></StyledInput>
      <StyledButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </StyledButton>
    </SearchContainer>
  );
}
