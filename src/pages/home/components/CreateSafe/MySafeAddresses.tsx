/** Component */
export const MySafeAddresses = () => {
  /** Retrieval */
  const account = useAccount();
  const { safeAddresses } = store.safe();

  /** Params */
  const mySafeAddresses = useMemo(() => {
    if (!account.address) return [];

    const addresses: string[] = [];
    Object.entries(safeAddresses).forEach(([safeAddress, owners]) => {
      if (owners.includes(account.address!)) {
        addresses.push(safeAddress);
      }
    });

    return addresses;
  }, [account.address, safeAddresses]);

  /** Actions */

  /** Template */
  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="bold font-xl">My Safe Addresses</h1>
      {!account.address && <div>Please connect wallet</div>}

      {account.address && (
        <div>
          {mySafeAddresses.map((address) => (
            <div key={address}>{address}</div>
          ))}
        </div>
      )}
    </div>
  );
};
