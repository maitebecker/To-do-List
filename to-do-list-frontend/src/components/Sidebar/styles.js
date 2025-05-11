import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 20%;
    background-color: #A3B18A;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 47px 0; 
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
`

export const User = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
`

export const UserText = styled.p`
    font-size: 20px;
    font-weight: 700
`

export const Item = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
`

export const TaskText = styled.p`
    font-size: 17px;
    font-weight: 700
`
export const Button = styled.button`
  width: 48px;
  height: 48px;
  background-color: #94a47c;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const Img = styled.img`
  width: 48px;
  height: 48px;

`