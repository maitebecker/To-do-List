import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
    border: 1px solid #D6D6D6;
    max-width: 387px;
    max-height: 582px;
    margin: 10px;
    width: 100%;
    height: 72px;
`

export const Checkbox = styled.input`
    accent-color: #A3B18A;
    width: 20px;
    color: #ffff;
`

export const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    jutify-content: flex-start;
    align-items: center;
    width: 50%;
`

export const Time = styled.p`
    color: #000000;
    opacity: 50%;
    font-size: 13px;
    margin: 0.5rem 0;
`

export const Text = styled.p`
    color: #000000;
    opacity: 50%;
    font-size: 16px;
    margin: 0.5rem 0;

    text-decoration: ${({ isDone }) => (isDone ? 'line-through' : 'none')};
`
export const ActionArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ButtonIcon = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    margin: 0.5rem 0;
`