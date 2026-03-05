# 🔌 Universal Solana Wallet Adapter

<div align="center">
  <img src="https://img.shields.io/badge/Solana-14F195?style=for-the-badge&logo=solana&logoColor=black" alt="Solana" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<br>

A streamlined, secure, and highly customizable UI component library for integrating Solana wallets into your decentralized applications (dApps). Designed with modern React practices, it offers a frictionless onboarding experience for users connecting Phantom, Solflare, Backpack, and other SPL-compatible wallets.

## 🚀 Features

- **Multi-Wallet Support:** Out-of-the-box integrations for all major Solana wallets (Phantom, Solflare, Backpack, Glow, Brave).
- **Responsive UI:** Beautifully crafted, accessible, and mobile-friendly connection modals and state management interfaces.
- **Customizable Themes:** Effortlessly match your dApp's branding with dark/light modes and fully customizable CSS variables.
- **Session Management:** Securely handles persistent connections and auto-reconnects across page loads.
- **Transaction Signing:** Built-in hooks for seamless message signing and transaction approvals.
- **Next.js Compatible:** Fully SSR/SSG compatible, ensuring flawless integration with Next.js 13+ (App Router & Pages Router).

## 📦 Installation

Install the core adapter and the UI package via your preferred package manager:

```bash
npm install @tryatom/solana-wallet-adapter @tryatom/solana-wallet-adapter-react-ui @solana/web3.js
# or
yarn add @tryatom/solana-wallet-adapter @tryatom/solana-wallet-adapter-react-ui @solana/web3.js
```

## 🛠 Usage

Wrap your application with the `ConnectionProvider` and `WalletProviderContexts` to inject wallet state throughout your React tree.

### Example (Next.js / React)

```tsx
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@tryatom/solana-wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles
import '@tryatom/solana-wallet-adapter-react-ui/styles.css';

export const App = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="flex justify-end p-4">
                        <WalletMultiButton /> {/* The interactive connection button */}
                    </div>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
```

## 🎨 Theming and Customization

The UI components utilize CSS variables mapping to `--wallet-adapter-*`. You can easily override these in your global CSS to match your branding.

```css
:root {
  --wallet-adapter-button-background: #14F195;
  --wallet-adapter-button-color: #000000;
  --wallet-adapter-modal-background: #1A1A1A;
}
```

## 🛡 Security & Audits

This library interacts heavily with user private keys (via the wallet extensions). We ensure that:
- The adapter *never* requests or has access to raw private keys.
- All transaction signing is delegated strictly to the secure iframe/extension of the target wallet.

## 🤝 Contributing

We welcome contributions from the community to add support for new wallets or refine the UI components. Please read our contributing guidelines before submitting PRs.

## 📄 License

Licensed under the MIT License - see the `LICENSE` file for details.
 
<!-- Documentation update 2 for solana-wallet-adapter -->
