import { useState } from 'react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

export function useReviewAction(submissionId: string, seekerPubkeyBase58: string, bountySol: number) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Approves the submission via Transact (Mobile Wallet Adapter)
   */
  const approveAndPay = async () => {
    setIsApproving(true);
    setError(null);
    try {
      const seekerPubkey = new PublicKey(seekerPubkeyBase58);

      await transact(async (wallet) => {
        const [account] = await wallet.getAccounts();
        if (!account) throw new Error("No account authorized");

        const posterPubkey = new PublicKey(account.address);

        // Fetch latest blockhash from standard RPC in real app
        // Mocking blockhash for demonstration
        const mockBlockhash = "11111111111111111111111111111111";

        const tx = new Transaction({
          recentBlockhash: mockBlockhash,
          feePayer: posterPubkey,
        }).add(
          SystemProgram.transfer({
            fromPubkey: posterPubkey,
            toPubkey: seekerPubkey,
            lamports: bountySol * LAMPORTS_PER_SOL,
          })
        );

        // This prompts the bottom sheet MWA flow to authorize and sign
        const [signedTx] = await wallet.signTransactions({
          transactions: [tx]
        });

        console.log("Transaction signed!", signedTx);
        
        // Next: Send to RPC, then update Supabase status
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to approve gig.");
    } finally {
      setIsApproving(false);
    }
  };

  /**
   * Rejects securely enforcing the "Public on Reject" constraint
   */
  const rejectPublicly = async () => {
    setIsRejecting(true);
    setError(null);
    try {
      // In a real implementation:
      // await supabase.from('submissions').update({ status: 'REJECTED_PUBLIC' }).eq('id', submissionId);
      
      // Simulating request delay
      await new Promise((res) => setTimeout(res, 800));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to reject gig.");
    } finally {
      setIsRejecting(false);
    }
  };

  return {
    approveAndPay,
    rejectPublicly,
    isApproving,
    isRejecting,
    error,
  };
}