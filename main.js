async function getAddress() {
    const accessToken = `pk.eyJ1IjoiMTAwMTIxODgwMiIsImEiOiJjam1lZHppNDIwY3JuM3BwZjM3ZnNmZDJ2In0.5BIcQy3_ACs0afqvHmPbVg`
    const apiKey = "at_XvZLm5dvyEPgWUu3SSWx0TRMNraLr"
    const ip = await fetch("https://geo.ipify.org/api/v1?apiKey=at_XvZLm5dvyEPgWUu3SSWx0TRMNraLr")
    const res =await ip.json()
    console.log(res)
    console.log(res.location)
    const {lat, lng} = res.location;
    console.log(lat)
    var mymap = L.map('mapid').setView([lat, lng], 13);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
}).addTo(mymap);

}
getAddress()
