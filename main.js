const form = document.querySelector("form")
var mymap
async function getAddress(ipLocator) {
    const accessToken = `pk.eyJ1IjoiMTAwMTIxODgwMiIsImEiOiJjam1lZHppNDIwY3JuM3BwZjM3ZnNmZDJ2In0.5BIcQy3_ACs0afqvHmPbVg&ipAddress=${ipLocator}`
    const apiKey = "at_XvZLm5dvyEPgWUu3SSWx0TRMNraLr"
    const ip = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`)
    const res = await ip.json()
    console.log(res)
    console.log(res.location)
    const {
        lat,
        lng
    } = res.location;
    console.log(lat)
    mymap = L.map('mapid').setView([lat, lng], 13);
    L.marker([lat, lng]).addTo(mymap);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken

    }).addTo(mymap);
    //marker.setLatLng([lat, long]) 

    //
    const ipLoc = document.querySelector(".ip")
    const region = document.querySelector(".location")
    const time = document.querySelector(".time")
    const isp = document.querySelector(".isp")
    ipLoc.innerHTML = res.ip
    region.innerHTML = res.location.city
    time.innerHTML = res.location.timezone
    isp.innerHTML = res.isp
}
getAddress()

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputElement = document.querySelector("input")
    //const inputData = document.querySelector("input").value;
    const inputData = inputElement.value;
    console.log(parseInt(inputData));
    // const inputItem = "8.8.8.8";
    getAddress2(inputData);
    inputElement.value = "";
})
async function getAddress2(iptracker) {    
    const apiKey = "apiKey=at_XvZLm5dvyEPgWUu3SSWx0TRMNraLr"
    const apiUrl = "https://geo.ipify.org/api/v1?"
    const ip = await fetch(apiUrl + apiKey + "&domain=" + iptracker)
    .then((res) => {
        if(res.status !== 200) {
            alert("invalid input")
        } else {
            return res.json()
        }
    })
    .then(data => {
        console.log(data)
        const results = data
        console.log(results)
        console.log(results.location)
    
        const {
            lat,
            lng
        } = results.location;
        console.log(lat)
        console.log(iptracker)
    
    
        L.marker([lat, lng]).addTo(mymap);
        mymap.panTo(new L.LatLng(lat, lng));
    
    
        const ipLoc = document.querySelector(".ip")
        const region = document.querySelector(".location")
        const time = document.querySelector(".time")
        const isp = document.querySelector(".isp")
        ipLoc.innerHTML = results.ip
        region.innerHTML = results.location.city
        time.innerHTML = results.location.timezone
        isp.innerHTML = results.isp

    })
    .catch(err => {
        console.log(err)
    })
    
   
}