const base_url = "http://127.0.0.1:8000/";

export async function sendSignUpData(email, name, password) {
   const body = {
      "name": email,
      "email": name,
      "hashed_password": password
   };
   const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   };
   const res = await fetch(base_url + "sign-up", requestOptions).catch(
      (error) => {
         console.log("Error in FunctionsBack!" + error)
         return error;
      }
   );
   const data = await res.json();
   return data;
}

export async function sendLoginData(email, password) {
   const token = localStorage.getItem('token');
   const body = {
      "email": email,
      "password": password,
   };
   const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...token && { "Authorization": `Bearer ${token}` } },
      body: JSON.stringify(body),
   };
   const res = await fetch(base_url + "login", requestOptions).catch(
      (error) => {
         console.log("Error in FunctionsBack!" + error)
         return error;
      }
   );
   const data = await res.json();
   return data;
}

export async function getMetrics(json, gs_size) {
   const body = {
      file: json.data,
      gs_size: gs_size,
   };
   const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
   };
   const res = await fetch(base_url + "calc-metrics", requestOptions).catch(
      (error) => {
         console.log("Error in FunctionsBack!" + error)
         return error;
      }
   );
   const data = await res.json();
   return data;
}

   // async saveData(userId, uploadName, csvName, csvFile, txtName, txtFile) {
   //    const body = {
   //       userId: userId,
   //       uploadName: uploadName,
   //       csvName: csvName,
   //       csvFile: csvFile,
   //       txtName: txtName,
   //       txtFile: txtFile
   //    };
   //    // console.log(body);

   //    const requestOptions = {
   //       method: "POST",
   //       headers: { "Content-Type": "application/json" },
   //       body: JSON.stringify(body),
   //    };
   //    // console.log(requestOptions.body)
   //    // console.log("Function not finished!!!");


   //    const res = await fetch(base_url + "save-data", requestOptions).catch(
   //       (error) => {
   //          return error;
   //       }
   //    );

   //    // RECEBER O TXT DE VOLTA E SALVAR NO STORE!
   //    const data = await res.json();
   //    return data;
   // }



   // FUNÇÃO PARA RETORNAR O HISTÓRICO DO USUÁRIO

