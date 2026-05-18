/**
 * Servidor local de desenvolvimento — faz duas coisas:
 *
 *   Porta 8080 → serve o PROTOTYPE.html (abrir no browser)
 *   Porta 3001 → proxy para a API RastroSystem (resolve CORS)
 *
 * Como usar:
 *   node proxy.js
 *
 *   Depois abra: http://localhost:8080
 *
 * Não instala nada — usa apenas módulos nativos do Node.js.
 */

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const API_HOST   = 'teste.rastrosystem.com.br';
const API_BASE   = '/api_v3';
const PROXY_PORT = 3001;
const APP_PORT   = 8080;

// ─── MIME types mínimos ──────────────────────────────────────────────────────
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css':  'text/css',
    '.js':   'application/javascript',
    '.json': 'application/json',
    '.png':  'image/png',
    '.ico':  'image/x-icon',
};

// ─── 1. Servidor estático (porta 8080) ───────────────────────────────────────
http.createServer((req, res) => {
    // Redireciona raiz para o prototype
    const urlPath  = req.url === '/' ? '/PROTOTYPE.html' : req.url;
    const filePath = path.join(__dirname, urlPath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Arquivo não encontrado: ${urlPath}`);
            return;
        }
        const ext  = path.extname(filePath);
        const mime = MIME[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
    });
}).listen(APP_PORT);

// ─── 2. Proxy para a API RastroSystem (porta 3001) ───────────────────────────
const CORS = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, CORS);
        res.end();
        return;
    }

    const targetPath = API_BASE + req.url;
    const isAuth = req.url.includes('oauth');

    // Captura o body para logar (auth only)
    let bodyChunks = [];
    req.on('data', c => bodyChunks.push(c));
    req.on('end', () => {
        const body = Buffer.concat(bodyChunks);
        if (isAuth) {
            console.log(`\n[AUTH] → POST ${targetPath}`);
            console.log(`[AUTH]   body: ${body.toString()}`);
        } else {
            console.log(`[API]  ${req.method} ${targetPath}`);
        }

        const options = {
            hostname: API_HOST,
            port: 443,
            path: targetPath,
            method: req.method,
            headers: { ...req.headers, host: API_HOST, 'content-length': body.length },
        };

        const proxyReq = https.request(options, (proxyRes) => {
            if (isAuth) {
                // Captura resposta para logar
                let resChunks = [];
                proxyRes.on('data', c => resChunks.push(c));
                proxyRes.on('end', () => {
                    const resBody = Buffer.concat(resChunks).toString();
                    console.log(`[AUTH] ← ${proxyRes.statusCode}`);
                    console.log(`[AUTH]   resp: ${resBody}\n`);
                    res.writeHead(proxyRes.statusCode, { ...CORS, 'Content-Type': 'application/json' });
                    res.end(resBody);
                });
                return;
            }
            console.log(`[API]  ← ${proxyRes.statusCode} ${targetPath}`);
            res.writeHead(proxyRes.statusCode, {
                ...CORS,
                'Content-Type': proxyRes.headers['content-type'] || 'application/json',
            });
            proxyRes.pipe(res, { end: true });
        });

        proxyReq.on('error', (err) => {
            console.error('[ERRO]', err.message);
            res.writeHead(502, CORS);
            res.end(JSON.stringify({ error: err.message }));
        });

        proxyReq.end(body);
    }); // req body collected

}).listen(PROXY_PORT);

// ─── Saída no terminal ────────────────────────────────────────────────────────
console.log('\n✅  Servidores prontos\n');
console.log(`   🌐  App:    http://localhost:${APP_PORT}`);
console.log(`   🔌  Proxy:  http://localhost:${PROXY_PORT}  →  https://${API_HOST}${API_BASE}`);
console.log('\n   Ctrl+C para parar\n');
console.log('─'.repeat(55));
