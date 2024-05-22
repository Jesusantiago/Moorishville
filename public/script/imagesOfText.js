import processPage from "./ProcessPage.js";
import showModal from "./modalForm.js";
import { displayResultsImages } from "./table.js";

console.log("images of text")

document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault()

    const type = document.getElementById("deedType-images").value;
    const book = document.getElementById("bookName-images").value.toLowerCase();
    const page = document.getElementById("page-images").value;

    const namePattern = /^[A-Za-zÀ-ÿ\s]{1,100}$/;
    const pagePattern = /^([1-9](?:\s*[-,]\s*[1-9])*)(?:\s*[-,]\s*[1-9]\s*)*$/;

    if(!namePattern.test(book)){
        alert("Name input formt is incorrect.")
        return;
    }
    
    if(!pagePattern.test(page)){
        alert("Page input formt is incorrect.")
        return;
    }

    if(!type || !book || !page){
        showModal("incompleteFormModal")
        return
    }

    const pages = processPage(page);

    fetch("../Backout/imagesOfText.json")
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not ok " + response.statusText)
        }
        return response.json()
    })
    .then(jsonData => {

        let search = {
            type,
            book,
            pages
        }
        console.log(search)

        const results = jsonData.filter(item => {
            const typeMatch = !search.type || item.type.includes(search.type)
            console.log(typeMatch)
            const bookMatch = !search.book || item.book.toLowerCase().includes(search.book)
            const pagesMatch = pages.length === 0 || pages.some(p => item.pages.some(ip => ip.page === p))

            return  typeMatch && bookMatch && pagesMatch
        }).map(item => {
            return {
                ...item,
                pages: item.pages.filter(p => pages.includes(p.page))
            }
        })

        if ( results.length === 0){
            showModal("noResultsModal")
        }else {
            displayResultsImages(results)
            document.getElementById("discreimer").style.display = "none"
        }
        
        console.log(results)        
    })
    .catch(err => console.log("Error Fetch JSON: ", err))
})