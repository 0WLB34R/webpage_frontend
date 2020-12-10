import React, { useState} from 'react';
import Axios from 'axios';
import {TextField} from '@material-ui/core';
import './LoginSect.css';
import icon from '../../userimg.png';
import ButtonComp from '../ButtonComp'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

function LoginSect() {
    const next = (e) => {
        console.log('Me voy a la lista de usuarios')
    }

    const isAdmin = localStorage.getItem('role') === "1"
    const isEditor = localStorage.getItem('role') === "2"

    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return expression.test(String(email).toLowerCase());
    }

    const validatePassword = (password) => {
        return password.length >= 8;
    }

    const login = () => {
        if (validateEmail(email) && validatePassword(password)) {
            Axios.post('http://skynet.lp.upb.edu/~pbruckner18/webpage_backend/login', {
                "email": email,
                "password": password,
            }).then((response) => {
                console.log(response.data);
                if(response.data.status==='error'){
                    console.log("No se pudo iniciar sesión");
                    handleClickOpen();
                }else{
                    console.log("Se pudo iniciar sesión");
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('role', response.data[0].roles)
                    localStorage.setItem('name', response.data[0].names)
                    localStorage.setItem('lastnm', response.data[0].lastnames)
                    console.log(localStorage.getItem('role'))
                    console.log(localStorage.getItem('name'))
                    console.log(localStorage.getItem('lastnm'))
                    history.push('/')
                }
            });
        } else {
            //TODO Show warning
        }
        
    };
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    const logout = () => {
        localStorage.setItem('role', '')
        localStorage.setItem('name', '')
        localStorage.setItem('lastnm', '')
        console.log(localStorage.getItem('role'))
        console.log(localStorage.getItem('name'))
        console.log(localStorage.getItem('lastnm'))
    
    };
    if (localStorage.getItem('name') !== ''){
        return(
            <div className='containerlogin'>
            <img src={icon} alt='icon' className='icon'/>
           <h1 className='title'>
               Log Out
           </h1> 
           <Link to ='/login' >
           <ButtonComp 
                text={'Logout'}
                disabled={false}
                onClick={logout}
             />
             </Link>
             <Link to ='/artireded' >
           <ButtonComp 
                text={'Todos los Artículos'}
                disabled={false}
                onClick={next}
             />
             </Link>
             {isAdmin &&
             <Link to ='/listausuarios' >
           <ButtonComp 
                text={'Ver Usuarios'}
                disabled={false}
                onClick={next}
             />
             </Link>}
             {isEditor &&
             <Link to ='/creararti' >
           <ButtonComp 
                text={'Crear Artículo'}
                disabled={false}
                onClick={next}
             />
             </Link>}
                <img src={icon} alt='icon' className='icon'/>
                <h1 className='title'>Log Out</h1> 
                <Link to ='/login' >
                <ButtonComp 
                    text={'Logout'}
                    disabled={false}
                    onClick={logout}
                />
                </Link>
                <Link to ='/artireded' >
                <ButtonComp 
                    text={'Todos los Artículos'}
                    disabled={false}
                    onClick={next}
                />
                </Link>
                {isAdmin &&
                <Link to ='/listausuarios' >
                <ButtonComp 
                    text={'Ver Usuarios'}
                    disabled={false}
                    onClick={next}
                />
                </Link>}
                {isEditor &&
                <Link to ='/creararti' >
                <ButtonComp 
                    text={'Crear Artículo'}
                    disabled={false}
                    onClick={next}
                />
                </Link>}
            </div>
        )
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Dirección de correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        text={'Login'}
                        onClick={login}
                    >
                        Iniciar Sesión
                    </Button>
                    
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Inicio de sesión"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            El usuario o la contraseña no coinciden o son incorrectos.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Aceptar
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                </Container>
        )
    }
}

export default LoginSect
