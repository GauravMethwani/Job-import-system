"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Home() {
   const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('https://job-import-system-ehcw.onrender.com/api/import-logs')
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
   <div className="p-4 bg-gray-100 min-h-screen">
  <h1 className="text-2xl font-bold mb-4">📝 Job Import Logs</h1>

  <div className="overflow-x-auto bg-white rounded shadow">
    <table className="min-w-full text-sm sm:text-base">
      <thead>
        <tr className="bg-gray-200 text-left text-xs sm:text-sm">
          <th className="p-2 whitespace-nowrap">File Name</th>
          <th className="p-2 whitespace-nowrap">Fetched</th>
          <th className="p-2 whitespace-nowrap">Imported</th>
          <th className="p-2 whitespace-nowrap">New</th>
          <th className="p-2 whitespace-nowrap">Updated</th>
          <th className="p-2 whitespace-nowrap">Failed</th>
          <th className="p-2 whitespace-nowrap">Imported On</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, i) => (
          <tr key={i} className="border-t hover:bg-gray-50">
            <td className="p-2 text-blue-600 break-all">{log.fileName}</td>
            <td className="p-2">{log.totalFetched}</td>
            <td className="p-2">{log.totalImported}</td>
            <td className="p-2">{log.newJobs}</td>
            <td className="p-2">{log.updatedJobs}</td>
            <td className="p-2">{log.failedJobs?.length ?? 0}</td>
            <td className="p-2">
              {new Date(log.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}




