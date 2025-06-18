import { Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui'
import TabHeader from '../../components/ui/TabHeader'
import { setCountry } from '../../redux/medicinesSlice'
import { RootState } from '../../redux/store'

const countries = [
    { id: 'ru', name: 'Россия', flag: '🇷🇺' },
    { id: 'kz', name: 'Казахстан', flag: '🇰🇿' },
    { id: 'by', name: 'Беларусь', flag: '🇧🇾' },
]

export default function SearchPage() {
    const { width: screenWidth } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    const dispatch = useDispatch()
    const selectedCountry = useSelector((state: RootState) => state.medicines.selectedCountry)

    const renderBasicSearch = () => (
        <YStack space="$4">
            <TabHeader 
                icon="search"
                title="Поиск аналогов лекарств"
                subtitle="Сравнивайте препараты между странами и экономьте на покупках"
                accentColor="#007AFF"
                stats={[
                    {
                        value: "50,000+",
                        label: isMobile ? "Пользователей" : "Довольных пользователей",
                        color: "#007AFF"
                    },
                    {
                        value: "2,450₽",
                        label: isMobile ? "Экономия" : "Средняя экономия",
                        color: "#34C759"
                    },
                    {
                        value: "3 страны",
                        label: isMobile ? "Сравнение" : "Для сравнения цен",
                        color: "#FF9500"
                    }
                ]}
            />

            {/* 🏷️ Популярные теги */}
            <YStack space="$3">
                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                    Популярные запросы
                </Text>
                <XStack flexWrap="wrap" gap="$2">
                    {[
                        'Антибиотики', 'Витамины', 'Обезболивающие', 
                        'Противовирусные', 'Успокоительные', 'От аллергии'
                    ].map((tag) => (
                        <Button
                            key={tag}
                            size="$3"
                            backgroundColor="$gray2"
                            pressStyle={{ scale: 0.96 }}
                        >
                            <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E">
                                {tag}
                            </Text>
                        </Button>
                    ))}
                </XStack>
            </YStack>

            {/* 🌍 Выбор страны */}
            <YStack space="$3">
                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                    Выберите страну для поиска
                </Text>
                <XStack space="$2">
                    {countries.map((country) => (
                        <Button
                            key={country.id}
                            flex={1}
                            backgroundColor={selectedCountry === country.id ? '#007AFF' : '$gray2'}
                            pressStyle={{ scale: 0.96 }}
                            onPress={() => dispatch(setCountry(country.id))}
                        >
                            <YStack space="$1" alignItems="center">
                                <Text fontSize="$6">{country.flag}</Text>
                                <Text 
                                    fontSize={isMobile ? "$2" : "$3"} 
                                    color={selectedCountry === country.id ? '#fff' : '#1C1C1E'}
                                >
                                    {country.name}
                                </Text>
                            </YStack>
                        </Button>
                    ))}
                </XStack>
            </YStack>
        </YStack>
    )

    const renderProSearch = () => (
        <YStack space="$4">
            <TabHeader 
                icon="medical"
                title="Pro поиск для врачей"
                subtitle="Профессиональный поиск по клиническим критериям"
                accentColor="#FF9500"
                stats={[
                    {
                        value: "15,000+",
                        label: "Препаратов в базе",
                        color: "#FF9500"
                    },
                    {
                        value: "98%",
                        label: "Точность данных",
                        color: "#34C759"
                    },
                    {
                        value: "24/7",
                        label: "Доступность ИИ",
                        color: "#007AFF"
                    }
                ]}
            />

            {/* 🔬 Профессиональные поля поиска */}
            <YStack space="$3">
                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                    Профессиональные критерии
                </Text>
                <XStack flexWrap="wrap" gap="$2">
                    {[
                        'МНН', 'АТХ', 'Фармгруппа', 
                        'Производитель', 'Форма выпуска', 'Дозировка'
                    ].map((criteria) => (
                        <Button
                            key={criteria}
                            size="$3"
                            backgroundColor="$gray2"
                            pressStyle={{ scale: 0.96 }}
                        >
                            <Text fontSize={isMobile ? "$2" : "$3"} color="#1C1C1E">
                                {criteria}
                            </Text>
                        </Button>
                    ))}
                </XStack>
            </YStack>
        </YStack>
    )

    return (
        <ScrollView backgroundColor="#f8f9fa">
            <YStack px={isMobile ? "$3" : "$4"} py="$4" space="$6">
                {renderBasicSearch()}
                {renderProSearch()}
            </YStack>
        </ScrollView>
    )
}