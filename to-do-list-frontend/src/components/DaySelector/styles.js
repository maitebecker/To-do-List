import styled from "styled-components";

export const DatesContainer = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;     
    padding: 1rem 0;
    max-width: 374px;
`;

export const DateItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    align-items: center;     
    padding: 1rem;
`;

export const DateButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ isActive }) => (isActive ? '40px' : '25px')};
    height: ${({ isActive }) => (isActive ? '40px' : '25px')};
    border-radius: 50%; 
    border: none;
    background-color: ${({ isActive }) => (isActive ? '#A3B18A' : '#4D4117')};
    color: #ffff;
    font-size: 13px;
    cursor: pointer;
    margin: 0.5rem 0;
`;

export const DayText = styled.p`
    color:${({ isActive }) => (isActive ? '#A3B18A' : '#4D4117')};
    font-size: 12px;
`;