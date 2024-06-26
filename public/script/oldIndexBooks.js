import showModal from "./modalForm.js";
import { displayResultsOldBooks } from "./table.js";
import processPage from "./ProcessPage.js";

//@funtion {searchButton#click} - Listen to the click event of the html form when the user does the search.
//@regex {pagePattern} - regex expression that checks the text input of the name. 
//@regex {namePattern} - regex expression that checks the text input of the page.
    //Rules:
    //- Any number value.
    //- May contain , or - to separate numbers
// @funtion {results} - Compares all data entered with the data stored in the database
// @comp {showModal} - Activates the modal to display when an error occurs with the search.
// @comp {displayResultsReal} - Displays the results returned by the results function
// @funtion {processPage} - Evaluates and separates all values of the input numbers

document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("resultsTable").style.display = "none"
    const name = document.getElementById("name-old").value.toLowerCase();
    const startDate = document.getElementById("start-date-old").value;
    const endDate = document.getElementById("end-date-old").value;
    const page = document.getElementById("page-old").value;
    const indexType = document.getElementById("indexType-old").value;
    const bookType = document.getElementById("bookType-old").value;
    const mixed = document.getElementById("mixed-old").checked;
    const temporary = document.getElementById("temporary-old").checked;
    const either = document.getElementById("either-old").checked;

    const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;
    const pagePattern = /^(?:[1-9]\d*|\d+)(?:\s*-\s*(?:[1-9]\d*|\d+)|,\s*(?:[1-9]\d*|\d+))*$/;

    if (!namePattern.test(name)) {
       showModal("errorInputName");
        return;
    }

    let pages = [];
    if (page.length > 0 && page !== "0") {
        if (!pagePattern.test(page)) {
            showModal("errorInputPages")
            return;
        }
        pages = processPage(page);
    }

    if (!name || !startDate || !endDate || !indexType || !bookType) {
        showModal("incompleteFormModal");
        return;
    }

    fetch("../Backout/oldIndexBooks.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(jsonData => {
            let search = {
                name,
                startDate,
                endDate,
                pages,
                indexType,
                bookType,
                time: {
                    mixed,
                    temporary,
                    either
                }
            };

            const results = jsonData.filter(item => {
                const nameMatch = !search.name || item.name.toLowerCase() === search.name;
                const dateMatch = (!search.startDate || new Date(item.date) >= new Date(search.startDate)) && (!search.endDate || new Date(item.date) <= new Date(search.endDate));
                const pageMatch = search.pages.length === 0 || search.pages.some(p => item.pages.some(ip => ip.page === p));
                const indexTypeMatch = !search.indexType || item.indexType.includes(search.indexType);
                const bookTypeMatch = !search.bookType || item.bookType.includes(search.bookType);
                const timeMatch = (mixed && item.mixed) || (temporary && item.temporary) || (either && item.either);

                return nameMatch && dateMatch && pageMatch && indexTypeMatch && bookTypeMatch && timeMatch;
            }).map(item => {
                return {
                    ...item,
                    pages: search.pages.length === 0 ? item.pages : item.pages.filter(p => search.pages.includes(p.page))
                };
            });

            if (results.length === 0) {
                showModal("noResultsModal");
            } else {
                displayResultsOldBooks(results);
                document.getElementById("discreimer").style.display = "none";
            }
        })
        .catch(error => {
            showModal("errorFetch")
            console.error('Error fetching JSON:', error)
        });
});




























// import showModal from "./modalForm.js";
// import { displayResultsOldBooks } from "./table.js";
// import processPage from "./ProcessPage.js";


// document.getElementById("searchButton").addEventListener("click", (e) => {
//     e.preventDefault()
//     console.log("+------------------------------------------+")
//     const name = document.getElementById("name-old").value.toLowerCase();
//     const startDate = document.getElementById("start-date-old").value;
//     const endDate = document.getElementById("end-date-old").value;
//     const page = document.getElementById("page-old").value;
//     const indexType = document.getElementById("indexType-old").value;
//     const bookType = document.getElementById("bookType-old").value;
//     const mixed = document.getElementById("mixed-old").checked;
//     const temporary = document.getElementById("temporary-old").checked;
//     const either = document.getElementById("either-old").checked;

//     const namePattern = /^[A-Za-z]+( [A-Za-z]+)?$/;
//     const pagePattern = /^([1-9](?:\s*[-,]\s*[1-9])*)(?:\s*[-,]\s*[1-9]\s*)*$/;

//     if(!namePattern.test(name)){
//     alert("Name input formt is incorrect.")
//     return;
//     }

//     if (!pagePattern.test(page)) {
//         alert("Page input formt is incorrect.")
//         return;
//     }

//     if (!name || !startDate || !endDate || !page) {
//         showModal("incompleteFormModal")
//         return;
//     }

//     const pages = processPage(page);

//     fetch("../Backout/oldIndexBooks.json")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok " + response.statusText)
//             }
//             return response.json()
//         })
//         .then(jsonData => {

//             let search = {
//                 name,
//                 startDate,
//                 endDate,
//                 pages,
//                 indexType,
//                 bookType,
//                 time: {
//                     mixed,
//                     temporary,
//                     either
//                 }
//             }

//             const results = jsonData.filter(item => {
//                 const nameMatch = !search.name || item.name.toLowerCase() === search.name
//                 const dateMatch = (!search.startDate || new Date(item.date) >= new Date(search.startDate)) && (!search.endDate || new Date(item.date) <= new Date(search.endDate));
//                 const pageMatch = pages.length === 0 || pages.some(p => item.pages.some(ip => ip.page === p));
//                 const indexTypeMatch = !search.indexType || item.indexType.includes(search.indexType)
//                 const bookTypeMatch = !search.bookType || item.bookType.includes(search.bookType)
//                 const timeMatch = (mixed && item.mixed) || (temporary && item.temporary) || (either && item.either);

//                 return nameMatch && dateMatch && pageMatch && indexTypeMatch && bookTypeMatch && timeMatch
//             }).map(item => {
//                 return {
//                     ...item,
//                     pages: item.pages.filter(p => pages.includes(p.page))
//                 };
//             });
//             console.log(results)
//             if (results.length === 0) {
//                 showModal("noResultsModal");
//             } else {
//                 displayResultsOldBooks(results);
//                 document.getElementById("discreimer").style.display = "none"
//             }
//         })
//         .catch(error => console.error('Error fetching JSON:', error));
// }

// )