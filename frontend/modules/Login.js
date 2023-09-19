import validator from "validator";

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }

    init(){
        
        this.events();
    };


    events(){
        if(!this.form) return;

        this.form.addEventListener("submit", e => {
           e.preventDefault();
            
            this.validate(e);
        });
    }

    validate(e){
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const alertEmail = el.querySelector('.alert-email');
        const alertSenha = el.querySelector('.alert-password');

        let error = false;

        if(!validator.isEmail(emailInput.value)){
       
            alertEmail.innerText = 'hashdsahdaidhasiudh Email invalido'
            alertEmail.classList.add('alert-danger')
            error = true;
        } else{
            alertEmail.innerText = ''
            alertEmail.classList.remove('alert-danger')
        }
        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
            alertSenha.innerText = 'hashdsahdaidhasiudh Senha invalido'
            alertSenha.classList.add('alert-danger')
            error = true;
        }else{
            alertSenha.innerText = ''
            alertSenha.classList.remove('alert-danger')
        }

        if(!error) el.submit();
    }
}

