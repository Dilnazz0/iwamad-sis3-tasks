import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '../../context/TasksContext';

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, deleteTask, toggleTask } = useTasks();

  const numericId = Number(id);
  const task = Number.isFinite(numericId)
    ? tasks.find((item) => item.id === numericId)
    : undefined;

  const goBackToList = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleDelete = () => {
    if (!task) return;
    deleteTask(task.id);
    goBackToList();
  };

  if (!task) {
    return (
      <View style={styles.centerContainer}>
        <Stack.Screen options={{ title: 'Task Not Found' }} />
        <View style={styles.card}>
          <Text style={styles.title}>Task not found</Text>
          <Text style={styles.subtitle}>
            No task with ID "{String(id ?? '')}" exists.
          </Text>
          <Pressable
            onPress={goBackToList}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Go back to tasks"
          >
            <Text style={styles.buttonText}>Back to Tasks</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: task.title }} />

      <View style={styles.card}>
        <Text style={styles.meta}>
          {task.priority} Priority • {task.createdAt}
        </Text>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.status}>
          Status: {task.completed ? 'Completed' : 'Active'}
        </Text>
        <Text style={styles.notes}>
          {task.notes ? task.notes : 'No additional notes.'}
        </Text>

        <Pressable
          onPress={() => toggleTask(task.id)}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Toggle status"
        >
          <Text style={styles.buttonText}>
            {task.completed ? 'Mark as Active' : 'Mark as Completed'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Delete task"
        >
          <Text style={styles.buttonText}>Delete Task</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  meta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  status: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 14,
  },
  notes: {
    fontSize: 16,
    lineHeight: 22,
    color: '#4b5563',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 999,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonPressed: {
    backgroundColor: '#6d28d9',
    transform: [{ scale: 0.98 }],
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 999,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonPressed: {
    backgroundColor: '#b91c1c',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});