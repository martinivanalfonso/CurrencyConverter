import React, { useState, useEffect} from 'react'

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

    const [input, setInput] = useState(0) 
    const [output, setOutput] = useState(0) 
    const [options, setOptions] = useState([]) 
    const [currentBase, setCurrentBase] = useState('') 

    const handleConvertion = async() => {
        try {
           const base = await fetchDataFake(currentBase)
            setOutput((input * base).toFixed(2))
        } catch (error) {
            console.log(error.info)
        }
    }
    const handleChange = e => {
        setInput(e.target.value)
    }
    const handleSelectChange = e => {
        console.log(e.target.value)
        setCurrentBase(e.target.value)
    }

    useEffect( () => {
        const getOptions = async () => {
            const options = Object.keys(await fetchSelectFake())
            setOptions(options)
        }
        getOptions()
    },[])

    return(
        <div>
            <h2>Euro </h2>
            <select onChange={handleSelectChange}>
                 {options.map( option => <option key={option}>{option}</option> )}
            </select>
            <input type='text' onChange={handleChange} value={input} /> 
            <h2>AUD </h2>
            <input type='text' readOnly value={output}/> 
            <button onClick={handleConvertion}>CONVERT</button>
        </div>
    )
}

export default CurrencyConverter