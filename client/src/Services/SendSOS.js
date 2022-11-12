export const sendSOS = async (username, location, timestamp) => {
    const response = await fetch('localhost:4000', {
        method: 'POST',
        body:{
            username,
            location,
            timestamp
        }
    });
    if (response.ok) {
        return true;
    }
    return false;
}