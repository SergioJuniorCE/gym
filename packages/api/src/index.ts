import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { WorkoutSchema, type Workout } from './types';
import { prisma } from './lib/prisma';

// Sample data - in a real app, this would come from a database
const workouts: Workout[] = [
  {
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
    ],
  },
];

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', prettyJSON());

// Routes
app.get('/', (c) => c.json({ message: 'Welcome to the Gym API' }));

// Get all workouts
app.get('/workouts', async (c) => {
  const workouts = await prisma.workout.findMany({
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });
  return c.json(workouts);
});

// Get a specific workout
app.get('/workouts/:id', async (c) => {
  const id = c.req.param('id');
  const workout = await prisma.workout.findUnique({
    where: { id },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  if (!workout) {
    return c.json({ error: 'Workout not found' }, 404);
  }
  return c.json(workout);
});

// Create a new workout
app.post('/workouts', async (c) => {
  const body = await c.req.json();
  const result = WorkoutSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid workout data' }, 400);
  }

  const workoutData = result.data;
  const newWorkout = await prisma.workout.create({
    data: {
      name: workoutData.name,
      duration: workoutData.duration,
      exercises: {
        create: workoutData.exercises.map(exercise => ({
          name: exercise.name,
          reps: exercise.reps,
          weight: exercise.weight,
          restTime: exercise.restTime,
          completed: exercise.completed,
          sets: {
            create: exercise.sets.map(set => ({
              reps: set.reps,
              weight: set.weight,
              completed: set.completed,
            })),
          },
        })),
      },
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  return c.json(newWorkout, 201);
});

// Update a workout
app.put('/workouts/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const result = WorkoutSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid workout data' }, 400);
  }

  const workoutData = result.data;

  // First, delete existing exercises and sets
  await prisma.exercise.deleteMany({
    where: { workoutId: id },
  });

  // Then create new workout with exercises and sets
  const updatedWorkout = await prisma.workout.update({
    where: { id },
    data: {
      name: workoutData.name,
      duration: workoutData.duration,
      exercises: {
        create: workoutData.exercises.map(exercise => ({
          name: exercise.name,
          reps: exercise.reps,
          weight: exercise.weight,
          restTime: exercise.restTime,
          completed: exercise.completed,
          sets: {
            create: exercise.sets.map(set => ({
              reps: set.reps,
              weight: set.weight,
              completed: set.completed,
            })),
          },
        })),
      },
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  return c.json(updatedWorkout);
});

// Delete a workout
app.delete('/workouts/:id', async (c) => {
  const id = c.req.param('id');

  try {
    await prisma.workout.delete({
      where: { id },
    });
    return c.json({ message: 'Workout deleted' });
  } catch (error) {
    return c.json({ error: 'Workout not found' }, 404);
  }
});

// Start the server
const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
}); 