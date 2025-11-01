const authFormValidation = (name, email, password) => {

    const nameRegex = /^[A-Za-z\s]+$/;
    const isValidName = nameRegex.test(name);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = passwordRegex.test(password)

    if(!isValidName){
        return "Enter a Valid Name";
    }else if(!isValidEmail){
        return "Email is Not Valid";
    }else if(!isValidPassword){
        return "Password is Not Valid";
    }

    return null;
  
}

export default authFormValidation;