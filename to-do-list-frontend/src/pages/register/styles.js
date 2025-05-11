import styled from "styled-components";
export const Container = styled.main`
    width: 100%;
    height: 100vh; 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    background-color: #f5f2ea;
`


export const ColumnLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    background-color: #f5f2ea; 
`;

export const ColumnRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    background-color: #A3B18A;
`;

export const  Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`;


export const  Button = styled.button`
    border: none;
    border-radius: 12px;
    background-color: #FFFDF4;
    color: #A3B18A;
    display: flex;
    align-items: center;
    justify-content: center;
    width: px;
    height: 55px;
    margin: 20px 0;
    font-size: 14px;
`;

export const Img = styled.img`  
    max-width: 95%;      
    height: auto;            
    object-fit: content;   
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 376px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    width: 100%;
`

export const Text  = styled.p`
    font-weight: 700;
    font-size: 12px;
    margin: 5px;
    color: #FFFDF4;
    opacity: 50%;
` 

export const CreateText =  styled.a`
    font-weight: 700;
    font-size: 12px;
    color: #444444;
    opacity: 50%;

    &:hover {
        text-decoration: underline;
    }
`

