import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Camera, Navigation, Mic, Type } from 'lucide-react-native';

const COLORS = {
  primary: '#14F195',
  background: '#050505',
  surface: '#111111',
  muted: '#52525B',   
};

export default function GigDetailView() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-[#050505]">
      <View className="flex-row items-center justify-between p-4 pt-12 border-b border-[#52525B]">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full border border-[#52525B] bg-[#111111]">
          <ArrowLeft color={COLORS.primary} size={20} />
        </TouchableOpacity>
        <Text className="text-[#FFFFFF] font-bold text-xs uppercase tracking-[2px]">
          Gig Output
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-[#FFFFFF] text-2xl font-bold uppercase tracking-[1px] mb-2">Verify Storefront Status</Text>
          <View className="flex-row items-center gap-2 mb-4">
            <MapPin color={COLORS.muted} size={16} />
            <Text className="text-[#52525B] text-sm font-mono">1.2km away • 123 Main St</Text>
          </View>
          
          <View className="bg-[#14F195]/10 border border-[#14F195]/30 p-4 rounded-xl items-center mb-6">
            <Text className="text-[#52525B] text-xs uppercase font-bold tracking-[1px] mb-1">Bounty Reward</Text>
            <Text className="text-[#14F195] text-3xl font-bold font-mono">0.1 SOL</Text>
          </View>
          
          <Text className="text-[#FFFFFF] text-base mb-6 leading-6">
            We need someone to verify if the storefront at this location is currently open or if the security shutters are down. Please take a clear photo of the entrance.
          </Text>

          <Text className="text-[#52525B] font-bold text-xs uppercase tracking-[1px] mb-3">Required Formats</Text>
          <View className="flex-row flex-wrap gap-2 mb-8">
            <View className="flex-row items-center gap-2 bg-[#111111] border border-[#52525B] px-3 py-2 rounded">
              <Camera color={COLORS.primary} size={16} />
              <Text className="text-[#FFFFFF] text-xs">Photo</Text>
            </View>
            <View className="flex-row items-center gap-2 bg-[#111111] border border-[#52525B] px-3 py-2 rounded">
              <Type color={COLORS.primary} size={16} />
              <Text className="text-[#FFFFFF] text-xs">Text</Text>
            </View>
            <View className="flex-row items-center gap-2 bg-[#111111] border border-[#52525B] px-3 py-2 rounded">
              <Navigation color={COLORS.primary} size={16} />
              <Text className="text-[#FFFFFF] text-xs">Geo-location</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="p-4 border-t border-[#52525B] bg-[#111111]">
        <TouchableOpacity 
          onPress={() => router.push(`/gig/submit/${id}`)}
          className="w-full bg-[#14F195] p-4 rounded flex-row justify-center items-center gap-2 shadow-[0_0_10px_#14F195]"
        >
          <Text className="text-[#000000] font-bold text-sm uppercase tracking-[1px]">Accept Task & Begin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
