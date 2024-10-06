'use strict'

function onInit() {
    document.querySelector('.fetch-btn').addEventListener('click', fetchCountry)
}

function fetchCountry() {

    const country = document.querySelector('.country-input').value
    if (!country) return flashMsg('Please enter a country name!')
    console.log(country)

    getCountryByName(country) 
    .then(countryData => renderCountryInformation(countryData))
    // .then(renderCountryInformation)
    .catch(() => flashMsg('Country not found!')) 
    .finally(() => {
        flashMsg('Country')
        console.log('cleanUp')    
    })
}



// function renderCountryInformation(countryData) {
//     const countryInformation = `
//     name: ${countryData.name.common}
//     Population: ${countryData.Population}
//     Flag: ${countryData.flag.png}  //* url  //* svg or nada
//     Region: ${countryData.region}
// `
//     document.querySelector('country-info').innerText = countryInformation
// }

function renderCountryInformation(countryData) {
    const { name, population, area, flags } = countryData
    document.querySelector('.country-name').innerText = name.common
    console.log(flags.png)
    document.querySelector('.country-flag').src = flags.png
    document.querySelector('.country-population').innerText = `Population: ${population}`
    document.querySelector('.country-area').innerText = `Area: ${area} km²`
}


function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => el.classList.remove('open'), 3000)
}
