export const SendMarkSafe = async (incident_id, email, type) => {
    let response = await fetch('http://localhost:4000/marksafe/', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
            'Accept': 'application/json, text/plain, */*',
            
        },
        body:JSON.stringify({
            incident_id: incident_id,
            email: email,
            type: type
        })
    });

    response = await response.json();

    return response;
}