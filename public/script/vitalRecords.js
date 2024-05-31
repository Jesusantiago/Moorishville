import showModal from "./modalForm.js";
import { displayResultsReal } from "./table.js";

//@funtion {searchButton#click} - Listen to the click event of the html form when the user does the search.
//@regex {pagePattern} - regex expression that checks the text input of the name. 
//@regex {pagePattern} - regex expression that checks the text input of the name. 
// @funtion {results} - Compares all data entered with the data stored in the database
// @comp {showModal} - Activates the modal to display when an error occurs with the search.
// @comp {displayResultsReal} - Displays the results returned by the results function


document.getElementById("searchButton").addEventListener("click" , (e) => {
    e.preventDefault()

    document.getElementById("resultsTable").style.display = "none"
    const name = document.getElementById("name-vital").value.toLowerCase();
    const date = document.getElementById("date-vital").value;
    const type = document.getElementById("type-vital").value;

    const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;
    if(!namePattern.test(name)){
        showModal("errorInputName")
        return;
    }

    if(!name || !date || !type) {
        showModal("incompleteFormModal");
        return
    }

    fetch("../Backout/vitalRecords.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok " + response.statusText)
        }

        return response.json()
    })
    .then(jsonData => {
        let search = { name, date, type }

        const results = jsonData.filter(item => {
            const nameMatch = !search.name || item.name.toLowerCase().includes(search.name)
            const dateMatch = !search.date || new Date(item.date).toISOString().split('T')[0] === new Date(search.date).toISOString().split('T')[0];
            const typeMatch = !search.type || item.type.includes(search.type)

            return nameMatch && dateMatch && typeMatch
        })

        if(results.length === 0){
            showModal("noResultsModal")
        } else {
            displayResultsReal(results)
            document.getElementById("discreimer").style.display = "none"
        }
    })
    .catch(err => {
        showModal("errorFetch")
        console.log("Error fetching JSON: " + err)
    })
})