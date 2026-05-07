import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Camera, Image, Mic, Type, Navigation, CheckCircle } from 'lucide-react-native';

const COLORS = {
  primary: '#14F195',
  background: '#050505',
  surface: '#111111',
  muted: '#52525B',   
};

export default function CreateGigView() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bounty, setBounty] = useState('');
  
  // Acceptable formats
  const [requiresLocation, setRequiresLocation] = useState(true);
  const [requiresImage, setRequiresImage] = useState(true);
  const [requiresVideo, setRequiresVideo] = useState(false);
  const [requiresAudio, setRequiresAudio] = useState(false);
  const [requiresText, setRequiresText] = useState(true);

  const handlePostGig = () => {
    // Escrow bounty and save gig to Supabase
    const mediaTypes = [];
    if (requiresImage) mediaTypes.push('image');
    if (requiresVideo) mediaTypes.push('video');
    if (requiresAudio) mediaTypes.push('audio');
    if (requiresText) mediaTypes.push('text');

    console.log("Posting gig:", { title, description, bounty, requiresLocation, mediaTypes });
    // After posting, take user back to feed
    router.push('/');
  };

  return (
    <View className="flex-1 bg-[#050505] p-4 pt-12">
      <View className="mb-6 border-b border-[#52525B] pb-4">
        <Text className="text-[#FFFFFF] text-xl font-bold tracking-[2px] uppercase">Post New Gig</Text>
      </View>

      <ScrollView className="flex-1 space-y-6" showsVerticalScrollIndicator={false}>
        <View className="space-y-2 mb-4">
          <Text className="text-[#52525B] font-bold text-xs uppercase tracking-[1px]">Gig Title</Text>
          <TextInput
            placeholder="e.g., Verify Storefront Status"
            placeholderTextColor="#52525B"
            className="w-full bg-[#111111] border border-[#52525B] text-white text-sm p-4 rounded"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="space-y-2 mb-4">
          <Text className="text-[#52525B] font-bold text-xs uppercase tracking-[1px]">Description</Text>
          <TextInput
            placeholder="What needs to be done?"
            placeholderTextColor="#52525B"
            multiline
            numberOfLines={4}
            className="w-full bg-[#111111] border border-[#52525B] text-white text-sm p-4 rounded h-32"
            style={{ textAlignVertical: 'top' }}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View className="space-y-2 mb-6">
          <Text className="text-[#52525B] font-bold text-xs uppercase tracking-[1px]">Bounty (SOL)</Text>
          <TextInput
            placeholder="0.1"
            placeholderTextColor="#52525B"
            keyboardType="decimal-pad"
            className="w-full bg-[#111111] border border-[#52525B] text-white text-sm p-4 rounded"
            value={bounty}
            onChangeText={setBounty}
          />
        </View>

        <View className="space-y-4 mb-6">
          <Text className="text-[#52525B] font-bold text-xs uppercase tracking-[1px]">Required Submission Formats</Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity 
              onPress={() => setRequiresImage(!requiresImage)}
              className={`flex-row items-center gap-2 px-4 py-3 rounded border ${requiresImage ? 'border-[#14F195] bg-[#14F195]/10' : 'border-[#52525B] bg-[#111111]'}`}
            >
              <Camera color={requiresImage ? COLORS.primary : COLORS.muted} size={16} />
              <Text className={requiresImage ? 'text-[#14F195]' : 'text-[#52525B]'}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setRequiresVideo(!requiresVideo)}
              className={`flex-row items-center gap-2 px-4 py-3 rounded border ${requiresVideo ? 'border-[#14F195] bg-[#14F195]/10' : 'border-[#52525B] bg-[#111111]'}`}
            >
              <Image color={requiresVideo ? COLORS.primary : COLORS.muted} size={16} />
              <Text className={requiresVideo ? 'text-[#14F195]' : 'text-[#52525B]'}>Video</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setRequiresAudio(!requiresAudio)}
              className={`flex-row items-center gap-2 px-4 py-3 rounded border ${requiresAudio ? 'border-[#14F195] bg-[#14F195]/10' : 'border-[#52525B] bg-[#111111]'}`}
            >
              <Mic color={requiresAudio ? COLORS.primary : COLORS.muted} size={16} />
              <Text className={requiresAudio ? 'text-[#14F195]' : 'text-[#52525B]'}>Audio</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setRequiresText(!requiresText)}
              className={`flex-row items-center gap-2 px-4 py-3 rounded border ${requiresText ? 'border-[#14F195] bg-[#14F195]/10' : 'border-[#52525B] bg-[#111111]'}`}
            >
              <Type color={requiresText ? COLORS.primary : COLORS.muted} size={16} />
              <Text className={requiresText ? 'text-[#14F195]' : 'text-[#52525B]'}>Text Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setRequiresLocation(!requiresLocation)}
              className={`flex-row items-center gap-2 px-4 py-3 rounded border ${requiresLocation ? 'border-[#14F195] bg-[#14F195]/10' : 'border-[#52525B] bg-[#111111]'}`}
            >
              <Navigation color={requiresLocation ? COLORS.primary : COLORS.muted} size={16} />
              <Text className={requiresLocation ? 'text-[#14F195]' : 'text-[#52525B]'}>Geo-location</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handlePostGig}
          className="w-full bg-[#14F195] p-4 rounded flex-row justify-center items-center gap-2 mt-4 mb-10 shadow-[0_0_10px_#14F195]"
        >
          <CheckCircle color="#000000" size={20} />
          <Text className="text-[#000000] font-bold text-sm uppercase tracking-[1px]">Post & Escrow Bounty</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
