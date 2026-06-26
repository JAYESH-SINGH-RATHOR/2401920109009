const BASE_URL = "http://4.224.186.213/evaluation-service";

export async function Log(stack, level, pkg, message) {
  try {
    await fetch(`${BASE_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_ACCESS_TOKEN_HERE",
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (error) {
    console.error("Log error:", error);
  }
}

export async function fetchNotifications() {
  await Log("frontend", "info", "api", "loaded dummy notifications");

  return {
    notifications: [
      {
        id: 1,
        title: "Placement Drive",
        message: "Campus placement drive starts tomorrow.",
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
        message: "Coding event registration is now open.",
        type: "Event",
        timestamp: "2 days ago",
      },
    ],
  };
}