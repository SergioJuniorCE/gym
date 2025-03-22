import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-primary">
      <View className="p-4">
        {/* Welcome Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-white">Welcome back!</Text>
          <Text className="text-gray-300">Let's crush today's workout 💪</Text>
        </View>

        {/* Today's Workout Card */}
        <View className="bg-surface rounded-xl p-4 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-white mb-2">
            Today's Workout
          </Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-300">Upper Body Strength</Text>
              <Text className="text-sm text-gray-400">
                8 exercises • 45 min
              </Text>
            </View>
            <TouchableOpacity className="bg-accent px-4 py-2 rounded-lg">
              <Text className="text-white font-medium">Start</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <Text className="text-lg font-semibold text-white mb-4">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap gap-4">
          <TouchableOpacity className="bg-surface p-4 rounded-xl shadow-sm w-[calc(50%-8px)]">
            <FontAwesome name="plus" size={24} color="#22c55e" />
            <Text className="text-white font-medium mt-2">New Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface p-4 rounded-xl shadow-sm w-[calc(50%-8px)]">
            <FontAwesome name="calendar" size={24} color="#22c55e" />
            <Text className="text-white font-medium mt-2">Plan Week</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface p-4 rounded-xl shadow-sm w-[calc(50%-8px)]">
            <FontAwesome name="history" size={24} color="#22c55e" />
            <Text className="text-white font-medium mt-2">History</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface p-4 rounded-xl shadow-sm w-[calc(50%-8px)]">
            <FontAwesome name="cog" size={24} color="#22c55e" />
            <Text className="text-white font-medium mt-2">Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
