import useGeoLocation from '../hook/useGeoLocation';

function GeoLocationComponent() {
  const { loading, coordinates, error, isWatching } = useGeoLocation();

  return (
    <div>
      <h1>GeoLocation Component</h1>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error: {error.message}</p>}
      {!loading && !error && coordinates && (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      )}
      <p>Watching: {isWatching ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default GeoLocationComponent;
