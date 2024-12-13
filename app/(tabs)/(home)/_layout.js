import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: 'Home' }}
      />
      <Stack.Screen
        name="weather/[city]"
        options={{ headerShown: true, headerTitle: 'Weather' }}
      />
    </Stack>
  )
}
