import useAsync from '../hook/useAsync';

const fetchData = async () => {
  return await fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json());
};

const AsyncComponent = () => {
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

export default AsyncComponent;
