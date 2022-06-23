// ____________MIDDLEWARE_________________
import * as React from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom'
import { setAuthentication } from '../../Authentication/Authentication'



// ____________MATERIAL UI COMPONENTS_________________
import {
    Box, Radio, RadioGroup, Dialog, DialogActions,
    DialogContent, Button, ButtonGroup, CircularProgress, Divider, Grid, Typography,
    Paper, TextField, FormControl, FormControlLabel, Autocomplete, LinearProgress, Card, CardActions, CardContent,
    List, ListItem, ListItemText, ListItemIcon, Avatar, Collapse, Alert, IconButton, DialogTitle, Tooltip, Accordion,
    AccordionSummary, AccordionDetails, Link, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment, FormHelperText, FormLabel
} from '@mui/material';


// ____________ICONS_________________
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ScheduleIcon from '@mui/icons-material/Schedule';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MovieIcon from '@mui/icons-material/Movie';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import servicesImage from '../serviceStock.png'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WcIcon from '@mui/icons-material/Wc';
import RestoreIcon from '@mui/icons-material/Restore';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

// ____________MATERIAL UI LAB COMPONENTS_________________
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


// ____________STYLESHEETS AND LOGIC_________________
import './BookFlight.css';
import Search from './Logic/Search'
import suitCase from '../../Images/suitcase.png'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';


