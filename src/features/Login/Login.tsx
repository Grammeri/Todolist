import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { loginTC } from './auth-reducer';
import { AppRootStateType } from '../../app/store';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@mui/material';

const loginEmail = process.env.REACT_APP_EMAIL_CREDENTIAL || '';
const loginPassword = process.env.REACT_APP_PASSWORD_CREDENTIAL || '';

export const Login = () => {
    console.log(process.env.REACT_APP_EMAIL_CREDENTIAL, process.env.REACT_APP_PASSWORD_CREDENTIAL);

    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                };
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                };
            }
        },
        initialValues: {
            email: 'REACT_APP_EMAIL_CREDENTIAL',
            password: 'REACT_APP_PASSWORD_CREDENTIAL',
            rememberMe: true
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    });

    React.useEffect(() => {
        formik.setFieldValue("email", loginEmail);
        formik.setFieldValue("password", loginPassword);
    }, []);

    if (isLoggedIn) {
        return <Navigate to={"/"} />;
    }

    return (
        <Grid container justifyContent="center" style={{ padding: '20px' }}>
            <Grid item xs={4}>
                <div style={{ backgroundColor: 'white', padding: '20px' }}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <p>
                                    To log in get registered <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>here</a>
                                </p>
                                <p>
                                    or use common test account credentials:
                                </p>
                                <p> Email: {loginEmail} </p>
                                <p> Password: {loginPassword} </p>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                <FormControlLabel
                                    label={'Remember me'}
                                    control={
                                        <Checkbox
                                            {...formik.getFieldProps("rememberMe")}
                                            checked={formik.values.rememberMe}
                                        />
                                    }
                                />
                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};
