import { Stack, Link } from 'expo-router'
import { YStack, Text, Button } from 'tamagui'

export default function NotFoundScreen() {
  return (
      <>
        <Stack.Screen options={{ title: 'Oops!' }} />

        <YStack f={1} jc="center" ai="center" p="$4" space="$4">
          <Text fontSize="$8" fontWeight="800">
            Страница не найдена
          </Text>

          <Link href="/" asChild>
            <Button size="$4" theme="active">
              Вернуться на главную
            </Button>
          </Link>
        </YStack>
      </>
  )
}