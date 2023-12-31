'use client';
import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';// Import useHistory from React Router
import Persona from 'persona';
import { callApi } from '../../_actions/personaupdateapi';


const InlineInquiry = () => {
    const history = createBrowserHistory(); 
    var myuserId;

    useEffect(() => {
      
        myuserId = localStorage.getItem('userId');
       
  
    }, []);

    const divStyle = {
        width: '100%', 
    };

    const handleComplete = async ({ inquiryId, status, fields }) => {
        try {
            if (status === 'completed') {
                await callApi(inquiryId, myuserId);
                history.push('/profile'); 
                window.location.reload();
            }
        } catch (e) {
            console.error("Error in handleComplete:", e);
            throw Error(e);
        }
    };

    return (
        <div className='h-screen flex justify-center' style={divStyle}>
            <Persona.Inquiry
                templateId='itmpl_oFwr5vDFxPnJVnpKmXpgxY5x'
                environmentId='env_3gPXHtfowwicvW8eh5GdW9PV'
                onLoad={() => {
                    console.log('Loaded inline');
                }}
                onComplete={handleComplete}
            />
        </div>
    );
};

export default InlineInquiry;
