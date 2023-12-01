export type StorageType = 'local' | 'session';
declare function useStorage<T>(key: string, defaultValue: T, storageType?: StorageType): [T, (value: T | ((val: T) => T)) => void];
export default useStorage;
//# sourceMappingURL=index.d.ts.map