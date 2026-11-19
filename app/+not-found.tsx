import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: '404 - Not Found' }} />
      <Text style={styles.title}>Page not found</Text>
      <Link href="/" style={styles.link}>
        Go home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 10 },
  link: { color: '#7c3aed', fontSize: 16, fontWeight: '600' },
});