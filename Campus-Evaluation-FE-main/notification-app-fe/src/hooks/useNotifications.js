// import { useState, useEffect } from "react";
// import { fetchNotifications } from "../apis/notifications";

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
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchNotifications();

        setNotifications(data.notifications || []);
        setTotal(data.total || data.notifications?.length || 0);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    notifications,
    total,
    totalPages: 1,
    loading,
    error,
  };
}