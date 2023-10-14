'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../Contexts/Auth';

import Link from 'next/link';
import Eventcard from '../../Components/eventcard';

type Props = {};

type Event = {
  eid: string;
  event_name: string;
  venue: string;
  isAttending: boolean;
  num_attending: number;
};

async function fetchEvents() {
  try {
    const response = await axios.get<Event[]>('http://localhost:8080/events');

    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

function EventsPage({}: Props) {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [attending, isAttending] = useState(false);
  const { user } = useAuth();

  const toggleInterested = () => {
    isAttending(!attending);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        localStorage.setItem('Events', JSON.stringify(eventsData));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="w-full flex flex-col item-center justify-center ">
      <div>
        <Image
          src="/event1.jpg"
          alt="pulse wallpaper"
          className="w-full h-[30rem] object-cover object-bottom"
          width={1000}
          height={50}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center justify-center p-8 my-12 ">
          <h1 className="text-4xl font-extrabold">Upcoming Events</h1>
        </div>
        <iframe
          src="//stream.crichd.vip/update/skys2.php"
          width="100%"
          height="500px"
          marginheight="0"
          marginwidth="0"
          scrolling="no"
          frameborder="0"
          allowfullscreen
          allow="encrypted-media"
        ></iframe>
        <div>
          <Link href="events/addevent">
            <button>Add event</button>
          </Link>
        </div>
        <div className="w-full flex flex-wrap items-center justify-center px-10 gap-8">
          {events?.map((item) => <Eventcard key={item.eid} item={item} />)}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
