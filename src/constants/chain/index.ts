import * as wagmiChains from 'wagmi/chains';
import { customChains } from './custom';

export const chains = { ...wagmiChains, ...customChains };

// 默认链
export const DEFAULT_CHAIN = {
  PROD: chains.mainnet,
  DEV: customChains.customNet,
};
export const DEFAULT_CHAIN_CURRENT = env.VITE_ENV === 'prod' ? DEFAULT_CHAIN.PROD : DEFAULT_CHAIN.DEV;

// 支持的链ID
export const SUPPORT_CHAIN_IDS = env.VITE_ENV === 'prod' ? [DEFAULT_CHAIN.PROD.id] : [DEFAULT_CHAIN.DEV.id];

// 链图标
export const CHAINS_ICON: Record<number, string> = {
  [DEFAULT_CHAIN_CURRENT.id]: 'chain-default', // 填svg名
};

// 链Symbol
export const CURRENCY_SYMBOL = DEFAULT_CHAIN_CURRENT.nativeCurrency.symbol;
