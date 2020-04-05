import React, { useEffect, useReducer } from 'react'

import { currencyReducer, INITIAL_STATE } from './currency.reducer'

const fetchData = () => {
    const url = "http://data.fixer.io/api/latest?access_key=166e64d8585a6f6f7879b63ccc83ef8b&format=1"

       return new Promise((resolve, reject) => {
           fetch(url)
                .then( res => res.json())
                .then( data => resolve(data.rates.AUD))
                .catch( err => reject(err))
       })

}

const fetchDataFake = currentBase => {
    return new Promise((resolve, reject) => {

        setTimeout( () => {
           const bases = {
            "AED": 1.877,
            "AFN": 2.466,
           }
            bases[currentBase] ? resolve(bases[currentBase]) : reject('not found')
       }, 1500)

    })
}
const fetchSelectFake = () => {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
           const options = {
            "AED": "United Arab Emirates Dirham",
            "AFN": "Afghan Afghani",
           }
           resolve(options)
       }, 1500)

    })
}

const CurrencyConverter = () => {
    const [state, dispatch] = useReducer(currencyReducer, INITIAL_STATE)
    const { input, output, options, base } = state

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
            const options = Object.keys(await fetchSelectFake())
            dispatch({ type: 'setOptions', payload: options })

        }
        getOptions()
    },[])

    return(
        <div>
            <h2>Euro </h2>
            <select onChange={handleSelectChange}>
                <option>Select</option>
                 { options.map( option => <option key={option}>{option}</option> )}
            </select>
            <input type='text' onChange={handleChange} value={input} /> 
            <h2>AUD </h2>
            <input type='text' readOnly value={output}/> 
            <button onClick={handleConvertion}>CONVERT</button>
        </div>
    )
}

export default CurrencyConverter