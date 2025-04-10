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
import { createEventModalPlugin} from '@schedule-x/event-modal'
import "@schedule-x/theme-default/dist/index.css"

function RentalsCalendar() {
    const eventsService = useMemo(() => createEventsServicePlugin(), [])
    const eventModal = createEventModalPlugin()
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
                title: 'Pedido de alquiler',
                description: 'Description for Event 1',
            },
            {
                id: '2',
                title: 'Pedido para evento privado',
                start: '2025-04-02',
                end: '2025-04-03',
                description: 'Description for Event 2',
            },
        ],
        plugins: [eventsService, eventModal],
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
