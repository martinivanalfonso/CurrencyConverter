import React, { useEffect, useReducer } from 'react'

import {fetchDataFake, fetchSelectDataFake} from '../../utils.js'
import { currencyReducer, INITIAL_STATE } from './currency.reducer'

const CurrencyConverter = () => {
    const [state, dispatch] = useReducer(currencyReducer, INITIAL_STATE)
    const { input, output, options, base, error } = state

    const handleConvertion = async() => {
        try {
           const outputBase = await fetchDataFake(base)
            const result = ((input * outputBase).toFixed(2))
            dispatch({ type: 'setOutput', payload: result})
        } catch (error) {
            dispatch({ type: 'setError', payload: error})
        }
    }
    const handleChange = e => {
        dispatch({ type: 'setInput', payload: e.target.value })
    }
    const handleSelectChange = e => {
        dispatch({ type: 'setBase', payload: e.target.value })
    }

    useEffect( () => {
        const getOptions = async () => {
            const options = Object.keys(await fetchSelectDataFake())
            dispatch({ type: 'setOptions', payload: options })

        }
        getOptions()
    },[])

    return(
        <div>
            <h2>Currency Converter </h2>
            <h2>FROM </h2>
            <input type='text' onChange={handleChange} value={input} /> 
            <select>
                <option>EUR</option>
            </select>
            <h2>TO </h2>
            <input type='text' readOnly value={output}/> 
            <select onChange={handleSelectChange}>
                <option>Select</option>
                 { options.map( option => <option key={option}>{option}</option> )}
            </select>
            <button onClick={handleConvertion}>CONVERT</button>
              { error && <p>{error}</p>}
        </div>
    )
}

export default CurrencyConverter