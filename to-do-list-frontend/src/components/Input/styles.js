import styled from 'styled-components';

export const InputContainer = styled.div`
    width: 100%;
    max-width: 400px;
    height: 30px;
    background-color: transparent;
    border:1px solid #FFFFFF;
    border-radius: 15px;

    display:flex;
    align-items: center;
    margin-bottom: 15px;
`

export const IconContainer = styled.div`
    margin-right: 10px;
`



export const InputText = styled.input`
    background-color: transparent;
    border: none;
    border-radius: 15px;
    width: 400px;
    height: 40px;
    color: #FFFFFF;
    padding: 0.8rem 1rem;

     &::placeholder {
     color: #FFFFFF;
     }

    &::-webkit-calendar-picker-indicator {
    color: #FFFFFF;
    }
`;

export const ErroText = styled.p`
   font-size: 12px;
   color: #ff0000;
   margin: 10px 0;
   
`