import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const tabCon = function (props) {

    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}
const cstStyles = {
    content: {

        top: '50%',left: '50%',right: 'auto',
        bottom: 'auto',marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};



tabCon.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {
    constructor() {

        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    openModalHandler = () => {

        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""
        });
    }

    closemdHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabchHandler = (event, value) => {
        this.setState({ value });
    }

    loginHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        let LoginData = null;
        let loginxhr = new XMLHttpRequest();
        let that = this;
        loginxhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", loginxhr.getResponseHeader("access-token"));

                that.setState({
                    loggedIn: true
                });

                that.closemdHandler();
            }
        });

        loginxhr.open("POST", this.props.baseUrl + "auth/login");

        loginxhr.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        loginxhr.setRequestHeader("Content-Type", "application/json");


        loginxhr.setRequestHeader("Cache-Control", "no-cache");
        loginxhr.send(LoginData);
    }

    inputUNChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

   

    inputFNChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

   

    inppasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputcontactHandler = (e) => {
        this.setState({ contact: e.target.value });
    }
    inputLNChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputmailchangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    loggedoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }
    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });

        let SignupData = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    registrationSuccess: true
                });
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(SignupData);
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo" />


                    
                    {!this.state.loggedIn ?
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.openModalHandler}>
                               
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.loggedoutHandler}>
                                Logout

                            </Button>
                        </div>
                    }
                    {this.props.showBookShowButton === "true" && !this.state.loggedIn
                        ? <div className="bookshow-button">
                            <Button variant="contained" color="primary" onClick={this.openModalHandler}>
                                Book Show

                            </Button>
                        </div>
                        : ""
                    }

                    {this.props.showBookShowButton === "true" && this.state.loggedIn
                        ? <div className="bookshow-button">

                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                        : ""
                    }

                </header>
                <Modal

                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closemdHandler}
                    style={cstStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabchHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <tabCon>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUNChangeHandler} />
                                
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <br /> <br />

                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <br /><br />
                            
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            
                            <Button variant="contained" color="primary" onClick={this.loginHandler}>LOGIN</Button>
                        </tabCon>
                    }

                    {this.state.value === 1 &&
                        <tabCon>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>

                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFNChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLNChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" type="text" email={this.state.email} onChange={this.inputmailchangeHandler} />

                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inppasswordChangeHandler} />
                                <FormHelperText className={this.state.registerPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputcontactHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                            <br /><br />



                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />

                                        <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </tabCon>
                    }

                </Modal>
            </div>
        )
    }
}

export default Header;