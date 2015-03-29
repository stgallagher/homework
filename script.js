// namespace
var CS = CS || {};

// vehicle abstraction
CS.Abstract = (function () {
  function Vehicle(name, seats, wheels) {
    this.name = name;
    this.seats = seats;
    this.wheels = wheels;
  }
  Vehicle.prototype = {
    constructor: Vehicle,
    getName: function() {
      return this.name;
    },
    setName: function(name) {
      this.name = name;
    },
    getSeats: function() {
      return this.seats;
    },
    setSeats: function(seats) {
      this.seats = seats;
    },
    getWheels: function() {
      return this.wheels;
    },
    setWheels: function(wheels) {
      this.wheels = wheels;
    },
    info: function() {
      return {
        type: this.constructor.name.toLowerCase(),
        name : this.name,
        seats : this.seats,
        wheels : this.wheels
      }
    }
  };
  return {
    Vehicle: Vehicle,
  };
})();

// vehicle instances
CS.Instances = (function () {
  function Car(name, seats, wheels) {
    CS.Abstract.Vehicle.call(this, name, seats, wheels);
  }
  Car.prototype = new CS.Abstract.Vehicle();
  Car.prototype.constructor = Car;

  function Motorcycle(name, seats, wheels) {
    CS.Abstract.Vehicle.call(this, name, seats, wheels);
  }
  Motorcycle.prototype = new CS.Abstract.Vehicle();
  Motorcycle.prototype.constructor = Motorcycle;

  return {
    Car: Car,
    Motorcycle: Motorcycle
  };
})();

/* Element bindings */
var vehicleName = document.getElementById('vehicle-name');
var addButton = document.getElementById('add-button');
var vehicleSelect = document.getElementById('vehicle-select-text');
var carSelect = document.getElementById('car-select');
var motorcycleSelect = document.getElementById('motorcycle-select');
var errorMessage = document.getElementById('error-message');
var vehicleInfo = document.getElementById('vehicle-info');
var vehicleList = document.getElementById('vehicle-list');

// collection of vehicle objects
var vehicles = []

// id counter for generated vehicle items
var id = 0;

/* listeners */
addButton.addEventListener('click', function(e) {
  var v;
  if(vehicleSelect.value === 'Car' && vehicleName.value != '') {
    var v = new CS.Instances.Car(vehicleName.value, 4, 4);
    v.id = id;
    errorMessage.style.display = 'none';
  } else if (vehicleSelect.value === 'Motorcycle' && vehicleName.value != '') {
    var v = new CS.Instances.Motorcycle(vehicleName.value, 1, 2);
    v.id = id;
    errorMessage.style.display = 'none';
  } else {
    return errorMessage.style.display = 'block';
  }
  vehicleList.insertAdjacentHTML('beforeend', '<li class="vehicle-generated-name"><button id=vehicle-'+ v.id + ' class="info-button pure-button pure-button-primary button-xsmall">info</button>' + vehicleName.value + '</li>');
  attach(v, 'click', showVehicleInfo);
  id++;
  vehicles.push(v);
  vehicleName.value = '';
  vehicleSelect.value = '';
});

carSelect.addEventListener('click', function(e) {
  var vehicleSelected = carSelect.innerHTML;
  document.getElementById('vehicle-select-text').value = vehicleSelected;
});

motorcycleSelect.addEventListener('click', function(e) {
  var vehicleSelected = motorcycleSelect.innerHTML;
  document.getElementById('vehicle-select-text').value = vehicleSelected;
});

// global binding function
function attach(obj, event, fn) {
  element = document.getElementById('vehicle-' + id);
  element.addEventListener(event, function(){ fn(obj) }, false);
}

// info button listener function
function showVehicleInfo(vehicle) {
  info = vehicle.info()
  vehicleInfo.innerHTML = '';
  vehicleInfo.insertAdjacentHTML('beforeend', '<h4>Vehicle Info</h4><table class="pure-table pure-table-striped">' +
                                              '<tr><td>Type</td><td id="vehicle-info-type">' + info.type +
                                              '<tr><td>Name</td><td id="vehicle-info-name">' + info.name +
                                              '</td></tr><tr><td>Seats</td><td id="vehicle-info-seats">' + info.seats +
                                              '</td></tr><tr><td>Wheels</td><td id="vehicle-info-wheels">' + info.wheels + '</td></tr></table>');
};
