import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  bitgetWallet,
  coinbaseWallet,
  imTokenWallet,
  metaMaskWallet,
  okxWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { BinanceWallet } from '@/libs/wallet/binanace';
import { chains, SUPPORT_CHAIN_IDS } from './chain/index.ts';

export const WAGMI_CONFIG = getDefaultConfig({
  appName: env.VITE_APPNAME,
  projectId: '8de5a8f4d65f36d28b3e25fb7129fbda',
  chains: Object.values(chains).filter((chain) => SUPPORT_CHAIN_IDS.includes(chain.id as never)) as any,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, okxWallet, BinanceWallet, bitgetWallet, coinbaseWallet, walletConnectWallet, trustWallet, imTokenWallet, tokenPocketWallet],
    },
  ],
}) as any; // Config (wagmi | @wagmi/core)
