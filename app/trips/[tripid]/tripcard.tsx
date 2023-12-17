import { useEffect, useState } from 'react'
import Carousel from '@/components/ui/carousel/carousel'
import { getAvailabilityDatesByVehicleId } from '@/app/_actions/get_availability_dates_by_vehicle_id'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { addDays, differenceInBusinessDays, differenceInCalendarDays, format, set } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { getVehicleAllDetailsByVechicleId } from '@/app/_actions/get_vehicle_details_by_vehicle_id';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const TripsDetails = ({ tripsData }) => {

    
    const imageNames = [];
    const vehicleBasicDetails = [];

    const router = useRouter();

    const today = new Date();

    const [modifyCalenderOpen, setModifyCalenderOpen] = useState(false);

    const [swapRequestedModalOpen, setSwapRequestedModalOpen] = useState(false);
    const [TripCancellationModalOpen, setTripCancellationModalOpen] = useState(false);


    const [vehicleDetails, setvehicleDetails] = useState(null);
    const [vehicleImages, setVehicleImages] = useState(null);


    const [vehicleId, setVehicleId] = useState(0);

    const [vehicleUnavailableDates, setVehicleUnavailableDates] = useState([]);
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    const [vehiclePrice, setVehiclePrice] = useState(0);

    const [modifyNoDays, setModifyNodays] = useState(0);

    // const [a, sa] = useState();


    const [startdate, setStartDate] = useState();


    const [sm, setsm] = useState({
        from: undefined,
        to: undefined,
    });


    const [date, setDate] = useState({
        from: undefined,
        to: undefined,
    });


    useEffect(() => {

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('auth_token_login') || '';
                const id = tripsData[0].swapDetails[0].fromVehicleId;
                alert(id);

                const data = await getVehicleAllDetailsByVechicleId(id, token);
                
                setvehicleDetails(data.vehicleAllDetails?.[0] || []);
                setVehicleImages(data.vehicleAllDetails?.[0]?.imageresponse || []);

            } catch (error) {
                console.error('Error fetching vehicle data data', error);
                setError(error);
            } finally {
                
            }
        };

        const initlizeVehicleId = () => {
            setVehiclePrice(tripsData[0].vehicleDetails[0].price_per_hr)
            console.log("start date" + tripsData[0].starttime);
            const st = tripsData[0].starttime;
            const et = tripsData[0].endtime;
            setStartDate(st)
            setsm({ from: new Date(st), to: new Date(et) });
        }
        
        initlizeVehicleId();
        fetchData();
       

    }, []);

    if (!Array.isArray(tripsData) || tripsData.length === 0) {
        return <div>No trips available.</div>;
    }


    function handleCancelTrip() {
        setTripCancellationModalOpen(true);
    }

    const handleAvailabilityCalender = vehicleId => {
        setVehicleId(vehicleId);
        setDate({
            from: undefined,
            to: undefined,
        });
        setError('Please pick a Start day.');

        const fetchData = async () => {
            try {
                console.log(vehicleId);
                const token = localStorage.getItem('auth_token_login') || '';
                const data = await getAvailabilityDatesByVehicleId({ vehicleid: vehicleId }, token);
                setVehicleUnavailableDates(convertDates(data.unAvailabilityDate));
            } catch (error) {
                console.error('Error fetching Availability dates', error);
                setError('Error fetching Availability dates');
            }
        };


        const VehicleId = tripsData[0].vehicleDetails[0].id;
        setVehicleId(VehicleId);

        fetchData();
        setModifyCalenderOpen(true);
    };


    const handleDateSelect = newDate => {
        let newError = '';
        setsm(newDate);


        if (newDate?.from) {
            if (!newDate.to) {
                newError = 'Please pick an End day.';
            } else if (newDate.to) {
                const fromDate = newDate.from.toISOString() || '';
                const toDate = newDate.to.toISOString() || '';

                if (fromDate === toDate) {
                    newError = 'Start date and End date cannot be the same.';
                } else {
                    // Check if the selected date range overlaps with unavailable dates
                    if (isDateRangeUnavailable(fromDate, toDate, vehicleUnavailableDates)) {
                        newError = 'Selected date range overlaps with unavailable dates.';
                    } else {
                        console.log('dates are available');
                        const diff = differenceInCalendarDays(newDate.to, newDate.from);
                        setModifyNodays(diff);
                    }
                }
            }
        } else {
            newError = 'Please pick a Start day.';
        }
        setError(newError);
    };


    const closeModifyDialog = () => {
        setModifyCalenderOpen(false);
    };

    const closeSwapDialog = () => {
        setSwapRequestedModalOpen(false);
    };

    const closeCancelDialog = () => {
        setTripCancellationModalOpen(false);
    };

    const redirect = () => {
        window.location.href = `/checkout/${tripsData[0].vehicleDetails[0].id}?${sm.from}?${sm.to}?${sm.from}?${sm.to}?${vehiclePrice}`;
    };

    async function handleSwap() {
        setSwapRequestedModalOpen(true);
    }


    function TripCancellationByUser() {
        // calling cancellatio api, just trip id. 
        alert("Trip is cancelled");
        window.location.reload();
    }

    return (
        <>

            <div className="bg-white">
                {tripsData.map((item, index) => (
                    <div className="pt-1">
                        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{item.vehmake}  {item.vehmodel}  {item.vehyear}</h1>
                            </div>

                            {/* Options */}
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                {/* <h2 className="sr-only">Product information</h2> */}
                                <p className="text-3xl tracking-tight text-gray-900">${item.vehicleDetails[0].price_per_hr} / day</p>
                                <p className="text-base text-gray-900">${item.tripPaymentTokens[0].totalamount} Total</p>
                                <div className="mt-10">

                                </div>

                                <div className="mt-10">
                                    <div className="mt-4 flex justify-between">
                                        <label htmlFor="" className='font-bold'>Trip Start Date</label>
                                        <p className="text-base text-gray-600">{item.starttime}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <label htmlFor="" className='font-bold'>Trip Start Date</label>
                                        <p className="text-base text-gray-600">{item.endtime}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <label htmlFor="" className='font-bold'>Trip Status</label>
                                        <span
                                            className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:text-red-300 ${item.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900' :
                                                item.status === 'Requested' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900' :
                                                    item.status === 'Started' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900' :
                                                        'bg-red-100 text-red-800 dark:bg-red-900'
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>

                                    {item?.swapDetails[0]?.isActive && (
                                        <div className="mt-4 flex justify-between">
                                            <label htmlFor="" className='font-bold'>Swap Requested
                                                <span className='ml-3 text-xs bg-green-600 text-white p-1  rounded-md border'

                                                >
                                                    Active
                                                </span>

                                            </label>
                                            <button onClick={handleSwap} className='bg-white p-1 border border-gray-200'>
                                                See Details
                                            </button>

                                        </div>

                                    )}





                                </div>

                                {item.status == 'Approved' && (
                                    <div className="mt-10 flex">
                                        <button
                                            onClick={() => handleAvailabilityCalender(item.vehicleid)}
                                            className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white "
                                        >
                                            Modify
                                        </button>
                                        <button
                                            onClick={handleCancelTrip}
                                            className="mt-4 ml-4 flex w-full items-center justify-center rounded-md border border-transparent bg-red-400 px-8 py-3 text-base font-medium text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                )}
                            </div>

                            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

                                <div>
                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900">{item.vehicleDetails[0].desciption}</p>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                                        <li className='text-neutral-500'>
                                            {item.vehicleDetails[0].name}
                                        </li>
                                        <li className='text-neutral-500'>
                                            {item.vehicleDetails[0].bodyclass}
                                        </li>
                                        <li className='text-neutral-500'>
                                            {item.vehicleDetails[0].drivetype}
                                        </li>
                                        <li className='text-neutral-500'>
                                            {item.vehicleDetails[0].wlectrificationlevel}
                                        </li>
                                        <li className='text-neutral-500'>
                                            {item.vehicleDetails[0].name}
                                        </li><li className='text-neutral-500'>
                                            {item.vehicleDetails[0].seatingCapacity} Seats
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-10">
                                    <div className="space-y-6">
                                        <label htmlFor="" className='font-bold'>No of Days</label>
                                        <p className="text-base text-gray-900">{item.tripPaymentTokens[0].totaldays}</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div className="space-y-6">
                                        <label htmlFor="" className='font-bold'>Charges Details</label>
                                        <p className="text-base text-gray-900">${item.tripPaymentTokens[0].totalamount} Total</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div className="space-y-6">
                                        <label htmlFor="" className='font-bold'>Parking Details</label>
                                        <p className="text-base text-gray-900">{item.vehicleDetails[0].parkingDetails}</p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div className="space-y-6">
                                        <label htmlFor="" className='font-bold'> Additional GuideLines</label>
                                        <p className="text-base text-gray-900">{item.vehicleDetails[0].guideLines}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto max-w-2xl  pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-12">
                            <Carousel autoSlide={false}>
                                {item.vehicleImages.map((s, i) => (
                                    <img key={i} src={s.imagename} className='max-h-fit' alt={`vehicle image ${i}`} />
                                ))}
                            </Carousel>
                        </div>
                    </div>
                ))}
            </div>


            {modifyCalenderOpen && (
                <div>
                    <div className='fixed inset-0 z-40 flex items-end bg-black bg-opacity-20 sm:items-center sm:justify-center appear-done enter-done backdrop-blur-[4px]'>
                        <div className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg sm:rounded-lg sm:m-4 md:max-w-3xl md:p-7 appear-done enter-done' role='dialog'>
                            <div data-focus-guard={true} tabIndex={0} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                            <div data-focus-guard={true} tabIndex={1} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                            <div data-focus-lock-disabled='false'>
                                <header className='flex justify-between gap-2'>
                                    <div>
                                        {error ? (
                                            <span className='text-red-500 mt-4'>{error}</span>
                                        ) : (
                                            <div className="">

                                                <span>
                                                    <span className='font-bold'>Modified Trip </span>
                                                    {sm.from && sm.to ? `${format(sm.from, 'LLL dd, y')} - ${format(sm.to, 'LLL dd, y')}` : 'Dates not selected'}
                                                </span>


                                            </div>

                                        )}
                                    </div>

                                    <Button variant='ghost' className='inline-flex items-center justify-center p-2 text-neutral-600' aria-label='close' onClick={closeModifyDialog}>
                                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20' role='img' aria-hidden='true'>
                                            <path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' fill-rule='evenodd'></path>
                                        </svg>
                                    </Button>
                                </header>
                                <div className='flex justify-center w-full'>
                                    <Calendar
                                        initialFocus
                                        mode='range'
                                        defaultMonth={new Date(startdate)}
                                        selected={sm}
                                        onSelect={handleDateSelect}
                                        numberOfMonths={isMobile ? 1 : 3}
                                        disabled={date => {
                                            const yesterdate = new Date();
                                            yesterdate.setDate(yesterdate.getDate() - 1);
                                            return vehicleUnavailableDates.includes(date.toISOString().split('T')[0]) || date < yesterdate;
                                        }}
                                    />
                                </div>
                                <div className='sm:col-span-2 mt-4 mb-4'>
                                    <label htmlFor='address1' className='block text-xs font-medium leading-6 text-gray-900'>
                                        Write a message to the host. ( Optional )
                                    </label>
                                    <div className='mt-2'>
                                        <Input type='text' name='address1' id='address1' autoComplete='family-name' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2' />
                                    </div>
                                </div>
                                {!error && (
                                    <div>
                                        <div className='sm:col-span-2 mt-4 mb-4'>
                                            <label htmlFor='address1' className='block text-xs font-medium leading-6 text-gray-900'>
                                                Selected Days
                                            </label>
                                            <p className='text-xs'>{modifyNoDays}</p>
                                        </div>

                                        <div className='sm:col-span-2 mt-4 mb-4'>
                                            <label htmlFor='address1' className='block text-xs font-medium leading-6 text-gray-900'>
                                                Payment Information
                                            </label>
                                            <p className='text-xs'> $ {vehiclePrice * modifyNoDays} in Total</p>
                                            <p className='text-xs'> $ {(vehiclePrice * modifyNoDays * 0.0825).toFixed(2)} Taxes will apply</p>
                                            <p className='text-xs'>Authorization of 20% will be applied</p>
                                        </div>
                                    </div>

                                )}


                                <footer className='flex items-center justify-end   '>
                                    <Button type='button' onClick={redirect} className={`bg-primary ${error ? 'cursor-not-allowed opacity-50' : ''}`} disabled={!!error}>
                                        Continue to checkout
                                    </Button>
                                </footer>
                            </div>
                            <div data-focus-guard='true' tabIndex={0} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {swapRequestedModalOpen && (
                <div>
                    <div className='fixed inset-0 z-40 flex items-end bg-black bg-opacity-20 sm:items-center sm:justify-center appear-done enter-done backdrop-blur-[4px]'>
                        <div className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg sm:rounded-lg sm:m-4 md:max-w-3xl md:p-7 appear-done enter-done' role='dialog'>
                            <div data-focus-guard={true} tabIndex={0} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                            <div data-focus-guard={true} tabIndex={1} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                            <div data-focus-lock-disabled='false'>
                                <header className='flex justify-between gap-2'>
                                    <div>
                                        <h1>Swap Request Proposal from Host</h1>
                                    </div>

                                    <Button variant='ghost' className='inline-flex items-center justify-center p-2 text-neutral-600' aria-label='close' onClick={closeSwapDialog}>
                                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20' role='img' aria-hidden='true'>
                                            <path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' fill-rule='evenodd'></path>
                                        </svg>
                                    </Button>
                                </header>
                                <div className='flex justify-center w-full'>

                                </div>
                                <div className='sm:col-span-2 mt-4 mb-4'>
                                    <label htmlFor='address1' className='block text-xs font-medium leading-6 text-gray-900'>
                                        Message from Host.
                                    </label>
                                    <div className='mt-2 bg-primary/10 p-4 rounded-md'>
                                        <p className='text-xs text-black'>hello there, I have a crazy deal for you. Please check this vehicle, The vehice you selected is little busy this week. what do you think</p>
                                    </div>
                                </div>


                                <div className="mx-auto max-w-2xl  pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pb-12">
                                    <Carousel autoSlide={false}>
                                        {vehicleImages.map((s, i) => (
                                            <img key={i} src={s.imagename} className='max-h-fit' alt={`vehicle image ${i}`} />
                                        ))}
                                    </Carousel>
                                </div>

                                <div className='sm:col-span-2 mt-4 mb-4'>
                                    <label htmlFor='address1' className='block text-xs font-medium leading-6 text-gray-900'>
                                    {vehicleDetails[0]?.make} {vehicleDetails[0]?.model} {vehicleDetails[0]?.year}
                                    </label>
                                    <div className='mt-2 bg-primary/10 p-4 rounded-md'>
                                        <p className='text-xs text-black'>hello there, I have a crazy deal for you. Please check this vehicle, The vehice you selected is little busy this week. what do you think</p>
                                    </div>
                                </div>



                                <footer className='flex items-center justify-end   '>
                                    <Button type='button' onClick={redirect} className={`bg-primary ${error ? 'cursor-not-allowed opacity-50' : ''}`} disabled={!!error}>
                                        Continue to checkout
                                    </Button>
                                </footer>
                            </div>
                            <div data-focus-guard='true' tabIndex={0} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                        </div>
                    </div>
                </div>
            )}


            {TripCancellationModalOpen && (
                <div>
                    <div className='fixed inset-0 z-40 flex items-end bg-black bg-opacity-20 sm:items-center sm:justify-center appear-done enter-done backdrop-blur-[4px]'>
                        <div className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg sm:rounded-lg sm:m-4 md:max-w-3xl md:p-7 appear-done enter-done' role='dialog'>
                            <div data-focus-guard={true} tabIndex={0} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                            <div data-focus-guard={true} tabIndex={1} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                            <div data-focus-lock-disabled='false'>
                                <header className='flex justify-between gap-2'>
                                    <div>
                                        <h1>Cancel Request</h1>
                                    </div>

                                    <Button variant='ghost' className='inline-flex items-center justify-center p-2 text-neutral-600' aria-label='close' onClick={closeCancelDialog}>
                                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20' role='img' aria-hidden='true'>
                                            <path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clip-rule='evenodd' fill-rule='evenodd'></path>
                                        </svg>
                                    </Button>
                                </header>
                                <div className='flex justify-center w-full'>

                                </div>
                                <div className='sm:col-span-2 mt-4 mb-4'>
                                    <label htmlFor='address1' className='block text-md font-bold  leading-6 text-gray-900'>
                                        Are you sure, You would  like to cancel this Trip ?
                                    </label>

                                </div>

                                <footer className='flex items-center justify-end   '>
                                    <Button type='button' onClick={closeModifyDialog} className='bg-black text-white rounded-md ml-4'>
                                        Back to Trip
                                    </Button>
                                    <Button type='button' onClick={TripCancellationByUser} className='bg-red-600 text-white rounded-md ml-4'>
                                        Yes, Cancel
                                    </Button>
                                </footer>
                            </div>
                            <div data-focus-guard='true' tabIndex={0} style={{ width: '1px', height: '0px', padding: '0px', overflow: 'hidden', position: 'fixed', top: '1px', left: '1px' }}></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TripsDetails;



function convertDates(unAvailabilityDate: string[]): string[] {
    const result: string[] = [];

    for (const dateStr of unAvailabilityDate) {
        const currentDate = new Date(dateStr);
        currentDate.setDate(currentDate.getDate()); // Subtract one day

        const formattedDate = currentDate.toISOString().split('T')[0];
        result.push(formattedDate);
    }

    return result;
}


function isDateRangeUnavailable(from: string, to: string, unavailableDates: string[]): boolean {
    const startDate = new Date(from);
    const endDate = new Date(to);

    for (const unavailableDateStr of unavailableDates) {
        const unavailableDate = new Date(unavailableDateStr);
        if (startDate <= unavailableDate && unavailableDate <= endDate) {
            return true;
        }
    }
    return false;
}
