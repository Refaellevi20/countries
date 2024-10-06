'use strict'

function getCountryByName(name) {
    // console.log('name');
    
    const cache = loadFromStorage('countryCache') || {}

    if (cache[name]) {
        flashMsg('collecting from cache!')
        return Promise.resolve(cache[name])
    }

   return axios.get(`https://restcountries.com/v3.1/name/${name}`) //* or county tried many
        .then(response => {
            const countryData = response.data

            cache[name] = countryData
            saveToStorage('countryCache', cache)
            console.log(cache);

            return countryData
            
        })
        .catch(error => {
            return Promise.reject(`Country not found or API faild (whatever)!${error}`)
        })
        .finally(() => {
            console.log('cleanUp (from cache)')    
        })
}


