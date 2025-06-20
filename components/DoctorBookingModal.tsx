import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import {
    Button,
    Card,
    Input,
    Text,
    XStack,
    YStack
} from 'tamagui'

interface Props {
    visible: boolean
    onClose: () => void
    medicineName?: string
}

const doctors = [
    {
        id: '1',
        name: 'Др. Анна Петрова',
        specialization: 'Терапевт',
        experience: '15 лет',
        rating: 4.8,
        reviews: 127,
        price: '2000₽',
        available: true,
        avatar: '👩‍⚕️'
    },
    {
        id: '2',
        name: 'Др. Михаил Сидоров',
        specialization: 'Кардиолог',
        experience: '12 лет',
        rating: 4.9,
        reviews: 89,
        price: '3000₽',
        available: true,
        avatar: '👨‍⚕️'
    },
    {
        id: '3',
        name: 'Др. Елена Козлова',
        specialization: 'Невролог',
        experience: '18 лет',
        rating: 4.7,
        reviews: 156,
        price: '2500₽',
        available: false,
        avatar: '👩‍⚕️'
    }
]

const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
]

export default function DoctorBookingModal({ visible, onClose, medicineName }: Props) {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
    const isMobile = screenWidth < 768
    
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedTime, setSelectedTime] = useState<string>('')
    const [symptoms, setSymptoms] = useState('')
    const [step, setStep] = useState<'doctor' | 'datetime' | 'symptoms' | 'confirm'>('doctor')

    const handleBook = () => {
        // Здесь будет логика записи к врачу
        alert('Запись к врачу успешно создана!')
        onClose()
        setStep('doctor')
        setSelectedDoctor(null)
        setSelectedDate('')
        setSelectedTime('')
        setSymptoms('')
    }

    if (!visible) return null

    return (
        <YStack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0,0,0,0.5)"
            justifyContent="center"
            alignItems="center"
            zIndex={1000}
        >
            <Card
                backgroundColor="#fff"
                borderRadius="$6"
                padding={isMobile ? "$4" : "$5"}
                width={isMobile ? screenWidth - 32 : 500}
                maxHeight={isMobile ? screenHeight * 0.8 : 600}
                shadowColor="$shadowColor"
                shadowRadius={20}
                shadowOpacity={0.3}
            >
                <YStack space="$4">
                    {/* Заголовок */}
                    <XStack alignItems="center" justifyContent="space-between">
                        <YStack>
                            <Text fontSize={isMobile ? "$5" : "$6"} fontWeight="800" color="#1C1C1E">
                                Запись к врачу
                            </Text>
                            {medicineName && (
                                <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280">
                                    Консультация по препарату {medicineName}
                                </Text>
                            )}
                        </YStack>
                        <Button
                            size="$3"
                            backgroundColor="transparent"
                            onPress={onClose}
                            pressStyle={{ scale: 0.9 }}
                        >
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </Button>
                    </XStack>

                    {/* Прогресс */}
                    <XStack space="$2" justifyContent="center">
                        {['doctor', 'datetime', 'symptoms', 'confirm'].map((s, index) => (
                            <YStack
                                key={s}
                                width={isMobile ? 40 : 50}
                                height={4}
                                backgroundColor={step === s ? '#007AFF' : '#E5E7EB'}
                                borderRadius="$2"
                            />
                        ))}
                    </XStack>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {step === 'doctor' && (
                            <YStack space="$4">
                                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                    Выберите врача
                                </Text>
                                
                                <YStack space="$3">
                                    {doctors.map((doctor) => (
                                        <Card
                                            key={doctor.id}
                                            backgroundColor={selectedDoctor === doctor.id ? 'rgba(0, 122, 255, 0.1)' : '#f8f9fa'}
                                            borderWidth={selectedDoctor === doctor.id ? 2 : 1}
                                            borderColor={selectedDoctor === doctor.id ? '#007AFF' : '#E5E7EB'}
                                            borderRadius="$4"
                                            padding="$3"
                                            pressStyle={{ scale: 0.98 }}
                                            onPress={() => setSelectedDoctor(doctor.id)}
                                        >
                                            <XStack space="$3" alignItems="center">
                                                <Text fontSize={isMobile ? "$4" : "$5"}>{doctor.avatar}</Text>
                                                
                                                <YStack flex={1} space="$1">
                                                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="700" color="#1C1C1E">
                                                        {doctor.name}
                                                    </Text>
                                                    <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                                        {doctor.specialization} • {doctor.experience} опыта
                                                    </Text>
                                                    <XStack space="$2" alignItems="center">
                                                        <Text fontSize="$2">⭐</Text>
                                                        <Text fontSize={isMobile ? "$2" : "$3"} fontWeight="600" color="#1C1C1E">
                                                            {doctor.rating}
                                                        </Text>
                                                        <Text fontSize={isMobile ? "$2" : "$3"} color="#6B7280">
                                                            ({doctor.reviews} отзывов)
                                                        </Text>
                                                    </XStack>
                                                </YStack>
                                                
                                                <YStack alignItems="flex-end" space="$1">
                                                    <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="800" color="#007AFF">
                                                        {doctor.price}
                                                    </Text>
                                                    <Text 
                                                        fontSize="$2" 
                                                        color={doctor.available ? '#34C759' : '#FF9500'}
                                                        fontWeight="600"
                                                    >
                                                        {doctor.available ? 'Свободен' : 'Занят'}
                                                    </Text>
                                                </YStack>
                                            </XStack>
                                        </Card>
                                    ))}
                                </YStack>
                            </YStack>
                        )}

                        {step === 'datetime' && (
                            <YStack space="$4">
                                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                    Выберите дату и время
                                </Text>
                                
                                <YStack space="$3">
                                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                        Дата консультации
                                    </Text>
                                    <Input
                                        placeholder="Выберите дату"
                                        value={selectedDate}
                                        onChangeText={setSelectedDate}
                                        backgroundColor="#f8f9fa"
                                        borderColor="#E5E7EB"
                                        borderRadius="$4"
                                    />
                                    
                                    <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                        Время консультации
                                    </Text>
                                    <XStack space="$2" flexWrap="wrap">
                                        {timeSlots.map((time) => (
                                            <Button
                                                key={time}
                                                size="$3"
                                                backgroundColor={selectedTime === time ? '#007AFF' : 'transparent'}
                                                borderWidth={1}
                                                borderColor={selectedTime === time ? '#007AFF' : '#E5E7EB'}
                                                borderRadius="$3"
                                                onPress={() => setSelectedTime(time)}
                                                pressStyle={{ scale: 0.96 }}
                                            >
                                                <Text 
                                                    fontSize={isMobile ? "$3" : "$4"}
                                                    color={selectedTime === time ? '#fff' : '#1C1C1E'}
                                                    fontWeight="600"
                                                >
                                                    {time}
                                                </Text>
                                            </Button>
                                        ))}
                                    </XStack>
                                </YStack>
                            </YStack>
                        )}

                        {step === 'symptoms' && (
                            <YStack space="$4">
                                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                    Опишите симптомы
                                </Text>
                                
                                <YStack space="$3">
                                    <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280">
                                        Расскажите о своих симптомах, чтобы врач мог лучше подготовиться к консультации
                                    </Text>
                                    <Input
                                        placeholder="Опишите ваши симптомы..."
                                        value={symptoms}
                                        onChangeText={setSymptoms}
                                        backgroundColor="#f8f9fa"
                                        borderColor="#E5E7EB"
                                        borderRadius="$4"
                                        multiline
                                        numberOfLines={4}
                                        textAlignVertical="top"
                                    />
                                </YStack>
                            </YStack>
                        )}

                        {step === 'confirm' && (
                            <YStack space="$4">
                                <Text fontSize={isMobile ? "$4" : "$5"} fontWeight="700" color="#1C1C1E">
                                    Подтверждение записи
                                </Text>
                                
                                <Card backgroundColor="#f8f9fa" borderRadius="$4" padding="$3">
                                    <YStack space="$2">
                                        <XStack justifyContent="space-between">
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280">Врач:</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                                {doctors.find(d => d.id === selectedDoctor)?.name}
                                            </Text>
                                        </XStack>
                                        <XStack justifyContent="space-between">
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280">Дата:</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                                {selectedDate}
                                            </Text>
                                        </XStack>
                                        <XStack justifyContent="space-between">
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280">Время:</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="600" color="#1C1C1E">
                                                {selectedTime}
                                            </Text>
                                        </XStack>
                                        <XStack justifyContent="space-between">
                                            <Text fontSize={isMobile ? "$3" : "$4"} color="#6B7280">Стоимость:</Text>
                                            <Text fontSize={isMobile ? "$3" : "$4"} fontWeight="700" color="#007AFF">
                                                {doctors.find(d => d.id === selectedDoctor)?.price}
                                            </Text>
                                        </XStack>
                                    </YStack>
                                </Card>
                            </YStack>
                        )}
                    </ScrollView>

                    {/* Кнопки навигации */}
                    <XStack space="$2" justifyContent="space-between">
                        {step !== 'doctor' && (
                            <Button
                                flex={1}
                                backgroundColor="transparent"
                                borderWidth={1}
                                borderColor="#E5E7EB"
                                borderRadius="$4"
                                onPress={() => {
                                    if (step === 'datetime') setStep('doctor')
                                    if (step === 'symptoms') setStep('datetime')
                                    if (step === 'confirm') setStep('symptoms')
                                }}
                            >
                                <Text color="#6B7280" fontWeight="600">Назад</Text>
                            </Button>
                        )}
                        
                        <Button
                            flex={1}
                            backgroundColor="#007AFF"
                            borderRadius="$4"
                            onPress={() => {
                                if (step === 'doctor' && selectedDoctor) setStep('datetime')
                                else if (step === 'datetime' && selectedDate && selectedTime) setStep('symptoms')
                                else if (step === 'symptoms') setStep('confirm')
                                else if (step === 'confirm') handleBook()
                            }}
                            disabled={
                                (step === 'doctor' && !selectedDoctor) ||
                                (step === 'datetime' && (!selectedDate || !selectedTime))
                            }
                        >
                            <Text color="#fff" fontWeight="600">
                                {step === 'confirm' ? 'Записаться' : 'Далее'}
                            </Text>
                        </Button>
                    </XStack>
                </YStack>
            </Card>
        </YStack>
    )
} 