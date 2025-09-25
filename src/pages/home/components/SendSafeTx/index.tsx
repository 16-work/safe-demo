import { SafeTransaction } from '@safe-global/types-kit';
import { SignExecuteSafeTx } from '../SignExecuteSafeTx';
import { useSafe } from '@/hooks/useSafe';
import { encodeFunctionData, erc20Abi, parseUnits } from 'viem';

/** Component */
export const SendSafeTx = () => {
  /** Retrieval */
  const { connectSafe } = useSafe();

  /** Params */
  const state = useReactive({
    safeAddress: '',
    to: '',
    tokenContract: '',
    value: '',
    threshold: 0,
    signatures: 0,
    safeTransaction: undefined as SafeTransaction | undefined,
  });

  /** Actions */
  const { run: onCreate, isLoading } = useLockFn(async () => {
    const protocolKit = await connectSafe(state.safeAddress);
    if (!protocolKit) return;

    const threshold = await protocolKit.getThreshold();
    state.threshold = threshold;

    let transaction;

    // 主币转账
    if (!state.tokenContract) {
      transaction = {
        to: state.to,
        value: BigNumber(state.value)
          .times(10 ** 18)
          .toString(),
        data: '0x',
      };
    }
    // 代币转账
    else {
      const decimals = await hooks.contract.read({
        address: state.tokenContract as `0x${string}`,
        abi: erc20Abi,
        functionName: 'decimals',
        args: [],
      });

      transaction = {
        to: state.tokenContract,
        value: '0',
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: 'transfer',
          args: [state.to as `0x${string}`, parseUnits(state.value, decimals)],
        }),
      };
    }

    const safeTransaction = await protocolKit.createTransaction({
      transactions: [transaction],
    });

    state.safeTransaction = safeTransaction;
  });

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
              Token Contract:{' '}
              <input type="text" value={state.tokenContract} onChange={(e) => (state.tokenContract = e.target.value)} className="input-1 w-full" />
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

      <SignExecuteSafeTx safeAddress={state.safeAddress} safeTransaction={state.safeTransaction} setSafeTransaction={(v) => (state.safeTransaction = v)} />
    </div>
  );
};
