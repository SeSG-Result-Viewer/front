const Papa = require("papaparse");

export default class ServicesFront {
   processCSV(file) {
      var fileJSON = null;

      Papa.parse(file, {
         header: true,
         delimiter: ",",
         skipEmptyLines: true,
         complete: (json) => {
            fileJSON = json;
         },
      });

      return fileJSON;
   }

   getHeaders(headers) {
      const cols = [];
      headers.forEach((header) => {
         cols.push({
            text: header,
            value: header,
         });
      });
      return cols;
   }

   getDataCSV(data) {
      const objeto = JSON.parse(data);
      const json = objeto;
      const fields = Object.keys(json[0]);

      const replacer = function (key, value) {
         return value === null ? "" : value;
      };

      var csv = json.map(function (row) {
         return fields
            .map(function (fieldName) {
               return JSON.stringify(row[fieldName], replacer);
            })
            .join(",");
      });

      csv.unshift(fields.join(","));
      csv = csv.join("\r\n");

      return csv;
   }

   exportCSV(file, fileName) {
      const fileNameMetrics =
         fileName.substring(0, fileName.length - 4) + "-metrics.csv";

      var csvFile;
      var downloadLink;

      csvFile = new Blob([file], { type: "text/csv" });
      downloadLink = document.createElement("a");
      downloadLink.download = fileNameMetrics;
      downloadLink.href = window.URL.createObjectURL(csvFile);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
   }
}