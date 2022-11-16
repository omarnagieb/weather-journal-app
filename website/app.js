// api key in a variable called api
const api = '4d44de968e1114c20d0a51a47ac9bfd5';

// Dynamic js date instance.
let d = new Date();
const newDate = d.getDate() + " - " + (d.getMonth() + 1) + " - " + d.getFullYear();

// select the entry class and style it
const entry = document.querySelector('.entry');
entry.style.cssText = `background-color:#894646; display: flex; flex-wrap:wrap; flex-direction: column; max-width:750px; margin-bottom:30px; min-height:150px`;

//select the div that will display the response and styling it
const entryHolder = document.getElementById('entryHolder');
entryHolder.style.cssText = 'display:flex; justify-content:space-around; flex-direction:column;'

//dynamically creating the divs for the recent entry.
const service = document.getElementsByClassName('service');
const feelings = document.getElementById('feelings');


//storing the user's response.
const userResponse = document.querySelector('.myInput').textContent;

//event listener for the generation button.
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', function (event) {
    //preventing Default.
    event.preventDefault();

    //grabbing the user's response.
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('content').value;
    
   //API call.
   const getWeatherData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${api}`);
    try {
        //converting the response to json.
        const data = await response.json();            
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//calling the API.
getWeatherData(zip, api)
.then(tempreture => {
    projectData = {
        temp: tempreture.main.temp, date, userResponse,
    };

    datePlace = document.getElementById('date')
    tempPlace = document.getElementById('temp')
    contentPlace = document.getElementById('content')

    //Writting the data to the relevant DOM Elements.
    tempVar = tempPlace.textContent = `${projectData.temp}`;
    contVar = contentPlace.textContent = feelings.value;
    postData('/projectData', projectData)
    .then(() => {
        //updating the UI after fetching the data.
        async (url) => {const response = await fetch(url);
                        const data = await response.json();
        }
    }
    )
    .catch(error => {
        console.log(error);
    });
 })
});
document.getElementById('date').textContent = ` DATE : ${newDate} `;
document.getElementById('temp').textContent = ` TEMPRETURE :${tempVar}`;
document.getElementById('content').textContent = ` Feelings :${contVar}`;

    //function to post the data.
const postData = async (url, data) => {
        const request = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        try {
            const data = await request.json();
            return data;
        } catch (erorr) {
            console.log('erorr', erorr);
        };
    };