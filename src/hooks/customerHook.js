export function getCustomers(){
    return fetch(`http://localhost:2000/customer/findAll`,{
            method: 'GET', 
            headers: {
                'Content-Type': 'aplication/json',
            },
    })
    .then(resp => resp.json())
    .then(data => {
        return data;
    })
    .catch (err => console.log(err))
}
