import { useSafe } from '@/hooks/useSafe';
import { MySafeAddresses } from './MySafeAddresses';

/** Component */
export const CreateSafe = () => {
  /** Retrieval */
  const account = useAccount();
  const { createSafe } = useSafe();

  /** Params */
  const state = useReactive({
    threshold: 1,
    otherOwners: '0x386438921A254ff7c54feEDb77C8C0c84Adb9735;0x286DFb166b85652C522fD368E3C8Efc030b3d873',
  });

  /** Actions */
  const { run: onCreate, isLoading } = useLockFn(async () => {
    const owners = state.otherOwners.split(';');
    if (account.address) owners.unshift(account.address);
    await createSafe(owners, state.threshold);
  });

  /** Template */
  return (
    <div className="grid grid-cols-2 gap-x-40">
      <div className="grid gap-y-10">
        <h1 className="bold font-xl">Create Safe</h1>
        <div>
          Threshold: <InputNum type="text" value={state.threshold} onChange={(v) => (state.threshold = Number(v))} className="input-1" />
        </div>
        <div>
          Other owners: <input type="text" value={state.otherOwners} onChange={(e) => (state.otherOwners = e.target.value)} className="input-1 w-full" />
        </div>

        <Button onClick={onCreate} isLoading={isLoading} className="btn-primary">
          Create
        </Button>
      </div>

      <MySafeAddresses />
    </div>
  );
};
