var firstNameInput = document.getElementById('firstNameInput');
var firstNameFormatError = document.getElementById('firstNameFormatError')
var firstNameRequiredError = document.getElementById('firstNameRequiredError')

var surnameInput = document.getElementById('surnameInput');
var surnameFormatError = document.getElementById('surnameFormatError')
var surnameRequiredError = document.getElementById('surnameRequiredError')

var emailInput = document.getElementById('emailInput');
var emailFormatError = document.getElementById('emailFormatError')
var emailRequiredError = document.getElementById('emailRequiredError')

var phoneInput = document.getElementById('phoneInput');
var phoneFormatError = document.getElementById('phoneFormatError')
var phoneRequiredError = document.getElementById('phoneRequiredError')





var bookingsContainer = document.getElementsByClassName('bookings-container')[0];

var totalDisplay = document.getElementById('totalDisplay');
var bookings = [];
var details = {};

firstNameFormatError.style.display = "none"
firstNameRequiredError.style.display = "none"

surnameFormatError.style.display = "none"
surnameRequiredError.style.display = "none"

emailFormatError.style.display = "none"
emailRequiredError.style.display = "none"

phoneFormatError.style.display = "none"
phoneRequiredError.style.display = "none"





loadBookings();

function loadBookings(){

    bookings = JSON.parse(localStorage.getItem('bookings'));

    var htmlcode = generateBookingsHTML(bookings);

    bookingsContainer.innerHTML = htmlcode;
    totalDisplay.innerText = computeTotal(bookings);

}


function generateBookingsHTML(bookings){

    var htmlcode='';

    for(i = 0;i < bookings.length;i++){
        htmlcode += generateBookingHTML(bookings[i]);
    }

  return htmlcode;

    
}


function generateBookingHTML(booking){


    return `<div class="container booking">
  <h1>
    <span>${booking.model}</span>
    <span>€ ${booking?.cost?.toFixed(2) }</span>
  </h1>

  <span> ${booking?.date}</span>
  <br />
  <span>${booking?.time}</span>

  <p class="quantity">
    <span class="fw-bold">Quantity:</span> ${booking?.quantity} @ € ${booking?.price}
  </p>


</div>

<br />`;
}


function computeTotal(bookings){

    var sum = 0;

    for(i = 0;i < bookings.length;i++){
        sum += bookings[i].cost;
    }

    return sum;
}


/* ------------------------- booking form --------------------------------- */

function onFirstNameInput(){
    details.firstName = firstNameInput.value;

    validateFirstName();
    console.log(details.firstName)
}

function onSurnameInput(){
    details.surname = surnameInput.value;

    validateSurname();
}

function onEmailInput(){
    details.email = emailInput.value;

    validateEmail();
}

function onPhoneInput(){
    details.phone = phoneInput.value;

    validatePhoneNumber();
}

function onSubmit(){

    validateFirstName();
    validateSurname();
    validateEmail();
    validatePhoneNumber();

    if(details.firstName && details.surname && details.email && details.phone) {

        postBookings();
    } 
}



// ----------------------- email service -----------------------------

// function sendEmail(){
//     var email = details.email;



//     //console.log('will send email to ' + email)


// }



// function sendMail(name, email, subject,bookings) {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.set('Authorization', 'Basic ' + btoa('3cd0c34f349d14ae248d6747c8b7521b'+":" +'96c3cfc9f0c5decd6aad3d4c23337919'));
  
//     const data = JSON.stringify({
//       "Messages": [{
//         "From": {"Email": "miclemarian5@gmail.com", "Name": "Marik"},
//         "To": [{"Email": email, "Name": name}],
//         "Subject": subject,
//         "TextPart": generateEmailText(bookings)
//       }]
//     });
  
//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       mode:'no-cors',
//       body: data,
//     };
  
//     fetch("https://api.mailjet.com/v3/send", requestOptions)
//       .then(response => response.text())
//       .then(result => {
//         console.log(result);
//        // window.location.href = "./success.html";

//       })
//       .catch(error => console.log('error', error));
//   }
  




// function generateEmailText(bookings){
// var text = `<h3>Thank you for your booking!</h3>`

