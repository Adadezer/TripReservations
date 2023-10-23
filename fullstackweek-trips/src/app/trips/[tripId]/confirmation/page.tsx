'use client'
import { Trip } from '@prisma/client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag';

function TripConfirmation({params}: {params: {tripId: string}}) {
  const [trip, setTrip] = useState<Trip | null>();
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate')
        })
      })
      const {trip} = await response.json();
      setTrip(trip)
    }

    fetchTrip()
  }, []);

  if (!trip) return null;
  
  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              alt={`imagem da ${trip.name}`}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary">{trip.location}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center border-b border-grayLighter border-solid pb-5 gap-3"></div>
      </div>
    </div>
  );
}

export default TripConfirmation