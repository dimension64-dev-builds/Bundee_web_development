

"use server"

export const getAllUserWishlistedVehicles = async (userId: string, bundeeAuthToken: string) => {
    console.log("Fetching wishlists Vehicles:", { userId, bundeeAuthToken });

    // Convert userId to a number
    const id = parseInt(userId, 10); 


    if (isNaN(id)) {
        throw new Error('Invalid userId: Must be a convertible to a number');
    }

    const url = "http://4.240.86.202:8004/api/v1/vehicle/getWishListByUserId";
    
    const headersList = {
        Accept: '*/*',
        'bundee_auth_token': bundeeAuthToken,
        'Content-Type': 'application/json',
        
    };
    const body = {
        userid: id
    };

    console.log(body);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headersList,
            body: JSON.stringify(body),
            cache: 'no-cache',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data.customervehicleresponse[0].vehicleid);

        return data.customervehicleresponse || [];

    } catch (error) {
        console.error('Error getting wishlisted Vehicles:', error);
        throw new Error('Error in wishlisted veihcles Vehicles');
    }
};
