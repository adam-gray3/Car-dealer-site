const select = document.querySelector(".make");
const selectedPrice = document.querySelector(".price");
const model = document.querySelector(".model");
const btn = document.querySelector(".search");
const showStock = document.querySelector(".stockList");
const stockCount = document.querySelector(".stock-count");
const totalCount = document.querySelector(".total-count");
const priceFilter = document.querySelector(".show-price");
let selectedStock = [];

const getStock = async() => {
  const data = await fetch("./stocklist.json");
  const res = await data.json();
  stockCount.innerHTML = res.StockList.length;
  totalCount.innerHTML = res.StockList.length;
  return res.StockList;
};

const showFullStock = async () => {
  const stockList = await getStock();
  displayItem(stockList);
  return stockList
};

showFullStock().then((stockCars) => {
  //FILTER OPTIONS
  function filterStock(){
    if(select.selectedIndex > 0 && model.selectedIndex > 0 && selectedPrice.selectedIndex > 0){
      showStock.innerHTML = "";
      const makeModel = filterByModel(stockCars);
      const modelPriceOpt = filterByPrice(makeModel);
      selectedStock = [];
      selectedStock.push(modelPriceOpt);
    }else if(model.selectedIndex > 0){
      showStock.innerHTML = "";
      const modelOpt = filterByModel(stockCars);
      selectedStock = []
      selectedStock.push(modelOpt)
      // displayItem(filterByModel(stock))
    } else if(select.selectedIndex > 0){
      showStock.innerHTML = "";
      const makeOpt = filterByMake(stockCars);
        //FILTER SELECTED MAKE BY PRICE
      if(selectedPrice.selectedIndex > 0){
      showStock.innerHTML = "";
      const makePriceOpt = filterByPrice(makeOpt);
      selectedStock = []
      selectedStock.push(makePriceOpt)
      } else{
        selectedStock = []
        selectedStock.push(makeOpt)
      }
    } else if (selectedPrice.selectedIndex > 0){
      showStock.innerHTML = "";
      const priceOpt = filterByPrice(stockCars);
      selectedStock = []
      selectedStock.push(priceOpt)
    } else{
        showStock.innerHTML = "";
        selectedStock = []
        selectedStock.push(stockCars)
    }
    displayItem(selectedStock[0]);
    stockCount.innerHTML = selectedStock[0].length
    return selectedStock[0];
  };

  async function showLowToHigh(stock){
    const current = await filterStock();
      const car = current.sort((a,b) => {
      return a.price - b.price
    })
    showStock.innerHTML = ""
    displayItem(car);
  };

  async function showHighToLow(stock){
    const current = await filterStock();
    const car = current.sort((a,b) => {
      return b.price - a.price
    })
    showStock.innerHTML = ""
    displayItem(car);
  };

  priceFilter.addEventListener("input", () => {
    if(priceFilter.selectedIndex === 1){
      showLowToHigh(selectedStock[0])
    } else {
      showHighToLow(selectedStock[0])
    }
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
      filterStock();
  });

//SHOW MORE DETAILS ON SELECTED CAR
  showStock.addEventListener("click", async (e) => {
    if(e.target.classList.contains("more-info")){
      modal.classList.replace("-z-10", "z-1");
      modal.classList.replace("opacity-0", "opacity-10");
      body.style.overflow = "hidden";
      const vehicleId = e.target.id;
      const selectedVehicle = stockCars.filter(vehicle => {
        return vehicle.id === vehicleId;
      });
      const displayedCar = displayFullCar(selectedVehicle[0]);
    }
  });

  //SHOW MODEL OPTION
  select.addEventListener("change", async () => {
    //CLEAR MODEL OPTION EACH TIME
    model.innerHTML = `<option value="">Any Model</option>`;
    const selectedMake = filterByMake(stockCars);
    selectedMake.forEach(make => {
      showModel(make)
    })
  });
});

//SHOW EACH VEHICLE
function displayItem(vehicle){
   vehicle.forEach((car) => {
    const {make, model, price, image, mileage, fuelType, transmission, year, id} = car;
    const stockCard = `
    <div class="stock-card bg-white rounded-md">
      <img src="${image}" class="w-full" alt="${make} ${model}">
      <div class="price-label bg-lightGrey text-white p-2 text-center font-orbitron"><p>£${price}</p></div>
      <div class="spec p-4 flex flex-col" data-id="${car.id}">
      <p class="text-center font-orbitron text-lg font-bold tracking-wide mb-4">${year} <br> ${make} ${model}</p>
        <ul>
          <li class="border-b-2 border-black p-1 flex justify-between">Year <span>${year}</span></li>
          <li class="border-b-2 border-black p-1 flex justify-between">Mileage <span>${mileage}</span></li>
          <li class="border-b-2 border-black p-1 flex justify-between">Fuel Type <span>${fuelType}</span></li>
          <li class="border-b-2 border-black p-1 flex justify-between">Gearbox <span>${transmission}</span></li>
        </ul>
        <button id="${id}" class="more-info bg-orange-600 p-2 mt-4 text-white rounded transition-all duration-500 hover:opacity-90 hover:text-black">View Vehicle</button>
      </div>
    </div>`;
    showStock.insertAdjacentHTML("beforeend", stockCard);
  })
};

