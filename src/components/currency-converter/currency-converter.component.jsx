import React, { useEffect, useReducer } from "react";

import { fetchDataFake, fetchSelectDataFake } from "../../utils.js";
import { currencyReducer, INITIAL_STATE } from "./currency.reducer";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const CurrencyConverterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  max-width: 800px;
  background-color: red;
  padding: 20px 40px;
`;

const ConvertButton = styled.button`
padding: 10px 20px;
background-color: green;
margin-top: 20px;
`

const CurrencyConverter = () => {
  const [state, dispatch] = useReducer(currencyReducer, INITIAL_STATE);
  const { input, output, options, outputBase, error } = state;

  useEffect(() => {
    const getOptions = async () => {
      const options = Object.keys(await fetchSelectDataFake());
      dispatch({ type: "setOptions", payload: options });
    };
    getOptions();
  }, []);

  const handleConvertion = async () => {
    try {
      const outputBaseRate = await fetchDataFake(outputBase);
      const result = (input * outputBaseRate).toFixed(2);
      dispatch({ type: "setOutput", payload: result });
    } catch (error) {
      dispatch({ type: "setError", payload: error });
    }
  };
  const handleChange = (e) => {
    dispatch({ type: "setInput", payload: e.target.value });
  };
  const handleSelectChange = (e) => {
    dispatch({ type: "setOutputBase", payload: e.target.value });
  };

  return (
    <PageContainer>
      <CurrencyConverterContainer>
        <h2>Euro Currency Converter </h2>
        <h2>FROM </h2>
        <div>
          <input type="text" onChange={handleChange} value={input} autoFocus />
          <select>
            <option>EUR</option>
          </select>
        </div>
        <h2>TO </h2>
        <div>
          <input type="text" readOnly value={output} />
          <select onChange={handleSelectChange}>
            <option>Select</option>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <ConvertButton onClick={handleConvertion}>CONVERT</ConvertButton>
        {error && <p>{error}</p>}
      </CurrencyConverterContainer>
    </PageContainer>
  );
};

export default CurrencyConverter;
