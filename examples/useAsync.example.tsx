import React from 'react';
import useAsync from "../src/hooks/useAsync";

const fetchData = async () => {
  // Replace with actual data fetching logic
  return await fetch('/api/data').then(res => res.json());
};

const MyComponent = () => {
  const { execute, status, value, error } = useAsync(fetchData, false);

  return (
    <div>
      {status === 'idle' && <button onClick={execute}>Fetch Data</button>}
      {status === 'pending' && <p>Loading...</p>}
      {status === 'success' && <div>{JSON.stringify(value)}</div>}
      {status === 'error' && <p>Error: {error?.message}</p>}
    </div>
  );
};
