export const sendSOS = async (email, location, timestamp) => {
    let response = await fetch('http://localhost:4000/sendsos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'Accept': 'application/json, text/plain, */*',
            
        },
        body:JSON.stringify({
            email,
            location,
            timestamp
        })
    });

    response = await response.json();

    return response;
}