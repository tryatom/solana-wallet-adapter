import React, { useMemo, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider as RawWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter, BackpackWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

interface WalletProviderProps {
    children: ReactNode;
    network?: WalletAdapterNetwork;
    rpcUrl?: string;
    autoConnect?: boolean;
}

export const WalletProviderContext: React.FC<WalletProviderProps> = ({
    children,
    network = WalletAdapterNetwork.Mainnet,
    rpcUrl,
    autoConnect = true
}) => {
    const endpoint = useMemo(() => rpcUrl || clusterApiUrl(network), [network, rpcUrl]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new BackpackWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <RawWalletProvider wallets={wallets} autoConnect={autoConnect}>
                {children}
            </RawWalletProvider>
        </ConnectionProvider>
    );
};
