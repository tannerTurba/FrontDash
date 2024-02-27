'use client'

import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function MyComponent() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    // Fetch entities from the database using Prisma
    async function fetchEntities() {
      try {
        const fetchedEntities = await prisma.order.findMany();
        setEntities(fetchedEntities);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    }

    fetchEntities();

  }, []);

  return (
    <div>
      {/* Map over the entities and create a div for each */}
      {entities.map(order => (
        <div key={order.id}>
    
        <p>{order.price}</p>
        <p>{order.status}</p>
        <p>{order.time}</p>
        <p>{order.tips}</p>
        
        </div>
      ))}
    </div>
  );
}

export default MyComponent;