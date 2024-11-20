# Project Structure

## Models

Models are defined in the `api/models` directory. Each model represents a table in the database.

## Migrations

Migrations are located in the `api/migrations` directory. They are used to create and modify database tables.

## Seeders

Seeders are located in the `api/seeders` directory. They are used to populate the database with initial data.

## Controllers

Controllers are located in the `api/src/modules/*/controllers` directories. They handle HTTP requests and responses.

## Services

Services are located in the `api/src/modules/*/services` directories. They contain business logic and data validation.

## Repositories

Repositories are located in the `api/src/modules/*/repositories` directories. They handle data persistence and retrieval.

## Routes

Routes are located in the `api/src/modules/*/routes` directories. They map HTTP requests to controller methods.

## Middlewares

Middlewares are located in the `api/src/middlewares` directory. They handle authentication and other request processing tasks.

## Requests

Requests are located in the `api/src/requests` directory. They are used for testing the API endpoints.

## Authentication

The API uses JWT for authentication. The `authenticateToken` middleware is used to protect private routes.
