import http, { request } from 'http';
import url from 'url';

function logRequest(method, url) {
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
}

const tasks = [{ name: 'Get tasks' }, { name: 'Create tasks' }];

const server = http.createServer((req, res) => {
    logRequest(req);
    if (req.url === '/plural') { 
        if (req.method === 'GET') {

        let query = url.parse(req.url, true).query;
        let id = query.number;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(id.toISOString());
        }
    }
    else if (req.url === '/headers') { //  /headers - вернуть в ответе все заголовки запроса
        if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(req.headers));
        }
    }
    else if (req.url === '/tasks') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tasks));

        }
        else if (req.method === 'POST') {
            const data = [];
            req.on('data', chunk => data.push(chunk));
            req.on('end', () => {
                const task = JSON.parse(data.join(''));
                tasks.push(task);
                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(task));
            })
        }
        else {
            res.writeHead(404, 'Not Found');
            res.end();
        }
    }
    else {
        res.writeHead(404, 'Not Found');
        res.end();
    }
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
});