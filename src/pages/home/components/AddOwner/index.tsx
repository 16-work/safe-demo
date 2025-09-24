import { useSafe } from '@/hooks/useSafe';
import { SignExecuteSafeTx } from '../SignExecuteSafeTx';
import { SafeTransaction } from '@safe-global/types-kit';

/** Component */
export const AddOwner = () => {
  /** Retrieval */
  const { connectSafe } = useSafe();

  /** Params */
  const state = useReactive({
    safeAddress: '',
    newOwner: '',
    safeTransaction: undefined as SafeTransaction | undefined,
    owners: [] as string[],
  });

  /** Actions */
  const refreshOwners = async () => {
    if (!state.safeAddress) return;
    const protocolKit = await connectSafe(state.safeAddress);
    if (protocolKit) state.owners = await protocolKit.getOwners();
  };
  useAsyncEffect(async () => {
    refreshOwners();
  }, [state.safeAddress]);

  const { run: onAdd, isLoading } = useLockFn(async () => {
    const protocolKit = await connectSafe(state.safeAddress);
    if (!protocolKit) return;

    const safeTransaction = await protocolKit.createAddOwnerTx({
      ownerAddress: state.newOwner,
    });

    state.safeTransaction = safeTransaction;
  });

  /** Template */
  return (
    <div className="grid grid-cols-2 gap-x-40">
      <div className="grid gap-y-10">
        <h1 className="bold font-xl">Add Owner</h1>

        <div>
          Safe Address: <input type="text" value={state.safeAddress} onChange={(e) => (state.safeAddress = e.target.value)} className="input-1 w-full" />
        </div>

        <div>
          New Owner: <input type="text" value={state.newOwner} onChange={(e) => (state.newOwner = e.target.value)} className="input-1 w-full" />
        </div>

        <Button onClick={onAdd} isLoading={isLoading} className="btn-primary">
          Create AddOwner Transaction
        </Button>
      </div>

      <div className="flex flex-col gap-y-10">
        <SignExecuteSafeTx safeAddress={state.safeAddress} safeTransaction={state.safeTransaction} onExecuted={refreshOwners} />

        <div>
          Owners:
          <div className="flex flex-col">
            {state.owners.map((address) => (
              <span key={address}>{address}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
