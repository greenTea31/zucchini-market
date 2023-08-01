import styled from "styled-components";
import { useState } from "react";

interface Props {
  contentImageState: {
    contentImage: File | null;
    setContentImage: Function;
  };
}

export default function ImageInputBlock({ contentImageState }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  // 부모 컴포넌트에서 내려준 contentImage state
  const { contentImage, setContentImage } = contentImageState;

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setContentImage(e.dataTransfer.files[0]);
    setIsDragging(false);
  };

  return (
    <DndBox
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      // styled components props
      // isDragging={isDragging}
    ></DndBox>
  );
}

const DndBox = styled.div``;
