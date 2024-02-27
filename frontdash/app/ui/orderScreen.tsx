import React, { useState, useEffect } from 'react';
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

    // Cleanup function
    return () => {
      prisma.$disconnect();
    };
  }, []);

  return (
    <div>
      {/* Map over the entities and create a div for each */}
      {entities.map(order => (
        <div key={order.id}>
          {/* Render the content of each entity */}
          <p>{order.name}</p>
          {/* Add more content as needed */}
        </div>
      ))}
    </div>
  );
}

export default MyComponent;