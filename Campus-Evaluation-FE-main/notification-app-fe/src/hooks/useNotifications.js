// import { useState, useEffect } from "react";
// import { fetchNotifications } from "../api/notifications";

// export function useNotifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const load = async () => {
//       const data = await fetchNotifications();
//       setNotifications(data.notifications ?? []);
//     };

//     load();
//   }, [notifications]);

//   const totalPages = 0;

//   return { notifications, total, totalPages, loading: false, error: true };
// }


import { useEffect, useState } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "Campus Placement Drive",
        message: "Placement drive will start tomorrow.",
        type: "Placement",
        timestamp: "Today",
      },
      {
        id: 2,
        title: "Result Declared",
        message: "Semester result has been published.",
        type: "Result",
        timestamp: "Yesterday",
      },
      {
        id: 3,
        title: "Tech Event",
        message: "Coding event registration is open.",
        type: "Event",
        timestamp: "2 days ago",
      },
    ];

    setNotifications(dummyData);
    setTotal(dummyData.length);
    setLoading(false);
  }, []);

  return {
    notifications,
    total,
    totalPages: 1,
    loading,
    error,
  };
}