// url of current weather data "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
// url for lon and latitude from openweathermap.org/current `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c8c152b04145ac1913c42df5f1e6e91c`
//google map api :  `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed` 





function weatherData()
 {
     let city = document.getElementById("city").value 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c8c152b04145ac1913c42df5f1e6e91c`  //using templete literal we can use variable inside and string sath mai

    
    fetch(url)
    .then(function(res)
   {
       // console.log(res)
    return res.json()
   })
   .then(function(res){
    console.log(res)
   // console.log(res.main.temp)   //temp is in Kelvin
    appendFunction(res)

    })
    .catch(function(err)
    {
    console.log(err)

    })
  

}






function weatherDataLocation(lat , lon)
{
//console.log(lat,lon)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c8c152b04145ac1913c42df5f1e6e91c`
   
   

   
   fetch(url)
   .then(function(res)
  {
      // console.log(res)
   return res.json()
  })
  .then(function(res){
  // console.log(res)
  
    appendFunction(res)

   })
   .catch(function(err)
   {
   console.log(err)

   })

}



  function appendFunction(data)
  {
    let container =  document.querySelector("#container")
    let location = document.getElementById("gmap_canvas")
    container.innerHTML = null

    let cdiv = document.createElement("div")
    let city = document.createElement("p")
    city.innerText = `City : ${data.name}`
    var icity  =  document.createElement("i")
    icity.className ="fa-solid fa-city"
    var ip = document.createElement("p")
    ip.append(icity)
    cdiv.append(ip,city)


    let mindiv = document.createElement("div")
    let min = document.createElement("p")
    min.innerText =  `Min Temp : ${Math.ceil(data.main.temp_min-273)}`
    var iminTemp  =  document.createElement("i")
    iminTemp.className ="fa-solid fa-temperature-low"
    var ip = document.createElement("p")
    ip.append(iminTemp)
    mindiv.append(ip,min)



    let maxdiv = document.createElement("div")
    let max = document.createElement("p")
    max.innerText = `Max Temp : ${Math.ceil(data.main.temp_max-273)}`
    var imaxTemp  =  document.createElement("i")
    imaxTemp.className ="fa-solid fa-temperature-high"
    var ip = document.createElement("p")
    ip.append(imaxTemp)
  maxdiv.append(ip,max)



  let currentdiv = document.createElement("div")
    let current = document.createElement("p")
    current.innerText = ` Temp : ${Math.ceil(data.main.temp-273)}`
    var icurrentTemp  =  document.createElement("i")
    icurrentTemp.className ="fa-solid fa-temperature-empty"
    var ip = document.createElement("p")
    ip.append(icurrentTemp)
    currentdiv.append(ip,current)

    let humiditydiv = document.createElement("div")
    let humidity = document.createElement("p")
    humidity.innerText = ` Humidity : ${data.main.humidity}`
    var ihumidity  =  document.createElement("i")
    ihumidity.className ="fa-solid fa-droplet-percent"
    var ip = document.createElement("p")
    ip.append(ihumidity)
    humiditydiv.append(ip,humidity)


    let winddiv = document.createElement("div")
    let wind= document.createElement("p")
    wind.innerText = ` Wind : ${data.wind.speed}`
    var iwind  =  document.createElement("i")
    iwind.className ="fa-solid fa-wind"
    var ip = document.createElement("p")
    ip.append(iwind)
    winddiv.append(ip,wind)

    let cloudsdiv = document.createElement("div")
    let clouds= document.createElement("p")
    clouds.innerText = ` Clouds : ${data.clouds.all}`
    var iclouds  =  document.createElement("i")
    iclouds.className ="fa-solid fa-cloud"
    var ip = document.createElement("p")
    ip.append(iclouds)
    cloudsdiv.append(ip,clouds)


    let weatherdiv = document.createElement("div")
    let weather= document.createElement("p")
    weather.innerText = `Weather : ${data.weather[0].main}`
    var iweather  =  document.createElement("i")
    iweather.className ="fa-solid fa-sun"
    var ip = document.createElement("p")
    ip.append(iweather)
    weatherdiv.append(ip,weather)
    

    let sunrisediv = document.createElement("div")
    let sunrise= document.createElement("p")
    var isunrise  =  document.createElement("i")
    isunrise.className = "fa-solid fa-cloud-sun"
    var ip = document.createElement("p")
    ip.append(isunrise)
    var riseTime  = data.sys.sunrise
    const RunixTimestamp = riseTime 
    const Rmilliseconds = riseTime  * 1000 // 1575909015000
    const RdateObject = new Date(Rmilliseconds)
    const RhumanDateFormat = RdateObject.toLocaleString() //2019-12-9 10:30:15
    var Rtime = RdateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
   sunrise.innerText =`Sun Rise: ${Rtime}` 
   sunrisediv.append(ip,sunrise)
    console.log(Rtime)

    let sunsetdiv = document.createElement("div")
    let sunset= document.createElement("p")
    var isunset =  document.createElement("i")
    isunset.className = "fa-solid fa-cloud-bolt"
    var ip = document.createElement("p")
    ip.append(isunset)
   var setTime = data.sys.sunset
    const unixTimestamp = setTime
    const milliseconds = setTime * 1000 // 1575909015000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    var Stime = dateObject.toLocaleString("en-US", {hour: "numeric"})
sunset.innerText = `Sun Set: ${Stime}` 
sunsetdiv.append(ip,sunset)
console.log(riseTime,setTime)

    container.append(cdiv,mindiv,maxdiv,currentdiv,humiditydiv,winddiv,cloudsdiv,weatherdiv,sunrisediv,sunsetdiv)

    location.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

  }

   
 
 



