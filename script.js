// Write your JavaScript code here!

window.addEventListener("load", function() {
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let fuelLevelNumber = Number(fuelLevel.value);
   let cargoMassNumber = Number(cargoMass.value);
   let form = document.querySelector("form");
   let pilotStatus = document.getElementById("pilotStatus");
   let coPilotStatus = document.getElementById("copilotStatus");
   let faultyItems = document.getElementById("faultyItems");
   let fuelStatus = document.getElementById("fuelStatus");
   let launchStatus = document.getElementById("launchStatus");
   let cargoStatus = document.getElementById("cargoStatus")

   function pilotReady(){
      pilotStatus.style.visibility = "visible";
      pilotStatus.innerHTML = `Pilot ${pilotName.value} Ready`;
      coPilotStatus.style.visibility = "visible";
      coPilotStatus.innerHTML = `Co-pilot ${copilotName.value} Ready`;
   } 

   function lowFuelLevel(){
      let requiredFuel = (10000 - fuelLevelNumber);
      faultyItems.style.visibility = "visible";
      fuelStatus.innerHTML = `Need ${requiredFuel} more kg of fuel for launch!`;
      fuelStatus.style.color = "red"
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   } 

   function fuelLevelStatus(){
      fuelStatus.style.visibility = "visible"
      launchStatus.innerHTML = "Shuttle ready for launch!";
      launchStatus.style.color = "green";
   }

   function oversizeLoad(){
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML = `${cargoMassNumber - 10000} pounds over max load weight!`;
      cargoStatus.style.color = "red";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }

   function cargoStatusPass(){
      cargoStatus.style.visibility = "visible";
      launchStatus.innerHTML = "Shuttle ready for launch";
      launchStatus.style.color = "green";
   }

   form.addEventListener("submit", function(event) {
      event.preventDefault();
      
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") { //prevents form submission if form fields are blank
         alert("All fields are required!");

      } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) { // validates if fuel level or cargo mass submitted are numbers
         alert("Fuel Levels and Cargo Mass need to be numbers!");
       
      } else if (!pilotName.value.match(/^[A-Za-z]+$/) || !copilotName.value.match(/^[A-Za-z]+$/)) { //checks to see if numbers are not submitted with pilot name and co pilot name
         alert("Copilot or pilot name does not meet requirements")
  
      } else {
         pilotReady();
         fuelLevelNumber > 10000 ? lowFuelLevel() : fuelLevelStatus() ;
         cargoMassNumber > 10000 ? oversizeLoad() : cargoStatusPass()
      }
      

   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then(function(json) {
         const div = document.getElementById("missionTarget"); // use missionTarget div in html document to put html in
         random = Math.round(Math.random()*json.length); //finds random number that is within the length of the json array
         planet = json[random]; //assigns variable to the selected random planet
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${planet.name}</li>
            <li>Diameter: ${planet.diameter}</li>
            <li>Star: ${planet.star}</li>
            <li>Distance from Earth: ${planet.distance}</li>
            <li>Number of Moons: ${planet.moons}</li>
         </ol>
         <img src="${planet.image}">`
      });
   });
});