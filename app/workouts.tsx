import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SAMPLE_WORKOUTS = [
  {
    id: '1',
    name: 'Upper Body Strength',
    exercises: 8,
    duration: '45 min',
    type: 'strength',
  },
  {
    id: '2',
    name: 'Lower Body Power',
    exercises: 6,
    duration: '40 min',
    type: 'strength',
  },
  {
    id: '3',
    name: 'Cardio Blast',
    exercises: 5,
    duration: '30 min',
    type: 'cardio',
  },
];

export default function Workouts() {
  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="p-4 bg-surface border-b border-primary-dark">
        <Text className="text-2xl font-bold text-white">Workouts</Text>
        <Text className="text-gray-300">Manage your workout routines</Text>
      </View>

      {/* Workout List */}
      <ScrollView className="flex-1 p-4">
        {SAMPLE_WORKOUTS.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            className="bg-surface rounded-xl p-4 mb-4 shadow-sm"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-white">
                  {workout.name}
                </Text>
                <Text className="text-gray-300">
                  {workout.exercises} exercises • {workout.duration}
                </Text>
              </View>
              <View className="bg-accent/20 px-3 py-1 rounded-full">
                <Text className="text-accent font-medium capitalize">
                  {workout.type}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Workout Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-accent w-14 h-14 rounded-full items-center justify-center shadow-lg">
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
