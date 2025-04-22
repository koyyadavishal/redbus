 // User Authentication
 let currentUser = null;

 function showSignup() {
     document.getElementById('loginForm').style.display = 'none';
     document.getElementById('signupForm').style.display = 'block';
 }

 function showLogin() {
     document.getElementById('signupForm').style.display = 'none';
     document.getElementById('loginForm').style.display = 'block';
 }

 function signup() {
     const user = {
         name: document.getElementById('signupName').value,
         email: document.getElementById('signupEmail').value,
         password: document.getElementById('signupPassword').value
     };
     localStorage.setItem(user.email, JSON.stringify(user));
     showLogin();
 }

 function login() {
     const email = document.getElementById('loginEmail').value;
     const password = document.getElementById('loginPassword').value;
     const user = JSON.parse(localStorage.getItem(email));
     
     if(user && user.password === password) {
         currentUser = user;
         document.getElementById('authSection').style.display = 'none';
         document.getElementById('searchSection').style.display = 'block';
     } else {
         alert('Invalid credentials!');
     }
 }
 function guestLogin() {
 currentUser = { name: "Guest" };
 document.getElementById('authSection').style.display = 'none';
 document.getElementById('searchSection').style.display = 'block';
}

function forgotPassword() {
 const email = prompt("Enter your registered email:");
 if (localStorage.getItem(email)) {
     alert("Your password is: " + JSON.parse(localStorage.getItem(email)).password);
 } else {
     alert("Email not found!");
 }
}

 // Bus Search and Booking Logic
 function searchBuses() {
 const fromCity = document.getElementById('fromCity').value;
 const toCity = document.getElementById('toCity').value;

 const sampleBuses = [
{ id: 1, name: "Express Bus", from: fromCity, to: toCity, time: "08:00 AM", price: "₹250", seats: 20 },
{ id: 2, name: "Luxury Bus", from: fromCity, to: toCity, time: "09:30 AM", price: "₹480", seats: 15 },
{ id: 3, name: "Comfort Coach", from: fromCity, to: toCity, time: "11:00 AM", price: "₹320", seats: 18 },
{ id: 4, name: "Super Saver", from: fromCity, to: toCity, time: "12:45 PM", price: "₹210", seats: 22 },
{ id: 5, name: "Speedster Travels", from: fromCity, to: toCity, time: "02:15 PM", price: "₹350", seats: 17 },
{ id: 6, name: "Metroline Deluxe", from: fromCity, to: toCity, time: "03:30 PM", price: "₹400", seats: 10 },
{ id: 7, name: "GreenLine AC", from: fromCity, to: toCity, time: "05:00 PM", price: "₹500", seats: 12 },
{ id: 8, name: "City Express", from: fromCity, to: toCity, time: "06:45 PM", price: "₹275", seats: 19 },
{ id: 9, name: "Sunrise Travels", from: fromCity, to: toCity, time: "08:30 PM", price: "₹390", seats: 14 },
{ id: 10, name: "Night Rider", from: fromCity, to: toCity, time: "10:00 PM", price: "₹220", seats: 25 },
{ id: 11, name: "Red Arrow", from: fromCity, to: toCity, time: "11:15 PM", price: "₹305", seats: 16 },
{ id: 12, name: "Royal AC Sleeper", from: fromCity, to: toCity, time: "12:30 AM", price: "₹460", seats: 13 }
];


 const busList = document.getElementById('busList');
 busList.innerHTML = sampleBuses.map(bus => `
     <div class="col-md-6 mb-4">
         <div class="card">
             <div class="card-body">
                 <h5>${bus.name}</h5>
                 <p>${bus.from} to ${bus.to}</p>
                 <p>Departure: ${bus.time}</p>
                 <p>Price: $${bus.price}</p>
                 <button class="btn btn-primary" onclick="showSeatSelection(${bus.id})">Book Now</button>
             </div>
         </div>
     </div>
 `).join('');
}



 function showSeatSelection(busId) {
     document.getElementById('searchSection').style.display = 'none';
     document.getElementById('seatSelection').style.display = 'block';
     
     const seatMap = document.getElementById('seatMap');
     seatMap.innerHTML = '';
     
     for(let i = 1; i <= 20; i++) {
         const seat = document.createElement('div');
         seat.className = `seat ${Math.random() < 0.3 ? 'occupied' : ''}`;
         seat.textContent = i;
         if(!seat.classList.contains('occupied')) {
             seat.addEventListener('click', () => toggleSeatSelection(seat));
         }
         seatMap.appendChild(seat);
     }
 }

 function toggleSeatSelection(seat) {
     seat.classList.toggle('selected');
 }

 function showPassengerForm() {
     const selectedSeats = document.querySelectorAll('.selected').length;
     const passengerFields = document.getElementById('passengerFields');
     passengerFields.innerHTML = '';
     
     for(let i = 1; i <= selectedSeats; i++) {
         passengerFields.innerHTML += `
             <div class="mb-3">
                 <h5>Passenger ${i}</h5>
                 <input type="text" class="form-control mb-2" placeholder="Name">
                 <input type="number" class="form-control mb-2" placeholder="Age">
                 <select class="form-select mb-2">
                     <option>Male</option>
                     <option>Female</option>
                     <option>Other</option>
                 </select>
             </div>
         `;
     }
     
     document.getElementById('seatSelection').style.display = 'none';
     document.getElementById('passengerForm').style.display = 'block';
 }

 function confirmBooking() {
     document.getElementById('passengerForm').style.display = 'none';
     document.getElementById('ticketSection').style.display = 'block';
     
     const ticketDetails = document.getElementById('ticketDetails');
     ticketDetails.innerHTML = `
         <p><strong>Booking ID:</strong> ${Math.floor(Math.random() * 1000000)}</p>
         <p><strong>Passenger Name:</strong> ${currentUser.name}</p>
         <p><strong>Travel Date:</strong> ${document.getElementById('travelDate').value}</p>
         <p><strong>Total Seats:</strong> ${document.querySelectorAll('.selected').length}</p>
         <p><strong>Total Fare:</strong> $${document.querySelectorAll('.selected').length * 25}</p>
     `;
 }
    // Modify confirmBooking function to show payment section
    function confirmBooking() {
     document.getElementById('passengerForm').style.display = 'none';
     document.getElementById('paymentSection').style.display = 'block';
 }

 // Add new payment functions
 function processPayment() {
     const cardNumber = document.getElementById('cardNumber').value;
     const expiryDate = document.getElementById('expiryDate').value;
     const cvv = document.getElementById('cvv').value;
     const cardHolder = document.getElementById('cardHolder').value;

     if(!validatePayment(cardNumber, expiryDate, cvv, cardHolder)) {
         alert('Please fill all payment details correctly!');
         return;
     }

     // Mock payment processing
     setTimeout(() => {
         document.getElementById('paymentSection').style.display = 'none';
         document.getElementById('ticketSection').style.display = 'block';
         generateTicket();
     }, 1000);
 }

 function validatePayment(cardNumber, expiryDate, cvv, cardHolder) {
     return cardNumber.length === 16 &&
            /^\d{2}\/\d{2}$/.test(expiryDate) &&
            cvv.length === 3 &&
            cardHolder.trim() !== '';
 }

 function cancelPayment() {
     document.getElementById('paymentSection').style.display = 'none';
     document.getElementById('searchSection').style.display = 'block';
 }

 // Update generate ticket function
 function generateTicket() {
     const cardHolderName = document.getElementById('cardHolder').value;
     const ticketDetails = document.getElementById('ticketDetails');
     ticketDetails.innerHTML = `
         <p><strong>Booking ID:</strong> ${Math.floor(Math.random() * 1000000)}</p>
            <p><strong>Passenger Name:</strong> ${cardHolderName}</p>
         <p><strong>Travel Date:</strong> ${document.getElementById('travelDate').value}</p>
         <p><strong>Total Seats:</strong> ${document.querySelectorAll('.selected').length}</p>
         <p><strong>Total Fare:</strong> ₹:${document.querySelectorAll('.selected').length * 500}</p>
         <p><strong>Payment Status:</strong> Paid</p>
         <p><strong>Transaction ID:</strong> TXN${Math.floor(Math.random() * 1000000000)}</p>
     `;
 }
 
 
 function downloadTicket() {
const ticket = document.querySelector('.ticket');

html2canvas(ticket).then(canvas => {
 const link = document.createElement('a');
 link.download = 'ticket.png';
 link.href = canvas.toDataURL('image/png');
 link.click();
});
}

 // Logout
 document.getElementById('logout').addEventListener('click', () => {
     currentUser = null;
     location.reload();
 });