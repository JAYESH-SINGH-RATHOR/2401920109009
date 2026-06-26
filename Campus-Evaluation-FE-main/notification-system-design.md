# Notification System Design
step 1-> Create the Notification Data
        First, we need some notification data. Since there is no backend yet, we use dummy data.
    Each notification contains:
    id → Unique identifier
    title → Notification heading
    message → Description
    type → Placement, Result, or Event
    read → Whether the notification has been read

Step 2 -> Store the Selected Filter
         We need to know which filter the user selects

Step 3 -> Filter the Notifications
    Now we decide which notifications should be displayed.

Step 4 -> Create the Filter Component
    This component only tells the parent which filter was selected.

Step 5 -> Display Notifications
Now display the filtered notifications.

Step 6 -> Notification Card
The card is responsible for displaying a single notification. This component only displays data. It doesn't know anything about filtering or pagination.

Step 7 -> Add Pagination

Step 8 ->  Loading State
While fetching data show a loader.

Step 9 -> Error State
If the API fails display an error message.

Step 10 -> Empty State
If no notifications match the selected filter display
