'use client';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { updateExistUser } from '@/app/_actions/update_profile';
import { createBrowserHistory } from 'history';


const ProfileUpdatePage = () => {
    const history = createBrowserHistory(); 
    const [userID, setuserId] = useState('');
    const [bundeeToken, setToken] = useState('');
    useEffect(() => {
        const bundee_auth_token = localStorage.getItem('bundee_auth_token');
        const userId = localStorage.getItem('userId');
        setuserId(userId)
        setToken(bundee_auth_token)
    }, []);

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [base64Image, setBase64Image] = useState('');
    const [address1, setaddress1] = useState('');
    const [address2, setaddress2] = useState('');
    const [address3, setaddress3] = useState('');

    const [errors, setErrors] = useState({});
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleMiddleName = (event) => {
        setMiddleName(event.target.value);
    };
    const handleLastName = (event) => {
        setLastName(event.target.value);
    };
    const handleAddress1 = (event) => {
        setaddress1(event.target.value);
    };
    const handleAddress2= (event) => {
        setaddress2(event.target.value);
    };
    const handleAddress3= (event) => {
        setaddress3(event.target.value);
    };

  
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            // Read the file as base64
            const reader = new FileReader();
            reader.onload = () => {
                // Ensure that reader.result is a string
                const resultAsString = reader.result as string;
                setBase64Image(resultAsString);
            };
            reader.readAsDataURL(file);

            setProfileImage(file);
        }
    };

    async function onUploadEvent  ()  {

        const body={
            "iduser": userID,
            "firstname": firstName,
            "middlename": middleName,
            "lastname": lastName,
            "mobilePhone": phoneNumber,
            "address_1": address1,
            "address_2": address2,
            "address_3": address3,
            "city": city,
            "state": state,
            "postcode": zipCode,
            "country": country,
            "language": "NA",
            "driverlisense": "NA",
            "vehicleowner": "NA",
            "userimage": base64Image,
            "fromValue": "completeProfile"
        }
        const data=await updateExistUser(body,bundeeToken)

        console.log(data)
        history.push('/profile'); 
                window.location.reload();
    };



    return (
        <>
            <form className='mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8 sm:py-16 lg:py-20'>
                <div className='space-y-12'>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <div className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button type='button' className='inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto' onClick={onUploadEvent}>
                                Update
                            </button>
                            <button type='button' className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>
                                Cancel
                            </button>
                        </div>

                        <h2 className='text-base font-semibold leading-7 text-gray-900'>Account Details</h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>Your Profile Information will be used for the host to identify yourself. Your profile data will not be shared to the public users. You can edit and customize your profile information any time.</p>
                        <div className='border-b border-gray-900/10 pb-12 mt-4'>
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>Personal Information</h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>The same information you provided will be used for the communication Purpose, through out the Trip Jouney with Bundee.</p>

                            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='first-name' className='block text-sm font-medium leading-6 text-gray-900'>
                                        First Name
                                    </label>
                                    <div className='mt-2'>
                                        <input placeholder='' type='text' name='first-name' value={firstName} id='first-name' onChange ={handleFirstName} className='w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='middle-name' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Middle Name
                                    </label>
                                    <div className='mt-2'>
                                        <input placeholder='' type='text' name='middle-name' value={middleName} id='middle-name' onChange ={handleMiddleName} className='w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='last-name' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Last Name
                                    </label>
                                    <div className='mt-2'>
                                        <input placeholder='' type='text' name='last-name' value={lastName} id='last-name' onChange ={handleLastName} className='w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>

                                <div className='sm:col-span-2'>
                                    <label htmlFor='phone-number' className='block text-sm font-medium leading-6 text-gray-900' >
                                        Phone Number
                                    </label>

                                    <div className='mt-2'>
                                        <input type='text' value={phoneNumber}  onChange ={handlePhoneNumberChange}  name='phone-number' id='phone-number' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>

                                <div className='sm:col-span-2'>
                                    <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Email Address
                                    </label>
                                    <div className='mt-2'>
                                        <input type='email' value={email}  onChange ={handleEmailChange} name='last-name' id='last-name' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='zip-code' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Zip code
                                    </label>
                                    <div className='mt-2'>
                                        <input type='text' value={zipCode}  onChange ={handleZipCodeChange} name='zip-code' id='zip-code' autoComplete='given-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                            </div>

                            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                

                                <div className='sm:col-span-2'>
                                    <label htmlFor='city' className='block text-sm font-medium leading-6 text-gray-900'>
                                        City / District Name
                                    </label>
                                    <div className='mt-2'>
                                        <input type='text' value={city}  onChange ={handleCityChange} name='city' id='city' autoComplete='given-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>

                                <div className='sm:col-span-2'>
                                    <label htmlFor='state' className='block text-sm font-medium leading-6 text-gray-900'>
                                        State / Provinence
                                    </label>

                                    <div className='mt-2'>
                                        <input type='text' value={state}  onChange ={handleStateChange} name='state' id='state' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>

                                <div className='sm:col-span-2'>
                                    <label htmlFor='country' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Country
                                    </label>
                                    <div className='mt-2'>
                                        <input type='text' value={country}  onChange ={handleCountryChange} name='country' id='country' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='address1' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Address 1
                                    </label>
                                    <div className='mt-2'>
                                        <input type='text' value={address1}  onChange ={handleAddress1} name='address1' id='address1' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='address2' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Address 2
                                    </label>
                                    <div className='mt-2'>
                                        <input type='text' value={address2}  onChange ={handleAddress2} name='address2' id='address2' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='address3' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Address 3
                                    </label>
                                    <div className='mt-2'>
                                        <input type='text' value={address3}  onChange ={handleAddress3} name='address3' id='address3' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                


                                <div className='flex flex-col col-span-full'>
                                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                                        Insurance Details<span className='text-primary text-xs'> ( Optional ) </span>
                                    </h2>
                                    <p className='mt-1 text-sm leading-6 text-gray-600'>If you have any personal insurance details against the vehicle rental and driving, You can enter here, Your data will not be shared and used within the bundee network.</p>
                                </div>
                            </div>

                            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                <div className='sm:col-span-3'>
                                    <label htmlFor='first-name' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Insurance Company Name
                                    </label>
                                    <div className='mt-2'>
                                        <input type='text' name='first-name' id='first-name' autoComplete='given-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>

                                <div className='sm:col-span-3'>
                                    <label htmlFor='last-name' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Insurance Carrier Number
                                    </label>

                                    <div className='mt-2'>
                                        <input type='text' name='last-name' id='last-name' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                            </div>

                            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                <div className='col-span-full'>
                                    <label htmlFor='photo' className='block text-sm font-medium leading-6 text-gray-900'>
                                        Your Photo
                                    </label>
                                </div>

                                <div className='aspect-w-1 aspect-h-1 w-full rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 border-2 border-gray-300 overflow-hidden'>
        <img
            src={base64Image || 'https://via.placeholder.com/900'}
            alt='user Image Loading'
            className='h-full w-full object-cover object-center lg:h-full lg:w-full aspect-none'
            style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
    </div>
                                <div className='mt-4 flex justify-between'>
                                    <div className='col-span-full'>
                                        <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                                            Uplaod your profile Image
                                        </label>
                                        <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                                            <div className='text-center'>
                                                <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                                                <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                                                    <label htmlFor='file-upload' onChange={handleFileChange} className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                                                        <span>Upload a file</span>
                                                        <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                                                    </label>
                                                    <p className='pl-1'>or drag and drop</p>
                                                </div>
                                                <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default ProfileUpdatePage;
