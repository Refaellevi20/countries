


function onInit() {

    document.querySelector('.fetch-btn').addEventListener('click', fetchCountry)
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => el.classList.remove('open'), 3000)
}

function fetchCountry() {

    const country = document.querySelector('.country-input').value
    if (!country) return flashMsg('Please enter a country name!')

    axios.get(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            const countryData = response.data[0]
            renderCountryInformation(countryData)
        })
        .catch(() => flashMsg('Country not found!'))
}


function renderCountryInformation(countryData) {
    const countryInformation = `
    name: ${countryData.common}
    Population: ${countryData.Population}
    Flag: ${countryData.flag}
    Region: ${countryData.region}
`
    document.querySelector('country-info').innerHTML = countryInformation
}