import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { api, type Workout } from '../src/lib/api';

export default function Workouts() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await api.getWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError('Failed to load workouts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutPress = (id: string) => {
    router.push(`/workout?id=${id}`);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-primary items-center justify-center p-4">
        <Text className="text-white text-center mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-accent px-4 py-2 rounded-lg"
          onPress={loadWorkouts}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="p-4 bg-surface border-b border-primary-dark">
        <Text className="text-2xl font-bold text-white">Workouts</Text>
      </View>

      {/* Workout List */}
      <ScrollView className="flex-1 p-4">
        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            className="bg-surface rounded-xl p-4 mb-4"
            onPress={() => handleWorkoutPress(workout.id)}
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xl font-semibold text-white">
                  {workout.name}
                </Text>
                <Text className="text-gray-300">{workout.duration}</Text>
              </View>
              <FontAwesome name="chevron-right" size={20} color="#6b7280" />
            </View>
            <View className="mt-2">
              <Text className="text-gray-300">
                {workout.exercises.length} exercises
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Workout Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-accent w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('/workout')}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
