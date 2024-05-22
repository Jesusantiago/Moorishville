import showModal from "./modalForm.js";
import { displayResultsOldBooks } from "./table.js";
import processPage from "./ProcessPage.js";


document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault()

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
    const pagePattern = /^([1-9](?:\s*[-,]\s*[1-9])*)(?:\s*[-,]\s*[1-9]\s*)*$/;

    if(!namePattern.test(name)){
        alert("Name input formt is incorrect.")
        return;
    }
    
    if(!pagePattern.test(page)){
        alert("Page input formt is incorrect.")
        return;
    }

    if (!name || !startDate || !endDate || !page) {
        showModal("incompleteFormModal")
        return;
    }
    
    const pages = processPage(page);

    fetch("../Backout/oldIndexBooks.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok " + response.statusText)
        }
        return response.json()
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
        }

        const results = jsonData.filter(item => {
            const nameMatch = !search.name || item.name.toLowerCase().includes(search.name)
            const dateMatch = (!search.startDate || new Date(item.date) >= new Date(search.startDate)) && (!search.endDate || new Date(item.date) <= new Date(search.endDate));
            const pageMatch = pages.length === 0 || pages.some(p => item.pages.some(ip => ip.page === p));
            const indexTypeMatch = !search.indexType || item.indexType.includes(search.indexType)
            const bookTypeMatch = !search.bookType || item.bookType.includes(search.bookType)
            const timeMatch = (mixed && item.mixed) || (temporary && item.mixed) || (either && item.either);
            return nameMatch && dateMatch && pageMatch && indexTypeMatch && bookTypeMatch && timeMatch
        }).map(item => {
            return {
                ...item,
                pages: item.pages.filter(p => pages.includes(p.page))
            };
        });

        if (results.length === 0) {
            showModal("noResultsModal");
        } else {
            displayResultsOldBooks(results);
            document.getElementById("discreimer").style.display = "none"
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

)