import React from 'react';
import  { useGlobalState } from '../src/context/GlobalStateContextType';
import useFetch from '../src/hooks/useFetch';

const cache = new Map(); // Simple in-memory cache

const MyComponent: React.FC = () => {
  const {  setState } = useGlobalState();

  const { data, loading, error, fetchData } = useFetch<DataType>(
    'https://api.example.com/data',
    { timeout: 5000 },
    cache,
    (newData) => {
      // Update the global state with the fetched data
      setState({ data: newData });
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && <div>{data.someField}</div>}
      <button onClick={() => fetchData()}>Reload Data</button>
    </div>
  );
};

// Define the shape of your data using TypeScript interfaces or types
interface DataType {
  someField: string;
  // ... other fields expected in the response
}

export default MyComponent;
