import styled from "styled-components";
import { useState } from "react";
// import { axiosDefaultInstance } from "api";

// 허용 가능한 확장자 목록
const ALLOW_FILE_EXTENSION = "jpg, jpeg, png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 30MB

/**
 * 파일 확장자를 검사해주는 함수                                                                                              
 * @returns true: 가능 확장자, false : 불가능 확장자
 */
const fileExtensionValid = ({ name }: { name: string }): boolean => {
  const extension = removeFileName(name);

  /**
   * 허용가능한 확장자가 있을 경우
   * ALLOW_FILE_EXTENSION 상수의 해당 확장자 첫 index 위치 값을 반환
   */
  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") {
    // 해당 if문이 수행되는 조건은
    // 1. 허용하지 않은 확장자일 경우
    // 2. 확장자가 없는 경우
    return false;
  }
  return true;
};

/**
 * .을 제거한 순수 파일 확장자를 return 해주는 함수
 */
const removeFileName = (originalFileName: string): string => {
  // 마지막 .의 위치를 구한다(마지막 .의 위치 다음이 파일 확장자를 의미함)
  const lastIndex = originalFileName.lastIndexOf(".");

  // 파일 이름에서 .이 존재하지 않는 경우
  if (lastIndex < 0) {
    return "";
  }

  // 확장자 문자열만 잘라서 소문자로 변경시킨다
  return originalFileName.substring(lastIndex + 1).toLowerCase();
};

export default function FileUpload() {
  // 업로드할 파일을 담을 state
  const [file, setFile] = useState<File>();

  /* 파일 선택 onChangeHandler
    해당 method에서는 업로드할 파일에 대해서 validation을 하고
    하고 file state에 값을 할당한다
  */
  const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) {
      return;
    }

    // 파일 확장자 체크
    if (!fileExtensionValid(files)) {
      target.value = "";
      alert(
        `업로드 가능한 확장자가 아닙니다. [가능한 확장자: ${ALLOW_FILE_EXTENSION}]`
      );
      return;
    }

    // 파일 용량 체크
    if (files.size > FILE_SIZE_MAX_LIMIT) {
      target.value = "";
      alert("업로드 가능한 최대 용량은 5MB입니다.");
      return;
    }

    // validation을 정상적으로 통과한 file
    setFile(files);
  };

  /**
   * 파일 업로드 버튼 클릭 핸들러
   * api를 호출해 file을 백엔드로 전송, 응답값에 대한 처리를 해준다
   */
  const fileUploadHandler = async () => {
    if (file !== undefined) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // axios 이용하여 백엔드로 파일 업로드 요청
        // const axiosResponse = await axiosDefaultInstance.post<
        //   ApiResponse<FileUploadResponse>
        // >("/files", formData, {
        //   headers: { "content-type": "multipart/form-data" },
        // });

        // httpStatus가 200번 구역이 아니거나
        // 서버에서 응답 코드로 성공을 주지 않았을 경우
        // if (
        // axiosResponse.status < 200 ||
        // axiosResponse.status >= 300 ||
        // axiosResponse.data.resultCode !== 0
        // )
        // {
        // throw Error(axiosResponse.data.message || "문제가 발생했습니다!");
        // }
      } catch (e) {
        alert((e as { message: string }).message);
      }
    }
  };

  return (
    <>
      <StyledInput type="file" onChange={fileUploadValidHandler} />
      <StyledBtn onClick={fileUploadHandler}>파일 업로드</StyledBtn>
    </>
  );
}

const StyledInput = styled.input`
  ::file-selector-button {
    width: 150px;
    height: 30px;
    background: #fff;
    border: 1px solid rgb(77, 77, 77);
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background: rgb(77, 77, 77);
      color: #fff;
    }
  }
`;

const StyledBtn = styled.button``;
