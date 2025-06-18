import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, Modal, Platform } from 'react-native'
import {
    Button,
    Card,
    Input,
    Paragraph,
    ScrollView,
    Spinner,
    Text,
    XStack,
    YStack,
} from 'tamagui'

interface Message {
    id: string
    text: string
    isUser: boolean
    timestamp: Date
    isPro?: boolean
}

interface Props {
    visible: boolean
    onClose: () => void
    proMode?: boolean
}

export default function AIChatModal({ visible, onClose, proMode = false }: Props) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: proMode 
                ? 'Здравствуйте, доктор! Я ИИ-консультант для медицинских работников. Могу помочь с анализом лекарственных взаимодействий, побочных эффектов, дозировками и клиническими рекомендациями. Какой вопрос вас интересует?'
                : 'Привет! Я ИИ-помощник по лекарствам. Могу помочь найти аналоги, объяснить действие препаратов или ответить на вопросы о здоровье. О чём хотите узнать?',
            isUser: false,
            timestamp: new Date(),
            isPro: proMode,
        },
    ])
    const [inputText, setInputText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollViewRef = useRef<any>(null)
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
    const isMobile = screenWidth < 768

    const modalWidth = isMobile ? screenWidth - 32 : 400
    const modalHeight = isMobile ? screenHeight * 0.8 : 500

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
    }, [messages])

    const sendMessage = async () => {
        if (!inputText.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMessage])
        setInputText('')
        setIsTyping(true)

        // Имитация ответа ИИ с учетом Pro режима
        setTimeout(() => {
            const basicResponses = [
                'Отличный вопрос! Рекомендую проконсультироваться с врачом перед приёмом любых препаратов.',
                'По данному лекарству могу сказать, что оно относится к группе анальгетиков. Важно соблюдать дозировку.',
                'Аналоги этого препарата доступны в выбранной стране. Проверьте список выше.',
                'Это лекарство имеет хорошие отзывы, но у него есть противопоказания. Обязательно читайте инструкцию.',
            ]

            const proResponses = [
                '⚠️ Клинические данные: Препарат метаболизируется CYP2D6. При совместном применении с ингибиторами этого фермента возможно усиление эффекта. Рекомендуется мониторинг концентрации в плазме.',
                '📊 Фармакокинетика: T½ = 6-8 часов, Cmax достигается через 1-2 часа. При нарушении функции почек требуется коррекция дозы согласно клиренсу креатинина.',
                '🧬 Механизм действия: Селективный ингибитор ЦОГ-2. Противопоказан при тяжелой сердечной недостаточности (класс III-IV по NYHA). Возможно увеличение риска тромбоэмболических осложнений.',
                '💊 Дозирование: Начальная доза 5 мг/кг/сутки, разделенная на 2-3 приема. Максимальная суточная доза не должна превышать 40 мг/кг. Требуется контроль функции печени каждые 2 недели в первый месяц терапии.',
                '📋 Лекарственные взаимодействия: Усиливает действие варфарина (увеличение МНО), снижает эффективность тиазидных диуретиков, повышает концентрацию дигоксина. Необходим контроль соответствующих показателей.',
            ]

            const responses = proMode ? proResponses : basicResponses
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responses[Math.floor(Math.random() * responses.length)],
                isUser: false,
                timestamp: new Date(),
                isPro: proMode,
            }

            setMessages(prev => [...prev, aiMessage])
            setIsTyping(false)
        }, proMode ? 2000 : 1500) // Pro режим думает дольше
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <YStack flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end" alignItems="flex-end" p="$4">
                <Card
                    width={modalWidth}
                    height={modalHeight}
                    backgroundColor="#fff"
                    borderRadius="$6"
                    overflow="hidden"
                    borderWidth={1}
                    borderColor={proMode ? "rgba(255, 149, 0, 0.3)" : "$gray6"}
                    shadowColor="$shadowColor"
                    shadowRadius={20}
                    shadowOpacity={0.3}
                >
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        {/* Заголовок */}
                        <XStack
                            backgroundColor={proMode ? "#FF9500" : "#007AFF"}
                            padding="$4"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <XStack alignItems="center" space="$2">
                                <YStack
                                    width={32}
                                    height={32}
                                    backgroundColor="rgba(255,255,255,0.2)"
                                    borderRadius="$10"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Ionicons name={proMode ? "medical" : "medical"} size={18} color="#fff" />
                                </YStack>
                                <YStack>
                                    <Text color="#fff" fontWeight="600" fontSize="$4">
                                        {proMode ? 'ИИ Медицинский консультант Pro' : 'ИИ Медицинский помощник'}
                                    </Text>
                                    <Text color="rgba(255,255,255,0.8)" fontSize="$2">
                                        {proMode ? 'Для медицинских работников' : 'Онлайн'}
                                    </Text>
                                </YStack>
                            </XStack>
                            <Button
                                chromeless
                                onPress={onClose}
                                width={32}
                                height={32}
                                borderRadius="$10"
                                backgroundColor="rgba(255,255,255,0.2)"
                            >
                                <Ionicons name="close" size={18} color="#fff" />
                            </Button>
                        </XStack>

                        {/* Сообщения */}
                        <ScrollView 
                            ref={scrollViewRef}
                            flex={1} 
                            padding="$3" 
                            backgroundColor={proMode ? "#f8f9fa" : "#f8f9fa"}
                            showsVerticalScrollIndicator={false}
                        >
                            <YStack space="$3">
                                {messages.map((message) => (
                                    <XStack
                                        key={message.id}
                                        justifyContent={message.isUser ? 'flex-end' : 'flex-start'}
                                    >
                                        <YStack
                                            maxWidth="80%"
                                            backgroundColor={
                                                message.isUser 
                                                    ? (proMode ? '#FF9500' : '#007AFF')
                                                    : '#fff'
                                            }
                                            padding="$3"
                                            borderRadius="$4"
                                            borderWidth={message.isUser ? 0 : 1}
                                            borderColor="$gray4"
                                        >
                                            <Paragraph
                                                color={message.isUser ? '#fff' : '#333'}
                                                fontSize="$3"
                                                lineHeight="$1"
                                            >
                                                {message.text}
                                            </Paragraph>
                                            <Text
                                                fontSize="$1"
                                                color={message.isUser ? 'rgba(255,255,255,0.7)' : '$gray9'}
                                                alignSelf="flex-end"
                                                mt="$1"
                                            >
                                                {formatTime(message.timestamp)}
                                            </Text>
                                        </YStack>
                                    </XStack>
                                ))}

                                {/* Индикатор печатания */}
                                {isTyping && (
                                    <XStack justifyContent="flex-start">
                                        <YStack
                                            backgroundColor="#fff"
                                            padding="$3"
                                            borderRadius="$4"
                                            borderWidth={1}
                                            borderColor="$gray4"
                                        >
                                            <XStack alignItems="center" space="$2">
                                                <Spinner size="small" color={proMode ? "#FF9500" : "$gray9"} />
                                                <Text color="$gray9" fontSize="$3">
                                                    {proMode ? 'Анализирую клинические данные...' : 'ИИ печатает...'}
                                                </Text>
                                            </XStack>
                                        </YStack>
                                    </XStack>
                                )}
                            </YStack>
                        </ScrollView>

                        {/* Поле ввода */}
                        <XStack
                            padding="$3"
                            backgroundColor="#fff"
                            borderTopWidth={1}
                            borderTopColor="$gray4"
                            space="$2"
                            alignItems="flex-end"
                        >
                            <Input
                                flex={1}
                                placeholder={proMode ? "Введите медицинский вопрос..." : "Напишите ваш вопрос..."}
                                value={inputText}
                                onChangeText={setInputText}
                                onSubmitEditing={sendMessage}
                                multiline
                                numberOfLines={3}
                                maxLength={500}
                                fontSize="$3"
                                borderColor="$gray6"
                                borderRadius="$3"
                                backgroundColor="#f8f9fa"
                            />
                            <Button
                                size="$3"
                                backgroundColor={proMode ? "#FF9500" : "#007AFF"}
                                borderRadius="$3"
                                onPress={sendMessage}
                                disabled={!inputText.trim() || isTyping}
                                opacity={(!inputText.trim() || isTyping) ? 0.5 : 1}
                                width={44}
                                height={44}
                            >
                                <Ionicons name="send" size={18} color="#fff" />
                            </Button>
                        </XStack>
                    </KeyboardAvoidingView>
                </Card>
            </YStack>
        </Modal>
    )
} 