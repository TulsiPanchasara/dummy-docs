import get from 'lodash.get';
import React, { useEffect, useState } from 'react';
import { getDataById } from '../../auth/docsCRUD';
import { docsType } from '../../interface/docsType';

interface IViewDataType {
    id: string;
}

const ViewData = (props: IViewDataType) => {
    const { id } = props;
    const [currentData, setCurrentData] = useState({} as docsType)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        id && getCurrentData();
    }, [id])

    const getCurrentData = () => {
        const response = getDataById(Number(id));
        if (response) {
            setCurrentData(response)
        } else {
            console.log('Something went wrong in get by id')
        }
        setLoading(false);
    }
    
    if (loading) {
        return <p style={{ padding: "10px 40px" }}>LOADING</p>
    }

    return (
        <div style={{ padding: "10px 40px" }}>
            <div className='viewData' >
                <div className='viewDataField' >First Name:</div>
                <div className='viewDataValue' >{currentData.firstName}</div>
            </div>
            <div className='viewData' >
                <div className='viewDataField' >Last Name:</div>
                <div className='viewDataValue' >{currentData.lastName}</div>
            </div>
            <div className='viewData' >
                <div className='viewDataField' >Mobile:</div>
                <div className='viewDataValue' >{currentData.mobile}</div>
            </div>
            <div className='viewData' >
                <div className='viewDataField' >Email:</div>
                <div className='viewDataValue' >{currentData.email}</div>
            </div>
            <div className='viewData' >
                <div className='viewDataField' >Date of Birth:</div>
                <div className='viewDataValue' >{currentData.dob ? currentData.dob.split('-').reverse().join('/') : '-'}</div>
            </div>
            {currentData.address && <div className='viewData' >
                <div className='viewDataField' >Address:</div>
                <div className='viewDataValue' >
                    <div>
                        {get(currentData.address, 'line1', '-')} <br />
                        {get(currentData.address, 'line2', '-')} <br />
                        {get(currentData.address, 'city', '-')} <br />
                        {get(currentData.address, 'country', '-')}
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ViewData