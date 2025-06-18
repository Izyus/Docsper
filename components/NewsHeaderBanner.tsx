import { Dimensions } from 'react-native'
import { Paragraph, Text, YStack } from 'tamagui'

export default function NewsHeaderBanner() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <YStack
            bg="#FEF08A"
            borderRadius="$5"
            p={isMobile ? "$3" : "$4"}
            space="$2"
        >
            <Text
                fontSize={isMobile ? "$6" : "$7"}
                fontWeight="900"
                color="#111827"
                lineHeight={isMobile ? "$1" : "$2"}
            >
                Новости медицины
            </Text>
            <Paragraph
                fontSize={isMobile ? "$3" : "$4"}
                color="#374151"
                numberOfLines={isMobile ? 3 : undefined}
            >
                Следите за последними открытиями, исследованиями и новыми препаратами
                в фармацевтике.
            </Paragraph>
        </YStack>
    )
}