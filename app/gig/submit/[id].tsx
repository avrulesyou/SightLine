import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import { ArrowLeft, Navigation, Camera, Mic, Image as ImageIcon, CheckCircle } from 'lucide-react-native';

const COLORS = {
  primary: '#14F195',
  background: '#050505',
  surface: '#111111',
  muted: '#52525B',
  text: '#FFFFFF',
};

interface GigDetails {
  id: string;
  media_types: string[]; // 'image', 'video', 'audio', 'text'
  location_required: boolean;
}

export default function SubmitGigView() {
  const { id } = useLocalSearchParams();
  const [gig] = useState<GigDetails>({
    id: String(id),
    media_types: ['image', 'text'], // Mock data from DB
    location_required: true,
  });

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [hasCamPermission, requestCamPermission] = useCameraPermissions();
  const [audioPermissionResponse, requestAudioPermission] = Audio.usePermissions();
  const cameraRef = useRef<CameraView>(null);
  
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const [activeMediaType, setActiveMediaType] = useState<string>(gig.media_types[0] || 'text');

  useEffect(() => {
    (async () => {
      // Dynamic Hardware Router: Location
      if (gig.location_required) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({});
          setLocation(loc);
        }
      }
      
      // Dynamic Hardware Router: Media
      if (gig.media_types.includes('image') || gig.media_types.includes('video')) {
        await requestCamPermission();
      }
      if (gig.media_types.includes('audio')) {
        await requestAudioPermission();
      }
    })();
  }, [gig]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) setPhotoUri(photo.uri);
    }
  };

  const handleSignAndSubmit = () => {
    // Escrow submission transaction logic goes here
    console.log("Submitting payload...", { id, photoUri, notes, location, activeMediaType });
    router.back();
  };

  return (
    <View className="flex-1 bg-[#050505]">
      {/* Absolute Header Overlay */}
      <View className="absolute top-0 left-0 w-full z-50 flex-row items-center justify-between p-4 pt-12 bg-black/50">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full border border-[#52525B] bg-[#111111]/80">
          <ArrowLeft color={COLORS.primary} size={20} />
        </TouchableOpacity>
        <Text className="text-[#14F195] font-bold text-sm uppercase" style={{ letterSpacing: 2 }}>
          Contract: #{String(id).substring(0,5)}
        </Text>
        <View className="w-10 h-10" />
      </View>

      {/* Main Viewfinder */}
      <View className="flex-1 bg-[#111111] relative border-b-2 border-[#14F195]">
        {activeMediaType === 'image' && hasCamPermission?.granted && !photoUri && (
          <CameraView ref={cameraRef} className="flex-1" facing="back" />
        )}
        
        {photoUri && activeMediaType === 'image' && (
          <Image source={{ uri: photoUri }} className="flex-1" resizeMode="cover" />
        )}

        {activeMediaType === 'audio' && (
          <View className="flex-1 items-center justify-center">
            <Mic color={COLORS.primary} size={64} />
            <Text className="text-[#14F195] mt-4 font-bold tracking-[2px]">AUDIO RECORDING MODE</Text>
          </View>
        )}
        
        {activeMediaType === 'text' && (
          <View className="flex-1 p-4 justify-center">
            <Text className="text-white/50 text-center mb-4 uppercase tracking-[2px]">Text Submission Only</Text>
          </View>
        )}

        {/* Floating HUD Elements */}

        {gig.location_required && location && (
          <View className="absolute bottom-6 left-4 z-20">
            <View className="bg-black/80 px-2 py-1 mb-1 border border-[#14F195]/50 flex-row items-center gap-1">
              <Navigation color={COLORS.primary} size={12} />
              <Text className="text-[#14F195] text-xs uppercase">LAT: {location.coords.latitude.toFixed(4)}</Text>
            </View>
            <View className="bg-black/80 px-2 py-1 border border-[#14F195]/50 flex-row items-center gap-1">
              <Navigation color={COLORS.primary} size={12} />
              <Text className="text-[#14F195] text-xs uppercase">LNG: {location.coords.longitude.toFixed(4)}</Text>
            </View>
          </View>
        )}

        {/* Reticle */}
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <View className="w-48 h-48 border border-white/20 relative">
            <View className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-[#14F195]" />
            <View className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-[#14F195]" />
            <View className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-[#14F195]" />
            <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-[#14F195]" />
            <View className="absolute top-1/2 left-1/2 w-1 h-1 -ml-0.5 -mt-0.5 bg-[#14F195]" />
          </View>
        </View>
      </View>

      {/* Control Deck */}
      <View className="bg-[#050505] border-t border-[#52525B] p-4 pb-8">
        <View className="flex-row gap-2 mb-4 overflow-hidden">
          {gig.media_types.map((type) => (
             <TouchableOpacity 
                key={type} 
                onPress={() => setActiveMediaType(type)} 
                className={`px-3 py-1.5 border rounded ${activeMediaType === type ? 'border-[#14F195] bg-[#14F195]/10' : 'border-[#52525B]'}`}
             >
                <Text className={`font-mono text-xs ${activeMediaType === type ? 'text-[#14F195]' : 'text-gray-500'}`}>{type.toUpperCase()}</Text>
             </TouchableOpacity>
          ))}
        </View>

        {gig.media_types.includes('text') && (
          <TextInput
            placeholder="ENTER MISSION NOTES (OPTIONAL)..."
            placeholderTextColor="#52525B"
            className="w-full bg-[#111111] border border-[#52525B] text-white text-xs p-3 mb-4 focus:border-[#14F195]"
            value={notes}
            onChangeText={setNotes}
          />
        )}

        <View className="flex-row items-center justify-between gap-4">
          <TouchableOpacity className="w-12 h-12 bg-[#111111] border border-[#52525B] items-center justify-center">
            <ImageIcon color={COLORS.text} size={20} />
          </TouchableOpacity>

          {activeMediaType === 'image' && !photoUri && (
            <TouchableOpacity 
              onPress={takePicture}
              className="w-16 h-16 rounded-full border-2 border-[#14F195] items-center justify-center bg-transparent"
            >
              <View className="w-12 h-12 rounded-full bg-black items-center justify-center">
                <Camera color={COLORS.primary} size={24} />
              </View>
            </TouchableOpacity>
          )}

          {activeMediaType === 'audio' && (
            <TouchableOpacity 
              className="w-16 h-16 rounded-full border-2 border-[#14F195] items-center justify-center bg-transparent"
            >
              <View className="w-12 h-12 rounded-full bg-red-500 items-center justify-center">
                <Mic color="#000" size={24} />
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            onPress={handleSignAndSubmit}
            className="flex-1 bg-[#14F195] h-12 flex-row items-center justify-center gap-2"
          >
            <CheckCircle color="#000000" size={18} />
            <Text className="text-black font-bold text-sm uppercase tracking-[1px]">
              Submit & Sign
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
