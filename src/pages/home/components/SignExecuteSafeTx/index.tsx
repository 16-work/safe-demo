import { SafeTransaction } from '@safe-global/types-kit';
import { useSafe } from '@/hooks/useSafe';

interface Props {
  safeAddress: string;
  safeTransaction?: SafeTransaction;
  onExecuted?: () => void;
}

/** Component */
export const SignExecuteSafeTx = (props: Props) => {
  /** Retrieval */
  const { connectSafe } = useSafe();

  /** Params */
  const state = useReactive({
    threshold: 0,
    signatures: 0,
  });

  /** Actions */
  const { run: onSign, isLoading: loadingSign } = useRequest(
    async () => {
      const protocolKit = await connectSafe(props.safeAddress);
      if (!protocolKit || !props.safeTransaction) return;

      const signedTransaction = await protocolKit.signTransaction(props.safeTransaction);
      state.signatures = signedTransaction.signatures.size;
    },
    { manual: true }
  );

  const { run: onExecute, isLoading: loadingExecute } = useLockFn(async () => {
    if (props.safeTransaction && state.signatures >= state.threshold) {
      const protocolKit = await connectSafe(props.safeAddress);
      if (!protocolKit) return;

      await protocolKit.executeTransaction(props.safeTransaction);
      props.onExecuted && props.onExecuted();
    }
  });

  useAsyncEffect(async () => {
    if (!props.safeAddress) return;

    const protocolKit = await connectSafe(props.safeAddress);
    if (!protocolKit) return;
    state.threshold = await protocolKit.getThreshold();
  }, [props.safeAddress]);

  /** Template */
  return (
    <div className="flex flex-col gap-y-10">
      <div className="grid gap-x-20">
        <span>Threshold: {state.threshold}</span>
        <span>Signatures: {state.signatures}</span>
      </div>

      {props.safeTransaction && (
        <Button onClick={onSign} isLoading={loadingSign} className="btn-primary w-full">
          Sign Transaction
        </Button>
      )}

      {props.safeTransaction && state.signatures >= state.threshold && (
        <Button onClick={onExecute} isLoading={loadingExecute} isDisabled={state.signatures < state.threshold} className="btn-primary w-full">
          Execute Transaction
        </Button>
      )}
    </div>
  );
};
