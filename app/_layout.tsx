import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;
import { Stack } from 'expo-router';
import '../global.css';

import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';

function SolanaWeb3Provider({ children }: { children: React.ReactNode }) {
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      {children}
    </ConnectionProvider>
  );
}

export default function Layout() {
  return (
    <SolanaWeb3Provider>
      <Stack screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: '#050505' } 
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="gig/[id]" />
        <Stack.Screen name="gig/submit/[id]" />
        <Stack.Screen name="gig/review/[id]" />
      </Stack>
    </SolanaWeb3Provider>
  );
}
