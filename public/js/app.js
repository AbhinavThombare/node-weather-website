console.log('Client side javascript file is loaded.');

// fetch('https://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const serach = document.querySelector('input')
const errorMsg = document.querySelector('#error')
const locations = document.querySelector('#location')
const temp = document.querySelector('#temp')
const feels = document.querySelector('#feels')
const desc = document.querySelector('#desc')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = serach.value;

    errorMsg.textContent = 'Loading..';
    locations.textContent = ''
    temp.textContent = ''
    feels.textContent = ''
    desc.textContent = ''
    // resultMsg.textContent = '';

    fetch('/weather?address=' + address).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                errorMsg.textContent = data.error
            }
            else {

                errorMsg.textContent = '';
                locations.textContent = 'Location : ' + data.Location;
                temp.textContent = 'Temperature : ' + data.Temperature + '° Celsius'
                feels.textContent = 'Feels Like Temperature : ' + data.Feelslike_Temperature + '° Celsius'
                desc.textContent = 'Weather Description : ' + data.Weather_Descriptions
            }
        })
    })
})