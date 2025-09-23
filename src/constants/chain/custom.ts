const customNet = {
  id: 1029,
  name: 'BitTorrent Chain Donau',
  nativeCurrency: {
    name: 'BTT',
    symbol: 'BTT',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://pre-rpc.bt.io'] },
  },
  blockExplorers: {
    default: {
      name: 'bttcscan',
      url: 'https://testnet.bttcscan.com',
    },
  },
  contracts: {
    multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11' },
  },
};

export const customChains = { customNet };
