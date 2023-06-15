const url = "http://localhost:8000";

export const addUser = async (data) =>{
    try{
        await fetch(`${url}/add`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data),
        })
    }catch(error){
        console.log("error while adduser API",error.message)
    }
}

export const getUsers = async () =>{
    try{
        let response = await fetch(`${url}/users`)
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    }catch(error){
        console.log("error while calling getUsers API",error.message)
    }
}