'use client';

import React, { useMemo } from 'react'
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewWeek,
    createViewMonthGrid,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import "@schedule-x/theme-default/dist/index.css"

function RentalsCalendar() {
    const eventsService = useMemo(() => createEventsServicePlugin(), [])
    const calendar = useNextCalendarApp({
        views: [
            createViewMonthGrid(),
            createViewWeek(),
            createViewDay(),
            createViewMonthAgenda(),
        ],
        defaultView: 'month-grid',
        events: [
            {
                id: '1',
                start: '2025-04-01',
                end: '2025-04-01',
                title: 'Event 1',
                description: 'Description for Event 1',
                location: 'Pedido de alquiler',
            },
            {
                id: '2',
                start: '2025-04-02',
                end: '2025-04-04',
                title: 'Event 2',
                description: 'Description for Event 2',
                location: 'Pedido para evento privado',
            },
        ],
        plugins: [eventsService],
        callbacks: {
            onRender: () => {
                eventsService.getAll()
            }
        }
    })
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar}/>
    </div>
  )
}

export default RentalsCalendar
