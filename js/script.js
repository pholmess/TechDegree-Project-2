//Treehouse Techdegree: FSJS Project 2 - Data Pagination and Filtering

//Sherri Holmes
//Going for EXCEEDS


//Here are my global variables 
const itemsPerPage = 9;
const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");
const header = document.querySelector(".header");

//This is my showPage function with list and page parameters
function showPage(list, page) {

    //variables to set minimum & maximum displayed per page
    const startIndex = (page * itemsPerPage) - itemsPerPage;
    const endIndex = page * itemsPerPage;

    //select UL element and set HTML content to an empty string  
    studentList.innerHTML = "";

    //Using a for loop to loop over the list parameter 
    for (let i = 0; i < list.length; i++) {

        //Added a conditional statement to check if the current index is >= start index & < end index
        if (i >= startIndex && i < endIndex) {

            //Create the DOM elements to display the information for each student 
            const studentItem =
                `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`;

            //insterting the elements to the student-list variable         
            studentList.insertAdjacentHTML("beforeend", studentItem);
        }
    }
}

//My addPagination function that accepts a single list parameter to rep student data as an argument
function addPagination(list) {

    //varialbe to receive the total number of pages to display
    const numOfPgs = Math.ceil(list.length / itemsPerPage);
    linkList.innerHTML = "";

    //looping over the variable for number of pages needed
    for (let i = 1; i <= numOfPgs; i++) {

        //Creating the DOM elements to display pagination buttons
        const button = `<li>
         <button type="button">${i}</button>
      </li>`;

        //insterting the elements into the linkList variable   

        linkList.insertAdjacentHTML("beforeend", button);
        const buttonClassName = document.querySelector(".link-list button");
        buttonClassName.className = "active";
    }

    //Adding an event listener to listen for button clicks
    linkList.addEventListener("click", (e) => {
        const changeButton = e.target;

        //changing the active class from other buttons and adding to the pagination button
        if (changeButton.tagName === "BUTTON") {
            const prevActiveButton = document.querySelector("button.active");
            prevActiveButton.classList.remove("active");
            changeButton.className = "active";
            showPage(list, changeButton.textContent);
        }
    });
}

//Dynamically create and add the search bar using current css properties

const searchBar =
    `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

header.insertAdjacentHTML("beforeend", searchBar);

//Created a function to filter data that will retrieve search values
function showSearchValues(usersSearch, list) {
    const searchList = [];
    for (let i = 0; i < list.length; i++) {
        const fullName = `${list[i].name.first} ${list[i].name.last}`.toLowerCase();
        //compares user input to object literal from above
        if (fullName.includes(usersSearch.toLowerCase())) {
            //must use push method in order to populate page with matching data
            searchList.push(list[i]);
        }
    }
    return searchList;
}

//Created a function to filter empty values and no results
function searchFunc(usersSearch) {
    const matchSearch = showSearchValues(usersSearch, data);
    studentList.innerHTML = "";
    linkList.innerHTML = "";
    if (matchSearch.length === 0) {
        studentList.innerHTML = `<div><h2 style="font-size: 25px">No results found.</h2></div>`;
    } else {
        showPage(matchSearch, 1);
        addPagination(matchSearch);
    }
}

//"keyup" event listener to filter search
search.addEventListener("keyup", () => {
    search = document.querySelector("#search");

    //Used trim method to return results if blank spaces-info from MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)

    searchFunc(search.value.trim());
});

//calling all functions
showPage(data, 1);
addPagination(data);