export const sendSOS = async (email, location, timestamp) => {
    const response = await fetch('http://localhost:4000/sendsos/', {
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
    if (response.ok) {
        return true;
    }
    return false;
}