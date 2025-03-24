# Phoenix + Next.js Application

This repository contains a web app built with Elixir/Phoenix for the backend and Next.js for the frontend.

## Prerequisites

- Elixir and Erlang installed
- Node.js and npm/pnpm installed
- PostgreSQL database

## Setup

1. Clone the repository
2. Set up environment variables (copy .env.example to .env and fill in the values)
3. Install dependencies:

```bash
# Install Elixir dependencies
mix deps.get

# Install Next.js dependencies
cd app
pnpm install
cd ..
```

4. Create and migrate the database:

```bash
mix ecto.create
mix ecto.migrate
```

## Development

During development, you'll run both the Phoenix server and the Next.js development server:

```bash
mix phx.server
```

This will start:
- Phoenix backend on http://localhost:4000
- Next.js development server on http://localhost:3000

The Phoenix server is configured to proxy requests to the Next.js development server in development mode.

## Building for Production

To build the application for production:

```bash
# Generate static assets from Next.js
mix assets.deploy
```

This will:
1. Build the Next.js application
2. Copy the static assets to Phoenix's static directory

## Running in Production

Set the environment variables for production and start the server:

```bash
MIX_ENV=prod PHX_SERVER=true mix phx.server
```

In production, only the Phoenix server will run, serving both the API and the static assets on the same port (default: 4000).

## Using Docker for Production
You can also use Docker to build and run the application in production:

```bash
docker compose up --build
```

This will build and start all necessary containers for the application to run in production mode.

## Environment Variables

Create a `.env` file based on the `.env.example`

### Generating Secrets

You can generate secure random strings for `SIGNING_SALT` and `SECRET_KEY_BASE` using:

```bash
# SECRET_KEY_BASE
mix phx.gen.secret
```

```bash
# SIGNING_SALT
mix phx.gen.secret 32
```

## Project Structure

- `/app` - Next.js frontend application
- `/lib` - Phoenix backend application
- `/priv/static` - Compiled static assets (not tracked in git)
- `/config` - Application configuration
