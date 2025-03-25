// Temporary mock model until AWS Amplify is configured
const mockWorkouts = [
    {
        id: '1',
        type: 'Strength Training',
        date: new Date('2024-03-24').toISOString(),
        duration: 45,
        exercises: [
            { name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
            { name: 'Squats', sets: 3, reps: 12, weight: 185 }
        ]
    },
    {
        id: '2',
        type: 'Cardio',
        date: new Date('2024-03-23').toISOString(),
        duration: 30,
        exercises: [
            { name: 'Treadmill Run', duration: 30, distance: 5 }
        ]
    },
    {
        id: '3',
        type: 'HIIT',
        date: new Date('2024-03-22').toISOString(),
        duration: 25,
        exercises: [
            { name: 'Burpees', sets: 3, reps: 15 },
            { name: 'Mountain Climbers', sets: 3, reps: 20 }
        ]
    }
];

export const Workout = {
    // This is a temporary mock implementation
    create: async (data) => {
        console.log('Creating workout:', data);
        return { ...data, id: Date.now().toString() };
    },
    query: async () => {
        // Return mock data
        return mockWorkouts;
    }
};

export const UserStats = {
    // This is a temporary mock implementation
    create: async (data) => {
        console.log('Creating user stats:', data);
        return { ...data, id: Date.now().toString() };
    },
    query: async () => {
        return {
            totalWorkouts: mockWorkouts.length,
            totalDuration: mockWorkouts.reduce((sum, w) => sum + w.duration, 0),
            workoutsByType: mockWorkouts.reduce((acc, w) => {
                acc[w.type] = (acc[w.type] || 0) + 1;
                return acc;
            }, {})
        };
    }
}; 