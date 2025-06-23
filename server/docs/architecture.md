1. node-cron (runs every hour)
        │
        ▼
2. fetchJobs() function
    - Uses Axios to fetch XML feeds
    - Parses XML to JSON using xml2js
        │
        ▼
3. BullMQ Queue (uses Redis Cloud)
    - Jobs are added to queue
        │
        ▼
4. jobWorker.js
    - Processes each job from queue
    - Saves or updates in MongoDB
        │
        ▼
5. MongoDB Atlas
    - jobs collection (for job data)
    - import_logs collection (for import stats)
