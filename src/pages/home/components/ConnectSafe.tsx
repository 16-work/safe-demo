import { useSafe } from '@/hooks/useSafe';

/** Component */
export const ConnectSafe = () => {
  /** Retrieval */
  const { connectSafe } = useSafe();

  /** Params */
  const state = useReactive({
    safeAddress: '',
    newOwner: '',
    owners: [] as string[],
  });

  /** Actions */
  const { run: onAdd, isLoading } = useRequest(
    async () => {
      const protocolKit = await connectSafe(state.safeAddress);

      state.owners = await protocolKit.getOwners();
    },
    { manual: true }
  );

  /** Template */
  return (
    <div className="grid gap-y-10">
      <h1 className="bold font-xl">Add Owner</h1>

      <div>
        SafeAddress: <input type="text" value={state.safeAddress} onChange={(e) => (state.safeAddress = e.target.value)} className="input-1 w-full" />
      </div>

      <div>
        New Owner: <input type="text" value={state.safeAddress} onChange={(e) => (state.safeAddress = e.target.value)} className="input-1 w-full" />
      </div>

      <Button onClick={onAdd} isLoading={isLoading} className="btn-primary">
        Add
      </Button>

      <div>
        Owners:{' '}
        {state.owners.map((address) => (
          <>{address}; </>
        ))}
      </div>
    </div>
  );
};
