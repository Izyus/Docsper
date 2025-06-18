import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Dimensions } from 'react-native'
import { Button, Card, ScrollView, Text, XStack, YStack } from 'tamagui'
import { recentComments } from '../data/blog'

export default function RecentComments() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const router = useRouter()

    return (
        <YStack space={isMobile ? "$3" : "$4"}>
            <XStack alignItems="center" justifyContent="space-between">
                <XStack alignItems="center" space="$2">
                    <Ionicons name="chatbubbles" size={isMobile ? 20 : 24} color="#34C759" />
                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="800" color="#1C1C1E">
                        Последние комментарии
                    </Text>
                </XStack>
                <Button
                    size="$2"
                    backgroundColor="transparent"
                    pressStyle={{ scale: 0.96 }}
                >
                    <XStack alignItems="center" space="$1">
                        <Text fontSize="$2" color="#007AFF" fontWeight="600">Все обсуждения</Text>
                        <Ionicons name="arrow-forward" size={14} color="#007AFF" />
                    </XStack>
                </Button>
            </XStack>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
            >
                <XStack space={isMobile ? "$3" : "$4"} py="$2">
                    {recentComments.map((comment) => (
                        <Card
                            key={comment.id}
                            backgroundColor="#fff"
                            borderRadius="$6"
                            bordered
                            borderColor="$gray4"
                            padding={isMobile ? "$3" : "$4"}
                            width={isMobile ? 280 : 320}
                            pressStyle={{ scale: 0.98 }}
                            shadowColor="$shadowColor"
                            shadowRadius={6}
                            shadowOpacity={0.1}
                            onPress={() => router.push(`/blog/${comment.postId}`)}
                        >
                            <YStack space="$3">
                                {/* Заголовок статьи */}
                                <Text 
                                    fontSize={isMobile ? "$3" : "$4"}
                                    fontWeight="700"
                                    color="#1C1C1E"
                                    numberOfLines={2}
                                    lineHeight="$1"
                                >
                                    {comment.postTitle}
                                </Text>

                                {/* Комментарий */}
                                <Card backgroundColor="#f8f9fa" borderRadius="$4" padding="$3">
                                    <YStack space="$2">
                                        <XStack alignItems="center" space="$2">
                                            <Text fontSize={isMobile ? "$4" : "$5"}>{comment.avatar}</Text>
                                            <YStack flex={1}>
                                                <Text fontSize={isMobile ? "$2" : "$3"} fontWeight="600" color="#1C1C1E">
                                                    {comment.author}
                                                </Text>
                                                <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280">
                                                    {comment.date}
                                                </Text>
                                            </YStack>
                                        </XStack>
                                        <Text 
                                            fontSize={isMobile ? "$2" : "$3"}
                                            color="#374151"
                                            lineHeight="$1"
                                            numberOfLines={3}
                                        >
                                            "{comment.text}"
                                        </Text>
                                    </YStack>
                                </Card>

                                {/* Действия */}
                                <XStack justifyContent="space-between" alignItems="center">
                                    <XStack space="$2" alignItems="center">
                                        <Button
                                            size="$2"
                                            backgroundColor="transparent"
                                            padding="$1"
                                            pressStyle={{ scale: 0.9 }}
                                        >
                                            <XStack alignItems="center" space="$1">
                                                <Ionicons name="heart-outline" size={14} color="#6B7280" />
                                                <Text fontSize="$2" color="#6B7280">Нравится</Text>
                                            </XStack>
                                        </Button>
                                        
                                        <Button
                                            size="$2"
                                            backgroundColor="transparent"
                                            padding="$1"
                                            pressStyle={{ scale: 0.9 }}
                                        >
                                            <XStack alignItems="center" space="$1">
                                                <Ionicons name="chatbubble-outline" size={14} color="#6B7280" />
                                                <Text fontSize="$2" color="#6B7280">Ответить</Text>
                                            </XStack>
                                        </Button>
                                    </XStack>

                                    <Button
                                        size="$2"
                                        backgroundColor="#007AFF"
                                        borderRadius="$4"
                                        paddingHorizontal="$2"
                                        height={32}
                                        onPress={() => router.push(`/blog/${comment.postId}`)}
                                        pressStyle={{ scale: 0.96 }}
                                    >
                                        <XStack alignItems="center" space="$1">
                                            <Text fontSize="$2" color="white" fontWeight="600">
                                                Читать
                                            </Text>
                                            <Ionicons name="arrow-forward" size={12} color="#fff" />
                                        </XStack>
                                    </Button>
                                </XStack>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </ScrollView>
        </YStack>
    )
} 