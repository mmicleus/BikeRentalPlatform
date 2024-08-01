// var bikes = [
// {
//     infoPage : "https://vitusbikes.com/products/vitus-sentier-29-vr-mountain-bike",
//     model:"Vitus Sentier 29 VR",
//     price:35,
//     src:"https://storage.googleapis.com/cf-public-eu/biking-32277/media/264-2?t=1656628557608996",
//     type:"HardTail",
// },
// {
    
//     infoPage : "https://vitusbikes.com/products/vitus-sentier-29-vr-mountain-bike",
//     model:"Vitus Mythique 27 VRS",
//     price:45,
//     src:"https://storage.googleapis.com/cf-public-eu/biking-32277/media/264-3?t=1656628563687737",
//     type:"Full Suspension"
// }


// ]

var bikes = [];
var bookings = [];





// document.getElementById('start').min = getCurrentDate();
       




var booking = {
    
    time:'10:00 am - 1:00pm',
    date:getTodayDate(),
    // date:new Date().toString('YYYY-MM-DD'),
    quantity:1,

};



fetchBikes();
// displayBikeList();
// displayBikesDropdown();
// setMinDate();
// setDefaultValues();



//this object will store booking details



function setDefaultValues(){
    document.getElementById('dateTime').innerText = booking.time;
    document.getElementById('dateDisplay').innerText = booking.date;
    document.getElementById('quantityDisplay').innerText = booking.quantity
    document.getElementById('alertElem').style.display = 'none';
}


function setMinDate(){

    var dateElem = document.getElementById('start');
    dateElem.valueAsDate = new Date();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    
    if (dd < 10) {
    dd = '0' + dd;
    }
    
    if (mm < 10) {
    mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    dateElem.setAttribute("min", today);
}


function getTodayDate(){

  let date = new Date();

    return `${date.getFullYear()}-${formatMonth(date.getMonth() + 1)}-${formatDate(date.getDate())}`
}


function formatDate(date){

  if(date < 10) return `0${date}`
  else return date;

}


function formatMonth(month){
  if(month < 10) return `0${month}`
  else return month;
}
    
    
    


function getBikeHTML(bike){


    return `<div class="container">
        <h1>
            ${bike?.type } | €${ bike?.price } |
            <a href="${bike?.infoPage}">${ bike?.model }</a>
        </h1>

        <img src="${bike?.src}" alt="bike" />
         </div>` 
    
}





function displayBikeList(){

    var htmlCode='';
    var bikesContainer = document.getElementsByClassName('bikes-container')[0];

    for(i = 0;i < bikes.length; i++){
        htmlCode += getBikeHTML(bikes[i]);
    }

    bikesContainer.innerHTML = htmlCode;
}




function displayBikesDropdown(){
    
    var dropdown = document.getElementById('bikesDropdown');

    var htmlCode='<option value="select your bike">SELECT YOUR BIKE</option>';

    var bikeOptions = getBikeOptions(bikes);

    console.log(bikeOptions)

    for(i = 0;i < bikeOptions.length;i++){
        htmlCode += `<option value="${bikeOptions[i]}"> ${bikeOptions[i]} </option>`
    }

    dropdown.innerHTML = htmlCode;
}

function onBikeSelected(){

    
    document.getElementsByClassName('receipt')[0].style.display = 'block';



    booking.price = getBikePrice( document.getElementById('bikesDropdown').value,bikes );

    booking.model = document.getElementById('bikesDropdown').value;

    console.log(booking.price);


    
    document.getElementById('priceDisplay').innerText = booking.price;   

    
        booking.cost = booking.price * booking.quantity
        document.getElementById('subtotalDisplay').innerText = booking.cost;
}


function dateSelected(){
   // console.log(document.getElementById('start').value);


   // console.log(getFormattedDate(document.getElementById('start').value));

    booking.date = document.getElementById('start').value;

    console.log(booking.date);

    document.getElementById('dateDisplay').innerText = booking.date;
}



// --------------------------------- Booking form --------------------------------

function minus() {
    let quantityControl = document.getElementById('quantityInput');


    quantityControl.value = clampLow(Number.parseInt(quantityControl?.value) - 1, 0);


    //updating the UI
    booking.quantity = quantityControl.value;


    
    document.getElementById('quantityDisplay').innerText = booking.quantity;

    if(booking.price ){
        booking.cost = booking.price * booking.quantity
        document.getElementById('subtotalDisplay').innerText = booking.cost;
    }
}


function plus() {
    let quantityControl = document.getElementById('quantityInput');


    quantityControl.value = clampHigh( Number.parseInt(quantityControl?.value) + 1,8);


     //updating the UI
     booking.quantity = quantityControl.value;
     document.getElementById('quantityDisplay').innerText = booking.quantity;

     if(booking.price ){
        booking.cost = booking.price * booking.quantity
        document.getElementById('subtotalDisplay').innerText = booking.cost;
    }


  }


 function onTimeframeClicked(event) {
    let elem = event.target;

   var timeframes = document.getElementsByClassName('timeframe');


   for(i = 0;i < timeframes.length;i++){
    timeframes[i].classList.remove('selected');
   }

    


    elem.classList.add('selected');

    booking.time = elem.innerText;

    document.getElementById('dateTime').innerText = booking.time;
   // elem.classList.add('selected');

   // this.time = elem.textContent;

   // this.createBooking();
  }


 function createBooking() {
    this.booking.model = this.form.get('bikeOptions')?.value;

    this.booking.price = this.utilityService.getBikePrice(
      this.form.get('bikeOptions')?.value,
      this.bikes
    );

    this.booking.quantity = this.form.get('quantity')?.value;

    this.booking.cost = this.booking.price * this.booking.quantity;

    this.booking.date = this.utilityService.getFormattedDate(
      this.form.get('date')?.value
    );

    this.booking.time = this.time;

    console.log(this.booking);
  }



  function addToCart() {

        bookings.push(booking);

        addBookingToCart(bookings);

        booking = {
          quantity : booking.quantity,
          price : booking.price,
          model: booking.model,
          time: booking.time,
          date: booking.date,
          cost: booking.cost,

        };
        document.getElementById('alertElem').style.display='block';

        document.getElementById('bikeModelDisplay').innerText = booking.model;
  }

  function onAlertClose() {
        document.getElementById('alertElem').style.display='none';

   // this.notificationOn = false;
  }

  function viewCart() {
    this.router.navigate(['/cart']);

  }

  function addBookingToCart(bookings){
    localStorage.setItem('bookings',JSON.stringify(bookings));

   // document.getElementById('cartSizeDisplay').innerText = bookings.length;
  }




// ---------------------------------- Booking form --------------------------------------




// ----------------------------------- Backend -----------------------------------------



// ----------------------------------- Backend -----------------------------------------


function fetchBikes(){

    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                handleJSONData(this);
            }
        };
        xhttp.open("GET", "https://biking-80c26-default-rtdb.europe-west1.firebasedatabase.app/data.json", true);
        xhttp.send();
    

}