function BookFlight() {
    const { handleReturnFlight, handleChange, handleClickOpen, handleClose, handleFindFlight,
        handleFromChange, handleToChange, handleDecrement, handleIncrement, handleDecrementChild,
        handleIncrementChild, value, date, setDate, open, counter, search, from, to, cabin, setCabin,
        counterChild, depSelected, returnSelected, departureFlights, isFetching,
        showCheckout, setShowCheckout, returnFlights, selectedDepFlight, selectedRetFlight, handleReturnSelected, seats,
        loginOpen, setLoginOpen, loading, setLoading, success, setSuccess, openConfirmDialog, handleCloseConfirm,
        setConfirmDialog, showDepSeats, showRetSeats, handleDepSeatsSelected, handleRetSeatsSelected, businessDepSeats,
        businessRetSeats, handleSelectedDepSeat, handleResetDepSeats, economySplicedDep, handleSelectedRetSeat,
        economySplicedRet, handleResetRetSeats, depSeat, retSeat, depFlightMaps, retFlightMaps, handleChangeDepFlight,
        handleChangeRetFlight, allDepSeatsSelected, allRetSeatsSelected, handleCancelSeatsDep, handleCancelSeatsRet,
        fromValidation, toValidation, depDateValidation, retDateValidation, handleEditSearch
    } = Search()

    const [progress, setProgress] = React.useState(0);
    const [username, setUsername] = React.useState('');
    const [userPass, setPassword] = React.useState('');
    const [titleVal, setTitleVal] = React.useState({ error: false, message: "" }) 
    const [firstNVal, setFirstNVal] = React.useState({ error: false, message: "" })
    const [usernameVal, setUsernameVal] = React.useState({ error: false, message: "" });
    const [lastNVal, setLastNVal] = React.useState({ error: false, message: "" })
    const [passportVal, setPassportVal] = React.useState({ error: false, message: "" });
    const [isFetchingUser, setFetchingUser] = React.useState(false)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const { loggedUser, setLoggedUser } = React.useContext(UserContext)
    const [title, setTitle] = React.useState("")
    const [signUpUsername, setSignUpUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [emailVal, setEmailVal] = React.useState({error: false, message: ""})
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [gender, setGender] = React.useState("Male");
    const [genderVal, setGenderVal] = React.useState({ error: false, message: "" })
    const [dateOfBirth, setDoB] = React.useState("");
    const [dobVal, setDobVal] = React.useState({ error: false, message: "" })
    const [signUpPassword, setSignUpPassword] = React.useState({
        password: "",
        showPassword: false,
        retypePassword: "",
        showRetypePassword: false
    });
    const [passport, setPassport] = React.useState("")

    const history = useHistory();
    const location = useLocation();
    var change = false
    var departure = false
    var reservation = null
    var flight = null
    var flight2 = {
        economyPrice: 0,
        businessPrice: 0
    }
    var other = null
    const checker = () => {
        if (location.state) {
            change = location.state.change;
            reservation = location.state.reservation;
            departure = location.state.departure;
            flight = location.state.flight
            flight2 = location.state.flight
            other = location.state.other
        }
    }
    checker()

    const stripe = useStripe()
    const elements = useElements()

    const [depEditDate, setDepEditDate] = React.useState(reservation ? new Date(reservation.departureDate) : "")
    const [retEditDate, setRetEditDate] = React.useState(reservation ? new Date(reservation.returnDate) : "")

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);


    const [passwordVal, setPasswordVal] = React.useState({ error: false, message: "" })
    const [rePasswordVal, setRePasswordVal] = React.useState({ error: false, message: "" })
    const [error, setError] = React.useState(false)

    const handleSignUpPasswordChange = (prop) => (event) => {
        setSignUpPassword({ ...signUpPassword, [prop]: event.target.value });
        let passError = false
        if ((event.target.value).length === 0) {
            setPasswordVal({ error: true, message: 'This Field is Required' })
            passError = true
        }
        else if ((event.target.value).length < 6) {
            setPasswordVal({ error: true, message: 'Password must be minimum 6 characters' })
            passError = true
        }
        else if ((event.target.value).length > 16) {
            setPasswordVal({ error: true, message: 'Password must be maximum 16 characters' })
            passError = true
        }
        else {
            passError = false
            setPasswordVal({ error: false, message: '' })
        }
        if (passError) {
            setError(true)
        }
        else {
            setError(false)
        }
    };
    const handleRetypeSignUpPasswordChange = (prop) => (event) => {
        setSignUpPassword({ ...signUpPassword, [prop]: event.target.value });
        let rePassError = false
        if ((event.target.value).length === 0) {
            setRePasswordVal({ error: true, message: 'This Field is Required' })
            rePassError = true
        }
        else if ((event.target.value).length < 6) {
            setRePasswordVal({ error: true, message: 'Password must be minimum 6 characters' })
            rePassError = true
        }
        else if ((event.target.value).length > 16) {
            setRePasswordVal({ error: true, message: 'Password must be maximum 16 characters' })
            rePassError = true
        }
        else {
            rePassError = false
            setRePasswordVal({ error: false, message: '' })
        }
        if (signUpPassword.password === event.target.value) {
            setRePasswordVal({ error: false, message: "" })
            rePassError = false
        }
        else {
            setRePasswordVal({ error: true, message: "Passwords Don't Match" })
            rePassError = true
        }
        if (rePassError) {
            setError(true)
        }
        else {
            setError(false)
        }
    };
    const handleClickShowPassword = () => {
        setSignUpPassword({
            ...signUpPassword,
            showPassword: !signUpPassword.showPassword,
        });
    };
    const handleClickShowRetypePassword = () => {
        setSignUpPassword({
            ...signUpPassword,
            showRetypePassword: !signUpPassword.showRetypePassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const handleMouseDownRetypePassword = (event) => {
        event.preventDefault();
    }

    const handleLoginClose = () => {
        setLoginOpen(false);
    };
    const usernameChange = (e) => {
        setUsername(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }
    const checkPassport = (passport) => {
        axios.post('/Authentication/checkPassport', { passport: passport })
            .then((res) => {
                if (res.data === "good") {
                    setPassportVal({ error: false, message: "" })
                    setError(false)
                }
                else {
                    setPassportVal({ error: true, message: "Passport Number already exists" })
                    setError(true)
                }
            })
    }
    const user = {
        "username": username,
        "password": userPass
    }
    const checkEmail = (email) => {
        axios.post('/Authentication/checkEmail', { email: email })
            .then((res) => {
                if (res.data === "good") {
                    setEmailVal({ error: false, message: "" })
                    setError(false)
                }
                else {
                    setEmailVal({ error: true, message: "Email already exists" })
                    setError(true)
                }
            })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        setFetchingUser(true)
        axios.post('/Authentication/Login', user)
            .then((res) => {
                if (res.data.user === "") {
                    setFetchingUser(false)
                    setAlertOpen(true)
                } else {
                    setLoggedUser({ user: res.data.user, token: res.data.token })
                    setAuthentication(res.data.token, res.data.user)
                    setLoginOpen(false)
                    setFetchingUser(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setFetchingUser(false)
                setAlertOpen(true)
            })

    }
    const handleShowCheckout = (e) => {
        e.preventDefault()
        if (loggedUser.user === "") {
            setShowCheckout(false)
            setLoginOpen(true)
        }
        else {
            setShowCheckout(!showCheckout)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (loggedUser.user === "") {
            setLoading(false);
            setLoginOpen(true);
        }
        else {
            const reserveData = {
                seats: seats,
                cabin: cabin,
                departureId: selectedDepFlight._id,
                returnId: selectedRetFlight._id,
                username: loggedUser.user.username,
                depSeats: depSeat,
                retSeats: retSeat,
                depFlightMap: depFlightMaps,
                retFlightMap: retFlightMaps,
                email: loggedUser.user.email,
                firstName: loggedUser.user.firstName,
                title: loggedUser.user.title
            }
            var changeData = {}
            if (change === true) {
                changeData.userId = loggedUser.user._id
                changeData.reservationId = reservation._id
                if (departure === true) {
                    changeData.newFlightId = selectedDepFlight._id
                    changeData.newSeats = depSeat
                }
                else {
                    changeData.newFlightId = selectedRetFlight._id
                    changeData.newSeats = retSeat
                }
            }

            if (!stripe || !elements) {
                return;
            }
            // create payment intent on server
            const { error: backendError, clientSecret } = axios.post("/Authentication/create-payment-intent", {
                paymentMethodType: 'card',
                currency: 'CFA',
            }).then((res) => {
                if (change === true) {
                    if (departure === true) {
                        console.log("changeData: ", changeData)
                        axios.put('/Users/changeDep', changeData)
                            .then((response) => {
                                setLoading(false)
                                setSuccess(true)
                                setConfirmDialog(true)
                            })
                    }
                    else {
                        axios.put('/Users/changeRet', changeData)
                            .then((response) => {
                                setLoading(false)
                                setSuccess(true)
                                setConfirmDialog(true)
                            })
                    }
                }
                else {
                    axios.post('/Users/reserveFlight', reserveData)
                        .then((response) => {
                            console.log(response.data)
                            setLoading(false)
                            setSuccess(true)
                            setConfirmDialog(true)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            });
            if (backendError) {
                console.log(`Error: ${backendError.message}`)
                return;
            }
            // confirm payment on the client
            const { stripeError, paymentIntent } = stripe.confirmCardPayment(
                clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
            ).then(() => {
                console.log('PaymentIntent: ', paymentIntent.id + ': ' + paymentIntent.status)
            })

            if (stripeError) {
                console.log(`Error: ${stripeError}`)
            }
        }

    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const [signUpOpen, setSignUpOpen] = React.useState(false)
    const handleSignUpClose = (e) => {
        setSignUpOpen(false)
    }
    const emailChange = (e) => {
        setEmail(e.target.value)
        if ((e.target.value).length === 0) {
            setEmailVal({ error: true, message: "This Field is Required" })
            setError(true)
        }
        else {
            checkEmail(e.target.value)
        }
    }
    const checkUsername = (user) => {
        axios.post('/Authentication/checkUsername', { username: user })
            .then((res) => {
                if (res.data === "good") {
                    setUsernameVal({ error: false, message: "" })
                    setError(false)
                }
                else {
                    setUsernameVal({ error: true, message: "Username already exists" })
                    setError(true)
                }
            })
    }
    const signUpUsernameChange= (e) => {
        setSignUpUsername(e.target.value)
        if ((e.target.value).length === 0) {
            setUsernameVal({ error: true, message: "This Field is Required" })
            setError(true)
        }
        else {
            checkUsername(e.target.value)
        }
        
    }
    const passportChange = (e) =>{
        setPassport(e.target.value)
    }
    const firstNameChange = (e) => {
        setFirstName(e.target.value)
        if ((e.target.value).length === 0) {
            setFirstNVal({ error: true, message: 'This Field is Required' })
            setError(true)
        }
        else {
            setFirstNVal({ error: false, message: "" })
        }
    }
    const lastNameChange = (e) => {
        setLastName(e.target.value)
        if ((e.target.value).length === 0) {
            setLastNVal({ error: true, message: 'This Field is Required' })
            setError(true)
        }
        else { setLastNVal({ error: false, message: "" }) }
    }
    const [loadingSign, setLoadingSign] = React.useState(false)
    function checkCredValidation(signUpUsername, email, signUpPassword, firstName, lastName, passport) {
        let error = false
        if (signUpUsername === "") {
            setUsernameVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setUsernameVal({ error: false, message: "" })
        }
        if(email === ""){
            setEmailVal({error:true, message: "This Field is Required"})
            error = true
        }
        else{
            setEmailVal({error: false, message: ""})
        }
        if (signUpPassword.password === "") {
            setPasswordVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setPasswordVal({ error: false, message: "" })
        }
        if (signUpPassword.retypePassword === "") {
            setRePasswordVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setRePasswordVal({ error: false, message: "" })
        }
        if (dateOfBirth === ""){
            setDobVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else{
            setDobVal({ error: false, message: "" })
        }
        if (title === ""){
            setTitleVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else{
            setTitleVal({ error: false, message: "" })
        }
        if (firstName === "") {
            setFirstNVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setFirstNVal({ error: false, message: "" })
        }
        if (lastName === "") {
            setLastNVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setLastNVal({ error: false, message: "" })
        }
        if (passport === "") {
            setPassportVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setPassportVal({ error: false, message: "" })
        }
        if (error) return true
        return false
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        const data ={
            username: signUpUsername,
            password: signUpPassword.password,
            firstName : firstName,
            lastName: lastName,
            title: title,
            email: email,
            passportNumber: passport
        }
        setLoadingSign(true)
        const error = checkCredValidation(signUpUsername,email,signUpPassword,firstName,lastName,passport)
        if(error){
            setLoading(false)
        }
        else{
        axios.post('/Authentication/Register',data)
        .then(() => {
            axios.post('/Authentication/Login',{username: signUpUsername,password: signUpPassword.password})
            .then((res) => {
                if(res.data !== ""){
                    setLoggedUser({ user: res.data.user, token: res.data.token })
                    setAuthentication(res.data.token, res.data.user)
                    setLoadingSign(false)
                    setSignUpOpen(false)
                }})
            
        })
        .catch((err)=>{
            console.log("Reg Error: ", err)
        })
        }
    }

    return (
        <>

            <div>
                <Paper elevation={1} style={{ borderRadius: '8px', marginTop: '70px', padding: '20px' }}>
                    <Grid container spacing={5}>
                        <Grid item sm={6}>
                            <img src={suitCase} alt="suitcase" />
                        </Grid>
                        <Grid item sm={6} style={{
                            marginLef: '-100px',
                        }}>
                            {change ?
                                <>
                                    <Paper elevation={1} style={{
                                        padding: '50px',
                                        borderRadius: '1rem',
                                        borderColor: '#004080',
                                        backgroundImage: 'linear-gradient(to bottom right, rgba(0, 64, 128, 1),rgba(128, 0, 128, 1))'
                                    }}>
                                        <Grid container spacing={3}>
                                            <Grid item sm={6}>
                                                <TextField
                                                    label="From"
                                                    color='white'
                                                    focused
                                                    sx={{ input: { color: '#fff' } }}
                                                    disabled={true}
                                                    value={flight.depCountry}
                                                />
                                            </Grid>
                                            <Grid item sm={6}>
                                                <TextField
                                                    label="To"
                                                    color='white'
                                                    focused
                                                    sx={{ input: { color: '#fff' } }}
                                                    disabled={true}
                                                    value={flight.destCountry}
                                                />
                                            </Grid>
                                            <Grid item sm={6}>
                                                <TextField
                                                    label="Cabin"
                                                    color='white'
                                                    focused
                                                    sx={{ input: { color: '#fff' } }}
                                                    disabled={true}
                                                    value={reservation.cabin}
                                                />
                                            </Grid>
                                            <Grid item sm={6}>
                                                <TextField
                                                    label="Seats"
                                                    color='white'
                                                    focused
                                                    sx={{ input: { color: '#fff' } }}
                                                    disabled={true}
                                                    value={reservation.seats}
                                                />
                                            </Grid>
                                            <Grid item sm={6}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Departure Date"
                                                        color='white'
                                                        focused
                                                        sx={{ input: { color: '#fff' } }}
                                                        value={depEditDate}
                                                        inputFormat="yyyy/MM/dd"
                                                        disabled={!departure}
                                                        readOnly={!departure}
                                                        maxDate={retEditDate}
                                                        disablePast
                                                        error={depDateValidation.error}
                                                        helperText={depDateValidation.label}
                                                        onChange={(newValue) => {
                                                            setDepEditDate(newValue);
                                                        }}
                                                        renderInput={(params) =>
                                                            <TextField {...params}
                                                                color='white'
                                                                focused
                                                                sx={{ input: { color: '#fff' } }}
                                                            />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Return Date"
                                                        value={retEditDate}
                                                        minDate={depEditDate}
                                                        inputFormat="yyyy/MM/dd"
                                                        error={retDateValidation.error}
                                                        helperText={retDateValidation.label}
                                                        disabled={departure}
                                                        readOnly={departure}
                                                        disablePast={departure}
                                                        onChange={(newValue) => {
                                                            setRetEditDate(newValue);
                                                        }}
                                                        renderInput={(params) =>
                                                            <TextField {...params}
                                                                color='white'
                                                                focused
                                                                sx={{ input: { color: '#fff' } }}
                                                            />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    fullWidth
                                                    onClick={(e) => {
                                                        handleEditSearch(
                                                            e, flight.depCountry,
                                                            flight.destCountry,
                                                            reservation.cabin,
                                                            reservation.seats,
                                                            depEditDate, retEditDate,
                                                            departure, other, reservation)
                                                    }}
                                                >
                                                    Search
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                </>
                                :
                                <>
                                    <Paper elevation={1}
                                        style={{
                                            padding: '50px',
                                            borderRadius: '1rem',
                                            borderColor: '#004080',
                                            backgroundImage: 'linear-gradient(to bottom right, rgba(0, 64, 128, 1),rgba(128, 0, 128, 1))'
                                        }}
                                    >
                                        <Grid container spacing={3}>
                                            {/* From */}
                                            <Grid item lg={6}>
                                                <Autocomplete
                                                    id="country-select-demo"
                                                    options={countries}
                                                    autoHighlight
                                                    onSelect={handleFromChange}
                                                    getOptionLabel={(option) => option.label}
                                                    color="white"
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                alt=""
                                                            />
                                                            {option.label} ({option.code})
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            color='white'
                                                            focused
                                                            placeholder="From"
                                                            label="FROM"
                                                            error={fromValidation.error}
                                                            fullWidth
                                                            sx={{ input: { color: '#fff' } }}
                                                            helperText={fromValidation.label}
                                                            required
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'off', // disable autocomplete and autofill
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/* To */}
                                            <Grid item lg={6}>
                                                <Autocomplete
                                                    id="country-select-demo"
                                                    options={countries}
                                                    autoHighlight
                                                    onSelect={handleToChange}
                                                    getOptionLabel={(option) => option.label}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            <img
                                                                loading="lazy"
                                                                width="20"
                                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                                alt=""
                                                            />
                                                            {option.label} ({option.code})
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            color='white'
                                                            focused
                                                            sx={{ input: { color: '#fff' } }}
                                                            placeholder="To"
                                                            label="TO"
                                                            error={toValidation.error}
                                                            helperText={toValidation.label}
                                                            fullWidth
                                                            required
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'off', // disable autocomplete and autofill
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/* Dates */}
                                            <Grid item lg={12}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DateRangePicker
                                                        disablePast
                                                        startText="DEPARTURE DATE"
                                                        endText="RETURN DATE"
                                                        allowSameDateSelection={false}
                                                        value={date}
                                                        onChange={(newDate) => {
                                                            setDate(newDate);
                                                        }}
                                                        renderInput={(startProps, endProps) => (
                                                            <React.Fragment>
                                                                <TextField {...startProps}
                                                                    color='white'
                                                                    focused
                                                                    sx={{ input: { color: '#fff' } }}
                                                                    required
                                                                    fullWidth
                                                                    error={depDateValidation.error}
                                                                    placeholder="Departure Date"
                                                                    helperText={depDateValidation.label}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                                <Box sx={{ mx: 1 }}> to </Box>
                                                                <TextField {...endProps}
                                                                    required
                                                                    color='white'
                                                                    sx={{ input: { color: '#fff' } }}
                                                                    focused
                                                                    fullWidth
                                                                    error={retDateValidation.error}
                                                                    placeholder="Return Date"
                                                                    helperText={retDateValidation.label}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            </React.Fragment>
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item lg={6}>
                                            </Grid>
                                            {/* Cabin and Seats */}
                                            <Grid item lg={6}>
                                                <Button variant="outlined" color="white" onClick={handleClickOpen} style={{ height: '50px' }} fullWidth>
                                                    Passenger | Cabin
                                                </Button>
                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogContent>
                                                        <Typography component="legend">Passengers</Typography>
                                                        <br />
                                                        <Grid container spacing={2}>
                                                            <Grid item sx={2}>
                                                                <Typography variant="h6" component="h6">Adults (12+ years)</Typography>
                                                            </Grid>
                                                            <Grid item sx={6}>
                                                                <ButtonGroup size="small" aria-label="small outlined button group" style={{ marginLeft: '13px' }}>
                                                                    <Button onClick={handleDecrement}>-</Button>
                                                                    <Button >{counter}</Button>
                                                                    <Button onClick={handleIncrement}>+</Button>

                                                                </ButtonGroup>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <Grid item sx={2}>
                                                                <Typography variant="h6" component="h6">Child (0-11 years)</Typography>
                                                            </Grid>
                                                            <Grid item sx={6}>
                                                                <ButtonGroup size="small" aria-label="small outlined button group" style={{ marginLeft: '20px' }}>
                                                                    <Button onClick={handleDecrementChild}>-</Button>
                                                                    <Button >{counterChild}</Button>
                                                                    <Button onClick={handleIncrementChild}>+</Button>

                                                                </ButtonGroup>
                                                            </Grid>
                                                        </Grid>
                                                        <br />
                                                        <Divider variant="middle" />
                                                        <br />
                                                        <FormControl component="fieldset">
                                                            <Typography component="legend">Cabin</Typography>
                                                            <br />
                                                            <RadioGroup
                                                                aria-label="economy"
                                                                defaultValue='economy'
                                                                value={cabin}
                                                                name="radio-buttons-group"
                                                                onChange={(e) => setCabin(e.target.value)}
                                                            >
                                                                <FormControlLabel value="economy" control={<Radio />} label="Economy" />
                                                                <FormControlLabel value="business" control={<Radio />} label="Business" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose} color="success">Confirm</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </Grid>
                                            {/* Search Button */}
                                            <Grid item lg={12}>
                                                <Button
                                                    variant="contained"
                                                    endIcon={<FlightTakeoffIcon />}
                                                    style={{ height: '50px' }}
                                                    fullWidth
                                                    color="secondary"
                                                    onClick={handleFindFlight}
                                                >
                                                    {isFetching ? <CircularProgress color="primary" /> : "Show Flights "}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper></>}

                        </Grid>
                    </Grid>
                    <Box sx={{ width: '100%' }}>

                        {isFetching ? <LinearProgress variant="determinate" value={progress} color="secondary" style={{ marginTop: '50px' }} />
                            : search ?
                                <>
                                    {/* Departure Flights */}
                                    {departureFlights.length === 0 ? <></> : <>
                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '60px' }}>
                                            <Typography variant="h4" component="h4" color="primary">Select your departure flight from</Typography>
                                            <Typography variant="h5" component="h5" color="primary">{(departureFlights[0].depCountry).toUpperCase()} to {(departureFlights[0].destCountry).toUpperCase()}</Typography>
                                            <Typography variant="legend" component="legend" color="primary">{departureFlights[0].departureDate}</Typography>
                                        </Box>
                                    </>}
                                    {departureFlights.length === 0 ?
                                        <div>
                                            <br />
                                            <Box style={{ diaplay: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Alert icon={<AirplanemodeInactiveIcon />} severity="warning">
                                                    {"No Available Flights! Try different Options"}
                                                </Alert>
                                            </Box>
                                        </div> : departureFlights.map((flight) =>
                                            <>
                                                <Paper elevation={0}
                                                    style={{ borderRadius: '1rem', marginTop: '50px', padding: '30px', boxShadow: '0px 0px 0px 0px', border: 'none' }}>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Accordion style={{ borderRadius: '1rem', padding: '30px' }}>
                                                            <AccordionSummary
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Grid container spacing={5}>
                                                                    <Grid item sx={4}>
                                                                        <Box style={{ display: "flex", flexDirection: "column", width: '100%' }}>
                                                                            <Typography variant="h6" component="h6" style={{ color: 'black' }}>{flight.departureTime} - {flight.arrivalTime}</Typography>
                                                                            <Timeline style={{ marginLeft: '-200px' }}>
                                                                                <TimelineItem>
                                                                                    <TimelineSeparator>
                                                                                        <TimelineDot variant="outlined" color="secondary" />
                                                                                        <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                                                    </TimelineSeparator>
                                                                                    <TimelineContent style={{ fontWeight: 'bold' }} width="400px">{flight.depCountry} ({flight.departureAirport})</TimelineContent>
                                                                                </TimelineItem>
                                                                                <TimelineItem>
                                                                                    <TimelineSeparator>
                                                                                        <TimelineDot variant="outlined" color="secondary" />
                                                                                    </TimelineSeparator>
                                                                                    <TimelineContent style={{ fontWeight: 'bold' }} width="400px">{flight.destCountry} ({flight.destinationAirport})</TimelineContent>
                                                                                </TimelineItem>
                                                                            </Timeline>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item sx={1} style={{ marginTop: '70px' }}>
                                                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Typography component="legend">Cactus Airlines</Typography>
                                                                            <Typography component="legend">{flight.flightNumber}</Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item sx={1} style={{ marginTop: '70px' }}>
                                                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Typography component="legend">Duration</Typography>
                                                                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                <ScheduleIcon />
                                                                                <Typography component="legend">14H</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item sx={1} style={{ marginTop: '70px' }}>
                                                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Typography component="legend">Services</Typography>
                                                                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                <Tooltip title="wifi">
                                                                                    <WifiIcon />
                                                                                </Tooltip>
                                                                                <Tooltip title="Meals">
                                                                                    <RestaurantIcon />
                                                                                </Tooltip>
                                                                                <Tooltip title="Entertainment">
                                                                                    <MovieIcon />
                                                                                </Tooltip>
                                                                            </Box>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item sx={3} style={{ marginTop: '70px', marginLeft: '100px' }}>
                                                                        <Button
                                                                            variant="contained"
                                                                            endIcon={<ExpandMoreIcon />}
                                                                            style={{ marginBottom: '20px', cursor: 'pointer' }}
                                                                            className="flightBtn"
                                                                        >
                                                                            From {<br />}
                                                                            CFA {cabin === "economy" ? flight.economyPrice - flight2.economyPrice : flight.businessPrice - flight2.businessPrice}
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item sx={2}></Grid>
                                                                </Grid>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Grid container spacing={5}>
                                                                    <Grid item sx={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item sx={5}>
                                                                                <Box style={{ marginLeft: '250px' }}>
                                                                                    <Card sx={{ minWidth: 400 }}>
                                                                                        <CardContent>
                                                                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                                                                {cabin.toUpperCase()}
                                                                                            </Typography>
                                                                                            <Typography variant="legend" component="div">
                                                                                                Included per Passenger
                                                                                            </Typography>
                                                                                            <Typography variant="body2">
                                                                                                <List>
                                                                                                    <ListItem disablePadding>
                                                                                                        <ListItemIcon>
                                                                                                            <DoneIcon color="success" />
                                                                                                        </ListItemIcon>
                                                                                                        <ListItemText primary="1 hand baggage and 1 personal item (12 kg total)" />
                                                                                                    </ListItem>
                                                                                                    <ListItem disablePadding>
                                                                                                        <ListItemIcon>
                                                                                                            <DoneIcon color="success" />
                                                                                                        </ListItemIcon>
                                                                                                        <ListItemText primary="2 checked baggage (23 kg)" />
                                                                                                    </ListItem>
                                                                                                    <ListItem disablePadding>
                                                                                                        <ListItemIcon>
                                                                                                            <DoneIcon color="success" />
                                                                                                        </ListItemIcon>
                                                                                                        <ListItemText primary="Seat Selection" />
                                                                                                    </ListItem>
                                                                                                    <ListItem disablePadding>
                                                                                                        <ListItemIcon>
                                                                                                            <DoneIcon color="success" />
                                                                                                        </ListItemIcon>
                                                                                                        <ListItemText primary="Refundable" />
                                                                                                    </ListItem>
                                                                                                </List>
                                                                                            </Typography>
                                                                                        </CardContent>
                                                                                        <CardActions style={{ alignItems: 'end' }}>
                                                                                            <Button size="medium" variant="outlined" onClick={(e) => { handleReturnFlight(flight, e) }}>Select Flight</Button>
                                                                                        </CardActions>
                                                                                    </Card>
                                                                                </Box>
                                                                            </Grid>
                                                                            <Grid item sx={3}>
                                                                                <Box style={{ marginLeft: '100px' }}>
                                                                                    <img src={servicesImage} alt="stock"
                                                                                        style={{ width: '300px', height: '300px', borderRadius: '8px' }} />
                                                                                </Box>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                        </Accordion>


                                                    </Box>
                                                </Paper>
                                            </>
                                        )}
                                </>
                                :
                                <></>
                        }
                        {/* departure flight seat selector */}
                        {showDepSeats ?
                            <>
                                <Paper elevation={3} variant="outlined" style={{ borderRadius: '1rem', marginLeft: '150px', marginTop: '50px', padding: '30px', width: '1000px' }}>
                                    <Box>
                                        <Grid container spacing={3}>

                                            <Grid item sm={12}>
                                                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography variant="h4" color="secondary">Pick Your Seats</Typography>
                                                </Box>
                                                <br />
                                                <Divider varaint="middle" />
                                                <br />
                                            </Grid>
                                            <Grid item sm={10}></Grid>
                                            <Grid item sm={2}>
                                                <Tooltip title="Reset Seats">
                                                    <Button startIcon={<RestoreIcon />} color="error" onClick={handleResetDepSeats} aria-label="reset">
                                                        Reset Seats
                                                    </Button>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button variant="contained" endIcon={<ExitToAppIcon />}
                                                    fullWidth disabled color="error"
                                                    style={{ color: "white", backgroundColor: "red" }}
                                                >Exit</Button>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Box style={{ display: 'flex', marginLeft: '600px' }}>
                                                    <CoffeeIcon color="primary" />
                                                    <WcIcon color="primary" />
                                                </Box>
                                                <br />
                                                <Divider varaint="middle" />
                                                <br />
                                            </Grid>


                                            {cabin === 'economy' ?
                                                <>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>A</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>B</Typography>
                                                            <Typography variant="h5">C</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>D</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>E</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>F</Typography>
                                                            <Typography variant="h5">G</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>H</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>I</Typography>
                                                            <Typography variant="h5">J</Typography>
                                                        </Box>
                                                    </Grid>
                                                </>
                                                :
                                                <>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '320px' }}>A</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '320px' }}>B</Typography>
                                                            <Typography variant="h5">C</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={8}></Grid>
                                                </>
                                            }
                                            {cabin === "business" ? businessDepSeats.map((seat) =>
                                                <>
                                                    <Grid item sm={4}>
                                                        <Button color="info" disabled={seat.reserved}
                                                            onClick={(e) => { handleSelectedDepSeat(e, seat.number) }} variant="contained" key={seat.number}
                                                        >{seat.number}</Button>
                                                    </Grid>
                                                </>
                                            )
                                                :
                                                economySplicedDep.map((seat) =>
                                                    <>
                                                        <Grid item sm={4}>
                                                            {seat.map((eseat) =>
                                                                <Button color="info"
                                                                    disabled={eseat.reserved}
                                                                    onClick={(e) => { handleSelectedDepSeat(e, eseat.number) }}
                                                                    variant="contained"
                                                                    size="medium"
                                                                    style={{ marginRight: '5px' }}
                                                                >
                                                                    {eseat.number}
                                                                </Button>
                                                            )
                                                            }
                                                        </Grid>
                                                    </>
                                                )
                                            }
                                            <Grid item sm={3}>
                                                <br />
                                                <Box style={{ marginLeft: '80px' }}>
                                                    <WcIcon color="primary" />
                                                </Box>
                                            </Grid>
                                            <Grid item sm={6}></Grid>
                                            <Grid item sm={3}>
                                                <br />
                                                <Box>
                                                    <WcIcon color="primary" />
                                                </Box>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button variant="contained" endIcon={<ExitToAppIcon />}
                                                    fullWidth disabled color="error"
                                                    style={{ color: "white", backgroundColor: "red" }}
                                                >Exit</Button>
                                            </Grid>
                                            <Grid item sm={9}></Grid>
                                            <Grid item sm={6}></Grid>
                                            <Grid item sm={3}>
                                                <Button color="warning" variant="outlined"
                                                    fullWidth size="large"
                                                    onClick={handleCancelSeatsDep}
                                                >
                                                    Cancel
                                                </Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button color="success" variant="outlined"
                                                    onClick={handleDepSeatsSelected}
                                                    fullWidth size="large"
                                                    disabled={!allDepSeatsSelected}
                                                >
                                                    Confirm
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </>
                            :
                            <></>
                        }
                        {/* Return Flights */}
                        {depSelected ?
                            <>
                                {returnFlights.length === 0 ? <></>
                                    :
                                    <>
                                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                                            <Typography variant="h4" component="h4" color="primary">Select your return flight from</Typography>
                                            <Typography variant="h5" component="h5" color="primary">{(returnFlights[0].departureAirport).toUpperCase()} to {(returnFlights[0].destinationAirport).toUpperCase()}</Typography>
                                            <Typography variant="legend" component="legend" color="primary">{returnFlights[0].departureDate}</Typography>
                                        </Box>
                                    </>}
                                {returnFlights.length === 0 ?
                                    <div>
                                        <br />
                                        <Box style={{ diaplay: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Alert icon={<AirplanemodeInactiveIcon />} severity="warning">
                                                {"No Available Flights! Try different Options"}
                                            </Alert>
                                        </Box>
                                    </div>
                                    :
                                    returnFlights.map((flight) =>
                                        <>
                                            <Paper elevation={0}
                                                style={{ borderRadius: '1rem', marginTop: '50px', padding: '30px', boxShadow: '0px 0px 0px 0px', border: 'none' }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <Accordion style={{ borderRadius: '1rem', padding: '30px' }}>
                                                        <AccordionSummary
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Grid container spacing={5}>
                                                                <Grid item sx={4}>
                                                                    <Box style={{ display: "flex", flexDirection: "column", width: '100%' }}>
                                                                        <Typography variant="h6" component="h6" style={{ color: 'black' }}>{flight.departureTime} - {flight.arrivalTime}</Typography>
                                                                        <Timeline style={{ marginLeft: '-200px' }}>
                                                                            <TimelineItem>
                                                                                <TimelineSeparator>
                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                                                </TimelineSeparator>
                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="400px">{flight.depCountry} ({flight.departureAirport})</TimelineContent>
                                                                            </TimelineItem>
                                                                            <TimelineItem>
                                                                                <TimelineSeparator>
                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                </TimelineSeparator>
                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="400px">{flight.destCountry} ({flight.destinationAirport})</TimelineContent>
                                                                            </TimelineItem>
                                                                        </Timeline>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sx={1} style={{ marginTop: '70px' }}>
                                                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Typography component="legend">Cactus Airlines</Typography>
                                                                        <Typography component="legend">{flight.flightNumber}</Typography>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sx={1} style={{ marginTop: '70px' }}>
                                                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Typography component="legend">Duration</Typography>
                                                                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <ScheduleIcon />
                                                                            <Typography component="legend">14H</Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sx={1} style={{ marginTop: '70px' }}>
                                                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Typography component="legend">Services</Typography>
                                                                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Tooltip title="wifi">
                                                                                <WifiIcon />
                                                                            </Tooltip>
                                                                            <Tooltip title="Meals">
                                                                                <RestaurantIcon />
                                                                            </Tooltip>
                                                                            <Tooltip title="Entertainment">
                                                                                <MovieIcon />
                                                                            </Tooltip>
                                                                        </Box>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item sx={3} style={{ marginTop: '70px', marginLeft: '100px' }}>
                                                                    <Button
                                                                        variant="contained"
                                                                        endIcon={<ExpandMoreIcon />}
                                                                        style={{ marginBottom: '20px', cursor: 'pointer' }}
                                                                        className="flightBtn"
                                                                    >
                                                                        From {<br />}
                                                                        CFA {cabin === "economy" ? flight.economyPrice - flight2.economyPrice : flight.businessPrice - flight2.businessPrice}
                                                                    </Button>
                                                                </Grid>
                                                                <Grid item sx={2}></Grid>
                                                            </Grid>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Grid container spacing={5}>
                                                                <Grid item sx={12}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item sx={5}>
                                                                            <Box style={{ marginLeft: '250px' }}>
                                                                                <Card sx={{ minWidth: 400 }}>
                                                                                    <CardContent>
                                                                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                                                            {cabin.toUpperCase()}
                                                                                        </Typography>
                                                                                        <Typography variant="legend" component="div">
                                                                                            Included per Passenger
                                                                                        </Typography>
                                                                                        <Typography variant="body2">
                                                                                            <List>
                                                                                                <ListItem disablePadding>
                                                                                                    <ListItemIcon>
                                                                                                        <DoneIcon color="success" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="1 hand baggage and 1 personal item (12 kg total)" />
                                                                                                </ListItem>
                                                                                                <ListItem disablePadding>
                                                                                                    <ListItemIcon>
                                                                                                        <DoneIcon color="success" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="2 checked baggage (23 kg)" />
                                                                                                </ListItem>
                                                                                                <ListItem disablePadding>
                                                                                                    <ListItemIcon>
                                                                                                        <DoneIcon color="success" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="Seat Selection" />
                                                                                                </ListItem>
                                                                                                <ListItem disablePadding>
                                                                                                    <ListItemIcon>
                                                                                                        <DoneIcon color="success" />
                                                                                                    </ListItemIcon>
                                                                                                    <ListItemText primary="Refundable" />
                                                                                                </ListItem>
                                                                                            </List>
                                                                                        </Typography>
                                                                                    </CardContent>
                                                                                    <CardActions style={{ alignItems: 'end' }}>
                                                                                        <Button size="medium" variant="outlined" onClick={(e) => { handleReturnSelected(flight, e) }}>Select Flight</Button>
                                                                                    </CardActions>
                                                                                </Card>
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item sx={3}>
                                                                            <Box style={{ marginLeft: '100px' }}>
                                                                                <img src={servicesImage} alt="stock"
                                                                                    style={{ width: '300px', height: '300px', borderRadius: '8px' }} />
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </AccordionDetails>
                                                    </Accordion>


                                                </Box>
                                            </Paper>
                                        </>
                                    )}

                            </>
                            :
                            <></>
                        }
                        {showRetSeats ?
                            <>
                                <Paper elevation={3} variant="outlined" style={{ borderRadius: '1rem', marginLeft: '150px', marginTop: '50px', padding: '30px', width: '1000px' }}>
                                    <Box>
                                        <Grid container spacing={3}>

                                            <Grid item sm={12}>
                                                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography variant="h4" color="secondary">Pick Your Seats</Typography>
                                                </Box>
                                                <br />
                                                <Divider varaint="middle" />
                                                <br />
                                            </Grid>
                                            <Grid item sm={10}></Grid>
                                            <Grid item sm={2}>
                                                <Tooltip title="Reset Seats">
                                                    <Button startIcon={<RestoreIcon />} color="error" onClick={handleResetRetSeats} aria-label="reset">
                                                        Reset Seats
                                                    </Button>
                                                </Tooltip>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button variant="contained" endIcon={<ExitToAppIcon />}
                                                    fullWidth disabled color="error"
                                                    style={{ color: "white", backgroundColor: "red" }}
                                                >Exit</Button>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Box style={{ display: 'flex', marginLeft: '600px' }}>
                                                    <CoffeeIcon color="primary" />
                                                    <WcIcon color="primary" />
                                                </Box>
                                                <br />
                                                <Divider varaint="middle" />
                                                <br />
                                            </Grid>


                                            {cabin === 'economy' ?
                                                <>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>A</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>B</Typography>
                                                            <Typography variant="h5">C</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>D</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>E</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>F</Typography>
                                                            <Typography variant="h5">G</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>H</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '50px' }}>I</Typography>
                                                            <Typography variant="h5">J</Typography>
                                                        </Box>
                                                    </Grid>
                                                </>
                                                :
                                                <>
                                                    <Grid item sm={4}>
                                                        <Box style={{ display: 'flex' }}>
                                                            <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '320px' }}>A</Typography>
                                                            <Typography variant="h5" style={{ marginRight: '320px' }}>B</Typography>
                                                            <Typography variant="h5">C</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={8}></Grid>
                                                </>
                                            }
                                            {cabin === "business" ? businessRetSeats.map((seat) =>
                                                <>
                                                    <Grid item sm={4}>
                                                        <Button color="info" disabled={seat.reserved}
                                                            onClick={(e) => { handleSelectedRetSeat(e, seat.number) }} variant="contained" key={seat.number}
                                                        >{seat.number}</Button>
                                                    </Grid>
                                                </>
                                            )
                                                :
                                                economySplicedRet.map((seat) =>
                                                    <>
                                                        <Grid item sm={4}>
                                                            {seat.map((eseat) =>
                                                                <Button color="info"
                                                                    disabled={eseat.reserved}
                                                                    onClick={(e) => { handleSelectedRetSeat(e, eseat.number) }}
                                                                    variant="contained"
                                                                    size="medium"
                                                                    style={{ marginRight: '5px' }}
                                                                >
                                                                    {eseat.number}
                                                                </Button>
                                                            )
                                                            }
                                                        </Grid>
                                                    </>
                                                )
                                            }
                                            <Grid item sm={3}>
                                                <br />
                                                <Box style={{ marginLeft: '80px' }}>
                                                    <WcIcon color="primary" />
                                                </Box>
                                            </Grid>
                                            <Grid item sm={6}></Grid>
                                            <Grid item sm={3}>
                                                <br />
                                                <Box>
                                                    <WcIcon color="primary" />
                                                </Box>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button variant="contained" endIcon={<ExitToAppIcon />}
                                                    fullWidth disabled color="error"
                                                    style={{ color: "white", backgroundColor: "red" }}
                                                >Exit</Button>
                                            </Grid>
                                            <Grid item sm={9}></Grid>
                                            <Grid item sm={6}></Grid>
                                            <Grid item sm={3}>
                                                <Button color="warning" variant="outlined"
                                                    fullWidth size="large"
                                                    onClick={handleCancelSeatsRet}
                                                >
                                                    Cancel
                                                </Button>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <Button color="success" variant="outlined"
                                                    onClick={handleRetSeatsSelected}
                                                    fullWidth size="large"
                                                    disabled={!allRetSeatsSelected}
                                                >
                                                    Confirm
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </>
                            :
                            <></>
                        }
                        {returnSelected ?
                            <>
                                <Grid container spacing={3}>
                                    <Grid item xs={8}>
                                        <Paper elevation={2} style={{ borderRadius: '1rem', marginTop: '30px', padding: '30px' }}>
                                            <Box style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                                justifyContent: 'center', marginBottom: '30px'
                                            }}>
                                                <Typography variant="h4" component="h4" color="primary">Your trip summary</Typography>
                                            </Box>
                                            <Grid container spacing={2}>
                                                <Grid item sx={8}>
                                                    <Typography variant="h6" component="h6" color="primary">{selectedDepFlight.depCountry} to {selectedDepFlight.destCountry}</Typography>
                                                    <Timeline position="left" style={{ marginLeft: '-200px' }}>
                                                        <TimelineItem>
                                                            <TimelineOppositeContent color="text.secondary" width="500px">
                                                                {selectedDepFlight.departureDate} - {selectedDepFlight.departureTime}<br />
                                                                {selectedDepFlight.depCountry}, {selectedDepFlight.departureAirport}<br />
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent>Departure</TimelineContent>
                                                        </TimelineItem>
                                                        <TimelineItem>
                                                            <TimelineOppositeContent color="text.secondary" width="500px">
                                                                {selectedDepFlight.arrivalDate} - {selectedDepFlight.arrivalTime}<br />
                                                                {selectedDepFlight.destCountry}, {selectedDepFlight.destinationAirport}<br />
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot />
                                                            </TimelineSeparator>
                                                            <TimelineContent>Arrival</TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Grid>
                                                <Grid item sx={4}>
                                                    {
                                                        change ?
                                                            departure
                                                                ?
                                                                <>
                                                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Typography variant="h6" component="h6" color="primary">{(cabin === "economy" ? selectedDepFlight.economyPrice - flight2.economyPrice : selectedDepFlight.businessPrice - flight2.businessPrice) * (seats)} CFA</Typography>
                                                                        <Button variant="outlined" onClick={handleChangeDepFlight} disabled={change}>
                                                                            Change this flight
                                                                        </Button>
                                                                    </Box>
                                                                </>
                                                                :
                                                                <></>
                                                            :
                                                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Typography variant="h6" component="h6" color="primary">{(cabin === "economy" ? selectedDepFlight.economyPrice - flight2.economyPrice : selectedDepFlight.businessPrice - flight2.businessPrice) * (seats)} CFA</Typography>
                                                                <Button variant="outlined" onClick={handleChangeDepFlight} disabled={change}>
                                                                    Change this flight
                                                                </Button>
                                                            </Box>
                                                    }
                                                </Grid>
                                                <Grid item sx={8}>
                                                    <Typography variant="h6" component="h6" color="primary">{selectedRetFlight.depCountry} to {selectedRetFlight.destCountry}</Typography>
                                                    <Timeline position="left" style={{ marginLeft: '-200px' }}>
                                                        <TimelineItem>
                                                            <TimelineOppositeContent color="text.secondary" width="500px">
                                                                {selectedRetFlight.departureDate} - {selectedRetFlight.departureTime}<br />
                                                                {selectedRetFlight.destCountry}, {selectedRetFlight.destinationAirport} <br />
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent>Departure</TimelineContent>
                                                        </TimelineItem>
                                                        <TimelineItem>
                                                            <TimelineOppositeContent color="text.secondary" width="500px">
                                                                {selectedRetFlight.arrivalDate} - {selectedRetFlight.arrivalTime}<br />
                                                                {selectedRetFlight.depCountry},{selectedRetFlight.departureAirport} <br />
                                                            </TimelineOppositeContent>
                                                            <TimelineSeparator>
                                                                <TimelineDot />
                                                            </TimelineSeparator>
                                                            <TimelineContent>Arrival</TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Grid>
                                                <Grid item sx={4}>
                                                    {
                                                        change ?
                                                            departure
                                                                ?
                                                                <></>
                                                                :
                                                                <>
                                                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        <Typography variant="h6" component="h6" color="primary">CFA {(cabin === "economy" ? selectedRetFlight.economyPrice - flight2.economyPrice : selectedRetFlight.businessPrice - flight2.businessPrice) * (seats)}</Typography>
                                                                        <Button variant="outlined" onClick={handleChangeRetFlight} disabled={change}>
                                                                            Change this flight
                                                                        </Button>
                                                                    </Box>
                                                                </>
                                                            :
                                                            <>
                                                                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Typography variant="h6" component="h6" color="primary">CFA {(cabin === "economy" ? selectedRetFlight.economyPrice - flight2.economyPrice : selectedRetFlight.businessPrice - flight2.businessPrice) * (seats)}</Typography>
                                                                    <Button variant="outlined" onClick={handleChangeRetFlight} disabled={change}>
                                                                        Change this flight
                                                                    </Button>
                                                                </Box>
                                                            </>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper elevation={2} style={{ borderRadius: '1rem', marginTop: '30px', padding: '30px' }}>
                                            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="h4" component="h4" color="secondary">
                                                    Total Price: {change ? departure ? ((cabin === "economy" ? selectedDepFlight.economyPrice - flight2.economyPrice : selectedDepFlight.businessPrice - flight2.returnPrice) * (seats))
                                                        : ((cabin === "economy" ? selectedRetFlight.economyPrice - flight2.economyPrice : selectedRetFlight.businessPrice - flight2.businessPrice) * (seats))
                                                        : ((cabin === "economy" ? selectedRetFlight.economyPrice : selectedRetFlight.businessPrice) * (seats)) + ((cabin === "economy" ? selectedDepFlight.economyPrice : selectedDepFlight.businessPrice) * (seats))
                                                    } CFA
                                                </Typography>
                                                <br />
                                                <Divider variant="middle" />
                                                <br />
                                                <Button variant="contained" color="secondary"
                                                    onClick={handleShowCheckout}
                                                >Checkout</Button>
                                                <br />
                                                <Divider variant="middle" />
                                                <br />
                                                {showCheckout ?
                                                    <>
                                                        {!success ?
                                                            <>
                                                                <Box component="form" noValidate onSubmit={handleSubmit}>

                                                                    <CardElement />
                                                                    <br />
                                                                    <Button
                                                                        color="secondary"
                                                                        variant="outlined"
                                                                        type="submit"
                                                                        fullWidth
                                                                        disabled={!stripe}
                                                                        sx={{
                                                                            width: 410,
                                                                            marginTop: 10,
                                                                        }}
                                                                    >
                                                                        {loading ? <CircularProgress color="inherit" aria-busy="true" /> : "Pay"}
                                                                    </Button>
                                                                </Box>
                                                            </>
                                                            :
                                                            <div>
                                                                <br />
                                                                <Alert severity="info">Payment Successful and Your flights have been booked successfully</Alert>
                                                            </div>}
                                                    </>
                                                    :
                                                    <></>}
                                                <br />
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                {/* Confirmation Dialog */}
                                <Dialog
                                    open={openConfirmDialog}
                                    fullWidth
                                    maxWidth="lg"
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Booking Confirmation"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <Box>
                                            <Grid container spacing={4}>
                                                <Grid item sm={12}>
                                                    <Typography variant="h5" color="secondary">{selectedDepFlight.departureDate}</Typography>
                                                </Grid>
                                                <Grid item sm={1}>
                                                    <Typography variant="h6">{selectedDepFlight.flightNumber}</Typography>
                                                </Grid>
                                                <Grid item sm={5}>
                                                    <Timeline style={{ marginLeft: '-150px', marginTop: '-15px' }}>
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot variant="outlined" color="secondary" />
                                                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                            </TimelineSeparator>
                                                            <TimelineContent style={{ fontWeight: 'bold' }} width="500px">{selectedDepFlight.departureTime} {selectedDepFlight.depCountry}, {selectedDepFlight.departureAirport} <br /> Terminal 1</TimelineContent>
                                                        </TimelineItem>
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot variant="outlined" color="secondary" />
                                                            </TimelineSeparator>
                                                            <TimelineContent style={{ fontWeight: 'bold' }} width="500px">{selectedDepFlight.arrivalTime} {selectedDepFlight.destCountry}, {selectedDepFlight.destinationAirport} <br /> Terminal 2</TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Grid>
                                                <Grid item sm={4}>
                                                    <Box >
                                                        <Typography variant="h6" color="green">Confirmed</Typography>
                                                        <br />
                                                        <Typography variant="subtitle1">Provided by Cactus Airlines</Typography>
                                                        <br />
                                                        <Typography variant="subtitle1" >Cabin: {cabin}</Typography>
                                                        <Typography variant="subtitle1" >Seats:
                                                            {depSeat.map(
                                                                (seat) => (
                                                                    <>
                                                                        <IconButton color="secondary">
                                                                            <AirlineSeatReclineNormalIcon />
                                                                            {seat}
                                                                        </IconButton>
                                                                    </>
                                                                )
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={2}>
                                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Typography component="legend">Services</Typography>
                                                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Tooltip title="Wifi">
                                                                <WifiIcon />
                                                            </Tooltip>
                                                            <Tooltip title="Meal">
                                                                <RestaurantIcon />
                                                            </Tooltip>
                                                            <Tooltip title="Entertainment">
                                                                <MovieIcon />
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={9}></Grid>
                                                <Grid item sm={3}>
                                                    <Typography variant="h6">Total Price: CFA {(cabin === "economy" ? selectedDepFlight.economyPrice : selectedDepFlight.businessPrice) * (seats)}</Typography>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Alert icon={<ScheduleIcon />} severity="info">
                                                        Total Duration: 12h
                                                    </Alert>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Typography variant="h5" color="secondary">{selectedRetFlight.departureDate}</Typography>
                                                </Grid>
                                                <Grid item sm={1}>
                                                    <Typography variant="h6">{selectedRetFlight.flightNumber}</Typography>
                                                </Grid>
                                                <Grid item sm={5}>
                                                    <Timeline style={{ marginLeft: '-150px', marginTop: '-15px' }}>
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot variant="outlined" color="secondary" />
                                                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                            </TimelineSeparator>
                                                            <TimelineContent style={{ fontWeight: 'bold' }} width="500px">{selectedRetFlight.departureTime} {selectedRetFlight.depCountry}, {selectedRetFlight.departureAirport} <br /> Terminal 6A</TimelineContent>
                                                        </TimelineItem>
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot variant="outlined" color="secondary" />
                                                            </TimelineSeparator>
                                                            <TimelineContent style={{ fontWeight: 'bold' }} width="500px">{selectedRetFlight.arrivalTime} {selectedRetFlight.destCountry}, {selectedRetFlight.destinationAirport} <br /> Terminal 2</TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Grid>
                                                <Grid item sm={4}>
                                                    <Box>
                                                        <Typography variant="h6" color="green">Confirmed</Typography>
                                                        <br />
                                                        <Typography variant="subtitle1">Provided by Cactus Airlines</Typography>
                                                        <br />
                                                        <Typography variant="subtitle1" >Cabin: {cabin}</Typography>
                                                        <Typography variant="subtitle1" >Seats:
                                                            {retSeat.map(
                                                                (seat) => (
                                                                    <>
                                                                        <IconButton color="secondary">
                                                                            <AirlineSeatReclineNormalIcon />
                                                                            {seat}
                                                                        </IconButton>
                                                                    </>
                                                                )
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={2}>
                                                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Typography component="legend">Services</Typography>
                                                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <Tooltip title="Wifi">
                                                                <WifiIcon />
                                                            </Tooltip>
                                                            <Tooltip title="Meal">
                                                                <RestaurantIcon />
                                                            </Tooltip>
                                                            <Tooltip title="Entertainment">
                                                                <MovieIcon />
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={9}></Grid>
                                                <Grid item sm={3}>
                                                    <Typography variant="h6">Total Price: CFA {(cabin === "economy" ? selectedRetFlight.economyPrice : selectedRetFlight.businessPrice) * (seats)}</Typography>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <Alert icon={<ScheduleIcon />} severity="info">
                                                        Total Duration: 12h
                                                    </Alert>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseConfirm} autoFocus color="success" variant="outlined">
                                            Confirm
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                            :
                            <></>}
                        <Dialog open={loginOpen} onClose={handleLoginClose}>
                            <DialogContent>
                                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={0} square>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '30px',
                                            boxShadow: '0px 0px 0px 0px'
                                        }}
                                    >
                                        <Box sx={{ width: '100%' }}>
                                            <Collapse in={alertOpen}>
                                                <Alert
                                                    action={
                                                        <IconButton
                                                            aria-label="close"
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                setAlertOpen(false);
                                                            }}
                                                        >
                                                            <CloseIcon fontSize="inherit" />
                                                        </IconButton>
                                                    }
                                                    sx={{ mb: 2 }}
                                                    variant="filled"
                                                    severity="error"
                                                >
                                                    Incorrect Username or Password
                                                </Alert>
                                            </Collapse>
                                        </Box>
                                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Sign in
                                        </Typography>
                                        <Box component="form" noValidate sx={{ mt: 1 }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                name="username"
                                                onChange={usernameChange}
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                onChange={passwordChange}
                                                autoComplete="current-password"
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                color="secondary"
                                                onClick={handleLogin}
                                            >
                                                {isFetchingUser ? <CircularProgress color="primary" /> : "Login"}
                                            </Button>
                                            <br />
                                            <Link color="secondary" onClick={() => {
                                                setLoginOpen(false)
                                                setSignUpOpen(true)}}>
                                                <Typography variant="subtitle1">Don't Have an Account, Sign Up</Typography>
                                            </Link>
                                        </Box>
                                    </Box>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleLoginClose} color="error" variant="contained">Cancel</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={signUpOpen} onClose={handleSignUpClose} maxWidth="md">
                            <DialogContent>
                                <Grid item xs={12} sm={12} md={12} component={Paper} elevation={0} square>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '30px',
                                            boxShadow: '0px 0px 0px 0px'
                                        }}
                                    >
                                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            {loadingSign ? <CircularProgress color="white"/> : "Sign Up"}
                                        </Typography>
                                        <Box component="form" noValidate sx={{ mt: 1 }}>
                                            <Grid container spacing={3}>
                                                {/* Username */}
                                                <Grid item lg={6}>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="username"
                                                        label="Username"
                                                        name="username"
                                                        onChange={signUpUsernameChange}
                                                        autoFocus
                                                        error={usernameVal.error}
                                                        helperText={usernameVal.message}
                                                    />
                                                </Grid>
                                                <Grid item lg={6}></Grid>
                                                {/* Email */}
                                                <Grid item lg={12}>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email"
                                                        name="email"
                                                        onChange={emailChange}
                                                        autoFocus
                                                        error={emailVal.error}
                                                        helperText={emailVal.message}
                                                    />
                                                </Grid>
                                                <Grid item lg={7}>
                                                    <TextField
                                                        id="outlined-textarea"
                                                        label="Date of Birth"
                                                        fullWidth
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        required
                                                        onChange={(e)=>{
                                                            e.preventDefault();
                                                            setDoB(e.target.value)
                                                        }}
                                                        helperText={dobVal.message}
                                                        error={dobVal.error}
                                                    />
                                                </Grid>
                                                {/* Gender */}
                                                <Grid item lg={4}>
                                                    <FormControl component="fieldset">
                                                        <FormLabel component="legend" style={{ textAlign: 'start' }} error={genderVal.error}>Gender</FormLabel>
                                                        <RadioGroup
                                                            row-aria-label="gender"
                                                            name="row-radio-button-group"
                                                            row
                                                            defaultValue={gender}
                                                            onChange={(e) => {
                                                                setGender(e.target.value)
                                                            }}
                                                        >
                                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                        </RadioGroup>
                                                        <FormHelperText>{genderVal.message}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                                {/* Title */}
                                                <Grid item lg={4}>
                                                    <FormControl sm={{ m: 1 }} fullWidth style={{marginTop: '15px'}}>
                                                        <InputLabel id="demo-simple-select-helper-label" error={titleVal.error}>Title</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={title}
                                                            label="Title"
                                                            onChange={handleTitleChange}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value="MR">MR</MenuItem>
                                                            <MenuItem value="MISS">MISS</MenuItem>
                                                            <MenuItem value="MRS">MRS</MenuItem>
                                                        </Select>
                                                        <FormHelperText error={titleVal.error}>{titleVal.message}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                                {/* First Name */}
                                                <Grid item lg={4}>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="firstName"
                                                        label="First Name"
                                                        name="firstName"
                                                        onChange={firstNameChange}
                                                        autoFocus
                                                        error={firstNVal.error}
                                                        helperText={firstNVal.message}
                                                    />
                                                </Grid>
                                                {/* Last Name */}
                                                <Grid item lg={4}>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="lastName"
                                                        label="Last Name"
                                                        name="lastName"
                                                        onChange={lastNameChange}
                                                        autoFocus
                                                        error={lastNVal.error}
                                                        helperText={lastNVal.message}
                                                    />
                                                </Grid>
                                                {/* Passport Number */}
                                                <Grid item lg={12}>
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="passport"
                                                        label="Passport Number"
                                                        name="passport"
                                                        onChange={passportChange}
                                                        autoFocus
                                                        error={passportVal.error}
                                                        helperText={passportVal.message}
                                                    />
                                                </Grid>
                                                {/* Password */}
                                                <Grid item lg={6}>
                                                    <FormControl sm={{ m: 1 }} variant="outlined" fullWidth>
                                                        <InputLabel htmlFor="outlined-adornment-password" error={passwordVal.error}>Password</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-password"
                                                            type={signUpPassword.showPassword ? 'text' : 'password'}
                                                            fullWidth
                                                            value={signUpPassword.password}
                                                            onChange={handleSignUpPasswordChange('password')}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowPassword}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                        edge="end"
                                                                    >
                                                                        {signUpPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Password"
                                                            error={passwordVal.error}
                                                        />
                                                        <FormHelperText error={passwordVal.error}>{passwordVal.message}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                                {/* Re-Type Password */}
                                                <Grid item lg={6}>
                                                    <FormControl sm={{ m: 1 }} variant="outlined" fullWidth>
                                                        <InputLabel htmlFor="outlined-adornment-password" error={rePasswordVal.error}>Retype Password</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-password"
                                                            type={signUpPassword.showRetypePassword ? 'text' : 'password'}
                                                            fullWidth
                                                            value={signUpPassword.retypePassword}
                                                            onChange={handleRetypeSignUpPasswordChange('retypePassword')}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowRetypePassword}
                                                                        onMouseDown={handleMouseDownRetypePassword}
                                                                        edge="end"
                                                                    >
                                                                        {signUpPassword.showRetypePassword ? <VisibilityOff /> : <Visibility />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Retype Password"
                                                            error={rePasswordVal.error}
                                                        />
                                                        <FormHelperText error={rePasswordVal.error}>{rePasswordVal.message}</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                color="secondary"
                                                onClick={handleSignUp}
                                            >
                                                {isFetchingUser ? <CircularProgress color="primary" /> : "Sign Up"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleSignUpClose} color="error" variant="contained">Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Paper>
            </div>
        </>
    );
}

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
        code: 'AE',
        label: 'United Arab Emirates',
        phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
        code: 'AG',
        label: 'Antigua and Barbuda',
        phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
        code: 'AU',
        label: 'Australia',
        phone: '61',
        suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
        code: 'BA',
        label: 'Bosnia and Herzegovina',
        phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
        code: 'CA',
        label: 'Canada',
        phone: '1',
        suggested: true,
    },
    {
        code: 'CC',
        label: 'Cocos (Keeling) Islands',
        phone: '61',
    },
    {
        code: 'CD',
        label: 'Congo, Democratic Republic of the',
        phone: '243',
    },
    {
        code: 'CF',
        label: 'Central African Republic',
        phone: '236',
    },
    {
        code: 'CG',
        label: 'Congo, Republic of the',
        phone: '242',
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
        code: 'DE',
        label: 'Germany',
        phone: '49',
        suggested: true,
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
        code: 'DO',
        label: 'Dominican Republic',
        phone: '1-809',
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20', airport: 'CAI' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
        code: 'FK',
        label: 'Falkland Islands (Malvinas)',
        phone: '500',
    },
    {
        code: 'FM',
        label: 'Micronesia, Federated States of',
        phone: '691',
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
        code: 'FR',
        label: 'France',
        phone: '33',
        airport: 'CDG',
        suggested: true,
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44', airport: 'LCY' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
        code: 'GS',
        label: 'South Georgia and the South Sandwich Islands',
        phone: '500',
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
        code: 'HM',
        label: 'Heard Island and McDonald Islands',
        phone: '672',
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
        code: 'IO',
        label: 'British Indian Ocean Territory',
        phone: '246',
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
        code: 'IR',
        label: 'Iran, Islamic Republic of',
        phone: '98',
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
        code: 'JP',
        label: 'Japan',
        phone: '81',
        suggested: true,
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
        code: 'KN',
        label: 'Saint Kitts and Nevis',
        phone: '1-869',
    },
    {
        code: 'KP',
        label: "Korea, Democratic People's Republic of",
        phone: '850',
    },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    { code: 'KW', label: 'Kuwait', phone: '965' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7' },
    {
        code: 'LA',
        label: "Lao People's Democratic Republic",
        phone: '856',
    },
    { code: 'LB', label: 'Lebanon', phone: '961' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', label: 'Liechtenstein', phone: '423' },
    { code: 'LK', label: 'Sri Lanka', phone: '94' },
    { code: 'LR', label: 'Liberia', phone: '231' },
    { code: 'LS', label: 'Lesotho', phone: '266' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LY', label: 'Libya', phone: '218' },
    { code: 'MA', label: 'Morocco', phone: '212' },
    { code: 'MC', label: 'Monaco', phone: '377' },
    {
        code: 'MD',
        label: 'Moldova, Republic of',
        phone: '373',
    },
    { code: 'ME', label: 'Montenegro', phone: '382' },
    {
        code: 'MF',
        label: 'Saint Martin (French part)',
        phone: '590',
    },
    { code: 'MG', label: 'Madagascar', phone: '261' },
    { code: 'MH', label: 'Marshall Islands', phone: '692' },
    {
        code: 'MK',
        label: 'Macedonia, the Former Yugoslav Republic of',
        phone: '389',
    },
    { code: 'ML', label: 'Mali', phone: '223' },
    { code: 'MM', label: 'Myanmar', phone: '95' },
    { code: 'MN', label: 'Mongolia', phone: '976' },
    { code: 'MO', label: 'Macao', phone: '853' },
    {
        code: 'MP',
        label: 'Northern Mariana Islands',
        phone: '1-670',
    },
    { code: 'MQ', label: 'Martinique', phone: '596' },
    { code: 'MR', label: 'Mauritania', phone: '222' },
    { code: 'MS', label: 'Montserrat', phone: '1-664' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'MU', label: 'Mauritius', phone: '230' },
    { code: 'MV', label: 'Maldives', phone: '960' },
    { code: 'MW', label: 'Malawi', phone: '265' },
    { code: 'MX', label: 'Mexico', phone: '52' },
    { code: 'MY', label: 'Malaysia', phone: '60' },
    { code: 'MZ', label: 'Mozambique', phone: '258' },
    { code: 'NA', label: 'Namibia', phone: '264' },
    { code: 'NC', label: 'New Caledonia', phone: '687' },
    { code: 'NE', label: 'Niger', phone: '227' },
    { code: 'NF', label: 'Norfolk Island', phone: '672' },
    { code: 'NG', label: 'Nigeria', phone: '234' },
    { code: 'NI', label: 'Nicaragua', phone: '505' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'NO', label: 'Norway', phone: '47' },
    { code: 'NP', label: 'Nepal', phone: '977' },
    { code: 'NR', label: 'Nauru', phone: '674' },
    { code: 'NU', label: 'Niue', phone: '683' },
    { code: 'NZ', label: 'New Zealand', phone: '64' },
    { code: 'OM', label: 'Oman', phone: '968' },
    { code: 'PA', label: 'Panama', phone: '507' },
    { code: 'PE', label: 'Peru', phone: '51' },
    { code: 'PF', label: 'French Polynesia', phone: '689' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675' },
    { code: 'PH', label: 'Philippines', phone: '63' },
    { code: 'PK', label: 'Pakistan', phone: '92' },
    { code: 'PL', label: 'Poland', phone: '48' },
    {
        code: 'PM',
        label: 'Saint Pierre and Miquelon',
        phone: '508',
    },
    { code: 'PN', label: 'Pitcairn', phone: '870' },
    { code: 'PR', label: 'Puerto Rico', phone: '1' },
    {
        code: 'PS',
        label: 'Palestine, State of',
        phone: '970',
    },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'PW', label: 'Palau', phone: '680' },
    { code: 'PY', label: 'Paraguay', phone: '595' },
    { code: 'QA', label: 'Qatar', phone: '974' },
    { code: 'RE', label: 'Reunion', phone: '262' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'RS', label: 'Serbia', phone: '381' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
    { code: 'RW', label: 'Rwanda', phone: '250' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966' },
    { code: 'SB', label: 'Solomon Islands', phone: '677' },
    { code: 'SC', label: 'Seychelles', phone: '248' },
    { code: 'SD', label: 'Sudan', phone: '249' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'SG', label: 'Singapore', phone: '65' },
    { code: 'SH', label: 'Saint Helena', phone: '290' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    {
        code: 'SJ',
        label: 'Svalbard and Jan Mayen',
        phone: '47',
    },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SL', label: 'Sierra Leone', phone: '232' },
    { code: 'SM', label: 'San Marino', phone: '378' },
    { code: 'SN', label: 'Senegal', phone: '221' },
    { code: 'SO', label: 'Somalia', phone: '252' },
    { code: 'SR', label: 'Suriname', phone: '597' },
    { code: 'SS', label: 'South Sudan', phone: '211' },
    {
        code: 'ST',
        label: 'Sao Tome and Principe',
        phone: '239',
    },
    { code: 'SV', label: 'El Salvador', phone: '503' },
    {
        code: 'SX',
        label: 'Sint Maarten (Dutch part)',
        phone: '1-721',
    },
    {
        code: 'SY',
        label: 'Syrian Arab Republic',
        phone: '963',
    },
    { code: 'SZ', label: 'Swaziland', phone: '268' },
    {
        code: 'TC',
        label: 'Turks and Caicos Islands',
        phone: '1-649',
    },
    { code: 'TD', label: 'Chad', phone: '235' },
    {
        code: 'TF',
        label: 'French Southern Territories',
        phone: '262',
    },
    { code: 'TG', label: 'Togo', phone: '228' },
    { code: 'TH', label: 'Thailand', phone: '66' },
    { code: 'TJ', label: 'Tajikistan', phone: '992' },
    { code: 'TK', label: 'Tokelau', phone: '690' },
    { code: 'TL', label: 'Timor-Leste', phone: '670' },
    { code: 'TM', label: 'Turkmenistan', phone: '993' },
    { code: 'TN', label: 'Tunisia', phone: '216' },
    { code: 'TO', label: 'Tonga', phone: '676' },
    { code: 'TR', label: 'Turkey', phone: '90' },
    {
        code: 'TT',
        label: 'Trinidad and Tobago',
        phone: '1-868',
    },
    { code: 'TV', label: 'Tuvalu', phone: '688' },
    {
        code: 'TW',
        label: 'Taiwan, Province of China',
        phone: '886',
    },
    {
        code: 'TZ',
        label: 'United Republic of Tanzania',
        phone: '255',
    },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'UG', label: 'Uganda', phone: '256' },
    {
        code: 'US',
        label: 'United States',
        phone: '1',
        suggested: true,
    },
    { code: 'UY', label: 'Uruguay', phone: '598' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998' },
    {
        code: 'VA',
        label: 'Holy See (Vatican City State)',
        phone: '379',
    },
    {
        code: 'VC',
        label: 'Saint Vincent and the Grenadines',
        phone: '1-784',
    },
    { code: 'VE', label: 'Venezuela', phone: '58' },
    {
        code: 'VG',
        label: 'British Virgin Islands',
        phone: '1-284',
    },
    {
        code: 'VI',
        label: 'US Virgin Islands',
        phone: '1-340',
    },
    { code: 'VN', label: 'Vietnam', phone: '84' },
    { code: 'VU', label: 'Vanuatu', phone: '678' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', label: 'Samoa', phone: '685' },
    { code: 'XK', label: 'Kosovo', phone: '383' },
    { code: 'YE', label: 'Yemen', phone: '967' },
    { code: 'YT', label: 'Mayotte', phone: '262' },
    { code: 'ZA', label: 'South Africa', phone: '27' },
    { code: 'ZM', label: 'Zambia', phone: '260' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

export default BookFlight;

