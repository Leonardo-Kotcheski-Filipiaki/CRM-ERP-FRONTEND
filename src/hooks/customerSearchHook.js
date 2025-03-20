import a from "axios";

async function customerSearchHook(id){
    const res = await a.post('http://localhost:2000/customer/find', { 'id': id });
    return await new Promise((resolve, reject) => {
        resolve(res.data);
    });
}

export default customerSearchHook;