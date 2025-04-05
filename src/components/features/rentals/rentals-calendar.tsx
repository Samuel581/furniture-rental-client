import React, { useState } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewWeek,
    createViewMonthGrid,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import "@schedule-x/theme-default/dist/index.css"

function RentalsCalendar() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    })
  return (
    <div>
      
    </div>
  )
}

export default RentalsCalendar
