import dotenv from "dotenv";
dotenv.config();
const url = `${process.env.NEXT_PUBLIC_SERVER}`;

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
        return responseJson;
    }catch(error){
        console.log("error while calling getUsers API",error.message)
    }
}

export const setConversation = async (data) =>{
    try{
        await fetch(`${url}/conversation/add`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data),
        })
    }catch(error){
        console.log("error while calling setConversation API",error.message)
    }
}

export const getConversation = async (data) => {
    try {
        let response = await fetch(`${url}/conversation/get`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log('Error while calling getConversation API ', error.message);
    }
}
export const newMessages = async (data) => {
    try {
        return await fetch(`${url}/message/add`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data),
        })
    } catch (error) {
        console.log('Error while calling newConversations API ', error.message);
    }
}

export const getMessages = async (id) => {
    try {
        let response = await fetch(`${url}/message/get/${id}`)
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log('Error while calling getMessages API ', error.message);
    }
}