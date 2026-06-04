#!/bin/bash
# Sobe servidor local e abre o Tracktiv Portal no navegador

PORT=8765
DIR="$(cd "$(dirname "$0")" && pwd)"

# Mata instância anterior na porta
lsof -ti :$PORT | xargs kill -9 2>/dev/null

# Inicia servidor HTTP em background
cd "$DIR"
python3 -m http.server $PORT --bind 127.0.0.1 > /dev/null 2>&1 &
SERVER_PID=$!

# Aguarda o servidor responder
for i in $(seq 1 20); do
    curl -s -o /dev/null "http://127.0.0.1:$PORT/" && break
    sleep 0.2
done

# Abre no browser padrão
open "http://127.0.0.1:$PORT"

echo "Servidor rodando em http://127.0.0.1:$PORT (PID $SERVER_PID)"
echo "Para encerrar: kill $SERVER_PID"
