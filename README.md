# React Event Calendar

A simple and responsive event calendar built with React and Material UI.  
Supports adding and deleting events on any date.

## Features

- View monthly calendar with day names  
- Add events to specific dates  
- Delete events from dates  
- Responsive grid layout  
- Light mode only design  

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)  
- npm or yarn package manager

### Installation

1. Clone the repo:  
   ```bash
   git clone https://github.com/Haranarayanakarthik/event-calender.git
   cd react-event-calendar
2 .Install dependencies:

bash
npm install
# or
yarn install
3 .Running the Project
bash
npm run dev
# or
yarn dev
This starts the app locally (default on http://localhost:5173 if using Vite).

Build for Production
bash
npm run build
# or
yarn build
Project Structure
src/components/Calendar.jsx — Main calendar component

src/components/DateCell.jsx — Individual date cells with events

src/components/EventModal.jsx — Modal dialog to add events

src/utils/dateUtils.js — Helper functions for dates

src/styles/main.css — Global styles

Notes
The calendar supports adding multiple events per day.

Event deletion is available by clicking the '×' icon next to an event in the date cell.
