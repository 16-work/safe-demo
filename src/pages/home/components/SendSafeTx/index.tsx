import { SafeTransaction } from '@safe-global/types-kit';
import { SignExecuteSafeTx } from '../SignExecuteSafeTx';
import { useSafe } from '@/hooks/useSafe';

/** Component */
export const SendSafeTx = () => {
  /** Retrieval */
  const { connectSafe } = useSafe();

  /** Params */
  const state = useReactive({
    safeAddress: '',
    to: '',
    value: '',
    threshold: 0,
    signatures: 0,
    safeTransaction: undefined as SafeTransaction | undefined,
  });

  /** Actions */
  const { run: onCreate, isLoading } = useRequest(
    async () => {
      const protocolKit = await connectSafe(state.safeAddress);
      if (!protocolKit) return;

      const threshold = await protocolKit.getThreshold();
      state.threshold = threshold;

      const safeTransaction = await protocolKit.createTransaction({
        transactions: [{ to: state.to, value: state.value, data: '0x' }],
        onlyCalls: true,
      });

      state.safeTransaction = safeTransaction;
    },
    { manual: true }
  );

  /** Template */
  return (
    <div className="grid grid-cols-2 gap-x-40">
      <div className="grid gap-y-10">
        <h1 className="bold font-xl">Send Transaction</h1>

        <div className="grid gap-x-40 gap-y-20">
          <div className="grid gap-y-10">
            <div>
              From(safe address):{' '}
              <input type="text" value={state.safeAddress} onChange={(e) => (state.safeAddress = e.target.value)} className="input-1 w-full" />
            </div>

            <div>
              To: <input type="text" value={state.to} onChange={(e) => (state.to = e.target.value)} className="input-1 w-full" />
            </div>

            <div>
              Value: <InputNum type="text" value={state.value} onChange={(v) => (state.value = v)} className="input-1 w-full" />
            </div>

            <Button onClick={onCreate} isLoading={isLoading} className="btn-primary">
              Create Send Transaction
            </Button>
          </div>
        </div>
      </div>

      <SignExecuteSafeTx safeAddress={state.safeAddress} safeTransaction={state.safeTransaction} />
    </div>
  );
};
