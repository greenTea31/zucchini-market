import styled from "styled-components";
import zucchiniImg1 from "../../assets/images/1.png";
import zucchiniImg2 from "../../assets/images/2.png";
import zucchiniImg3 from "../../assets/images/3.png";
import zucchiniImg4 from "../../assets/images/4.png";
import zucchiniImg5 from "../../assets/images/5.png";

interface IGradeProps {
  grade: number;
  height: number;
  width: number;
}

function getImage(grade: number) {
  switch (grade) {
    case 1:
      return zucchiniImg1;
    case 2:
      return zucchiniImg2;
    case 3:
      return zucchiniImg3;
    case 4:
      return zucchiniImg4;
    case 5:
      return zucchiniImg5;
    default:
      return zucchiniImg5;
  }
}

export default function GradeImage({ grade, height, width }: IGradeProps) {
  const gradeImage = getImage(grade);

  return (
    <GradeImgContainer>
      <img
        src={gradeImage}
        alt={`Grade ${grade}`}
        height={height}
        width={width}
      />
    </GradeImgContainer>
  );
}

const GradeImgContainer = styled.div`
  /* display: inline-block; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
