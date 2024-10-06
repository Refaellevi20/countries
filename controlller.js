


function onInit() {

    document.querySelector('fetch-btn').addEventListener('click', fetchCountryData)
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => el.classList.remove('open'), 3000)
}

function fetchCountryData() {

        const  country = document.querySelector('#search').value
        if (!country) return flashMsg('Please enter a country name!')   
            
            ax
        }
