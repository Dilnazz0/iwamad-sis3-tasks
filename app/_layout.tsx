import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TasksProvider } from '../context/TasksContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TasksProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff' },
            headerTintColor: '#111827',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#f9fafb' },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'My Tasks' }} />
          <Stack.Screen
            name="new-task"
            options={{
              title: 'New Task',
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen name="tasks/[id]" options={{ title: 'Task Details' }} />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        </Stack>
      </TasksProvider>
    </GestureHandlerRootView>
  );
}