import React, { useEffect, useState, useRef } from "react";

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCpassword] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(0);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    let registeredUser = (e) => {
        if(code == 170522 || code == 17052022){
            let validEmail = email.indexOf("playmock");

            if(validEmail == -1){
                M.toast({html: 'Please email should be playmock email', classes: 'errorToast'});
            } else {
                if(password === cPassword){
                    let regUserData = {
                        firstname, lastname, email, phone, password
                    }
                    axios.post(`/api/registerStaff`, regUserData)
                    .then((res) => {
                        if(res.data.user){
                            M.toast({html: 'Success! In few seconds you will be redirected to login page', classes: 'successToast'});
    
                            setTimeout(() => {
                                this.setState({step: 0})
                            }, 3800);
                        }   
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else {
                    M.toast({html: 'Passwords do not match.', classes: 'errorToast'});
                }
            }            
            
        } else {
            M.toast({html: 'Invalid staff access code.', classes: 'errorToast'});
        }
    }

    let loginUser = (e) => {
        let errCode = 0;
        if(loginEmail == ''){
            errCode = 1;
        }
        if(loginPassword == ''){
            errCode = 2;
        }

        if(errCode == 2){
            M.toast({html: 'Password field required.', classes: 'errorToast'});
        } else if(errCode == 1){
            M.toast({html: 'Email field required.', classes: 'errorToast'});
        } else {
            let loginUserData = {
                email: loginEmail,
                password: loginPassword
            }
            axios.post(`/api/loginStaff`, loginUserData)
            .then((res) => {
                if(res.data.user){
                    window.location.href = '/staff';
                }   
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className='regBackground'>
            <div className="row">
                <div className="col l4 offset-l4 s12">
                    <div className="card">
                        {
                            step == 0 &&
                            <div className="card-content">
                                <span className="card-title center-align">Sign In</span>
                                <div className="row">
                                    <div className='col s12'>
                                        <p className='grey-text center-align'>Welcome back.</p>
                                    </div>                            
                                </div>
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required id="email" type="email" onChange={(val) => {setLoginEmail(val.target.value)}} className="validate"/>
                                                <label for="email">Email</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required id="password" type="password" onChange={(val) => {setLoginPassword(val.target.value)}} className="validate"/>
                                                <label for="password">Password</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="center-align">
                                    <a href="#" className="waves-effect waves-light btn" onClick={loginUser}>Login</a>
                                </div>                                
                            </div>
                        }
                        {
                            step == 1 &&
                            <div className="card-content">
                                <span className="card-title">Sign Up</span>
                                <div className="row">
                                    <div className='col s12'>
                                        <p className='grey-text'>Please fill this form to create an account.</p>
                                    </div>                            
                                </div>
                                
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input required id="first_name" type="text" onChange={(val) => {setFirstname(val.target.value)}} className="validate"/>
                                                <label for="first_name">First Name</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input required id="last_name" type="text" onChange={(val) => {setLastname(val.target.value)}} className="validate"/>
                                                <label for="last_name">Last Name</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input required id="email" type="email" onChange={(val) => {setEmail(val.target.value)}} className="validate"/>
                                                <label for="email">Email</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input required type="tel" id="phone" onChange={(val) => {setPhone(val.target.value)}} pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"/>
                                                <label for="phone">Phone</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input required id="password" type="password" onChange={(val) => {setPassword(val.target.value)}} className="validate"/>
                                                <label for="password">Password</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <input required id="cPassword" type="password" onChange={(val) => {setCpassword(val.target.value)}} className="validate"/>
                                                <label for="cPassword">Confirm Password</label>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required id="code" type="number" onChange={(val) => {setCode(val.target.value)}} className="validate"/>
                                                <label for="code">Staff Access Code</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <a href="#" className="waves-effect waves-light btn" onClick={registeredUser}>Sign Up</a>
                            </div>
                        }
                        
                    </div>
                    <div className='row regFooter white-text center-align'>
                        <small>
                            &copy; Copyright PlayMock 2022  
                            {
                                new Date().getFullYear() != '2022'  &&
                                <>
                                    - {new Date().getFullYear()}
                                </>
                            }
                        </small>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Register;