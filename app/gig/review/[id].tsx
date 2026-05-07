import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react-native';
import { useReviewAction } from '../../../src/hooks/useReviewAction';

const COLORS = {
  primary: '#14F195',
  background: '#050505',
  surface: '#111111',
  muted: '#52525B',   
  accent: '#FF3B30',
  text: '#FFFFFF',
};

export default function ReviewGigView() {
  const { id } = useLocalSearchParams();
  const seekerPubkey = "7aX1w8g...9pXF";
  const bountySol = 0.1;
  const { approveAndPay, rejectPublicly, isApproving, isRejecting, error } = useReviewAction(String(id) || '', seekerPubkey, bountySol);

  return (
    <View className="flex-1 bg-[#050505]">
      <View className="absolute top-0 left-0 w-full z-50 flex-row items-center justify-between p-4 pt-12 bg-black/50">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full border border-[#52525B] bg-[#111111]/80">
          <ArrowLeft color={COLORS.text} size={20} />
        </TouchableOpacity>
        <Text className="text-[#FFFFFF] font-bold text-xs uppercase" style={{ letterSpacing: 2 }}>
          Review Submission
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 w-full" bounces={false}>
        <View className="w-full aspect-[4/5] bg-black relative">
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1542247920-5fc5b38ed8ce?auto=format&fit=crop&q=80&w=600" }} 
            className="w-full h-full" 
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent" />
          <View className="absolute top-24 right-4 z-20 bg-black/60 px-3 py-1.5 rounded border border-[#14F195]/20">
            <Text className="text-[#14F195] text-xs font-mono">{seekerPubkey}</Text>
          </View>
        </View>

        <View className="p-4 space-y-4 -mt-16 z-20">
          <View>
            <Text className="font-bold uppercase tracking-[2px] text-[#14F195] text-xs mb-1">Seeker Notes</Text>
            <View className="bg-[#111111] border border-[#52525B] p-3 shadow-xl mt-1">
              <Text className="text-gray-300 font-mono text-sm">
                "Storefront is closed as requested. Security shutters down. Lat/Lng verified matching criteria."
              </Text>
            </View>
          </View>

          {error && (
            <View className="p-3 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded mt-4">
              <Text className="text-[#FF3B30] text-sm font-mono">{error}</Text>
            </View>
          )}

          <View className="bg-[#111111] p-4 border border-[#52525B] mt-4 shadow-2xl">
            <Text className="text-xs uppercase font-bold text-[#52525B] mb-3 tracking-[2px]">Review Action</Text>
            <View className="flex-row gap-4">
              <TouchableOpacity 
                onPress={rejectPublicly}
                disabled={isRejecting || isApproving}
                className="flex-[1.2] border-2 border-[#FF3B30] py-3 items-center justify-center flex-row gap-2"
                style={{ opacity: (isRejecting || isApproving) ? 0.5 : 1 }}
              >
                <XCircle color={COLORS.accent} size={18} />
                <Text className="text-[#FF3B30] font-bold uppercase tracking-[1px] text-xs">
                  {isRejecting ? 'Rejecting...' : 'Reject'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={approveAndPay}
                disabled={isApproving || isRejecting}
                className="flex-[2] bg-[#14F195] py-3 items-center justify-center flex-row gap-2 shadow-[0_0_10px_#14F195]"
                style={{ opacity: (isApproving || isRejecting) ? 0.5 : 1 }}
              >
                <CheckCircle color="#000000" size={18} />
                <Text className="text-black font-bold uppercase tracking-[1px] text-xs">
                  {isApproving ? 'Approving...' : `Pay ${bountySol} SOL`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Text className="text-[10px] text-[#52525B] text-center uppercase mt-6 mb-8 text-center leading-5 font-mono" style={{ letterSpacing: 2 }}>
            Warning: Rejecting triggers PUBLIC_ON_REJECT state, making this evidence visible to network consensus via RLS.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
