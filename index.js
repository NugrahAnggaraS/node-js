const http = require('http');
const event = require('events');

const listenerData = (request, response) => {
    const { url, method } = request;

    response.setHeader('Content-Type', 'application/json');

    if (url === '/testing') {
        if (method === "GET") {
            response.end(JSON.stringify({ message: "Berhasil Get Data" }));
        } else {
            response.end(JSON.stringify({ message: "Ntah Apa pun yang kau Tes di path /testing" }));
        }
    } else if (url === "/testing2" && request.headers['content-type'] === 'application/json') {
        if (method === "POST") {
            let body = [];

            // Mengumpulkan data dari request body
            request.on('data', (chunk) => {
                console.log("Mengambil data dari reques")
                body.push(chunk);
            });

            // Menggabungkan dan memproses data setelah semua data diterima
            request.on('end', () => {
                console.log("Mengembalikan data")
                try {
                    body = Buffer.concat(body).toString();
                    const parsedData = JSON.parse(body); // Parsing JSON
                    response.end(JSON.stringify({ message: `Data yang diterima: ${parsedData.name}` }));
                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: "Format JSON tidak valid" }));
                }
            });
        } else {
            response.end(JSON.stringify({ message: "Ntah Apa pun yang kau Tes di path /testing2" }));
        }
    } else {
        response.end(JSON.stringify({ message: "Path tidak ditemukan" }));
    }
};

const server = http.createServer(listenerData);
const port = 4000;
const hostName = "localhost";

server.listen(port,hostName,()=>{
    console.log("Berjalan");
});