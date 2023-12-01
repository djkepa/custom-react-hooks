import useFetch from '../hook/useFetch';

interface User {
  id: number;
  name: string;
}

const UserList = () => {
  const { data, loading, error, fetchData } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users',
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={fetchData}>Refresh</button>
      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
