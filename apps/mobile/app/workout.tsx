import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { api, type Workout } from '../src/lib/api';

export default function Workout() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(90);
  const [lastCompletedSet, setLastCompletedSet] = useState<{
    exerciseIndex: number;
    setIndex: number;
  } | null>(null);

  useEffect(() => {
    if (id) {
      loadWorkout(id as string);
    }
  }, [id]);

  const loadWorkout = async (workoutId: string) => {
    try {
      const data = await api.getWorkout(workoutId);
      setWorkout(data);
    } catch (err) {
      setError('Failed to load workout');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const completeSet = async (exerciseIndex: number, setIndex: number) => {
    if (!workout) return;

    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed = true;

    try {
      const savedWorkout = await api.updateWorkout(workout.id, updatedWorkout);
      setWorkout(savedWorkout);
      setLastCompletedSet({ exerciseIndex, setIndex });

      // Move to next set or exercise
      if (setIndex < workout.exercises[exerciseIndex].sets.length - 1) {
        setCurrentSetIndex(setIndex + 1);
        setIsResting(true);
        setRestTimeLeft(90);
      } else if (exerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(exerciseIndex + 1);
        setCurrentSetIndex(0);
      }
    } catch (err) {
      console.error('Failed to update set:', err);
    }
  };

  const uncompleteSet = async () => {
    if (!workout || !lastCompletedSet) return;

    const { exerciseIndex, setIndex } = lastCompletedSet;
    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed = false;

    try {
      const savedWorkout = await api.updateWorkout(workout.id, updatedWorkout);
      setWorkout(savedWorkout);
      setLastCompletedSet(null);
      setCurrentExerciseIndex(exerciseIndex);
      setCurrentSetIndex(setIndex);
      setIsResting(false);
      setRestTimeLeft(90);
    } catch (err) {
      console.error('Failed to uncomplete set:', err);
    }
  };

  const switchToSet = (exerciseIndex: number, setIndex: number) => {
    setCurrentExerciseIndex(exerciseIndex);
    setCurrentSetIndex(setIndex);
    setIsResting(false);
    setRestTimeLeft(90);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (error || !workout) {
    return (
      <View className="flex-1 bg-primary items-center justify-center p-4">
        <Text className="text-white text-center mb-4">
          {error || 'Workout not found'}
        </Text>
        <TouchableOpacity
          className="bg-accent px-4 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const currentSet = currentExercise?.sets[currentSetIndex];

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="p-4 bg-surface border-b border-primary-dark">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">{workout.name}</Text>
          <View className="w-8" /> {/* Spacer for alignment */}
        </View>
        <Text className="text-gray-300 mt-1">{workout.duration}</Text>
      </View>

      {/* Current Exercise */}
      {currentExercise && (
        <View className="p-4">
          <View className="bg-surface rounded-xl p-4 mb-4">
            <Text className="text-2xl font-bold text-white mb-2">
              {currentExercise.name}
            </Text>
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-gray-300">Set {currentSetIndex + 1}</Text>
                <Text className="text-gray-300">
                  {currentSet?.reps} reps • {currentSet?.weight}
                </Text>
              </View>
              <View>
                <Text className="text-gray-300">Rest Time</Text>
                <Text className="text-accent font-bold">{restTimeLeft}s</Text>
              </View>
            </View>
            {lastCompletedSet ? (
              <View className="space-y-2">
                <TouchableOpacity
                  className="bg-accent py-4 rounded-lg items-center"
                  onPress={() =>
                    completeSet(currentExerciseIndex, currentSetIndex)
                  }
                >
                  <Text className="text-white font-bold text-lg">
                    Complete Set
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-surface-light py-4 rounded-lg items-center border border-primary-dark"
                  onPress={uncompleteSet}
                >
                  <Text className="text-white font-bold text-lg">
                    Undo Last Set
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="bg-accent py-4 rounded-lg items-center"
                onPress={() =>
                  completeSet(currentExerciseIndex, currentSetIndex)
                }
              >
                <Text className="text-white font-bold text-lg">
                  Complete Set
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Exercise List */}
          <Text className="text-lg font-semibold text-white mb-4">
            Upcoming Exercises
          </Text>
          <ScrollView>
            {workout.exercises.map((exercise, index) => (
              <View
                key={exercise.id}
                className={`bg-surface rounded-xl p-4 mb-2 ${
                  index === currentExerciseIndex ? 'border-2 border-accent' : ''
                }`}
              >
                <TouchableOpacity
                  onPress={() => switchToSet(index, 0)}
                  className="flex-row items-center justify-between"
                >
                  <View>
                    <Text className="text-white font-medium">
                      {exercise.name}
                    </Text>
                    <Text className="text-gray-300">
                      {exercise.sets.length} sets • {exercise.reps} reps
                    </Text>
                  </View>
                  <View className="flex-row">
                    {exercise.sets.map((set, setIndex) => (
                      <TouchableOpacity
                        key={setIndex}
                        onPress={() => switchToSet(index, setIndex)}
                        className={`w-2 h-2 rounded-full mx-1 ${
                          set.completed
                            ? 'bg-accent'
                            : index === currentExerciseIndex &&
                              setIndex === currentSetIndex
                            ? 'bg-accent/50'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
