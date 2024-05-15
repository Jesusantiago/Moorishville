

const showModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
}

export default showModal;