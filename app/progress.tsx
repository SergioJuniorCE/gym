import { Text, View, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const STATS = [
  { label: 'Workouts Completed', value: '24', icon: 'check' },
  { label: 'Total Time', value: '18h', icon: 'clock-o' },
  { label: 'Streak', value: '5 days', icon: 'star' },
  { label: 'Calories Burned', value: '2.4k', icon: 'heart' },
];

const RECENT_WORKOUTS = [
  {
    date: 'Today',
    name: 'Upper Body Strength',
    duration: '45 min',
    calories: '320',
  },
  {
    date: 'Yesterday',
    name: 'Cardio Blast',
    duration: '30 min',
    calories: '280',
  },
  {
    date: '2 days ago',
    name: 'Lower Body Power',
    duration: '40 min',
    calories: '350',
  },
];

export default function Progress() {
  return (
    <ScrollView className="flex-1 bg-primary">
      {/* Header */}
      <View className="p-4 bg-surface border-b border-primary-dark">
        <Text className="text-2xl font-bold text-white">Progress</Text>
        <Text className="text-gray-300">Track your fitness journey</Text>
      </View>

      {/* Stats Grid */}
      <View className="p-4">
        <View className="flex-row flex-wrap gap-4">
          {STATS.map((stat) => (
            <View
              key={stat.label}
              className="bg-surface rounded-xl p-4 w-[calc(50%-8px)] shadow-sm"
            >
              <FontAwesome name={stat.icon as any} size={24} color="#22c55e" />
              <Text className="text-2xl font-bold text-white mt-2">
                {stat.value}
              </Text>
              <Text className="text-gray-300">{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Workouts */}
      <View className="p-4">
        <Text className="text-lg font-semibold text-white mb-4">
          Recent Workouts
        </Text>
        {RECENT_WORKOUTS.map((workout, index) => (
          <View
            key={index}
            className="bg-surface rounded-xl p-4 mb-4 shadow-sm"
          >
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-gray-300">{workout.date}</Text>
              <Text className="text-gray-300">{workout.calories} cal</Text>
            </View>
            <Text className="text-lg font-semibold text-white">
              {workout.name}
            </Text>
            <Text className="text-gray-300">{workout.duration}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
