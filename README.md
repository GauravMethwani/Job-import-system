# Job Import System

A full-stack application that fetches jobs from external RSS/XML feeds, processes them using a backend service, and displays them on a frontend interface.

---

##  Clone the Repository

```bash
git clone https://github.com/GauravMethwani/job-importer.git
cd job-importer
```

---

## Frontend – Client (`/client`)

### Tech Stack

- Next.js / React
- Tailwind CSS
- Axios

###  Getting Started

```bash
cd client
npm install
npm run dev
```

The frontend will run at: `http://localhost:3000`

###  Environment Variable

Create `.env.local` file in `client/` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

##  Backend – Server (`/server`)

### 🛠 Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- Redis (BullMQ)
- Axios + xml2js
- node-cron

### Features

- Fetch jobs from multiple RSS/XML feeds
- Convert XML to JSON
- Queue and process jobs in the background
- Automatically run job imports every hour
- Log total fetched, new, updated, and failed jobs

### Getting Started

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_url
```

Start the backend server:

```bash
npm run dev
```

Server will run at: `http://localhost:5000`

---

## Final Notes

- Make sure MongoDB and Redis are running before starting the backend.
- The frontend will consume APIs from `http://localhost:5000`.

---
