import { zeroAddress } from 'viem';
import { DEFAULT_CHAIN, SUPPORT_CHAIN_IDS } from './chain';

export const contracts = {
  safeSingleton: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0x91fC153Addb1dAB12FDFBa7016CFdD24345D354b',
  },
  safeProxyFactory: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0xa7b8d2fF03627b353694e870eA07cE21C29DccF0',
  },
  multiSend: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0x2Ad7869302c784C1F5F9A1c38bEFC8eaE1Cda540',
  },
  multiSendCallOnly: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0xf303AC6C8498fB202e884007b2fad486C1145ECD',
  },
  compatibilityFallbackHandler: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0x2C79A587c172c8E20B16156782C69983af126a36',
  },
  tokenCallbackHandler: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0x8DDDE071b7c4B8eB91aEa2146d9E48D8Da7AF610',
  },
  signMessageLib: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0xED93B0571bbEf6b0d704b0eC643753264Ae4197a',
  },
  createCall: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0x57eac1349F58c95baFC862Cff4d247f3269326e6',
  },
  simulateTxAccessor: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: '0xADdBf4a62b9F053f691Ead881aa2Ccd963e0C4b6',
  },
  safeWebAuthnSignerFactory: {
    [DEFAULT_CHAIN.PROD.id]: zeroAddress,
    [DEFAULT_CHAIN.DEV.id]: zeroAddress,
  },
} as const satisfies Record<string, Record<(typeof SUPPORT_CHAIN_IDS)[number], `0x${string}`>>;
