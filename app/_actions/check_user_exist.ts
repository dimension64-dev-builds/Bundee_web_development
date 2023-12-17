// Assuming 'use server' is a valid directive in your project environment
"use server"

export const getUserExistOrNotConfirmation = async (getuserInfoData: any, authToken: string) => {

    console.log(getuserInfoData);
    console.log(authToken);

    const testdata = JSON.stringify(getuserInfoData);

    console.log(testdata);

    const url = "http://4.240.86.202:8080/api/v1/user/getUserByEmail";

    const headersList = {
        Accept: '*/*',
        bundee_auth_token: authToken,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            headers: headersList,
            method: 'POST',
            body: JSON.stringify(getuserInfoData),

        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data?.userResponse)
        
        return {
            errorcode: data?.errorCode,
            isUserExist: data?.userResponse == null ? true : false,
            userId: data?.userResponse?.iduser
        };

    } catch (error) {
        console.error('Error fetching user existence data:', error);
        throw new Error('An error occurred while checking user existence.');
    }
};
