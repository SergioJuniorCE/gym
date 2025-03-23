import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

// Sample workout data - in a real app, this would come from your backend
const WORKOUT_DATA = {
  id: '1',
  name: 'Upper Body Strength',
  duration: '45 min',
  exercises: [
    {
      id: '1',
      name: 'Bench Press',
      reps: '12',
      weight: '60kg',
      restTime: '90s',
      completed: false,
      sets: [
        { reps: '12', weight: '60kg', completed: false },
        { reps: '12', weight: '60kg', completed: false },
        { reps: '12', weight: '60kg', completed: false },
      ],
    },
    {
      id: '2',
      name: 'Pull-ups',
      reps: '10',
      weight: 'Body Weight',
      restTime: '90s',
      completed: false,
      sets: [
        { reps: '10', weight: 'Body Weight', completed: false },
        { reps: '10', weight: 'Body Weight', completed: false },
        { reps: '10', weight: 'Body Weight', completed: false },
      ],
    },
    {
      id: '3',
      name: 'Shoulder Press',
      reps: '12',
      weight: '40kg',
      restTime: '90s',
      completed: false,
      sets: [
        { reps: '12', weight: '40kg', completed: false },
        { reps: '12', weight: '40kg', completed: false },
        { reps: '12', weight: '40kg', completed: false },
      ],
    },
  ],
};

export default function Workout() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [workout, setWorkout] = useState(WORKOUT_DATA);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(90);

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed = true;
    setWorkout(updatedWorkout);

    // Move to next set or exercise
    if (setIndex < workout.exercises[exerciseIndex].sets.length - 1) {
      setCurrentSetIndex(setIndex + 1);
      setIsResting(true);
      setRestTimeLeft(90);
    } else if (exerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(exerciseIndex + 1);
      setCurrentSetIndex(0);
    }
  };

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
            <TouchableOpacity
              className="bg-accent py-4 rounded-lg items-center"
              onPress={() => completeSet(currentExerciseIndex, currentSetIndex)}
            >
              <Text className="text-white font-bold text-lg">Complete Set</Text>
            </TouchableOpacity>
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
                <View className="flex-row items-center justify-between">
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
                      <View
                        key={setIndex}
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
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
