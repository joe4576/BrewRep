# BrewRep - Final Year Project

---

## Installation Guide

### Prerequisites

- Node v16.17.0
- Docker desktop
- On Windows, install `make` command

### Setup

- Navigate to server directory and run `npm ci`
- Navigate to client directory and run `npm ci`
- Ensure docker desktop is running
- Navigate to project root and run `make up`
- Navigate to server directory and run `npm run dev`
- Navigate to client directory and run `npm run dev`
- Go to `http://127.0.0.1:3000/`

### Clean up

- Navigate to root and run `make down`
- Note: `Ctrl-C` in the terminal windows to stop the dev servers
