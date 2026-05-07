import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Camera, Navigation } from 'lucide-react-native';

const COLORS = {
  primary: '#14F195',
  background: '#050505',
  surface: '#111111',
  muted: '#52525B',   
};

export default function FeedView() {
  return (
    <View className="flex-1 bg-[#050505] p-4 pt-12">
      <View className="flex-row justify-between items-center mb-8 border-b border-[#52525B] pb-4">
        <Text className="text-[#FFFFFF] text-2xl font-bold tracking-[4px] uppercase font-[SpaceGrotesk]">Sightline</Text>
        <View className="flex-row items-center gap-2 border border-[#14F195]/50 rounded-full px-3 py-1 bg-[#14F195]/10">
          <View className="w-2 h-2 rounded-full bg-[#14F195] shadow-[0_0_10px_#14F195]" />
          <Text className="text-[#14F195] text-xs font-bold font-mono">12.45 SOL</Text>
        </View>
      </View>

      <ScrollView className="flex-1 space-y-4">
        {/* Submit Gig */}
        <TouchableOpacity 
          onPress={() => router.push('/gig/123')}
          className="bg-[#111111] border border-[#52525B] p-4 mb-4 rounded-xl active:opacity-80"
        >
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-[#FFFFFF] font-bold text-lg uppercase flex-1 mr-2">Verify Storefront Status</Text>
            <View className="bg-[#14F195]/20 border border-[#14F195]/30 px-2 py-1 rounded">
              <Text className="text-[#14F195] text-xs font-bold">0.1 SOL</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2 mb-4">
            <MapPin color={COLORS.muted} size={16} />
            <Text className="text-[#52525B] text-sm">1.2km away</Text>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg flex-row justify-center items-center gap-2">
              <Camera color={COLORS.muted} size={16} />
              <Text className="text-white/70 text-sm">Photo Required</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Space */}
        <View style={{height: 16}} />
      </ScrollView>
    </View>
  );
}
