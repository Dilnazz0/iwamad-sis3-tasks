import { ComponentRef, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../context/TasksContext';
import { TaskPriority } from '../types/task';

const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];

export default function NewTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();

  const [title, setTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [error, setError] = useState<string>('');

  const notesRef = useRef<ComponentRef<typeof TextInput>>(null);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please enter a task title first!');
      return;
    }
    setError('');
    addTask(title, notes, priority);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.headerSubtitle}>What's on your agenda?</Text>

          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (error) setError('');
            }}
            placeholder="e.g., survive until final exams"
            placeholderTextColor="#9ca3af"
            returnKeyType="next"
            onSubmitEditing={() => notesRef.current?.focus()}
            autoFocus
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityRow}>
            {PRIORITIES.map((item) => {
              const active = priority === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setPriority(item)}
                  style={({ pressed }) => [
                    styles.priorityChip,
                    active && styles.priorityChipActive,
                    pressed && styles.pressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${item} priority`}
                >
                  <Text
                    style={[
                      styles.priorityChipText,
                      active && styles.priorityChipTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Notes</Text>
          <TextInput
            ref={notesRef}
            style={[styles.input, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add details, reminders, or anything else..."
            placeholderTextColor="#9ca3af"
            multiline
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
            onSubmitEditing={handleSave}
          />

          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Save task"
          >
            <Text style={styles.buttonText}>Save Task</Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Cancel"
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    padding: 20,
    flexGrow: 1,
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
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    minHeight: 48,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  inputError: {
    borderColor: '#dc2626',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityChip: {
    flex: 1,
    minHeight: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityChipActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  priorityChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  priorityChipTextActive: {
    color: '#ffffff',
  },
  notesInput: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 999,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#6d28d9',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    minHeight: 46,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#6b7280',
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.75,
  },
});