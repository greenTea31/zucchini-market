import styled from "styled-components";
import { ChangeEvent, useCallback, useRef, useState, useEffect } from "react";
import IFileTypes from "../types/IFileTypes";

export default function DragDrop({ files, setFiles }: any) {
  // 드래그 중일 때와 아닐 때의 스타일을 구분하기 위한 state 변수
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
  const dragRef = useRef<HTMLLabelElement | null>(null);

  // 각 선택했던 파일들의 고유값 id
  const fileId = useRef<number>(0);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
          },
        ];
      }
      setFiles(tempFiles);
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: IFileTypes) => file.id !== id));
    },
    [files]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    // 4개의 이벤트에 Listener 등록 (마운트 될 때)
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    // 4개의 이벤트에 Listener 삭제 (언마운트 될 때)
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <ContainerDiv>
      <label
        className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
        htmlFor="fileUpload"
        ref={dragRef}
      >
        <ContentDiv className="DragDrop">
          <StyledSvg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
          </StyledSvg>
          <ContentP>최대 30MB 이하 jpeg, jpg, png 첨부 가능</ContentP>
          <input
            type="file"
            onChange={onChangeFiles}
            style={{ display: "none" }} // label 이용하여 구현하기 때문에 없애주기
            multiple={true} // 파일 다중선택 허용
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
      </label>
      <FileListDiv>
        {files.length > 0 &&
          files.map((file: IFileTypes) => {
            const {
              id,
              object: { name },
            } = file;

            return (
              <ImgFileDiv key={id}>
                <div>{name}</div>
                <XDiv onClick={() => handleFilterFile(id)}>X</XDiv>
              </ImgFileDiv>
            );
          })}
      </FileListDiv>
    </ContainerDiv>
  );
}
const ContainerDiv = styled.div``;

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
  height: 14rem;
  border: 2px dashed #c7c7c7;
  background-color: #f7f7f7;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  gap: 0.3rem;
`;

const FileListDiv = styled.div`
  margin-top: 1rem;
`;

const ContentP = styled.p`
  color: gray;
`;

const StyledSvg = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: #acacac;
`;

const ImgFileDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border: solid 1px black;
  padding: 1rem;
  margin-bottom: 0.4rem;
  /* border-radius: 0.4rem; */
`;

const XDiv = styled.div`
  cursor: pointer;
`;
