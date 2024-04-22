
const api = {
    key: "547058233761db07fe5acdfa20445897",
    base: "https://api.openweathermap.org/data/2.5/"
}


const search = document.querySelector("#search-input");
const btn = document.querySelector("#submit");


btn.addEventListener("click", (e)=>{
        if(e.type === "click"){
            getApi(search.value);
        }
});


async function getApi(){
    try{
        const response = await  fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    
            const data = await response.json();
            return display(data);
    }
    catch(error){
        console.error('There was a problem with the fetch operation:',error);
    }
}

function display(data){
    console.log(data);

    const error = document.querySelector(".alert");
    if(data.cod === "404"){
        error.textContent = "Please enter a valid city";
        search.value = " ";
    }
    else{
        const city = document.querySelector("#city");
        city.innerText = `${data.name}, ${data.sys.country}`;

        const today = new Date();
        const date = document.querySelector("#date-time");
        // console.log(today);
        date.innerText = datefunction(today);



        // ______________BELOW - white line ____________________
        const temp = document.querySelector("#temp");
        temp.innerText = `Temp: ${Math.round(data.main.temp)} ℃`;

        const weather = document.querySelector("#weather");
        weather.innerText = `Weather: ${data.weather[0].main}`

        const temp_range = document.querySelector("#temp-range");
        temp_range.innerText = `Temp Range: ${Math.round(data.main.temp_min)}℃/ ${Math.round(data.main.temp_max)}℃`

    }
}


function datefunction(d){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}
