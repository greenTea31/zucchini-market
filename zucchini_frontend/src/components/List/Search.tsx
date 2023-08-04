import styled from "styled-components";

interface ISearch {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  getItems: () => void;
}

export default function Search({ setKeyword, getItems }: ISearch) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setKeyword(event.currentTarget.value);
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event?.preventDefault();
    getItems();
  };

  return (
    <SearchContainer>
      <StyledInput
        placeholder="검색어를 입력하세요.."
        onChange={onChange}
      ></StyledInput>
      <StyledButton onClick={onClick}>
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

const SearchContainer = styled.form`
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
  font-size: 1rem;
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
