'use strict'

const COUNTRY_KEY = 'country countryMap'
let selectedColor = '#ffffff'

function onInit() {
    fetchCountryWithDefault('israel')
    renderRainbowCanvas()
}

function fetchCountryWithDefault(country) {
    const event = new Event('submit')
    document.querySelector('.country-input').value = country
    fetchCountry(event)
}

function fetchCountry(event) {
    event.preventDefault()

    const country = document.querySelector('.country-input').value
    if (!country) return flashMsg('Please enter a country name!')

    const loader = document.querySelector('.loader')
    loader.style.display = 'block'

    getCountryByName(country)
        .then(renderCountryInformation)
        .catch(() => flashMsg('Country not found!'))
        .finally(() => {
            loader.style.display = 'none'
            console.log('finally')
        })
}

function renderCountryInformation(countryData) {
    const { name, population, area, flags, borders } = countryData[0]
    document.querySelector('.country-name').innerText = name.common
    document.querySelector('.country-flag').src = flags.png
    document.querySelector('.country-population').innerText = `Population: ${population}`
    document.querySelector('.country-area').innerText = `Area: ${area} km²`

    const neighborsContainer = document.querySelector('.country-neighbors')
    const neighborsLinks = borders.map(border => `<a href="#" class="neighbor-link" data-code="${border}">${border}</a>`).join('') //* take me to his borther (close)
    neighborsContainer.innerHTML = `Neighbors: ${neighborsLinks}`

    document.querySelectorAll('.neighbor-link').forEach(link => { //*forEach country coming with link
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const code = link.dataset.code
            getCountryByCode(code)
                .then(renderCountryInformation)
                .catch(() => flashMsg('Country could not found!'))
                .finally(() => ('finally working!!'))
        })
    })
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.style.display = 'bloke'

    el.classList.add('open')
    setTimeout(() => {
        el.style.display = 'none'
        el.classList.remove('open')
    }, 3000)
}

function clearCountryMap() {
    localStorage.removeItem(COUNTRY_KEY)
    flashMsg('countryMap cleared successfully!')
}



function renderRainbowCanvas() {
    const canvas = document.getElementById('colorPickerCanvas')
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) / 2

    //* Create a radial gradient from center
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)

    //* Add smooth rainbow colors (radial)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.15, 'darkorange')
    gradient.addColorStop(0.3, 'yellow')
    gradient.addColorStop(0.45, 'green')
    gradient.addColorStop(0.6, 'cyan')
    gradient.addColorStop(0.75, 'blue')
    gradient.addColorStop(0.9, 'indigo')
    gradient.addColorStop(1, 'violet')

    //* Fill canvas with radial rainbow gradient
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //* Event listener to capture clicked color
    canvas.addEventListener('click', (event) => {
        const x = event.offsetX
        const y = event.offsetY
        const imageData = ctx.getImageData(x, y, 1, 1).data
        selectedColor = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`
        console.log('Selected color:', selectedColor)
    })
}


function applyThemeColor() {
    document.body.style.backgroundColor = selectedColor
    
    hideChangeThemeModal()
}

function hideChangeThemeModal() {
    document.getElementById('changeThemeModal').classList.remove('active')
    document.querySelector('.overlay').classList.remove('active')

}

function showChangeThemeModal() {
    document.getElementById('changeThemeModal').classList.add('active')
    document.querySelector('.overlay').classList.add('active')
}