import styles from '../styles/login.module.css';
import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import { useHistory } from 'react-router-dom';
// import Cookies from 'universal-cookie';
// import dotenv from 'dotenv';
// import { baseUrl } from './RequestTools';

// dotenv.config();

function Login() {
    // const cookies = new Cookies();
    const [currentView, setCurrentView] = useState('signUp');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const changeView = (view: any) => {
        setCurrentView(view);
    };

    // if (cookies.get('isAuthenticated')) history.push('/home');

    const logIn = () => {
        console.log('loginnn');
    };

    const signUp = () => {
        console.log('signUppp');
    };

    const updateUsername = (event: any) => {
        setUserName(event.target.value);
    };

    const updatePassword = (event: any) => {
        setUserPassword(event.target.value);
    };

    const updateDisplayName = (event: any) => {
        setUserDisplayName(event.target.value);
    };

    return (
        <>restart</>
        // <section id="login-page" className={styles.section_login_page}>
        //     {(() => {
        //         switch (currentView) {
        //             case 'signUp':
        //                 return (
        //                     <>
        //                         <form
        //                             onSubmit={(event) => event.preventDefault()}
        //                             className={styles.section_login_page_form}>
        //                             <h2 className={styles.section_login_page_form_h2}>Sign Up!</h2>
        //                             <fieldset className={styles.section_login_page_form_fieldset}>
        //                                 <legend className={styles.section_login_page_form_fieldset_legend}>
        //                                     Create Account
        //                                 </legend>
        //                                 <ul className={styles.section_login_page_form_fieldset_ul}>
        //                                     <li className={styles.section_login_page_form_fieldset_ul_li}>
        //                                         <label className={styles.section_login_page_form_fieldset_ul_li_label} htmlFor="username">Username:</label>
        //                                         <input
        //                                             type="text"
        //                                             id="username"
        //                                             value={userName}
        //                                             onChange={(evt) => updateUsername(evt)}
        //                                             required
        //                                         />
        //                                     </li>
        //                                     <li className={styles.section_login_page_form_fieldset_ul_li}>
        //                                         <label className={styles.section_login_page_form_fieldset_ul_li_label} htmlFor="displayName">Display Name:</label>
        //                                         <input
        //                                             type="text"
        //                                             id="displayName"
        //                                             value={userDisplayName}
        //                                             onChange={(evt) => updateDisplayName(evt)}
        //                                             required
        //                                         />
        //                                     </li>
        //                                     <li className={styles.section_login_page_form_fieldset_ul_li}>
        //                                         <label className={styles.section_login_page_form_fieldset_ul_li_label} htmlFor="password">Password:</label>
        //                                         <input
        //                                             type="password"
        //                                             id="password"
        //                                             value={userPassword}
        //                                             onChange={(evt) => updatePassword(evt)}
        //                                             required
        //                                         />
        //                                     </li>
        //                                 </ul>
        //                             </fieldset>
        //                             <button className={styles.section_login_page_form_button} onClick={() => signUp()}>
        //                                 Submit
        //                             </button>
        //                             <button
        //                                 className={styles.section_login_page_form_button}
        //                                 onClick={() => changeView('logIn')}>
        //                                 Have an Account?
        //                             </button>
        //                         </form>
        //                         {/* <Modal show={show} onHide={handleClose}>
        //                             <Modal.Header closeButton>
        //                                 <Modal.Title>Error !</Modal.Title>
        //                             </Modal.Header>
        //                             <Modal.Body>These identifiers are already used by another user</Modal.Body>
        //                             <Modal.Footer>
        //                                 <Button variant="secondary" onClick={handleClose}>
        //                                     Close
        //                                 </Button>
        //                             </Modal.Footer>
        //                         </Modal> */}
        //                     </>
        //                 );
        //             case 'logIn':
        //                 return (
        //                     <>
        //                         <form
        //                             onSubmit={(event) => event.preventDefault()}
        //                             className={styles.section_login_page_form}>
        //                             <h2 className={styles.section_login_page_form_h2}>Welcome Back!</h2>
        //                             <fieldset className={styles.section_login_page_form_fieldset}>
        //                                 <legend className={styles.section_login_page_form_fieldset_legend}>
        //                                     Log In
        //                                 </legend>
        //                                 <ul className={styles.section_login_page_form_fieldset_ul}>
        //                                     <li className={styles.section_login_page_form_fieldset_ul_li}>
        //                                         <label className={styles.section_login_page_form_fieldset_ul_li_label} htmlFor="username">Username:</label>
        //                                         <input
        //                                             type="text"
        //                                             id="username"
        //                                             value={userName}
        //                                             onChange={(evt) => updateUsername(evt)}
        //                                             required
        //                                         />
        //                                     </li>
        //                                     <li className={styles.section_login_page_form_fieldset_ul_li}>
        //                                         <label className={styles.section_login_page_form_fieldset_ul_li_label} htmlFor="password">Password:</label>
        //                                         <input
        //                                             type="password"
        //                                             id="password"
        //                                             value={userPassword}
        //                                             onChange={(evt) => updatePassword(evt)}
        //                                             required
        //                                         />
        //                                     </li>
        //                                 </ul>
        //                             </fieldset>
        //                             <button className={styles.section_login_page_form_button} onClick={() => logIn()}>
        //                                 Login
        //                             </button>
        //                             <button
        //                                 className={styles.section_login_page_form_button}
        //                                 type="button"
        //                                 onClick={() => changeView('signUp')}>
        //                                 Create an Account
        //                             </button>
        //                             <br />
        //                             <a
        //                                 // href={baseUrl + '/api/auth/spotify/login'}
        //                                 className={styles.section_login_page_form_fieldset_ul_li_a}
        //                                 role="button"
        //                                 aria-pressed="true">
        //                                 Login With Spotify
        //                             </a>
        //                             <a
        //                                 // href={baseUrl + '/api/auth/deezer/login'}
        //                                 className={styles.section_login_page_form_fieldset_ul_li_a}
        //                                 role="button"
        //                                 aria-pressed="true">
        //                                 Login With Deezer
        //                             </a>
        //                             <a
        //                                 // href={baseUrl + '/api/auth/google/login'}
        //                                 className={styles.section_login_page_form_fieldset_ul_li_a}
        //                                 role="button"
        //                                 aria-pressed="true">
        //                                 Login With Google
        //                             </a>
        //                         </form>
        //                         {/* <Modal show={show} onHide={handleClose}>
        //                             <Modal.Header closeButton>
        //                                 <Modal.Title>Error !</Modal.Title>
        //                             </Modal.Header>
        //                             <Modal.Body>These login credentials are incorrect</Modal.Body>
        //                             <Modal.Footer>
        //                                 <Button variant="secondary" onClick={handleClose}>
        //                                     Close
        //                                 </Button>
        //                             </Modal.Footer>
        //                         </Modal> */}
        //                     </>
        //                 );
        //             default:
        //                 return <></>;
        //         }
        //     })()}
        // </section>
    );
}

export default Login;
