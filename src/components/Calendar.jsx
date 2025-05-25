import React, { useState } from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { getDaysInMonth, getMonthName } from "../utils/dateUtils";
import EventModal from "./EventModal";
import DateCell from "./DateCell";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ events, setEvents }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const addEvent = (text) => {
    const key = `${year}-${month + 1}-${selectedDate}`;
    const newEvents = { ...events };
    newEvents[key] = [...(newEvents[key] || []), text];
    setEvents(newEvents);
    setModalOpen(false);
  };

  const deleteEvent = (dateKey, eventIndex) => {
    const newEvents = { ...events };
    if (newEvents[dateKey]) {
      newEvents[dateKey].splice(eventIndex, 1);
      if (newEvents[dateKey].length === 0) {
        delete newEvents[dateKey];
      }
      setEvents(newEvents);
    }
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const totalCells = 42;

  const days = Array(totalCells)
    .fill(null)
    .map((_, i) => {
      const dayNumber = i - firstDayOfWeek + 1;
      if (dayNumber > 0 && dayNumber <= daysInMonth.length) {
        return {
          date: dayNumber,
          key: `${year}-${month + 1}-${dayNumber}`,
        };
      } else {
        return { date: null, key: null };
      }
    });

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      {/* Header with navigation */}
      <div
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        <IconButton onClick={handlePrev}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">
          {getMonthName(month)} {year}
        </Typography>
        <IconButton onClick={handleNext}>
          <ArrowForward />
        </IconButton>
      </div>

      {/* Day names row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          borderBottom: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        {dayNames.map((d) => (
          <Typography
            key={d}
            variant="subtitle2"
            align="center"
            sx={{ padding: "8px 0", fontWeight: "bold" }}
          >
            {d}
          </Typography>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "repeat(6, 1fr)",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {days.map((day, i) => (
          <DateCell
            key={i}
            day={day}
            events={events}
            onClick={(d) => openModal(d)}
            onDeleteEvent={deleteEvent}
          />
        ))}
      </div>

      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addEvent}
      />
    </Paper>
  );
};

export default Calendar;
