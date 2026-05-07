import { useNavigate } from 'react-router-dom';
import { MapPin, Camera, Video, Mic } from 'lucide-react';

export function FeedView() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-dark p-4 overflow-y-auto">
      <header className="flex justify-between items-center mb-8 mt-4 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold tracking-widest uppercase font-display">Sightline</h1>
        <div className="flex items-center gap-2 border border-primary/50 rounded-full px-3 py-1 bg-primary/10">
          <span className="w-2 h-2 rounded-full bg-primary shadow-neon animate-pulse" />
          <span className="font-mono text-xs text-primary font-medium">12.45 SOL</span>
        </div>
      </header>

      <div className="space-y-4">
        {/* Submit Gig */}
        <div 
          onClick={() => navigate('/gig/submit/123')}
          className="bg-surface border border-white/10 p-4 rounded-xl cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-bold text-lg leading-tight uppercase font-display">Verify Storefront Status</h2>
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold border border-primary/30">0.1 SOL</span>
          </div>
          <div className="flex gap-2 text-muted text-sm mb-4">
            <MapPin size={16} /> 1.2km away
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg text-sm flex justify-center items-center gap-2 text-white/70">
              <Camera size={16} /> Photo Required
            </button>
          </div>
        </div>

        {/* Review Gig */}
        <div 
          onClick={() => navigate('/gig/review/123')}
          className="bg-surface border border-white/10 p-4 rounded-xl cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-1 block">Awaiting Your Review</span>
              <h2 className="font-bold text-lg leading-tight uppercase font-display">Transit Stop Audit</h2>
            </div>
          </div>
          <p className="text-sm text-muted line-clamp-2 mt-2">
            Submitted 5 mins ago. Verify if the bus shelter at Market & 5th condition matches.
          </p>
        </div>
      </div>
    </div>
  );
}