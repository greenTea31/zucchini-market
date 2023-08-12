import styled from "styled-components";

export default function GoBackButton() {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: #849c80;
  margin-bottom: 1rem;
`;
