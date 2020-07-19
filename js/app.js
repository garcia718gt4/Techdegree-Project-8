// global variables
let employees = []; 
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob, &noinfo, &nat=US';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalText = document.querySelector('.modal-text');
const modalClose = document.querySelector('.modal-close');

// fetch data from API 
fetch(urlAPI)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
 


// Display the employees to the HTML  
function displayEmployees(employeeData) {
    employees = employeeData; 
    
    // the employeeHTML will contain the markup for the employee elements
    let employeeHTML = '';

    // loop thru each employee and create HTML markup 
    employees.forEach((employee, index) => {
        let name = employee.name; 
        let email = employee.email; 
        let city = employee.location.city; 
        let picture = employee.picture; 
    
        employeeHTML += `
            <div class='card' data-index='${index}'>
                <img class='avatar' src='${picture.large}'>
                <div class='text-container'>
                    <h2 class='name'>${name.first} ${name.last}</h2>
                    <p class='email'>${email}</p>
                    <p class='city'>${city}</p>
                </div>
            </div>`
    });

    gridContainer.innerHTML = employeeHTML; 
}


// Display the modal view 
function displayModal(index) {
    
    // use object destructuring to make the template literal cleaner
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture } =
    employees[index]; 

    let date = new Date(dob.date);
    
    const modalHTML = `
        <img class='avatar' src='${picture.large}'>
        <div class='text-container'>
            <h2 class='name'>${name.first} ${name.last}</h2>
            <p class='email'>${email}</p>
            <p class='city'>${city}</p>
            <hr />
            <p>${phone}</p>
            <p class='address'>1820 Washington Ave, ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>`;

            overlay.classList.remove('hidden');
            modalText.innerHTML = modalHTML;
}


// Event Listeners
gridContainer.addEventListener('click', e => {
    
    // to make sure the click was not on the grid container itself 
    if(e.target !== gridContainer) {
        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest('.card'); 
        // get the data-index attr from the card to pass to the displayModal func
        const index = card.getAttribute('data-index');

        displayModal(index); 
    }
});

// Add the hidden class to the modal overlay
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
}); 

