import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletConnectProvider = ({ children }) => {
  // WalletConnectAdapter [cluster setup as we have 4 cluster nodes --> Mainnet , Devnet, Testnet]
  const net = WalletAdapterNetwork.Devnet;
  const endPoint = useMemo(() => {
    // setup RPC endpoint
    if (net === WalletAdapterNetwork.Devnet) {
      return "https://evocative-empty-sailboat.solana-devnet.discover.quiknode.pro/a095506bdf7f60c853fe868eb5368d79934980d8/";
    }
    return clusterApiUrl(net);
  }, [net]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [net]
  );

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
