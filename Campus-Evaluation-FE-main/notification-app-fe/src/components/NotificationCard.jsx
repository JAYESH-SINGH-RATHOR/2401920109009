import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

export function NotificationCard({ notification }) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        mb: 2,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">
            {notification.title}
          </Typography>

          <Chip
            label={notification.type}
            color="primary"
            size="small"
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {notification.message}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {notification.timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;