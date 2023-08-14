import styled from "styled-components";

interface IGradeProps {
  grade: number;
}

function getText(grade: number) {
  switch (grade) {
    case 1:
      return "애호박 흙";
    case 2:
      return "애호박 씨앗";
    case 3:
      return "애호박 새싹";
    case 4:
      return "애호박 꽃";
    case 5:
      return "애호박";
  }
}

export default function GradeText({ grade }: IGradeProps) {
  const gradeText = getText(grade);

  return <p>{gradeText}</p>;
}