function getWeather()
{
  navigator.geolocation.getCurrentPosition(success);

  function success(position) {

     var crd = position.coords;
   console.log(crd)
     console.log(`Your current position is:`);
     console.log(`Latitude : ${crd.latitude}`);
     console.log(`Longitude: ${crd.longitude}`);
     console.log(`More or less ${crd.accuracy} meters.`);

     weatherDataLocation(crd.latitude,crd.longitude)
   }
}


function forcastFunction()  //for forcaste.... first i have taken city name then other function for lat and lon and other function for append
{
  let city = document.getElementById("city").value 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c8c152b04145ac1913c42df5f1e6e91c`
 
  
   
   fetch(url)
   .then(function(res)
  {
      // console.log(res)
   return res.json()
  })
  .then(function(res){
  // console.log(res)
  let lat = res.coord.lat
  let lon = res.coord.lon
  latlon(lat,lon)
 
      //console.log(lat,lon)

   })
   .catch(function(err)
   {
   console.log(err)

   })
 
}

function latlon(lat,lon)
{
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=c8c152b04145ac1913c42df5f1e6e91c`

  //console.log(url)
  fetch(url)
  .then(function(res)
 {
     // console.log(res)
  return res.json()
 })
 .then(function(res){
  //console.log(res.daily)
  appendForcast(res.daily)
  })
  .catch(function(err)
  {
  console.log(err)

  })

}

function appendForcast(data)
{
//console.log(data)

let forcastDiv = document.getElementById("forcast")
forcastDiv.innerHTML = null
data.forEach(function(ele,i)
{

  if(i !== 0)  //becz in our api link total 8 days data is available including current data
  {
    console.log(ele)
    var Div = document.createElement("div")
    
    var day = document.createElement("p")
    var d = ele.dt 
    
    const unixTimestamp = d
    
    const milliseconds = d* 1000 // 1575909015000
    
    const dateObject = new Date(milliseconds)
    
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    var Day =dateObject.toLocaleString("en-US", {weekday: "long"}) 
    day.append(Day)
    
    
    var weather = document.createElement("p")
    weather.innerText = ele.weather[0].main
    var ip = document.createElement("p") 
    var icon = document.createElement("i") 
    if(weather.innerText === 'Clear')
    {
    icon.className = "fa-solid fa-sun"
    }
    else if(weather.innerText === 'Clouds')
    {
      icon.className = "fa-solid fa-cloud"
    }
    else if(weather.innerText === 'Rain'){
      icon.className = "fa-solid fa-cloud-rain"
    }
    else{
      icon.className = "fa-solid fa-cloud"
    }
    ip.append(icon)
    
    var hTemp = document.createElement("p")
    hTemp.innerText = ele.temp.max
    
    var lTemp = document.createElement("p")
    lTemp.innerText = ele.temp.min
    
    Div.append(day,ip,hTemp,lTemp,)
    forcastDiv.append(Div)
  }
 
})


}


 