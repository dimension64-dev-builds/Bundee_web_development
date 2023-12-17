'use client'
import { Button } from '@/components/ui/button'
import { PaperClipIcon, PhotoIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { fetchProfileDetails } from '@/app/_actions/fetchprofiledetails';

const  UserProfilePage= () =>  {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setpostCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [isVerified, setIsVerfied] = useState('');
    const [address1, setaddress1] = useState('');
    const [address2, setaddress2] = useState('');
    const [address3, setaddress3] = useState('');
    const [image, setImage] = useState('');
    useEffect(() => {

        const bundee_auth_token = localStorage.getItem('bundee_auth_token');
        const userId = localStorage.getItem('userId');
        
        const body = {
            iduser: userId,
        };
        const fetchData = async () => {
            try {
                const data = await fetchProfileDetails(body, bundee_auth_token);
                setFirstName(data['firstName']);
                setMiddleName(data['middleName']);
                setLastName(data['lastName']);
                setEmail(data['email']);
                setPhoneNumber(data['phoneNumber']);
                setState(data['state']);
                setCity(data['city']);
                setCountry(data['country']);
                setpostCode(data['postCode']);
                setIsVerfied(data['isVerified']);
                setaddress1(data['address1']);
                setaddress2(data['address2']);
                setaddress3(data['address3']);
                setImage(data['userImage'])


               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, []);

    return (
        <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8 sm:py-12 lg:py-12'>
            <div className="px-4 sm:px-0">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Profile</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details will be shared to the host for better experiences.</p>
                <Link href="/profile/update" title="" className="flex">
                    <Button className='mt-4' variant="outline">Edit Profile Information
                    </Button>
                </Link>
            </div>
            <div className="mt-6 border-t border-gray-100">

                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${firstName} ${middleName} ${lastName}`}</dd>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{`${phoneNumber}`}</dd>
                        <dd className="mt-1 text-cente text-sm leading-6 text-black sm:mt-0">
                        {/* <Link href="/profile/personaverification" title="" className="flex">
                            <button className='bg-black text-white rounded-lg px-4'>Verify Now</button>
                        </Link> */}
                        </dd>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">{`${email}`}</dd>
                        <dd className="mt-1 text-cente text-sm leading-6 text-black sm:mt-0">
                            <button className='text-green-600 px-4 rounded-lg'></button>
                        </dd>
                    </div>

                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Driving Licence</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                        
                            {
                                isVerified?(
                                    <p className="text-green-600">Verified</p>
                                ):(
                                    <Link href="/profile/personaverification" title="" className="flex">
                                    <button className='bg-black text-white rounded-lg px-4'>Verify Now</button>
                                    </Link>
                                )
                            }
                           
                       
                        </dd>
                        <dd className="mt-1 text-cente text-sm leading-6 text-black sm:mt-0">
                       
                        </dd>
                    </div>

                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Zip Code</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${postCode}`}</dd>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">City</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${city}`}</dd>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">State</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${state}`}</dd>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Country</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${country}`}</dd>
                    </div>
                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Full Address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {`${address1} ${address2} ${address3}`}
                        </dd>
                    </div>
                </dl>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Your Photo
                    </label>
                </div>

                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                        src={image}
                        alt="user Image Loading"
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>

            </div>
        </div>
    )
}
export default UserProfilePage;
