# Hono Search Address

## Description
Hono Search Address is a project that utilizes Hono API, Node.js, PostgreSQL, and Docker to create a search functionality for addresses. This project provides a robust and efficient solution for address searching and management.

# 🏗️ Hono Search Address Project Structure

```text
📁 Project Root
├── 🐳 docker-compose.yml
├── 🐳 Dockerfile
├── 🗄️ drizzle.config.ts
├── 🔍 eslint.config.mjs
├── 📦 package.json
├── 🔒 pnpm-lock.yaml
├── 📘 README.md
├── 📁 src
│   ├── 🚀 app.ts
│   ├── 📁 db
│   │   ├── 🗃️ index.ts
│   │   ├── 📁 migrations
│   │   │   ├── 🗄️ 0000_wet_demogoblin.sql
│   │   │   ├── 📁 meta
│   │   │   │   ├── 📸 0000_snapshot.json
│   │   │   │   └── 📓 _journal.json
│   │   │   ├── 🔗 relations.ts
│   │   │   └── 📊 schema.ts
│   │   └── 📊 schema.ts
│   ├── 🔐 env.ts
│   ├── 🎯 index.ts
│   ├── 📁 lib
│   │   ├── 📚 configure-open-api.ts
│   │   ├── 🔢 constants.ts
│   │   ├── 🛠️ create-app.ts
│   │   └── 📝 types.ts
│   ├── 📁 middlewares
│   │   └── 🪵 pino-logger.ts
│   └── 📁 routes
│       ├── 🗺️ index.route.ts
│       └── 📁 search
│           ├── 🔍 search.handlers.ts
│           ├── 📇 search.index.ts
│           └── 🛣️ search.routes.ts
└── ⚙️ tsconfig.json

```

## Features
- Fast and efficient address search
- RESTful API endpoints
- PostgreSQL database integration
- Dockerized for easy deployment and scaling

## Technologies Used
- Hono API
- Node.js
- PostgreSQL
- Docker
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- Docker and Docker Compose
- pnpm (for package management)

### Installation
1. Clone the repository:

    ```text
    git clone https://github.com/dev-kraken/hono-search-address.git
    ```

2. Navigate to the project directory:

    ```bash
    cd hono-search-address
    ```
3. Install dependencies:

    ```bash
    pnpm install
    ```
   
4. Copy the `.env.example` file to `.env` and update the environment variables as needed.
    ```bash
    cp .env.example .env
    ```

## Database Migration

After setting up the project, follow these steps to migrate the database and import the necessary data:

1. Copy the SQL file to the Docker container:
   ```bash
   sudo docker cp search_zip.sql search-db:/search_zip.sql

2. Execute the SQL file within the Docker container:
   ```bash
   sudo docker exec -it search-db psql -U devkraken -d search_address -f /search_zip.sql
   ```
   
### These commands will:
- Copy the search_zip.sql file from your local machine to the Docker container named `search-db`.
- Execute the SQL file inside the container, populating the `search_address` database with the required data.

**Note**: Run these commands after your Docker containers are up and running. This step is crucial for setting up the initial data required for the address search functionality.

#### ⚠️ Ensure you have the necessary permissions to run these commands, as they require sudo access.