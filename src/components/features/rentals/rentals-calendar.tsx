'use client';

import React, { useEffect, useMemo } from 'react'
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
import { useQuery } from '@tanstack/react-query';
import { rentalsService } from '@/services/rental.service';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CreateRentalDialog from './create-rental-dialog';

function RentalsCalendar() {
    
    // Api fetch

    const {
        data: rentals,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["rentals"],
        queryFn: rentalsService.getAll
    })

    //console.log(rentals)
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
        plugins: [eventsService, eventModal],
        callbacks: {
            onRender: () => {
                eventsService.getAll()
            }
        }
    })

    console.log(rentals)

    useEffect(() => {
        if(rentals && !isLoading) {
            const formattedEvents = rentals?.map((rental) => {
              let color;
            switch(rental.rentalStatus) {
                case 'RESERVED':
                    color = '#4a6fdc'; // blue
                    break;
                case 'PAYED':
                    color = '#50b85c'; // green
                    break;
                case 'DELIVERED':
                    color = '#808080'; // gray
                    break;
                case 'CANCELLED':
                    color = '#d95555'; // red
                    break;
                default:
                    color = '#f7c244'; // yellow/orange for other statuses
            }
                return {
                    id: rental.id,
                    start: rental.startDate.slice(0,10),
                    end: rental.endDate.slice(0,10),
                    title: rental.client.name,
                    description: `Total cost: $${rental.totalAmount} with status: ${rental.rentalStatus}`,
                    color: color
                }
            })
            console.log('Formatted events:', JSON.stringify(formattedEvents, null, 2))
            eventsService.set(formattedEvents)
        }
    }, [rentals])
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar}/>
      <CreateRentalDialog/>
    </div>
  )
}

export default RentalsCalendar
