import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { api } from '../src/lib/api';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [todaysWorkout, setTodaysWorkout] = useState<any>(null);

  useEffect(() => {
    loadTodaysWorkout();
  }, []);

  const loadTodaysWorkout = async () => {
    try {
      const workouts = await api.getWorkouts();
      // For now, just use the first workout as today's workout
      if (workouts.length > 0) {
        setTodaysWorkout(workouts[0]);
      }
    } catch (error) {
      console.error("Failed to load today's workout:", error);
    }
  };

  const startWorkout = () => {
    if (todaysWorkout) {
      router.push(`/workout?id=${todaysWorkout.id}`);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="p-4 bg-surface border-b border-primary-dark">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white">Welcome back!</Text>
            <Text className="text-gray-300">Let's crush today's workout</Text>
          </View>
          <TouchableOpacity
            className="bg-surface-light p-3 rounded-full"
            onPress={() => router.push('/profile')}
          >
            <FontAwesome name="user" size={24} color="#22c55e" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Today's Workout */}
        <View className="bg-surface rounded-xl p-4 mb-6">
          <Text className="text-xl font-bold text-white mb-2">
            Today's Workout
          </Text>
          {todaysWorkout ? (
            <>
              <Text className="text-gray-300 mb-4">{todaysWorkout.name}</Text>
              <TouchableOpacity
                className="bg-accent py-4 rounded-lg items-center"
                onPress={startWorkout}
              >
                <Text className="text-white font-bold text-lg">Start</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text className="text-gray-300">No workout scheduled</Text>
          )}
        </View>

        {/* Quick Actions */}
        <Text className="text-xl font-bold text-white mb-4">Quick Actions</Text>
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity
            className="bg-surface w-[48%] p-4 rounded-xl mb-4"
            onPress={() => router.push('/workouts')}
          >
            <FontAwesome name="list" size={24} color="#22c55e" />
            <Text className="text-white font-medium mt-2">Workouts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-surface w-[48%] p-4 rounded-xl mb-4"
            onPress={() => router.push('/progress')}
          >
            <FontAwesome name="line-chart" size={24} color="#22c55e" />
            <Text className="text-white font-medium mt-2">Progress</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
