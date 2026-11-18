import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeInDown,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated';
import { useTasks } from '../context/TasksContext';
import { Task } from '../types/task';

export default function TaskListScreen() {
  const router = useRouter();
  const { tasks, deleteTask, toggleTask } = useTasks();

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.length - completedCount;

  const renderRightActions = (id: number) => (
    <Pressable
      onPress={() => deleteTask(id)}
      style={({ pressed }) => [
        styles.deleteAction,
        pressed && styles.deleteActionPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Delete task"
    >
      <Text style={styles.deleteActionText}>Delete</Text>
    </Pressable>
  );

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const accentColor =
      item.priority === 'High'
        ? '#ef4444'
        : item.priority === 'Medium'
        ? '#7c3aed'
        : '#10b981';

    const badgeBg =
      item.priority === 'High'
        ? '#fee2e2'
        : item.priority === 'Medium'
        ? '#ede9fe'
        : '#d1fae5';

    return (
      <Animated.View
        entering={FadeInDown.delay(index * 50).duration(280)}
        exiting={FadeOutRight.duration(220)}
        layout={LinearTransition.springify()}
        style={styles.cardWrapper}
      >
        <ReanimatedSwipeable
          renderRightActions={() => renderRightActions(item.id)}
          overshootRight={false}
        >
          <Pressable
            onPress={() => router.push(`/tasks/${item.id}`)}
            onLongPress={() => toggleTask(item.id)}
            style={({ pressed }) => [
              styles.card,
              { borderLeftColor: accentColor },
              pressed && styles.cardPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.title}`}
          >
            <View style={styles.cardRow}>
              <View
                style={[
                  styles.checkCircle,
                  item.completed && styles.checkCircleDone,
                ]}
              >
                {item.completed ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : null}
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardTopRow}>
                  <Text
                    style={[
                      styles.taskTitle,
                      item.completed && styles.taskTitleCompleted,
                    ]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View style={[styles.badge, { backgroundColor: badgeBg }]}>
                    <Text style={[styles.badgeText, { color: accentColor }]}>
                      {item.priority}
                    </Text>
                  </View>
                </View>

                {item.notes ? (
                  <Text style={styles.taskNotes} numberOfLines={1}>
                    {item.notes}
                  </Text>
                ) : null}
              </View>
            </View>
          </Pressable>
        </ReanimatedSwipeable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryHeader}>
        <View>
          <Text style={styles.greetingText}>My Planner</Text>
          <Text style={styles.statsText}>
            {activeCount} active • {completedCount} completed
          </Text>
        </View>
        <View style={styles.pillCount}>
          <Text style={styles.pillCountText}>{tasks.length}</Text>
        </View>
      </View>

      <View style={styles.hintBar}>
        <Text style={styles.hintText}>
          Swipe left to delete • Long-press to toggle done
        </Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySubtitle}>
              No tasks left. Tap "+ Add Task" below to plan something new.
            </Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Pressable
          onPress={() => router.push('/new-task')}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Add new task"
        >
          <Text style={styles.buttonText}>+ Add Task</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statsText: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  pillCount: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillCountText: {
    color: '#7c3aed',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hintBar: {
    backgroundColor: '#f3e8ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e9d5ff',
  },
  hintText: {
    color: '#6d28d9',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderLeftWidth: 5,
    minHeight: 68,
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardPressed: {
    backgroundColor: '#faf5ff',
    transform: [{ scale: 0.99 }],
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#c4b5fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleDone: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardBody: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  taskNotes: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  deleteAction: {
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    minHeight: 68,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  deleteActionPressed: {
    backgroundColor: '#dc2626',
  },
  deleteActionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  button: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
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
});