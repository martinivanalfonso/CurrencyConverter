import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
`;

export const CurrencyConverterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  max-width: 800px;
  background-color: #FDE74C;
  padding: 20px 40px;
  border-radius: 10px;

`;

export const ConvertButton = styled.button`
padding: 10px 20px;
background-color: #9BC53D;
margin: 50px;
border: 1px solid transparent;
border-radius: 10px;
width: 60%;
cursor: pointer;

&:hover {
    border: 1px solid white;
}
`