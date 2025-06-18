import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { Card, Text, XStack, YStack } from 'tamagui'

export default function QuickStatsCard() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <Card
            backgroundColor="#fff"
            borderRadius="$6"
            padding={isMobile ? "$3" : "$4"}
            bordered
            borderColor="$gray4"
            shadowColor="$shadowColor"
            shadowRadius={6}
            shadowOpacity={0.1}
        >
            <XStack alignItems="center" space={isMobile ? "$3" : "$4"}>
                {/* 🔢 Левая колонка — число + иконка справа */}
                <XStack alignItems="center" space="$2" minWidth={isMobile ? 60 : 80} flexShrink={0}>
                    <Text fontSize={isMobile ? "$8" : "$9"} fontWeight="900" color="#007AFF">
                        8
                    </Text>
                    <Ionicons name="medkit-outline" size={isMobile ? 18 : 20} color="#007AFF" />
                </XStack>

                {/* 📄 Правая колонка — заголовок и 2 строки описания */}
                <YStack flex={1} space="$1">
                    <Text 
                        fontSize={isMobile ? "$4" : "$5"} 
                        fontWeight="700" 
                        color="#1C1C1E"
                        numberOfLines={isMobile ? 1 : undefined}
                    >
                        новых препаратов
                    </Text>
                    <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                        Одобрено FDA сегодня
                    </Text>
                    <XStack alignItems="center" space="$1">
                        <Ionicons name="refresh-outline" size={isMobile ? 12 : 14} color="#9CA3AF" />
                        <Text 
                            fontSize={isMobile ? "$1" : "$2"} 
                            color="#6B7280"
                            numberOfLines={isMobile ? 1 : undefined}
                        >
                            {isMobile ? "обновляется автоматически" : "данные обновляются автоматически"}
                        </Text>
                    </XStack>
                </YStack>
            </XStack>
        </Card>
    )
}