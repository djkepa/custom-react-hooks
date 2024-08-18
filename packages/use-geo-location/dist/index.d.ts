export type GeoLocationState = {
    loading: boolean;
    coordinates: GeolocationCoordinates | null;
    error: Error | null;
    isWatching: boolean;
};
declare function useGeoLocation(options?: PositionOptions, watch?: boolean): GeoLocationState;
export { useGeoLocation };
//# sourceMappingURL=index.d.ts.map