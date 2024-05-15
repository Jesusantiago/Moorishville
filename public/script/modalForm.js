

const showModal = (modalID) => {
    const modal = document.getElementById(modalID);
    modal.style.display = "block";

    const spans = modal.getElementsByClassName("close");
        for (let i = 0; i < spans.length; i++) {
            spans[i].onclick = function() {
                modal.style.display = "none";
            }
        }
    console.log(spans)

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
}

export default showModal;