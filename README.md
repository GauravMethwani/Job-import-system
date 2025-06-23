# Client - Job Import System

This is the **frontend** of the Job Import System built using **Next.js / React**.

---

## Tech Stack

- Next.js / React
- JavaScript / TypeScript
- Tailwind CSS or Custom CSS
- Axios (for API calls)
- Other dependencies as needed

---

## 🚀 Getting Started
### 1. Clone & Install

```bash
git clone https://github.com/GauravMethwani/job-importer.git

### 1. Install Dependencies

```bash
npm install
npm run dev


# Job Importer - Backend

This is the backend service for the Job Importer system. It fetches jobs from external RSS/XML feeds, processes them, and stores them in MongoDB. The system runs automatically every hour and maintains a log of all imported jobs.

---

## Features

- Fetch jobs from multiple RSS/XML feeds
- Convert XML data to JSON
- Queue jobs using Redis (BullMQ)
- Process jobs in background and store in MongoDB
- Log total fetched, new, updated, and failed jobs
- Automatically run job fetching every hour

---

## Tech Stack

- Node.js + Express
- MongoDB (Atlas)
- Redis (via BullMQ)
- Axios + xml2js
- node-cron



## Setup & Installation

### 1. Clone & Install

```bash
git clone https://github.com/GauravMethwani/job-importer.git
cd server
npm install
index.js

