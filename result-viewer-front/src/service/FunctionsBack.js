const base_url = "http://127.0.0.1:8000/";

export default class ServicesBack {
   async sendSignUpData(name, email, password) {
      const body = {
         name: name,
         email: email,
         password: password,
      };
      console.log(body)

      const requestOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
      };
      // console.log(requestOptions.body);
      console.log("Function not finished!!!");

      const res = await fetch(base_url + "sign-up", requestOptions).catch(
         (error) => {
            return error;
         }
      );

      // RECEBE UM TRUE OU FALSE PARA A INSERÇÃO DOS DADOS NO BANCO
      return res;
   }

   async sendLoginData(email, password) {
      const body = {
         email: email,
         password: password,
      };
      console.log(body);

      const requestOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
      };

      // console.log(requestOptions.body);
      console.log("Function not finished!!!");


      const res = await fetch(base_url + "sign-in", requestOptions).catch(
         (error) => {
            return error;
         }
      );
      // RECEBER UM TRUE OU FALSE CASO O USUÁRIO EXISTA
      return res;
   }

   async getMetrics(json, gs_size) {
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
            return error;
         }
      );

      const data = await res.json();
      return data;
   }

   async saveData(userId, uploadName, csvName, csvFile, txtName, txtFile) {
      const body = {
         userId: userId,
         uploadName: uploadName,
         csvName: csvName,
         csvFile: csvFile,
         txtName: txtName,
         txtFile: txtFile
      };
      console.log(body);

      const requestOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
      };
      // console.log(requestOptions.body)
      // console.log("Function not finished!!!");


      const res = await fetch(base_url + "save-data", requestOptions).catch(
         (error) => {
            return error;
         }
      );

      // RECEBER O TXT DE VOLTA E SALVAR NO STORE!
      const data = await res.json();
      return data;
   }



   // FUNÇÃO PARA RETORNAR O HISTÓRICO DO USUÁRIO
}
