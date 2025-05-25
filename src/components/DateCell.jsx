import React from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const DateCell = ({ day, events, onClick, onDeleteEvent }) => {
  const key = day?.key;
  const eventList = events[key] || [];

  const dayName =
    day?.date !== null
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          new Date(`${key}`).getDay()
        ]
      : "";

  return (
    <Box
      onClick={() => day && onClick(day.date)}
      sx={{
        height: "100%",
        p: 1,
        bgcolor: "background.default",
        cursor: day ? "pointer" : "default",
        transition: "0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Typography variant="subtitle2" fontWeight={600}>
        {dayName}
      </Typography>
      <Typography variant="h6">{day?.date}</Typography>
      <List dense sx={{ mt: 1 }}>
        {eventList.slice(0, 2).map((event, idx) => (
          <ListItem
            key={idx}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // prevent opening modal
                  onDeleteEvent(key, idx);
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            }
          >
            <ListItemText primary={`• ${event}`} />
          </ListItem>
        ))}
        {eventList.length > 2 && (
          <Typography variant="caption" color="textSecondary">
            +{eventList.length - 2} more
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default DateCell;
