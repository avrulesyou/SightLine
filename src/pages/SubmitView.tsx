import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Mic, MapPin, ArrowLeft, Send } from 'lucide-react';

interface GigRequirements {
  id: string;
  media_types: ('image' | 'video' | 'audio' | 'text')[];
  location_required: boolean;
}

// Simulated data fetching
const getGigDetails = (id: string): GigRequirements => ({
  id,
  media_types: ['image', 'text'],
  location_required: true,
});

export function SubmitView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gig, setGig] = useState<GigRequirements | null>(null);
  
  // State for hardware APIs
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for submissions
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [textNotes, setTextNotes] = useState('');

  useEffect(() => {
    if (id) {
      setGig(getGigDetails(id));
    }
  }, [id]);

  useEffect(() => {
    // 1. Dynamic Hardware Router: Initialize Location if required
    if (gig?.location_required) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoordinates({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setHasLocationPermission(true);
          },
          (err) => console.error("Location error:", err)
        );
      }
    }

    // 2. Dynamic Hardware Router: Initialize Media (Camera/Audio)
    if (gig?.media_types.includes('image') || gig?.media_types.includes('video')) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Camera error:", err));
    }

    return () => {
      // Cleanup streams
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [gig]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setCapturedImage(canvas.toDataURL('image/jpeg'));
      }
    }
  };

  const handleSignAndSubmit = () => {
    // In React Native, this would call Solana MWA to sign an off-chain message or prep a submission
    alert("Signing payload with Solana wallet and uploading to Supabase...");
    navigate('/');
  };

  if (!gig) return <div className="p-4 text-center">Loading gig...</div>;

  return (
    <div className="flex flex-col h-full bg-background-dark relative">
      <header className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-4">
        <button onClick={() => navigate(-1)} className="bg-black/50 p-2 rounded-full backdrop-blur">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <div className="bg-black/50 px-3 py-1 text-xs font-mono rounded-full border border-primary/30 text-primary uppercase shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">
          Secure Enclave
        </div>
      </header>

      {/* Viewfinder View */}
      <div className="flex-1 relative bg-black">
        {gig.media_types.includes('image') && !capturedImage && (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        )}
        
        {capturedImage && (
          <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
        )}
        
        {/* HUD Elements */}
        {gig.location_required && coordinates && (
          <div className="absolute top-20 left-4 text-[10px] font-mono text-primary bg-black/60 p-2 rounded border border-primary/20 backdrop-blur">
            <div className="flex items-center gap-1"><MapPin size={12} /> LAT: {coordinates.lat.toFixed(4)}</div>
            <div className="flex items-center gap-1"><MapPin size={12} /> LNG: {coordinates.lng.toFixed(4)}</div>
          </div>
        )}

        {/* Framing Reticle */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-primary/30 relative shadow-neon">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />
          </div>
        </div>
      </div>

      {/* Multimodal Controls */}
      <div className="bg-surface border-t border-white/10 p-6 flex flex-col gap-4 relative z-20">
        {gig.media_types.includes('text') && (
          <textarea 
            placeholder="Add verifiable notes..." 
            className="bg-black/50 border border-white/10 p-3 rounded font-mono text-sm focus:border-primary/50 focus:outline-none text-white w-full resize-none h-16"
            value={textNotes}
            onChange={(e) => setTextNotes(e.target.value)}
          />
        )}

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {gig.media_types.includes('audio') && (
              <button className="p-3 bg-white/5 rounded-full border border-white/10 text-white active:bg-white/10"><Mic size={20} /></button>
            )}
          </div>
          
          {gig.media_types.includes('image') && !capturedImage && (
            <button 
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full border-4 border-primary/50 flex items-center justify-center bg-black/20 hover:border-primary transition-colors active:scale-95 shadow-neon"
            >
              <div className="w-12 h-12 bg-primary rounded-full transition-transform" />
            </button>
          )}

          <button 
            disabled={!capturedImage && gig.media_types.includes('image')}
            onClick={handleSignAndSubmit}
            className="bg-[#14F195] text-black font-bold uppercase disabled:opacity-50 tracking-widest px-6 py-3 rounded flex items-center gap-2 hover:bg-[#14F195]/90 transition-colors shadow-neon"
          >
            Submit <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}