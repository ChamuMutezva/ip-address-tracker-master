"use strict";

var form = document.querySelector("form");
var mymap;

function getAddress(ipLocator) {
  var accessToken, apiKey, ip, res, _res$location, lat, lng, ipLoc, region, time, isp;

  return regeneratorRuntime.async(function getAddress$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          accessToken = "pk.eyJ1IjoiMTAwMTIxODgwMiIsImEiOiJjam1lZHppNDIwY3JuM3BwZjM3ZnNmZDJ2In0.5BIcQy3_ACs0afqvHmPbVg&ipAddress=".concat(ipLocator);
          apiKey = "at_XvZLm5dvyEPgWUu3SSWx0TRMNraLr";
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://geo.ipify.org/api/v1?apiKey=".concat(apiKey)));

        case 4:
          ip = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(ip.json());

        case 7:
          res = _context.sent;
          console.log(res);
          console.log(res.location);
          _res$location = res.location, lat = _res$location.lat, lng = _res$location.lng;
          console.log(lat);
          mymap = L.map('mapid').setView([lat, lng], 13);
          L.marker([lat, lng]).addTo(mymap);
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: accessToken
          }).addTo(mymap); //marker.setLatLng([lat, long]) 
          //

          ipLoc = document.querySelector(".ip");
          region = document.querySelector(".location");
          time = document.querySelector(".time");
          isp = document.querySelector(".isp");
          ipLoc.innerHTML = res.ip;
          region.innerHTML = res.location.city;
          time.innerHTML = res.location.timezone;
          isp.innerHTML = res.isp;

        case 23:
        case "end":
          return _context.stop();
      }
    }
  });
}

getAddress();
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var inputElement = document.querySelector("input"); //const inputData = document.querySelector("input").value;

  var inputData = inputElement.value;
  console.log(parseInt(inputData)); // const inputItem = "8.8.8.8";

  getAddress2(inputData);
  inputElement.value = "";
});

function getAddress2(iptracker) {
  var apiKey, apiUrl, ip;
  return regeneratorRuntime.async(function getAddress2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          apiKey = "apiKey=at_XvZLm5dvyEPgWUu3SSWx0TRMNraLr";
          apiUrl = "https://geo.ipify.org/api/v1?";
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch(apiUrl + apiKey + "&domain=" + iptracker).then(function (res) {
            if (res.status !== 200) {
              alert("invalid input");
            } else {
              return res.json();
            }
          }).then(function (data) {
            console.log(data);
            var results = data;
            console.log(results);
            console.log(results.location);
            var _results$location = results.location,
                lat = _results$location.lat,
                lng = _results$location.lng;
            console.log(lat);
            console.log(iptracker);
            L.marker([lat, lng]).addTo(mymap);
            mymap.panTo(new L.LatLng(lat, lng));
            var ipLoc = document.querySelector(".ip");
            var region = document.querySelector(".location");
            var time = document.querySelector(".time");
            var isp = document.querySelector(".isp");
            ipLoc.innerHTML = results.ip;
            region.innerHTML = results.location.city;
            time.innerHTML = results.location.timezone;
            isp.innerHTML = results.isp;
          })["catch"](function (err) {
            console.log(err);
          }));

        case 4:
          ip = _context2.sent;

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}