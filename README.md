# BrewRep - Final Year Project

BrewRep is a CRM (Customer Relationship management) application designed for sales representitives of breweries and distilleries.

It is a full-stack web application built using Vue 3, TypeScript, NodeJS, tRPC, Prisma, PostgreSQL and Zod.

## Installation Guide

### Prerequisites

- Node v16.17.0+
- Docker

### Setup

- Install dependencies

`cd server && npm ci`

`cd client && npm ci`

- Start the database container

`make up`

- Create and seed the database

`make refreshdb`

- Spin up local dev servers

`cd server && npm run dev`

`cd client && npm run dev`

### Clean up

- Stop the database container

`make down`