function handleJSONData(json) {

    var i;
    var jsonAsText = json.responseText;

    var json = JSON.parse(jsonAsText);

    bikes = json.bikes;

    displayBikeList();
    displayBikesDropdown();
    setMinDate();
    setDefaultValues();
}



// ----------------------------------- Backend ----------------------------------------




// -------------------------------------------------- Utility methods ----------------------------------------


  function getBikeOptions(bikes){
    let bikeTypes;
    let bikeOptions = [];

    bikeTypes = bikes?.map((bike) => bike.type);

    bikeTypes?.forEach((bike) => {
      bikeOptions?.push(bike + ' - ' + 'Small');
      bikeOptions?.push(bike + ' - ' + 'Medium');
      bikeOptions?.push(bike + ' - ' + 'Large');
    });

    return bikeOptions;
  }


  function clampLow(num, min) {
    return num < min ? min : num;
  }

  function clampHigh(num, max) {
    return num > max ? max : num;
  }


 function getCurrentDate() {
    let currentDate = new Date();

    let date = this.appendZero(currentDate.getDate().toString());
    let month = (currentDate.getMonth() + 1).toString();
    month = this.appendZero(month);
    let year = currentDate.getFullYear().toString();

    return `${year}-${month}-${date}`;
  }



  function getLaterDate(days) {
    const millisInDay = 86400000;

    let currentDate = new Date(new Date().getTime() + millisInDay * days);

    let date = this.appendZero(currentDate.getDate().toString());
    let month = (currentDate.getMonth() + 1).toString();
    month = this.appendZero(month);
    let year = currentDate.getFullYear().toString();

    return `${year}-${month}-${date}`;
  }



  function getBikePrice(
    option,
    bikes
  ) {
    let bike = bikes?.find((bike) => option.includes(bike.type));

    return bike?.price;
  }



  function getTotalCost(bikePrice, quantity) {
    return bikePrice * +quantity;
  }



  function getFormattedDate(date) {
    let dateObj = new Date(date);

    let dateParts = dateObj.toString().split(' ');
    let result;

    for (let i = 0; i < 4; i++) {
      if (i === 3) result += ', ';

      if(i === 0) continue;

      console.log(dateParts[i])
      result += dateParts[i] + ' ';
    }

    return result;
}






// ------------------------------------------- utility methods -----------------------------------------