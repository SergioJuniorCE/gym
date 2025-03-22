import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import '../global.css';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#22c55e', // accent
        tabBarInactiveTintColor: '#6b7280', // gray-500
        tabBarStyle: {
          backgroundColor: '#1a1a2e', // primary
          borderTopColor: '#2d2d44', // primary-light
        },
        headerStyle: {
          backgroundColor: '#1a1a2e', // primary
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          color: '#ffffff',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="trophy" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="line-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
