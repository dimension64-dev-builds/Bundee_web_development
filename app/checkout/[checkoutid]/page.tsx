"use client"

import React, { useEffect, useState } from 'react';

// Define an interface for the params
interface VehicleDetailsParams {
  id: string;
  startDate?: string;
  endDate?: string;
  pickupTime?: string;
  dropTime?: string;
  pricePerHour?: string;
}

export default function SingleVehicleDetails() {
  const [params, setParams] = useState<VehicleDetailsParams>({ 
    id: '', 
    startDate: '', 
    endDate: '', 
    pickupTime: '', 
    dropTime: '',
    pricePerHour:''
  });

  useEffect(() => {
    // Manually parse the URL
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    const queryParams = window.location.search.slice(1).split('?');
    const startDate = queryParams[0];
    const endDate = queryParams[1];
    const pickupTime = queryParams[2];
    const dropTime = queryParams[3];
    const pricePerHour = queryParams[4];

    setParams({ id, startDate, endDate, pickupTime, dropTime, pricePerHour });
  }, []);

  return (
    <div>
      <h1>Vehicle Details</h1>
      <p>ID: {params.id}</p>
      <p>Start Date: {params.startDate}</p>
      <p>End Date: {params.endDate}</p>
      <p>Pickup Time: {params.pickupTime}</p>
      <p>Drop Time: {params.dropTime}</p>
      <p>Price per day: {params.pricePerHour}</p>
    </div>
  );
}
