import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import {
    Button,
    Card,
    H2,
    Image,
    Input,
    Paragraph,
    ScrollView,
    Separator,
    Text,
    XStack,
    YStack,
} from 'tamagui'
import { blogPosts } from '../../data/blog'

export default function BlogPost() {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    
    const post = blogPosts.find((p) => p.id === id)
    const [comment, setComment] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(post?.likes || 0)
    const [commentsLiked, setCommentsLiked] = useState<{ [key: number]: boolean }>({})

    if (!post) return <Text p="$4">Новость не найдена</Text>

    const recommended = blogPosts.filter((p) => p.id !== id && post.relatedPosts?.includes(p.id)).slice(0, 5)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    }

    const handleCommentLike = (commentId: number) => {
        setCommentsLiked(prev => ({ ...prev, [commentId]: !prev[commentId] }))
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
        <ScrollView backgroundColor="#f8f9fa">
            <YStack space="$4" p={isMobile ? "$3" : "$4"} pb="$8">
                {/* Навигация */}
                <XStack alignItems="center" justifyContent="space-between">
                    <Button
                        icon={<Ionicons name="chevron-back" size={20} />}
                        onPress={() => router.back()}
                        variant="outlined"
                        size="$3"
                        theme="blue"
                        alignSelf="flex-start"
                    >
                        Назад
                    </Button>
                    
                    <XStack space="$2">
                        <Button
                            size="$3"
                            backgroundColor="transparent"
                            onPress={handleLike}
                            pressStyle={{ scale: 0.9 }}
                        >
                            <Ionicons 
                                name={isLiked ? "heart" : "heart-outline"} 
                                size={20} 
                                color={isLiked ? "#FF3B30" : "#6B7280"} 
                            />
                        </Button>
                        
                        <Button
                            size="$3"
                            backgroundColor="transparent"
                            pressStyle={{ scale: 0.9 }}
                        >
                            <Ionicons name="share-outline" size={20} color="#007AFF" />
                        </Button>
                    </XStack>
                </XStack>

                {/* Основная статья */}
                <Card backgroundColor="#fff" borderRadius="$6" padding={0} overflow="hidden">
                    <YStack>
                        {/* Изображение с категорией */}
                        <YStack
                            height={isMobile ? 220 : 280}
                            position="relative"
                            backgroundColor="$gray2"
                        >
                            <Image
                                source={{ uri: post.image }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMode="cover"
                            />
                            
                            {/* Категория */}
                            <XStack
                                position="absolute"
                                top="$4"
                                left="$4"
                                backgroundColor={getCategoryColor(post.category)}
                                paddingHorizontal="$3"
                                paddingVertical="$2"
                                borderRadius="$6"
                                shadowColor={getCategoryColor(post.category)}
                                shadowRadius={5}
                                shadowOpacity={0.4}
                            >
                                <Text fontSize="$3" color="#fff" fontWeight="700">
                                    {post.category?.toUpperCase()}
                                </Text>
                            </XStack>

                            {/* Время чтения */}
                            <XStack
                                position="absolute"
                                top="$4"
                                right="$4"
                                backgroundColor="rgba(0, 0, 0, 0.7)"
                                paddingHorizontal="$3"
                                paddingVertical="$2"
                                borderRadius="$6"
                                alignItems="center"
                                space="$1"
                            >
                                <Ionicons name="time-outline" size={16} color="#fff" />
                                <Text fontSize="$3" color="#fff" fontWeight="600">
                                    {post.readTime}
                                </Text>
                            </XStack>
                        </YStack>

                        {/* Контент статьи */}
                        <YStack padding={isMobile ? "$4" : "$5"} space="$4">
                            {/* Автор и дата */}
                            <XStack alignItems="center" space="$3">
                                <Text fontSize="$6">{post.authorAvatar}</Text>
                                <YStack flex={1}>
                                    <Text fontSize="$4" fontWeight="700" color="#1C1C1E">
                                        {post.author}
                                    </Text>
                                    <Text fontSize="$3" color="#6B7280">
                                        {post.date}
                                    </Text>
                                </YStack>
                                <XStack alignItems="center" space="$1">
                                    <Ionicons name="eye-outline" size={16} color="#6B7280" />
                                    <Text fontSize="$3" color="#6B7280">
                                        {post.views} просмотров
                                    </Text>
                                </XStack>
                            </XStack>

                            {/* Заголовок */}
                            <H2 fontSize={isMobile ? "$7" : "$8"} fontWeight="900" color="#1C1C1E">
                                {post.title}
                            </H2>

                            {/* Теги */}
                            {post.tags && post.tags.length > 0 && (
                                <XStack flexWrap="wrap" space="$2">
                                    {post.tags.map((tag: string, index: number) => (
                                        <XStack
                                            key={index}
                                            backgroundColor="rgba(0, 122, 255, 0.1)"
                                            paddingHorizontal="$3"
                                            paddingVertical="$1"
                                            borderRadius="$4"
                                            mb="$2"
                                        >
                                            <Text fontSize="$3" color="#007AFF" fontWeight="600">
                                                #{tag}
                                            </Text>
                                        </XStack>
                                    ))}
                                </XStack>
                            )}

                            {/* Основной текст */}
                            <Paragraph size="$5" lineHeight="$6" color="#374151">
                                {post.content}
                            </Paragraph>

                            {/* Статистика и действия */}
                            <XStack justifyContent="space-between" alignItems="center" mt="$4">
                                <XStack space="$4" alignItems="center">
                                    {/* Лайки */}
                                    <Button
                                        size="$3"
                                        backgroundColor="transparent"
                                        onPress={handleLike}
                                        pressStyle={{ scale: 0.9 }}
                                    >
                                        <XStack alignItems="center" space="$2">
                                            <Ionicons 
                                                name={isLiked ? "heart" : "heart-outline"} 
                                                size={20} 
                                                color={isLiked ? "#FF3B30" : "#6B7280"} 
                                            />
                                            <Text fontSize="$4" color="#6B7280" fontWeight="600">
                                                {likesCount}
                                            </Text>
                                        </XStack>
                                    </Button>

                                    {/* Комментарии */}
                                    <XStack alignItems="center" space="$2">
                                        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#6B7280" />
                                        <Text fontSize="$4" color="#6B7280" fontWeight="600">
                                            {post.comments?.length || 0}
                                        </Text>
                                    </XStack>
                                </XStack>

                                <Button
                                    size="$3"
                                    backgroundColor="#007AFF"
                                    borderRadius="$6"
                                    pressStyle={{ scale: 0.96 }}
                                >
                                    <XStack alignItems="center" space="$2">
                                        <Ionicons name="bookmark-outline" size={18} color="#fff" />
                                        <Text fontSize="$4" color="white" fontWeight="600">
                                            Сохранить
                                        </Text>
                                    </XStack>
                                </Button>
                            </XStack>
                        </YStack>
                    </YStack>
                </Card>

                <Separator />

                {/* Комментарии */}
                <YStack space="$4">
                    <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                        💬 Обсуждение ({post.comments.length})
                    </Text>

                    {post.comments.length === 0 && (
                        <Card backgroundColor="#fff" padding="$4" borderRadius="$6">
                            <Text color="$gray8" textAlign="center">Комментариев пока нет. Будьте первым!</Text>
                        </Card>
                    )}

                    {post.comments.map((c: any, i: number) => (
                        <Card key={i} backgroundColor="#fff" padding="$4" borderRadius="$6" bordered>
                            <YStack space="$3">
                                <XStack alignItems="center" justifyContent="space-between">
                                    <XStack alignItems="center" space="$2">
                                        <Text fontSize="$5">{c.avatar}</Text>
                                        <YStack>
                                            <XStack alignItems="center" space="$2">
                                                <Text fontWeight="700" fontSize="$4" color="#1C1C1E">
                                                    {c.author}
                                                </Text>
                                                {c.isVerified && (
                                                    <Ionicons name="checkmark-circle" size={16} color="#007AFF" />
                                                )}
                                            </XStack>
                                            <Text color="#6B7280" fontSize="$2">
                                                {c.date}
                                            </Text>
                                        </YStack>
                                    </XStack>
                                    <Text color="#6B7280" fontSize="$2">
                                        #{i + 1}
                                    </Text>
                                </XStack>
                                
                                <Text color="#374151" fontSize="$4" lineHeight="$5">
                                    {c.text}
                                </Text>

                                <XStack alignItems="center" space="$3">
                                    <Button
                                        size="$2"
                                        backgroundColor="transparent"
                                        onPress={() => handleCommentLike(c.id)}
                                        pressStyle={{ scale: 0.9 }}
                                    >
                                        <XStack alignItems="center" space="$1">
                                            <Ionicons 
                                                name={commentsLiked[c.id] ? "heart" : "heart-outline"} 
                                                size={16} 
                                                color={commentsLiked[c.id] ? "#FF3B30" : "#6B7280"} 
                                            />
                                            <Text fontSize="$3" color="#6B7280">
                                                {(c.likes || 0) + (commentsLiked[c.id] ? 1 : 0)}
                                            </Text>
                                        </XStack>
                                    </Button>
                                    <Button
                                        size="$2"
                                        backgroundColor="transparent"
                                        pressStyle={{ scale: 0.9 }}
                                    >
                                        <XStack alignItems="center" space="$1">
                                            <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                                            <Text fontSize="$3" color="#6B7280">Ответить</Text>
                                        </XStack>
                                    </Button>
                                </XStack>
                            </YStack>
                        </Card>
                    ))}

                    {/* Форма добавления комментария */}
                    <Card backgroundColor="#fff" padding="$4" borderRadius="$6" bordered>
                        <YStack space="$3">
                            <Text fontSize="$4" fontWeight="700" color="#1C1C1E">
                                Добавить комментарий
                            </Text>
                            <Input
                                placeholder="Поделитесь своим мнением..."
                                value={comment}
                                onChangeText={setComment}
                                borderColor="#E5E7EB"
                                borderRadius="$4"
                                multiline
                                minHeight={80}
                            />
                            <XStack justifyContent="flex-end">
                                <Button
                                    onPress={() => {
                                        if (comment.trim()) {
                                            alert('Комментарий добавлен! (демо)')
                                            setComment('')
                                        }
                                    }}
                                    theme="blue"
                                    size="$3"
                                    borderRadius="$6"
                                    disabled={!comment.trim()}
                                >
                                    <XStack alignItems="center" space="$2">
                                        <Ionicons name="send" size={16} color="#fff" />
                                        <Text color="white" fontWeight="600">Отправить</Text>
                                    </XStack>
                                </Button>
                            </XStack>
                        </YStack>
                    </Card>
                </YStack>

                {/* Похожие статьи */}
                {recommended.length > 0 && (
                    <>
                        <Separator />
                        <YStack space="$4">
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                                🎯 Похожие статьи
                            </Text>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <XStack space="$3" py="$2">
                                    {recommended.map((p) => (
                                        <Card
                                            key={p.id}
                                            elevate
                                            backgroundColor="#fff"
                                            width={isMobile ? 200 : 240}
                                            bordered
                                            borderRadius="$6"
                                            pressStyle={{ scale: 0.97 }}
                                            onPress={() => router.push(`/blog/${p.id}`)}
                                        >
                                            <YStack space="$2">
                                                <Image
                                                    source={{ uri: p.image }}
                                                    style={{
                                                        height: isMobile ? 120 : 140,
                                                        borderTopLeftRadius: 12,
                                                        borderTopRightRadius: 12,
                                                        width: '100%',
                                                    }}
                                                    resizeMode="cover"
                                                />
                                                <YStack padding="$3" space="$2">
                                                    <Text fontWeight="700" fontSize="$3" numberOfLines={2} color="#1C1C1E">
                                                        {p.title}
                                                    </Text>
                                                    <XStack alignItems="center" space="$2">
                                                        <Text fontSize="$2">{p.authorAvatar}</Text>
                                                        <Text fontSize="$2" color="#6B7280" flex={1}>
                                                            {p.author}
                                                        </Text>
                                                    </XStack>
                                                </YStack>
                                            </YStack>
                                        </Card>
                                    ))}
                                </XStack>
                            </ScrollView>
                        </YStack>
                    </>
                )}
            </YStack>
        </ScrollView>
    )
}