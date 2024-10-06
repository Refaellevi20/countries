'use strict'

function getCountryByName(name) {
    const countryMap = loadFromStorage(COUNTRY_KEY) || {}

    if (countryMap[name]) {
        flashMsg('Fetching countryMap!')
        return Promise.resolve(countryMap[name])
    }

    return axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
            const countryData = response.data

            countryMap[name] = countryData
            saveToStorage(COUNTRY_KEY, countryMap)
            return countryData
        })
        .catch(error => {
            return Promise.reject(`Country not found or API failed: ${error}`)
        })
     
}

function getCountryByCode(code) {
    const countryMap = loadFromStorage(COUNTRY_KEY) || {}

    if (countryMap[code]) {
        flashMsg('Fetching countryMap!')
        return Promise.resolve(countryMap[code])
    }

    return axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
        .then(response => {
            const countryData = response.data

            countryMap[code] = countryData
            saveToStorage(COUNTRY_KEY, countryMap)
            return countryData
        })
        .catch(error => {
            return Promise.reject(`Country not found or API failed: ${error}`)
        })
}
