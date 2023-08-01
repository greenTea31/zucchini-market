import { findByRole } from "@testing-library/react";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  contentImageState: {
    contentImage: File | null;
    setContentImage: Function;
  };
}

const ImageUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...fileList,
      ]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles((prevSelectFiles) => [...prevSelectFiles, ...fileList]);
    }
  };

  const handleUpload = () => {
    // 파일 업로드를 위한 로직을 구현한다
    // 이 부분에서 선택한 파일 (selectedFile)을 서버로 전송하면 된다
    // 서버와의 통신은 axios 또는 fetch API 등을 사용하여 구현할 수 있다
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file, index) =>
        formData.append(`file${index}`, file)
      );

      // 서버로 formData를 전송하는 로직을 작성하면 된다
      // 예를 들면 axios.post('/upload', formData) 등의 형태로 사용할 수 있따

      // 파일 업로드 후에 서버로부터 응답을 처리하는 로직도 필요하며,
      // 업로드가 성공적으로 처리되었는지 여부를 사용자에게 알려주어야 한다
    }
  };

  return (
    <ContainerDiv
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      {selectedFiles.length > 0 ? (
        <SelectedDiv>
          {selectedFiles.map((file, index) => (
            <ImgDiv key={index}>
              <span>{file.name}</span>
            </ImgDiv>
          ))}
          <ImgBtn onClick={handleUpload}>사진 추가하기</ImgBtn>
        </SelectedDiv>
      ) : (
        <ContentDiv>
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
          </StyledSvg>
          <ContentP>최대 30MB 이하 jpeg, png 첨부 가능</ContentP>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <ImgBtn
            onClick={() =>
              (
                document.querySelector('input[type="file"]') as HTMLInputElement
              )?.click()
            }
          >
            사진 가져오기
          </ImgBtn>
        </ContentDiv>
      )}
    </ContainerDiv>
  );
};

const ContainerDiv = styled.div`
  height: 14rem;
  border: 2px dashed #c7c7c7;
  background-color: #f7f7f7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

const ImgDiv = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  /* display: flex;
  flex-direction: column; */
`;

const ImgBtn = styled.button`
  height: 2.5rem;
  width: 8rem;
  border-radius: 0.6rem;
  border: solid 2px black;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: black;
    border: solid 2px black;
    color: white;
  }
`;

const ContentDiv = styled.div`
  text-align: center;
`;

const ContentP = styled.p`
  color: gray;
`;

const StyledSvg = styled.svg`
  height: 2rem;
  width: 2rem;
  /* color: gray; */
  /* stroke: gray; */
  fill: #acacac;
`;

const SelectImg = styled.img`
  max-width: 10rem;
  max-height: 10rem;
`;

const SelectedDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ImageUpload;
