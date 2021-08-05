import http from 'http';
import url from 'url';
import { pluarWord } from '../function/pluralWord.js';
import { SearchForDuplicates, numberOfUniqueWords, mostFrequentWord } from '../function/wordFrequency.js';


// function logRequest(method, url) {
//     console.log(`[${new Date().toISOString()}] ${method} ${url}`);
// }

const tasks = [{ name: 'Get tasks' }, { name: 'Create tasks' }];

const server = http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);
    if (parseUrl.pathname === '/plural') {
        if (req.method === 'GET') {
            let quantity = parseFloat(parseUrl.query['number']);
            let words = parseUrl.query['forms'];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(pluarWord(quantity, words)));
        }
    }
    else if (req.url === '/headers') {
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
    else if (req.url === '/frequency') {
        if (req.method === 'POST') {
            const getText = [];
            req.on('data', chunk => {
                getText.push(chunk);
            })
            req.on('end', () => {
                let text = getText.join('');
                //res.writeHead(201, { 'Content-Type': 'application/json' });
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Number-Of-Unique-Words', `${numberOfUniqueWords(text)}`);
                res.setHeader('Number-Of-Frequent-Words', `${mostFrequentWord(text)}`);
                res.end(JSON.stringify(Object.fromEntries(SearchForDuplicates(text).entries())));
            })  
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