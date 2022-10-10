const Papa = require("papaparse");

export default class ServicesFront {

    processCSV(teste){
        var fileJSON = null;

        Papa.parse(teste, {
            header: true,
            delimiter: ",",
            skipEmptyLines: true,
            complete: (json) => {
                fileJSON = json
            },
        });
        
        return fileJSON
    }

    getHeaders(headers){
        const teste = []
        headers.forEach((header) => {
            teste.push({
            text: header,
            value: header,
            });
        });
        return teste
    }

    getDataBack(data) {
        const objeto = JSON.parse(data);
        const json = objeto
        const fields = Object.keys(json[0])

        const replacer = function(key, value) { return value === null ? '' : value } 

        var csv = json.map(function(row) {
            return fields.map(function(fieldName){
                return JSON.stringify(row[fieldName], replacer)
            }).join(',')
        })

        csv.unshift(fields.join(',')) // add header column
        csv = csv.join('\r\n');

        return csv
    }
}