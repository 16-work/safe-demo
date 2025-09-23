export interface SafeStore {
  safeAddresses: Record<string, string[]>;
  setSafeAddress: (safeAddress: string, owners: string[]) => void;
}
