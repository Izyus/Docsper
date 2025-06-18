import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { Avatar, Card, ScrollView, Text, XStack, YStack } from 'tamagui'

const recentComments = [
    {
        id: 1,
        user: {
            name: 'Анна К.',
            avatar: 'https://source.unsplash.com/50x50/?portrait,woman'
        },
        article: 'Новый метод лечения диабета',
        comment: 'Очень интересная статья! Хотелось бы узнать больше о побочных эффектах.',
        time: '5 минут назад',
        likes: 12
    },
    {
        id: 2,
        user: {
            name: 'Михаил П.',
            avatar: 'https://source.unsplash.com/50x50/?portrait,man'
        },
        article: 'ИИ в диагностике',
        comment: 'Технологии развиваются очень быстро. Надеюсь, это поможет врачам.',
        time: '15 минут назад',
        likes: 8
    },
    {
        id: 3,
        user: {
            name: 'Елена С.',
            avatar: 'https://source.unsplash.com/50x50/?portrait,girl'
        },
        article: 'Прорыв в вакцинологии',
        comment: 'Наконец-то! Ждали этого прорыва очень давно.',
        time: '30 минут назад',
        likes: 15
    }
]

export default function RecentComments() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <YStack space="$3">
            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                Последние комментарии
            </Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: isMobile ? 0 : 8,
                }}
            >
                <XStack space="$3">
                    {recentComments.map((comment) => (
                        <Card
                            key={comment.id}
                            backgroundColor="#fff"
                            borderRadius="$5"
                            padding={isMobile ? "$3" : "$4"}
                            bordered
                            borderColor="$gray4"
                            pressStyle={{ scale: 0.98 }}
                            width={isMobile ? 300 : 360}
                        >
                            <YStack space="$3">
                                <XStack space="$3" alignItems="center">
                                    <Avatar circular size={isMobile ? "$4" : "$5"}>
                                        <Avatar.Image src={comment.user.avatar} />
                                        <Avatar.Fallback backgroundColor="$gray5" />
                                    </Avatar>

                                    <YStack flex={1}>
                                        <Text 
                                            fontSize={isMobile ? "$3" : "$4"} 
                                            fontWeight="600" 
                                            color="#1C1C1E"
                                        >
                                            {comment.user.name}
                                        </Text>
                                        <Text fontSize="$2" color="#6B7280">
                                            {comment.article}
                                        </Text>
                                    </YStack>
                                </XStack>

                                <Text 
                                    fontSize={isMobile ? "$2" : "$3"} 
                                    color="#1C1C1E"
                                    numberOfLines={2}
                                >
                                    {comment.comment}
                                </Text>

                                <XStack justifyContent="space-between" alignItems="center">
                                    <XStack space="$2" alignItems="center">
                                        <Ionicons name="heart-outline" size={16} color="#6B7280" />
                                        <Text fontSize="$2" color="#6B7280">
                                            {comment.likes}
                                        </Text>
                                    </XStack>

                                    <Text fontSize="$2" color="#6B7280">
                                        {comment.time}
                                    </Text>
                                </XStack>
                            </YStack>
                        </Card>
                    ))}
                </XStack>
            </ScrollView>
        </YStack>
    )
} 