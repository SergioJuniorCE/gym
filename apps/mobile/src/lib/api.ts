const API_URL = 'http://localhost:3000';

export type Workout = {
  id: string;
  name: string;
  duration: string;
  exercises: Exercise[];
};

export type Exercise = {
  id: string;
  name: string;
  sets: Set[];
  reps: number;
};

export type Set = {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
};

export const api = {
  async getWorkouts(): Promise<Workout[]> {
    const response = await fetch(`${API_URL}/workouts`);
    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }
    return response.json();
  },

  async getWorkout(id: string): Promise<Workout> {
    const response = await fetch(`${API_URL}/workouts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch workout');
    }
    return response.json();
  },

  async createWorkout(workout: Omit<Workout, 'id'>): Promise<Workout> {
    const response = await fetch(`${API_URL}/workouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout),
    });
    if (!response.ok) {
      throw new Error('Failed to create workout');
    }
    return response.json();
  },

  async updateWorkout(id: string, workout: Workout): Promise<Workout> {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout),
    });
    if (!response.ok) {
      throw new Error('Failed to update workout');
    }
    return response.json();
  },

  async deleteWorkout(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete workout');
    }
  },
}; 