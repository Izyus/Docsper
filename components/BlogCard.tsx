import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { Button, Card, Image, Paragraph, Text, XStack, YStack } from 'tamagui'

export default function BlogCard({ post }: { post: any }) {
    const router = useRouter()
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(post.likes || 0)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Исследования': return '#007AFF'
            case 'Технологии': return '#FF9500'
            case 'Здоровье': return '#34C759'
            default: return '#6B7280'
        }
    }

    return (
        <Card
            bordered
            backgroundColor="#fff"
            borderRadius="$6"
            pressStyle={{ scale: 0.98 }}
            width={isMobile ? "100%" : "48%"}
            minWidth={isMobile ? undefined : 160}
            padding={0}
            shadowColor="$shadowColor"
            shadowRadius={12}
            shadowOpacity={0.15}
            borderColor="$gray4"
            mb="$4"
            overflow="hidden"
        >
            <YStack>
                {/* 🖼 Изображение с категорией */}
                <YStack
                    width="100%"
                    height={isMobile ? 180 : 200}
                    backgroundColor="$gray2"
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                    position="relative"
                >
                    <Ionicons name="newspaper-outline" size={isMobile ? 32 : 40} color="#999" />
                    <Image
                        source={{ uri: post.image }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        resizeMode="cover"
                    />
                    
                    {/* Категория как бейдж */}
                    <XStack
                        position="absolute"
                        top="$3"
                        left="$3"
                        backgroundColor={getCategoryColor(post.category)}
                        paddingHorizontal="$2"
                        paddingVertical="$1"
                        borderRadius="$6"
                        shadowColor={getCategoryColor(post.category)}
                        shadowRadius={3}
                        shadowOpacity={0.3}
                    >
                        <Text fontSize={isMobile ? "$1" : "$2"} color="#fff" fontWeight="700">
                            {post.category?.toUpperCase()}
                        </Text>
                    </XStack>

                    {/* Время чтения */}
                    <XStack
                        position="absolute"
                        top="$3"
                        right="$3"
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        paddingHorizontal="$2"
                        paddingVertical="$1"
                        borderRadius="$6"
                        alignItems="center"
                        space="$1"
                    >
                        <Ionicons name="time-outline" size={isMobile ? 12 : 14} color="#fff" />
                        <Text fontSize={isMobile ? "$1" : "$2"} color="#fff" fontWeight="600">
                            {post.readTime}
                        </Text>
                    </XStack>
                </YStack>

                {/* 📄 Контент */}
                <YStack space={isMobile ? "$2" : "$3"} padding={isMobile ? "$3" : "$4"}>
                    {/* Автор и дата */}
                    <XStack alignItems="center" space="$2">
                        <Text fontSize={isMobile ? "$4" : "$5"}>{post.authorAvatar}</Text>
                        <YStack flex={1}>
                            <Text fontSize={isMobile ? "$2" : "$3"} fontWeight="600" color="#1C1C1E">
                                {post.author}
                            </Text>
                            <Text fontSize={isMobile ? "$1" : "$2"} color="#6B7280">
                                {post.date}
                            </Text>
                        </YStack>
                    </XStack>

                    {/* Заголовок */}
                    <Text 
                        fontWeight="800" 
                        fontSize={isMobile ? "$4" : "$5"} 
                        numberOfLines={2}
                        color="#1C1C1E"
                        lineHeight="$1"
                    >
                        {post.title}
                    </Text>

                    {/* Превью контента */}
                    <Paragraph 
                        fontSize={isMobile ? "$2" : "$3"} 
                        color="#6B7280" 
                        numberOfLines={3}
                        lineHeight="$1"
                    >
                        {post.excerpt}
                    </Paragraph>

                    {/* Теги */}
                    {post.tags && post.tags.length > 0 && (
                        <XStack flexWrap="wrap" space="$1">
                            {post.tags.slice(0, 3).map((tag: string, index: number) => (
                                <XStack
                                    key={index}
                                    backgroundColor="rgba(0, 122, 255, 0.1)"
                                    paddingHorizontal="$2"
                                    paddingVertical="$0.5"
                                    borderRadius="$3"
                                    mb="$1"
                                >
                                    <Text fontSize="$1" color="#007AFF" fontWeight="600">
                                        #{tag}
                                    </Text>
                                </XStack>
                            ))}
                        </XStack>
                    )}

                    {/* Статистика и действия */}
                    <XStack justifyContent="space-between" alignItems="center" mt="$2">
                        <XStack space={isMobile ? "$3" : "$4"} alignItems="center" flex={1}>
                            {/* Лайки */}
                            <Button
                                size="$2"
                                backgroundColor="transparent"
                                padding="$1"
                                onPress={handleLike}
                                pressStyle={{ scale: 0.9 }}
                            >
                                <XStack alignItems="center" space="$1">
                                    <Ionicons 
                                        name={isLiked ? "heart" : "heart-outline"} 
                                        size={isMobile ? 16 : 18} 
                                        color={isLiked ? "#FF3B30" : "#6B7280"} 
                                    />
                                    <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                                        {likesCount}
                                    </Text>
                                </XStack>
                            </Button>

                            {/* Просмотры */}
                            <XStack alignItems="center" space="$1">
                                <Ionicons name="eye-outline" size={isMobile ? 16 : 18} color="#6B7280" />
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                                    {post.views || 0}
                                </Text>
                            </XStack>

                            {/* Комментарии */}
                            <XStack alignItems="center" space="$1">
                                <Ionicons name="chatbubble-ellipses-outline" size={isMobile ? 16 : 18} color="#6B7280" />
                                <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" fontWeight="600">
                                    {post.comments?.length || 0}
                                </Text>
                            </XStack>
                        </XStack>

                        {/* Кнопка читать */}
                        <Button
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor="#007AFF"
                            borderRadius="$6"
                            paddingHorizontal={isMobile ? "$3" : "$4"}
                            height={isMobile ? 36 : 40}
                            onPress={() => router.push(`/blog/${post.id}`)}
                            pressStyle={{ scale: 0.96 }}
                            shadowColor="#007AFF"
                            shadowRadius={5}
                            shadowOpacity={0.3}
                        >
                            <XStack alignItems="center" space="$1">
                                <Text 
                                    fontSize={isMobile ? "$3" : "$4"} 
                                    color="white" 
                                    fontWeight="700"
                                >
                                    Читать
                                </Text>
                                <Ionicons name="arrow-forward" size={isMobile ? 16 : 18} color="#fff" />
                            </XStack>
                        </Button>
                    </XStack>

                    {/* Последний комментарий (если есть) */}
                    {post.comments && post.comments.length > 0 && (
                        <Card backgroundColor="#f8f9fa" borderRadius="$3" padding="$2" mt="$2">
                            <XStack alignItems="center" space="$2">
                                <Text fontSize="$3">{post.comments[0].avatar}</Text>
                                <YStack flex={1}>
                                    <Text fontSize="$2" fontWeight="600" color="#1C1C1E">
                                        {post.comments[0].author}
                                    </Text>
                                    <Text fontSize="$2" color="#6B7280" numberOfLines={1}>
                                        {post.comments[0].text}
                                    </Text>
                                </YStack>
                                <Text fontSize="$1" color="#6B7280">
                                    {post.comments[0].date}
                                </Text>
                            </XStack>
                        </Card>
                    )}
                </YStack>
            </YStack>
        </Card>
    )
}