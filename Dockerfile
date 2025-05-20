FROM python:3.10-slim

# Crea una directory per l'app
WORKDIR /app

# Copia i file necessari
COPY requirements.txt .
# COPY create_db.py .
COPY utils.py .
COPY server.py .


EXPOSE 5000

# Crea la directory per i dati
RUN mkdir -p /app/database

# Installa le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

CMD ["sh", "-c", "python server.py"]
# 