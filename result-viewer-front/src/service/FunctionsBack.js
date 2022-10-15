const base_url = "http://127.0.0.1:8000/";

export default class ServicesBack {

    async getMetrics(json, gs_size) {
        const body = {
            file: json.data,
            gs_size: gs_size
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        };

        const res = await fetch(base_url + "calc-metrics", requestOptions).catch((error) => {
        return error;
        })
  
        const data = await res.json();
        return data;
    }

    async sendLoginData(loginData){
        const body = {
            loginData: loginData
        }
        console.log(loginData);
        console.log("Function not finished!!!")

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        };

        
        await fetch(base_url + "sign-up", requestOptions).catch((error) => {
        return error;
        })
    }
}