const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class mainServices{
baseURL = "http://127.0.0.1:8000/api";

async sendInfo(contactData){

    var dataToken = {
        "grant_type": "client_credentials",
        "client_id": "9db11zluiqitbbeli5zgz9zi",
        "client_secret": "IMaQ5fjr11G6xfc6CPnOOqiV",
        "account_id": "110004500"
    }

    var data = {
        "values":{
                "name":contactData.name,
                "email":contactData.email
                 }
    }

    const rest = await fetch(`https://mcqdbq8x59ycz5jgcr10zl5rc5r4.auth.marketingcloudapis.com/v2/token`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},  
        body: JSON.stringify(dataToken)
    });

    const token = await rest.json();
    console.log(token.access_token);


    var res = await fetch(`https://mcqdbq8x59ycz5jgcr10zl5rc5r4.rest.marketingcloudapis.com/hub/v1/dataevents/key:A26A3109-99EF-4FFF-A13D-30E571D3C2CA/rows/email:${contactData.email}` ,{
        method: "PUT",
        headers: {
            'content-type':'application/json',
            'Authorization': `Bearer ${token.access_token}`,
        },
        body: JSON.stringify(data),
    });

    return await res.json();

}


async getAttributes(InArguments){
    
    const contactData = {};

    InArguments.forEach( function(item, index){
        let stringKey = Object.keys(item);
        contactData[stringKey[0]] = InArguments[index][stringKey[0]]
        
    });

    return contactData;

}


}

module.exports = {mainServices};