function filterByMake(stock){
  return selectMake = stock.filter(vehicle => {
    return vehicle.make.toLowerCase() === select.value.toLowerCase();
  });
};

function filterByModel(stock){
  return selectModel = stock.filter(vehicle => {
    return models = vehicle.model.toLowerCase() === model.value.toLowerCase();
  })
};

function filterByPrice(stock){
  return selectPrice = stock.filter(vehicle => {
    return Number(vehicle.price) <= Number(selectedPrice.value);
  })
};

//SHOW MODEL OPTION FOR SELECTED MAKE
function showModel(item){
  const modelOpt = document.createElement("option");
  modelOpt.innerHTML = item.model;
  model.add(modelOpt);
};


const modal = document.querySelector(".car-modal");
const body = document.querySelector("body");

function displayFullCar(selectedCar){
  const {make, model, price, image, mileage, fuelType, transmission, year, id} = selectedCar;
  const fullDetails = `
  <div class="selected-details fixed overflow-y-auto text-black bg-white m-4 lg:w-3/4">
    <i onclick="closeModal()" class="close-modal absolute top-2 right-6 fas fa-times close text-orange-600 cursor-pointer text-2xl p-2"></i>
        <div class="p-4 md:flex">
          <div class="img-gallery w-full flex justify-center">
            <img src="${image}" class="" alt="${make} ${model}">
          </div>
          <div class="more-info p-4 text-center md:w-3/4">
            <h2 class="text-center m-4 text-2xl font-orbitron">${make} ${model} ${year}</h2>
            <h4 class="text-xl">£${price}</h4>
            <p class="p-2 mb-4 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ea adipisci tempore laborum hic unde cum, incidunt consequuntur reiciendis provident?
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ea adipisci tempore laborum hic unde cum, incidunt consequuntur reiciendis provident?</p>
            <div class="grid grid-cols-2">
              <button class="bg-darkGrey p-2 m-2">Finance</button>
              <button class="bg-darkGrey p-2 m-2">Part Exchange</button>
              <button class="bg-darkGrey p-2 m-2 col-span-2">Test Drive</button>
            </div>
          </div>
        </div>

      <div class="stats-chart bg-darkGrey p-4 text-white text-sm flex flex-col md:flex-row justify-around">
        <div class="stats-cards flex m-4">
          <ul class="">
            <li class="p-2">Year of Reg</li>
            <li class="p-2">Registration</li>
            <li class="p-2">Mileage</li>
          </ul>
          <ul class="">
            <li class="p-2">${year}</li>
            <li class="p-2">AA08 AXA</li>
            <li class="p-2">${mileage}</li>
          </ul>
        </div>
        <div class="stats-cards flex m-4">
          <ul class="">
            <li class="p-2">Engine Size</li>
            <li class="p-2">Transmission</li>
            <li class="p-2">Fuel Type</li>
          </ul>
          <ul class="">
            <li class="p-2">3.0l</li>
            <li class="p-2">${transmission}</li>
            <li class="p-2">${fuelType}</li>
          </ul>
        </div>
        <div class="stats-cards flex m-4">
          <ul class="">
            <li class="p-2">Color</li>
            <li class="p-2">Body Style</li>
            <li class="p-2">Trim Level</li>
          </ul>
          <ul class="">
            <li class="p-2">Black</li>
            <li class="p-2">Saloon</li>
            <li class="p-2">Exec</li>
          </ul>
        </div>
        <div class="stats-cards flex m-4">
          <ul class="">
            <li class="p-2">Insurance Group</li>
            <li class="p-2">Road Tax 6 Mths</li>
            <li class="p-2">Road Tax 12 Mths</li>
          </ul>
          <ul class="">
            <li class="p-2">45</li>
            <li class="p-2">£125</li>
            <li class="p-2">£275</li>
          </ul>
        </div>
      </div>
    </div>`
    modal.insertAdjacentHTML("beforeend", fullDetails);
};

function closeModal(){
  modal.classList.replace("z-1", "-z-10");
  modal.classList.replace("opacity-10", "opacity-0");
  body.style.overflow = "auto";
  const showing = document.querySelector(".selected-details");
  showing.remove();
};

// function filterById(stock){
//   return selectId = stock.filter(vehicle => {
//     return vehicle.id === vehicleId;
//   })
// };
