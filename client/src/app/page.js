"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Home() {
   const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/import-logs')
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
<div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-2xl font-bold mb-4">📝 Job Import Logs</h1>
  <table className="w-full bg-white rounded shadow">
    <thead>
      <tr className="bg-gray-200 text-left">
        <th className="p-2">File Name</th>
        <th className="p-2">Fetched</th>
        <th className="p-2">Imported</th>
        <th className="p-2">New</th>
        <th className="p-2">Updated</th>
        <th className="p-2">Failed</th>
        <th className="p-2">Imported On</th>
      </tr>
    </thead>
    <tbody>
      {logs.map((log, i) => (
        <tr key={i} className="border-t">
          <td className="p-2 text-blue-600 break-all">{log.fileName}</td>
          <td className="p-2">{log.totalFetched}</td>
          <td className="p-2">{log.totalImported}</td>
          <td className="p-2">{log.newJobs}</td>
          <td className="p-2">{log.updatedJobs}</td>
          <td className="p-2">{log.failedJobs.length}</td>
          <td className="p-2">
            {new Date(log.createdAt).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}




