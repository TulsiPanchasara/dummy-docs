import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { addEditDoc, getDataById } from '../../auth/docsCRUD';
import { TIMEOUT_VALUE } from '../../config/constants';
import { docsType } from '../../interface/docsType';
import styles from '../../styles/Home.module.css';

interface IAddEditFormProps {
    id?: string;
}

const AddEditForm = (props: IAddEditFormProps) => {
    const { id } = props;
    const [formData, setFormData] = useState({} as {
        id: number;
        firstName: string;
        lastName: string;
        mobile: number;
        email: string;
        line1: string;
        line2: string;
        city: string;
        country: string;
        dob: string;
    });
    const [showError, setShowError] = useState(false);
    const [addEditError, setAddEditError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            getDataToEdit();
        }
    }, [id])

    const getDataToEdit = () => {
        const response = getDataById(Number(id));

        if (response) {
            setFormData({
                id: response.id,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                mobile: response.mobile,
                dob: response.dob,
                line1: response.address.line1,
                line2: response.address.line2,
                city: response.address.city,
                country: response.address.country
            })
        }
    }




    const onAddDocument = (e: any) => {
        e.preventDefault();
        const { firstName, lastName, email, mobile } = formData;
        if (!firstName || !lastName || !email || !mobile) {
            setShowError(true);
            return;
        }


        let updatedObj: docsType = {
            id: id ? formData.id : Math.floor(Math.random() * 10000),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            dob: formData.dob,
            address: { line1: formData.line1, line2: formData.line2, city: formData.city, country: formData.country }
        }

        const response = addEditDoc(updatedObj, id ? true : false);
        setLoading(true);
        if (response) {
            setTimeout(() => {
                setLoading(false);
                router.push('/')
            }, TIMEOUT_VALUE);
        } else {
            setLoading(false);
            setAddEditError(true);
        }
    }

    const onChangeValue = (e: any, field: string) => {
        setFormData({ ...formData, [field]: e.target.value })
        setShowError(false);
        setAddEditError(false);
    }


    return (
        <div>
            <h1 style={{ textAlign: "center" }} >{id ? 'Edit' : 'Add'} Document {id && `: ${id}`}</h1>
            {addEditError && <p style={{ color: "red", textAlign: "center" }} >Something went wrong. Please try again later</p>}
            <div style={{ display: "flex", justifyContent: "center", padding: "30px" }} >


                <form onSubmit={onAddDocument}  >


                    <div className='documentFormFields' >
                        <label className={styles.label} htmlFor="first_name">First Name*</label>
                        <input onChange={e => onChangeValue(e, "firstName")} required name="firstName" defaultValue={formData.firstName} type="text" placeholder='First Name' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} htmlFor="last_name">Last Name*</label>
                        <input onChange={e => onChangeValue(e, "lastName")} required name="lastName" defaultValue={formData.lastName} type="text" placeholder='Last Name' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} htmlFor="mobile">Mobile*</label>
                        <input onChange={e => onChangeValue(e, "mobile")} required name="mobile" defaultValue={formData.mobile} type="number" placeholder='mobile' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} htmlFor="last_name">Email*</label>
                        <input onChange={e => onChangeValue(e, "email")} required name="email" defaultValue={formData.email} type="email" placeholder='Email' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} htmlFor="last_name">Date of Birth</label>
                        <input onChange={e => onChangeValue(e, "dob")} name="dob" defaultValue={formData.dob} type="date" placeholder='Dob' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} >Address Line 1</label>
                        <input onChange={e => onChangeValue(e, "line1")} name="line1" defaultValue={formData.line1} type="text" placeholder='Line 1' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} >Address Line 2</label>
                        <input onChange={e => onChangeValue(e, "line2")} name="line2" defaultValue={formData.line2} type="text" placeholder='Line 2' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} >City</label>
                        <input onChange={e => onChangeValue(e, "city")} name="city" defaultValue={formData.city} type="text" placeholder='City' />
                    </div>

                    <div className='documentFormFields' >
                        <label className={styles.label} >Country </label>
                        <select style={{ width: '100%' }} onChange={e => onChangeValue(e, "country")} name="country" id="country">
                            <option selected={formData.country === ''} value="">--Select--</option>
                            <option selected={formData.country === 'India'} value="India" >India</option>
                            <option selected={formData.country === 'United Kingdom'} value="United Kingdom">United Kingdom</option>
                            <option selected={formData.country === 'United States'} value="United States">United States</option>
                            <option selected={formData.country === 'France'} value="France">France</option>
                            <option selected={formData.country === 'Germany'} value="Germany">Germany</option>
                            <option selected={formData.country === 'Italy'} value="Italy">Italy</option>
                        </select>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px" }} >
                        <button type='submit' style={{ marginRight: "8px" }} >
                            {loading ? 'Loading' : 'Save'}
                        </button>
                        <a className='anchorButton' onClick={() => router.push('/')} >
                            Cancel
                        </a>
                    </div>
                    {showError && <p style={{ color: 'red' }} >Please fill all required fields</p>}
                    <p>Fields with * are required</p>


                </form>
            </div>
        </div>
    )
}

export default AddEditForm