import { z } from 'zod';

export const SetSchema = z.object({
  reps: z.string(),
  weight: z.string(),
  completed: z.boolean(),
});

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  reps: z.string(),
  weight: z.string(),
  restTime: z.string(),
  completed: z.boolean(),
  sets: z.array(SetSchema),
});

export const WorkoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  exercises: z.array(ExerciseSchema),
});

export type Set = z.infer<typeof SetSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type Workout = z.infer<typeof WorkoutSchema>; 