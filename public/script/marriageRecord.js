import showModal from "./modalForm.js"
import { displayResultsMarriageTwo, displayResultsOldBooks } from "./table.js"

//@funtion {searchButton#click} - Listen to the click event of the html form when the user does the search.
//@regex {namePattern} - regex expression that checks the text input of the name. 
// @funtion {results} - Compares all data entered with the data stored in the database
// @comp {showModal} - Activates the modal to display when an error occurs with the search.
// @comp {displayResultsReal} - Displays the results returned by the results function

document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault()
    
    document.getElementById("resultsTable").style.display = "none"
    const nameOne = document.getElementById("nameOne-marriage").value.toLowerCase();
    const nameTwo = document.getElementById("nameTwo-marriage").value.toLowerCase();
    const date = document.getElementById("date-marriage").value 


    const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;

    if(!namePattern.test(nameOne)){
        showModal("errorInputName")
        return
    }
    if(!nameTwo.value === ""){
        if(!namePattern.test(nameTwo)){
            showModal("errorInputName")
            return
    }
    }

    fetch("../Backout/marriageRecords.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok " + response.statusText)
        }

        return response.json()
    })
    .then(jsonData => {
        let search = {
            nameOne,
            nameTwo,
            date
        }

        const results = jsonData.filter(item=> {
            const nameOneMatch = search.nameOne && item.name.toLowerCase() == search.nameOne
            const nameTwoMatch = search.nameTwo && item.name.toLowerCase().includes(search.nameTwo)
            const dateMatch = new Date(item.date).toISOString().split('T')[0] === new Date(search.date).toISOString().split('T')[0];
            return dateMatch && (nameOneMatch || nameTwoMatch)
        })

        let values = []
        if (search.nameTwo) {
            let [userOne, userTwo] = results;
            const { pages : pagesOne } = userOne
            const { pages : pagesTwo } = userTwo
            
            for( const valueOne of pagesOne){
                for ( const valueTwo of pagesTwo){
                        if(valueOne.page == valueTwo.page){
                            values.push(valueTwo)
                        }
                }
            }   
        }

        if (results.length === 0) {
            showModal("noResultModal");
        } else if(values.length === 0) {
            displayResultsOldBooks(results);
            document.getElementById("discreimer").style.display = "none";
        } else {
            displayResultsMarriageTwo(values)
            document.getElementById("discreimer").style.display = "none";
        }

    }).catch(err=> {
        showModal("errorFetch")
        console.log("Error fetching JSON: ", err)
    })
})