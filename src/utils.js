export const fetchData = base => {
    const url = "http://data.fixer.io/api/latest?access_key=166e64d8585a6f6f7879b63ccc83ef8b&format=1"

       return new Promise((resolve, reject) => {
           fetch(url)
                .then( res => res.json())
                .then( data => data.rates[base] ? resolve(data.rates[base]) : reject('not found'))
       })

}
export const fetchSelectData = () => {
    const url = "http://data.fixer.io/api/symbols?access_key=166e64d8585a6f6f7879b63ccc83ef8b&format=1"

       return new Promise((resolve, reject) => {
           fetch(url)
                .then( res => res.json())
                .then( data => resolve(data.symbols))
                .catch( err => reject(err.info))
       })

}

export const fetchDataFake = currentBase => {
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
export const fetchSelectDataFake = () => {
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
