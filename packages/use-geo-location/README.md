# useGeoLocation Hook

The `useGeoLocation` hook is a powerful tool for accessing and monitoring the user's geographical location in React applications. It offers features such as continuous location watching, error handling, and customizable geolocation options.

## Features

- **Real-Time Location Tracking:** Ability to continuously watch the user's location.
- **Custom Geolocation Options:** Supports customization of geolocation queries, like timeout and accuracy.
- **Error Handling:** Robust error handling, including cases where geolocation is not supported.

## Installation

### Installing Only Current Hooks

```bash
npm install @custom-react-hooks/use-geo-location
```

or

```bash
yarn add @custom-react-hooks/use-geo-location
```

### Installing All Hooks

```sh
npm install @custom-react-hooks/all
```

or

```sh
yarn add @custom-react-hooks/all
```

## Usage

Import and use the `useGeoLocation` hook in your React components:

```typescript
import useGeoLocation from '@custom-react-hooks/useGeoLocation';

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
```

## API Reference

- `options`: Optional `PositionOptions` object to configure geolocation queries.
- `watch`: Boolean flag to continuously watch the user's location.
- `coordinates`: The current geographical position of the user.
- `error`: Error object containing details in case of a failure.
- `loading`: Boolean indicating whether the location data is being fetched.

## Contributing

Contributions to improve `useGeoLocation` are welcome. Feel free to submit issues or pull requests to enhance its functionality.
