import showModal from "./modalForm.js";

class formValidator {
    constructor(form, fields){
        this.form = form
        this. fields = fields
    }

    initialize() {
        this.validateOnEntry()
        this.validateOnSubmit()
    }

    validateOnSubmit(){
        let self = this
        console.log("ValidateOnSubmit")

        self.form.addEventListener("submit", e => {
            e.preventDefault()
            let isFormValid = true;

            self.fields.forEach(el => {
                const input = document.getElementById(`${el}`)
                const isValid = self.validateFields(input)
                if(!isValid){
                    isFormValid = false
                }
                console.log("OnSubmit: " + el)
            });
                if(isFormValid){
                    console.log("form is Valid")
                }

        })
    }
    
    validateOnEntry(){
        let self = this
        console.log("validateOnEntry")
        
        this.fields.forEach(el => {
            const input = document.getElementById(`${el}`)
            
            input.addEventListener("input", event => {
                self.validateFields(input)
                console.log(event)
            })
        })
    }

    validateFields(field) {
        const span = document.getElementById("span")
        console.log("ValidateFields")

        if (field.value === "") {
            showModal("noResultsModal")
          this.setStatus(field, `cannot be blank`, "error")
        } else {
          this.setStatus(field, null, "success")
          console.log("Field is valid")
          return true
        }
        
        // // check for a valid email address
        // if (field.type === "email") {
        //   const re = /\S+@\S+\.\S+/
        //   if (re.test(field.value)) {
        //     this.setStatus(field, null, "success")
        //   } else {
        //     this.setStatus(field, "Please enter valid email address", "error")
        //   }
        // }
        
        // // Password confirmation edge case
        // if (field.id === "password_confirmation") { 
        //   const passwordField = this.form.querySelector('#password')
        
        //   if (field.value.trim() == "") {
        //     this.setStatus(field, "Password confirmation required", "error")
        //   } else if (field.value != passwordField.value)  {
        //     this.setStatus(field, "Password does not match", "error")
        //   } else {
        //     this.setStatus(field, null, "success")
        //   }
        // }
      }

      setStatus(field, message, status) {

    
        if (status === "success") {
        //   if (errorIcon) { errorIcon.classList.add('hidden') }
        //   if (errorMessage) { errorMessage.innerText = "" }
          field.classList.remove("red")
          field.classList.add('green')
          console.log("green")
        } 
        
        if (status === "error") {
        //   field.parentElement.getElementById('span').innerText = message
        field.classList.remove("green")
          field.classList.add('error')
          console.log("red")
        //   fields.classList.remove('hidden')
        }    
      }
}

export default formValidator