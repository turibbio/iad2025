# Setup Iniziale

## 1. Fork del Repository

Fai fork del repository sul tuo account GitHub.

## 2. Clone Locale

```bash
git clone https://github.com/tuo-username/iad2025.git
cd iad2025
```

## 3. Configura Remote Upstream

```bash
git remote add upstream https://github.com/turibbio/iad2025.git
```

## 4. Setup PostgreSQL

### Opzione A: Docker (Raccomandato)

```bash
# Crea docker-compose.yml nella root del progetto
docker-compose up -d postgres
```

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: todoapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Opzione B: Installazione Locale

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres psql -c "CREATE DATABASE todoapp;"
```

**macOS** (con Homebrew):
```bash
brew install postgresql@16
brew services start postgresql@16
createdb todoapp
```

**Windows**:
- Scarica installer da [postgresql.org](https://www.postgresql.org/download/windows/)
- Crea database `todoapp` tramite pgAdmin

## 5. Setup Backend

```bash
cd backend

# Installa pacchetti NuGet
dotnet restore

# Applica migrations
dotnet ef database update --project TodoApp.Infrastructure

# Avvia API
dotnet run --project TodoApp.API
```

## 6. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

## Verifica Setup

- Backend: [https://localhost:5001/swagger](https://localhost:5001/swagger)
- Frontend: [http://localhost:5173](http://localhost:5173)
