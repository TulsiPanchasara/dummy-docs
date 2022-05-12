import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getSignedupData, userLogin } from '../auth/auth';
import { TIMEOUT_VALUE } from '../config/constants';
import { loginType } from '../interface/session';

const login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({} as loginType);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false)

    const onChange = (e:any, field: string) => {
        setFormData({ ...formData, [field]: e.target.value });
        setShowError(false);
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        
        const {  email, password } = formData;
        if (!email || !password) {
            setShowError(true);
            return;
        }
        setLoading(true);
        if (typeof window !== 'undefined') {
            let data = getSignedupData();
            if (data && data.email && data.password) {
                if (email === data.email && password === data.password) {
                    setTimeout(() => {
                        userLogin(formData);
                    }, TIMEOUT_VALUE);
                } else {
                    alert("Invalid credentials");
                }
            } else {
                alert("No email found. Please signup");
                router.push("/signup")
            }
        }
    }

    return (
        <>
            <Head>
                <title>Dummy Docs - Login</title>
            </Head>
            <div style={{ display: "flex", justifyContent: "center", padding: "30px" }} >
                <form onSubmit={onSubmit} >
                    <div className='documentFormFields' >
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => onChange(e, 'email')} type="text" placeholder='email' name="email" />
                    </div>
                    <div className='documentFormFields' >
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => onChange(e, 'password')} type="password" placeholder='password' name="password" />
                    </div>
                    <button style={{ marginTop:"8px", marginBottom:"8px" }} >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    {showError && <p style={{ color: "red" }} >Please fill all required fields</p>}
                    <div style={{ textAlign:"center" }} >Don't have an account ? <a href="/signup" style={{ textDecoration:"underline", color:"blue" }} >Signup</a></div>
                </form>
                
            </div>
        </>
    )
}

export default login