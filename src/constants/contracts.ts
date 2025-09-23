import { zeroAddress } from 'viem';
import { DEFAULT_CHAIN, SUPPORT_CHAIN_IDS } from './chain';

export const contracts = {
  safeSingleton: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  safeProxyFactory: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  multiSend: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  multiSendCallOnly: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  compatibilityFallbackHandler: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  tokenCallbackHandler: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  signMessageLib: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  createCall: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  simulateTxAccessor: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
  safeWebAuthnSignerFactory: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
} as const satisfies Record<string, Record<(typeof SUPPORT_CHAIN_IDS)[number], `0x${string}`>>;
