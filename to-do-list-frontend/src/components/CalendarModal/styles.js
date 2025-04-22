import styled from "styled-components";


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`

export const Button = styled.button`
    background-color: #A3B18A;
    color: #ffff;
    border: none;
    border-radius: 10px;
    height: 30px;
`