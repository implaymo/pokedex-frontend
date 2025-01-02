"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/data')
      .then(response => {
        console.log('Response status:', response.status);
        return response.text(); // Use response.text() for plain text response
      })
      .then(data => {
        console.log('Response data:', data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Data from Spring Boot:</h1>
      <p>{data}</p>
    </div>
  );
}