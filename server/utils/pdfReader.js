const fs = require("fs");
const pdf = require("pdf-parse");

//recieves fils path
const readPDF = async (filePath) => {
    try {

        const dataBuffer = fs.readFileSync(filePath);//reads pdf into memory

        const data = await pdf(dataBuffer);//extract text

        return data.text;

    } catch (error) {

    console.error(error);

    throw error;

} 
};

module.exports = readPDF;