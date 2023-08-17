import { ReactNode, useEffect } from "react";
import styled from "styled-components";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [props.isOpen]);
  return (
    <>
      {props.isOpen && (
        <ModalOverlay onClick={props.toggle}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            {props.children}
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}

const ModalOverlay = styled.div`
  z-index: 999999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  display: block;
  background: rgb(255, 255, 255);
  width: auto;
  height: auto;
  padding: 2rem 4rem 3rem 4rem;
  border-radius: 1rem;
  margin-top: 1%;
  text-align: center;
  border: solid 5px #cde990;
  color: black;
`;
