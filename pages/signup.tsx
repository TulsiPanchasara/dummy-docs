import Head from 'next/head';
import React, { useState } from 'react';
import { userSignup } from '../auth/auth';
import { userSessionType } from '../interface/session';
import styles from '../styles/Home.module.css';

const signup = () => {
    
    const [formData, setFormData] = useState({} as userSessionType);
    const [showError, setShowError] = useState(false);


    const onSignup = async (e:any) => {
        e.preventDefault();
        console.log('Form dara ', formData)
        const { name, email, password } = formData;
        if (!name || !email || !password) {
            setShowError(true);
            return;
        }
        userSignup(formData);
        
    }

    return (
        <>
            <Head>
                <title>Dummy Docs - Signup</title>
            </Head>
            <div style={{display: "flex", justifyContent:"center", padding: "30px"}} >
                <form name="signupform" onSubmit={onSignup}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:'8px' }}  >
                        <label className={styles.label} htmlFor="name">Name</label>
                        <input onChange={(e) => { setFormData({...formData, name :e.target.value}); setShowError(false) } } type="text" placeholder='name' name="name" />
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:'8px' }}  >
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input onChange={(e) => { setFormData({...formData, email :e.target.value}); setShowError(false) } } type="email" name="email" placeholder='email' />
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:'8px' }}  >
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input onChange={(e) => { setFormData({...formData, password :e.target.value}); setShowError(false) } } type="password" placeholder='password' name="password" />
                            </div>
                    <button type='submit' >Signup</button>
                    {showError && <p style={{ color: "red" }} >Please fill all required fields</p>}
                    <div style={{ textAlign:"center" }} >Already having an account ? <a href="/login">Login</a></div>
                </form>
            </div>
            
        </>
  )
}

export default signup