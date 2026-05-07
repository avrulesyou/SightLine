import { useParams, useNavigate } from 'react-router-dom';
import { useReviewAction } from '../hooks/useReviewAction';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

export function ReviewView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Mock data for review
  const seekerPubkey = "7aX1w8g...9pXF";
  const bountySol = 0.1;
  const { approveAndPay, rejectPublicly, isApproving, isRejecting, error } = useReviewAction(id || '', seekerPubkey, bountySol);

  return (
    <div className="flex flex-col h-full bg-background-dark relative">
      <header className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-4">
        <button onClick={() => navigate(-1)} className="bg-black/50 p-2 rounded-full backdrop-blur">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <div className="bg-black/50 px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider rounded-full border border-white/20 text-text-main shadow-2xl backdrop-blur-sm">
          Review Submission
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto w-full">
        <div className="w-full aspect-[4/5] bg-black relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542247920-5fc5b38ed8ce?auto=format&fit=crop&q=80&w=600" 
            alt="Submission Evidence" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-20 right-4 z-20 bg-black/60 px-3 py-1.5 rounded text-xs font-mono border border-primary/20 text-primary backdrop-blur">
            {seekerPubkey}
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-20 relative z-20">
          <div>
            <h3 className="font-bold uppercase tracking-widest text-[#14F195] text-xs mb-1 drop-shadow">Seeker Notes</h3>
            <p className="text-sm text-gray-300 font-mono bg-surface border border-white/10 p-3 rounded shadow-xl backdrop-blur-md">
              "Storefront is closed as requested. Security shutters down. Lat/Lng verified matching criteria."
            </p>
          </div>

          {error && <div className="text-accent text-sm font-mono p-3 bg-accent/10 border border-accent/20 rounded shadow">{error}</div>}

          <div className="bg-surface p-4 rounded-xl border border-white/10 shadow-2xl">
            <h4 className="text-xs uppercase font-bold text-gray-500 mb-3 tracking-wider">Review Action</h4>
            <div className="flex gap-4">
              <button 
                onClick={rejectPublicly}
                disabled={isRejecting || isApproving}
                className="flex-1 border-2 border-accent text-accent py-3 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors disabled:opacity-50"
              >
                {isRejecting ? 'Rejecting...' : <><XCircle size={18} /> Reject</>}
              </button>
              <button 
                onClick={approveAndPay}
                disabled={isApproving || isRejecting}
                className="flex-[2] bg-[#14F195] text-black py-3 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-neon hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isApproving ? 'Approving...' : <><CheckCircle size={18} /> Pay {bountySol} SOL</>}
              </button>
            </div>
          </div>
          
          <div className="text-[10px] text-gray-500 text-center uppercase tracking-widest px-4 leading-relaxed font-mono">
            Warning: Rejecting triggers PUBLIC_ON_REJECT state, making this evidence visible to network consensus via RLS.
          </div>
        </div>
      </div>
    </div>
  );
}