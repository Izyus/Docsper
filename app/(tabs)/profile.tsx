import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import {
    Button,
    Card,
    ScrollView,
    Separator,
    Text,
    XStack,
    YStack
} from 'tamagui'
import TabHeader from '../../components/ui/TabHeader'

const profileData = {
    name: 'Анна Иванова',
    email: 'anna.ivanova@example.com',
    phone: '+7 (925) 123-45-67',
    avatar: 'https://source.unsplash.com/150x150/?portrait,woman',
    joinDate: 'Декабрь 2023',
    savedMedicines: 12,
    searchHistory: 47,
    consultations: 3,
}

const menuItems = [
    { 
        id: 1, 
        icon: 'bookmark-outline', 
        title: 'Избранные лекарства', 
        subtitle: `${profileData.savedMedicines} препаратов`,
        color: '#007AFF' 
    },
    { 
        id: 2, 
        icon: 'time-outline', 
        title: 'История поиска', 
        subtitle: `${profileData.searchHistory} запросов`,
        color: '#34C759' 
    },
    { 
        id: 3, 
        icon: 'medical-outline', 
        title: 'Консультации', 
        subtitle: `${profileData.consultations} врача`,
        color: '#FF9500' 
    },
    { 
        id: 4, 
        icon: 'card-outline', 
        title: 'Способы оплаты', 
        subtitle: '2 карты добавлено',
        color: '#5856D6' 
    },
    { 
        id: 5, 
        icon: 'notifications-outline', 
        title: 'Уведомления', 
        subtitle: 'Настройки push',
        color: '#FF3B30' 
    },
    { 
        id: 6, 
        icon: 'help-circle-outline', 
        title: 'Помощь и поддержка', 
        subtitle: 'FAQ и контакты',
        color: '#8E8E93' 
    },
]

export default function ProfileScreen() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    return (
        <ScrollView backgroundColor="#f8f9fa">
            <YStack px={isMobile ? "$3" : "$4"} py="$4" space="$4">
                <TabHeader 
                    icon="person"
                    title={profileData.name}
                    subtitle={profileData.email}
                    accentColor="#007AFF"
                    stats={[
                        {
                            value: profileData.savedMedicines.toString(),
                            label: "Избранных",
                            color: "#007AFF"
                        },
                        {
                            value: profileData.searchHistory.toString(),
                            label: "Поисков",
                            color: "#34C759"
                        },
                        {
                            value: profileData.consultations.toString(),
                            label: "Консультаций",
                            color: "#FF9500"
                        }
                    ]}
                />

                {/* Меню настроек */}
                <Card
                    backgroundColor="#fff"
                    borderRadius="$6"
                    padding={isMobile ? "$3" : "$4"}
                    bordered
                    borderColor="$gray4"
                    shadowColor="$shadowColor"
                    shadowRadius={8}
                    shadowOpacity={0.1}
                >
                    <YStack space="$1">
                        {menuItems.map((item, index) => (
                            <YStack key={item.id}>
                                <Button
                                    chromeless
                                    padding={isMobile ? "$3" : "$4"}
                                    borderRadius="$4"
                                    pressStyle={{ backgroundColor: '$gray2' }}
                                >
                                    <XStack alignItems="center" space={isMobile ? "$3" : "$4"} width="100%">
                                        <YStack
                                            width={isMobile ? 40 : 48}
                                            height={isMobile ? 40 : 48}
                                            backgroundColor={item.color + '15'}
                                            borderRadius="$4"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Ionicons 
                                                name={item.icon as any} 
                                                size={isMobile ? 20 : 24} 
                                                color={item.color} 
                                            />
                                        </YStack>

                                        <YStack flex={1}>
                                            <Text 
                                                fontSize={isMobile ? "$3" : "$4"} 
                                                fontWeight="600" 
                                                color="#1C1C1E"
                                            >
                                                {item.title}
                                            </Text>
                                            <Text 
                                                fontSize={isMobile ? "$2" : "$3"} 
                                                color="#6B7280"
                                            >
                                                {item.subtitle}
                                            </Text>
                                        </YStack>

                                        <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                                    </XStack>
                                </Button>
                                {index < menuItems.length - 1 && (
                                    <Separator marginHorizontal="$3" />
                                )}
                            </YStack>
                        ))}
                    </YStack>
                </Card>
            </YStack>
        </ScrollView>
    )
}