// for(i = 0;i < bookings.length;i++){
// text += getFormattedBooking(bookings[i]);
// }

// return text;
// }




// function getFormattedBooking(booking){
// return `<br><b>model<b>: ${booking.model} <br> <b>quantity</b>: ${booking.quantity} <br> <b>cost</b>: ${booking.cost} <br> <b>date</b>: ${booking.date} <br> <b>time</b>: ${booking.time} <br><br>`
// }




function postBookings(){


    var dataToSend = {
        bookings: bookings,
        userDetails:details

    }

    var stringToSend = JSON.stringify(dataToSend);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            handleJSONResponse(this,dataToSend);
        }
    };
    xhttp.open("POST", "https://biking-80c26-default-rtdb.europe-west1.firebasedatabase.app/data.json", true);
    xhttp.send(stringToSend);
}


function handleJSONResponse(json,dataToSend){

   // sendMail(dataToSend.userDetails.firstName,dataToSend.userDetails.email,'BikeRental booking confirmation',dataToSend.bookings)

    window.location.href = "./success.html";
    // var i;
    // var jsonAsText = json.responseText;

    // var json = JSON.parse(jsonAsText);

    // bikes = json.bikes;

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




/* ----------------------- booking form ------------------------------------ */





{/* <a class="remove-btn" (click)="onRemove()">Remove</a> */}


//-------------- Validation methods -----------


function validateFirstName(){
    var valid = true;

    if(!details.firstName || details.firstName==""){
        firstNameRequiredError.style.display="inline";
        valid = false;
    }else{
        firstNameRequiredError.style.display="none";
    }

    if(!firstNameContainsOnlyLetters(details.firstName)){
        console.log("doesn't contain only letters")
        firstNameFormatError.style.display="inline";
        valid = false;
    }else{
        console.log("contains only letters")
        firstNameFormatError.style.display="none";
    }

    return valid;
}



function validateSurname(){
    var valid = true;

    if(!details.surname || details.surname==""){
        surnameRequiredError.style.display="inline";
        valid = false;
    }else{
        surnameRequiredError.style.display="none";
    }

    if(!surnameContainsOnlyLetters(details.surname)){
        console.log("doesn't contain only letters")
        surnameFormatError.style.display="inline";
        valid = false;
    }else{
        console.log("contains only letters")
        surnameFormatError.style.display="none";
    }

    return valid;
}


function firstNameContainsOnlyLetters(name){

    if(!details.firstName || details.firstName=="") return true;

    if (/^[a-zA-Z]+$/.test(name)) {
        // code
        return true;
        
     }

     return false;
}

function surnameContainsOnlyLetters(name){

    if(!details.surname || details.surname=="") return true;

    if (/^[a-zA-Z]+$/.test(name)) {
        // code
        return true;
        
     }

     return false;
}


function validateEmail(){

    var valid = true;

    if(!details.email || details.email == ""){
        emailRequiredError.style.display="inline";
        valid = false;
    }
    else{
        emailRequiredError.style.display="none";
    }


    if(!isValidEmail(details.email)){
        emailFormatError.style.display="inline";
        valid = false;
    }else{
        emailFormatError.style.display="none";
    }
}



function validatePhoneNumber(){
    var valid = true;

    if(!details.phone || details.phone == ""){
        phoneRequiredError.style.display="inline";
        valid = false;
    }
    else{
        phoneRequiredError.style.display="none";
    }


    if(!isValidPhoneNumber(details.phone)){
        phoneFormatError.style.display="inline";
        valid = false;
    }else{
        phoneFormatError.style.display="none";
    }
}




function isValidEmail(email){

    if(!details.email || details.email =="") return true;


    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(email);
}


function isValidPhoneNumber(phone){

    if(!details.phone || details.phone =="") return true;


    var re = /^(0[124-9]\d{0,2})\d{7}$/;

    return re.test(phone);
}









// function onFirstNameInput(){
//     details.firstName = firstNameInput.value;
//     console.log(details.firstName)
// }

// function onSurnameInput(){
//     details.surname = surnameInput.value;
// }

// function onEmailInput(){
//     details.email = emailInput.value;
// }

// function onPhoneInput(){
//     details.phone = phoneInput.value;
// }