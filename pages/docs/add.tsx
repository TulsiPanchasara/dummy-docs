import Head from 'next/head';
import React from 'react';
import AddEditForm from '../../components/containers/AddEditForm';

const AddDoc = () => {

    return (
        <>
            <Head>
                <title>Dummy Docs - Add Doc</title>
            </Head>
            <AddEditForm/>
        </>
    )
}

export default AddDoc