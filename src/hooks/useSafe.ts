import Safe, { Eip1193Provider, PredictedSafeProps, SafeConfig } from '@safe-global/protocol-kit';
import { getSafeAddressFromDeploymentTx } from '@safe-global/protocol-kit';
import { contracts } from '@/constants/contracts';

export const useSafe = () => {
  /** Retrieval */
  const account = useAccount();
  const safeStore = store.safe();
  const { connector } = useAccount();

  /** Params */
  const contractNetworks = useMemo(() => {
    if (!account.chainId) return undefined;

    return {
      [account.chainId]: {
        safeSingletonAddress: contracts.safeSingleton[account.chainId],
        safeProxyFactoryAddress: contracts.safeProxyFactory[account.chainId],
        multiSendAddress: contracts.multiSend[account.chainId],
        multiSendCallOnlyAddress: contracts.multiSendCallOnly[account.chainId],
        fallbackHandlerAddress: contracts.compatibilityFallbackHandler[account.chainId],
        signMessageLibAddress: contracts.signMessageLib[account.chainId],
        createCallAddress: contracts.createCall[account.chainId],
        simulateTxAccessorAddress: contracts.simulateTxAccessor[account.chainId],
        safeWebAuthnSignerFactoryAddress: contracts.safeWebAuthnSignerFactory[account.chainId],
      },
    };
  }, [account.chainId]);

  /** Actions */
  const createSafe = async (owners: string[], threshold: number) => {
    if (!connector) return;
    const provider = (await connector.getProvider()) as Eip1193Provider;

    const predictedSafe: PredictedSafeProps = {
      safeAccountConfig: {
        owners,
        threshold,
      },
      safeDeploymentConfig: {
        saltNonce: Date.now() + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
      },
    };

    const safeConfig: SafeConfig = {
      provider: provider,
      signer: account.address,
      predictedSafe,
      contractNetworks,
    };
    const protocolKit = await Safe.init(safeConfig);

    const transaction = await protocolKit.createSafeDeploymentTransaction();
    const transactionReceipt = await hooks.contract.sendTransaction(transaction);

    if (transactionReceipt) {
      const safeAddress = getSafeAddressFromDeploymentTx(transactionReceipt, '1.4.1');
      safeStore.setSafeAddress(safeAddress, owners);
    }
  };

  const connectSafe = async (safeAddress: string, signer?: string) => {
    if (!connector) return;
    const provider = (await connector.getProvider()) as Eip1193Provider;

    const safeConfig: SafeConfig = {
      provider: provider,
      signer: signer ?? account.address,
      safeAddress,
      contractNetworks,
    };
    const protocolKit = await Safe.init(safeConfig);

    return protocolKit;
  };

  return {
    createSafe,
    connectSafe,
  };
};
