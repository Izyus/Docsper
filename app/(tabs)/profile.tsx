import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import {
    Button,
    Card,
    Image,
    ScrollView,
    Separator,
    Text,
    XStack,
    YStack
} from 'tamagui'

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
        <ScrollView backgroundColor="#fff">
            <YStack px={isMobile ? "$3" : "$4"} py={isMobile ? "$3" : "$4"} space="$4">
                
                {/* 👤 Профиль пользователя */}
                <Card
                    backgroundColor="#fff"
                    borderRadius="$6"
                    padding={isMobile ? "$4" : "$5"}
                    bordered
                    borderColor="$gray4"
                    shadowColor="$shadowColor"
                    shadowRadius={8}
                    shadowOpacity={0.1}
                >
                    <XStack alignItems="center" space={isMobile ? "$3" : "$4"}>
                        {/* Аватар */}
                        <YStack
                            width={isMobile ? 80 : 100}
                            height={isMobile ? 80 : 100}
                            backgroundColor="$gray2"
                            borderRadius="$10"
                            justifyContent="center"
                            alignItems="center"
                            overflow="hidden"
                            position="relative"
                        >
                            <Ionicons name="person-outline" size={isMobile ? 32 : 40} color="#999" />
                            <Image
                                source={{ uri: profileData.avatar }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMode="cover"
                            />
                        </YStack>

                        {/* Информация */}
                        <YStack flex={1} space="$2">
                            <Text 
                                fontSize={isMobile ? "$5" : "$6"} 
                                fontWeight="800" 
                                color="#1C1C1E"
                            >
                                {profileData.name}
                            </Text>
                            <Text 
                                fontSize={isMobile ? "$3" : "$4"} 
                                color="#6B7280"
                            >
                                {profileData.email}
                            </Text>
                            <Text 
                                fontSize={isMobile ? "$2" : "$3"} 
                                color="#6B7280"
                            >
                                Участник с {profileData.joinDate}
                            </Text>
                        </YStack>

                        {/* Кнопка редактирования */}
                        <Button
                            size={isMobile ? "$3" : "$4"}
                            backgroundColor="transparent"
                            borderWidth={1}
                            borderColor="#007AFF"
                            borderRadius="$4"
                            pressStyle={{ scale: 0.96 }}
                        >
                            <Ionicons name="create-outline" size={isMobile ? 16 : 20} color="#007AFF" />
                        </Button>
                    </XStack>
                </Card>

                {/* 📊 Быстрая статистика */}
                <XStack space={isMobile ? "$2" : "$3"} justifyContent="space-between">
                    <Card
                        flex={1}
                        backgroundColor="#fff"
                        borderRadius="$5"
                        padding={isMobile ? "$3" : "$4"}
                        bordered
                        borderColor="$gray4"
                        alignItems="center"
                    >
                        <Text fontSize={isMobile ? "$6" : "$7"} fontWeight="900" color="#007AFF">
                            {profileData.savedMedicines}
                        </Text>
                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" textAlign="center">
                            Избранных
                        </Text>
                    </Card>

                    <Card
                        flex={1}
                        backgroundColor="#fff"
                        borderRadius="$5"
                        padding={isMobile ? "$3" : "$4"}
                        bordered
                        borderColor="$gray4"
                        alignItems="center"
                    >
                        <Text fontSize={isMobile ? "$6" : "$7"} fontWeight="900" color="#34C759">
                            {profileData.searchHistory}
                        </Text>
                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" textAlign="center">
                            Поисков
                        </Text>
                    </Card>

                    <Card
                        flex={1}
                        backgroundColor="#fff"
                        borderRadius="$5"
                        padding={isMobile ? "$3" : "$4"}
                        bordered
                        borderColor="$gray4"
                        alignItems="center"
                    >
                        <Text fontSize={isMobile ? "$6" : "$7"} fontWeight="900" color="#FF9500">
                            {profileData.consultations}
                        </Text>
                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280" textAlign="center">
                            Врачей
                        </Text>
                    </Card>
                </XStack>

                {/* 📋 Меню настроек */}
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

                                        <Ionicons 
                                            name="chevron-forward" 
                                            size={isMobile ? 16 : 20} 
                                            color="#C7C7CC" 
                                        />
                                    </XStack>
                                </Button>
                                {index < menuItems.length - 1 && (
                                    <Separator marginVertical="$1" />
                                )}
                            </YStack>
                        ))}
                    </YStack>
                </Card>

                {/* 🚪 Выход */}
                <Button
                    backgroundColor="transparent"
                    borderWidth={1}
                    borderColor="#FF3B30"
                    borderRadius="$5"
                    padding={isMobile ? "$3" : "$4"}
                    pressStyle={{ scale: 0.98 }}
                >
                    <XStack alignItems="center" space="$2">
                        <Ionicons name="log-out-outline" size={isMobile ? 18 : 20} color="#FF3B30" />
                        <Text fontSize={isMobile ? "$3" : "$4"} color="#FF3B30" fontWeight="600">
                            Выйти из аккаунта
                        </Text>
                    </XStack>
                </Button>
            </YStack>
        </ScrollView>
    )
}