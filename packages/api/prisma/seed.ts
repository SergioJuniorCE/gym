import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a sample workout
  const workout = await prisma.workout.create({
    data: {
      name: 'Upper Body Strength',
      duration: '45 min',
      exercises: {
        create: [
          {
            name: 'Bench Press',
            reps: '12',
            weight: '60kg',
            restTime: '90s',
            completed: false,
            sets: {
              create: [
                { reps: '12', weight: '60kg', completed: false },
                { reps: '12', weight: '60kg', completed: false },
                { reps: '12', weight: '60kg', completed: false },
              ],
            },
          },
          {
            name: 'Pull-ups',
            reps: '10',
            weight: 'Body Weight',
            restTime: '90s',
            completed: false,
            sets: {
              create: [
                { reps: '10', weight: 'Body Weight', completed: false },
                { reps: '10', weight: 'Body Weight', completed: false },
                { reps: '10', weight: 'Body Weight', completed: false },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed data created:', workout);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 