import styled from 'styled-components'

export const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex; 
`

export const Content = styled.section`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  align-items: center;     
  margin: 0;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #444444;
  margin-top: 1.5rem;
`;

