import { Tabs } from 'expo-router';
import { Home, PlusSquare, User } from 'lucide-react-native';

const COLORS = {
  primary: '#14F195',
  background: '#050505',
  surface: '#111111',
  muted: '#52525B',   
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111111',
          borderTopWidth: 1,
          borderTopColor: '#52525B',
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Post Gig',
          tabBarIcon: ({ color }) => <PlusSquare color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
