"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const JobImportLogs = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

const fetchLogs = async (currentPage) => {
  try {
    const res = await axios.get(
      `https://job-import-system-ehcw.onrender.com/api/import-logs?page=${currentPage}&limit=10`
    );   
    console.log("API response:", res.data); 
    if (Array.isArray(res.data.logs)) {
      setLogs(res.data.logs);
      setTotalPages(res.data.totalPages);
    } 
    else if (Array.isArray(res.data)) {
      setLogs(res.data); 
      setTotalPages(1); 
    } 
    else {
      setLogs([]); 
      console.error("Unexpected API response format", res.data);
    }
  } catch (error) {
    console.error("Failed to fetch logs", error);
  }
};

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

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
                <td className="p-2">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>

        <span className="text-sm sm:text-base">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};
