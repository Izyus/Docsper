# Техническое задание для бэкенд разработчика агрегатора лекарств Docsper

## Описание проекта

**Docsper** - кроссрегиональный агрегатор лекарств с мобильным приложением на React Native. Приложение позволяет искать, сравнивать цены и находить аналоги лекарств между разными странами (Россия, США, Израиль).

## Текущее состояние

✅ **Готово:**
- Мобильное приложение на React Native/Expo
- Redux store с полной типизацией
- UI/UX для всех основных экранов
- Структура данных и интерфейсы

🔄 **Нужно разработать:**
- Backend API вместо mock данных
- Интеграция с официальными источниками
- Система парсинга аптек и магазинов

## Архитектура данных

### 1. Интеграция с официальными API

#### Источники данных по странам:
- **🇺🇸 FDA API** - официальная база лекарств США
- **🇷🇺 РЛС API** - Регистр лекарственных средств РФ  
- **🇮🇱 Israeli Ministry of Health** - база препаратов Израиля

#### Единая схема данных:
```typescript
interface Medicine {
  // Основная информация
  id: string
  name: string                    // Торговое название
  inn: string                     // МНН (международное наименование)
  atcCode: string                 // АТХ код
  activeIngredient: string        // Активное вещество
  
  // Физические характеристики
  dosage: string                  // Дозировка (500мг, 10мл)
  form: string                    // Форма (таблетки, капсулы, сироп)
  manufacturer: string            // Производитель
  
  // Региональная информация
  country: string                 // Код страны (RU, US, IL)
  registrationNumber: string      // Рег. номер в стране
  prescription: boolean           // Рецептурность
  
  // Медицинская информация
  indications: string[]           // Показания к применению
  contraindications: string[]     // Противопоказания
  sideEffects: string[]          // Побочные эффекты
  drugInteractions: string[]      // Лекарственные взаимодействия
  
  // Коммерческая информация
  prices: Price[]                 // Цены по аптекам
  availability: Availability[]    // Наличие по регионам
  
  // Метаданные
  createdAt: Date
  updatedAt: Date
  lastPriceUpdate: Date
}
```

### 2. Система маппинга препаратов

#### Ключи для сопоставления:
```json
{
  "mapping_keys": {
    "primary": "inn",                    // МНН - основной ключ
    "secondary": "atc_code",             // АТХ код
    "tertiary": "active_ingredient",     // Активное вещество
    "quaternary": "brand_name",          // Торговое название
    "technical": {
      "barcode": "ean_code",             // Штрих-код
      "ndc": "national_drug_code",       // NDC для США
      "registration_id": "reg_number"     // Рег. номер
    }
  }
}
```

## Парсинг интернет-магазинов и аптек

### 3. Источники цен по странам

#### 🇷🇺 Россия:
- **Федеральные сети:** Apteka.ru, 36.6, Zdravcity, АСНА
- **Региональные:** Фармленд, Ригла, Планета Здоровья
- **Онлайн:** Pharmacy.ru, Здравсити, АптекаМос

#### 🇺🇸 США:
- **Крупные сети:** CVS, Walgreens, Rite Aid
- **Онлайн:** GoodRx, Amazon Pharmacy, Walmart Pharmacy
- **Дискаунтеры:** Costco Pharmacy, Sam's Club

#### 🇮🇱 Израиль:
- **Основные сети:** Super-Pharm, Newpharm
- **Локальные:** Be Pharmacy, местные аптеки

### 4. Технология парсинга

#### Стратегия сбора данных:
```python
# Пример структуры парсера
class PharmacyParser:
    def __init__(self, pharmacy_config):
        self.rate_limit = pharmacy_config.requests_per_minute
        self.retry_policy = pharmacy_config.retry_attempts
        self.proxy_rotation = True
    
    def search_medicine(self, search_keys):
        # Поиск по МНН, названию, дозировке
        pass
    
    def extract_price_availability(self, product_page):
        # Извлечение цены и наличия
        pass
    
    def validate_data(self, parsed_data):
        # Валидация полученных данных
        pass
```

#### Частота обновления:
- **Цены:** каждые 30 минут
- **Наличие:** каждые 15 минут  
- **Новые препараты:** ежедневно
- **Официальные данные (FDA/РЛС):** еженедельно

## API Endpoints

### 5. Основные эндпоинты

#### Поиск и каталог:
```
GET  /api/medicines/search
     ?q={query}
     &country={country}
     &sort={price|rating|name}
     &filters={prescription,available,price_range}

GET  /api/medicines/{id}
GET  /api/medicines/{id}/analogs
GET  /api/medicines/compare?ids={id1,id2,id3}
```

#### Цены и наличие:
```
GET  /api/medicines/{id}/prices
     ?country={country}
     &city={city}
     &radius={km}

GET  /api/medicines/{id}/availability
POST /api/medicines/{id}/track-price
GET  /api/medicines/{id}/price-history
```

#### Геолокация:
```
GET  /api/pharmacies/nearby
     ?lat={latitude}
     &lng={longitude}
     &radius={km}
     &has_medicine={medicine_id}
```

#### Пользователи:
```
POST /api/auth/register
POST /api/auth/login
GET  /api/user/profile
GET  /api/user/favorites
POST /api/user/favorites/{medicine_id}
GET  /api/user/price-alerts
```

## Data Pipeline

### 6. Архитектура обработки данных

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ FDA/РЛС API │───▶│ Data         │───▶│ Master      │
│             │    │ Normalizer   │    │ Database    │
└─────────────┘    └──────────────┘    └─────────────┘
                           │                   │
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ Pharmacy    │───▶│ Price        │───▶│ Real-time   │
│ Scrapers    │    │ Matcher      │    │ Inventory   │
└─────────────┘    └──────────────┘    └─────────────┘
                           │                   │
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ Mobile App  │◄───│ Cache Layer  │◄───│ Aggregated  │
│ API         │    │ (Redis)      │    │ Data        │
└─────────────┘    └──────────────┘    └─────────────┘
```

### 7. Background Jobs (Cron Tasks)

#### Ежедневные задачи:
- Синхронизация с FDA/РЛС API
- Обновление каталога препаратов
- Очистка устаревших данных

#### Частые задачи:
- Парсинг цен аптек (каждые 30 мин)
- Проверка наличия (каждые 15 мин)
- Отправка price alerts (каждые 5 мин)

#### Еженедельные:
- Полная реиндексация поиска
- Аналитические отчеты
- Резервное копирование

## Технические требования

### 8. Стек технологий (рекомендации)

#### Backend:
- **Framework:** Node.js (Express/Fastify) или Python (FastAPI/Django)
- **Database:** PostgreSQL + Redis (кэш)
- **Search:** Elasticsearch или PostgreSQL Full-Text Search
- **Queue:** Redis Bull/BullMQ или Celery
- **Monitoring:** Prometheus + Grafana

#### Инфраструктура:
- **Deploy:** Docker + Docker Compose
- **Proxy:** Nginx
- **SSL:** Let's Encrypt
- **CDN:** CloudFlare (для изображений)

### 9. Производительность и масштабирование

#### Требования к производительности:
- **API Response Time:** < 500ms для поиска
- **Availability:** 99.9% uptime
- **Concurrent Users:** до 10,000 одновременно
- **Database:** поддержка 1M+ препаратов

#### Кэширование:
```redis
# Структура кэша
medicines:search:{query_hash} → search_results (TTL: 10min)
medicines:prices:{id} → price_data (TTL: 30min)
medicines:availability:{id} → stock_data (TTL: 15min)
pharmacies:nearby:{lat_lng_hash} → pharmacy_list (TTL: 1hour)
```

## Безопасность и соответствие

### 10. Требования безопасности

#### Авторизация:
- JWT токены с refresh token rotation
- Rate limiting по IP и пользователю
- API ключи для внешних интеграций

#### Данные:
- Шифрование персональных данных
- GDPR compliance для европейских пользователей
- Логирование всех операций

#### Парсинг:
- Соблюдение robots.txt
- Reasonable rate limiting
- User-Agent rotation
- Обработка блокировок

## Мониторинг и аналитика

### 11. Метрики для отслеживания

#### Технические метрики:
- Успешность парсинга по источникам
- Актуальность данных о ценах
- Performance API endpoints
- Database connection pool

#### Бизнес метрики:
- Покрытие препаратов по странам
- Популярные поисковые запросы
- Конверсия в переходы в аптеки
- Точность поиска аналогов

## MVP Roadmap

### 12. Этапы разработки

#### Фаза 1 (4-6 недель) - MVP Core:
- ✅ Базовая структура API
- ✅ Интеграция с FDA/РЛС
- ✅ Простой поиск и каталог
- ✅ Парсинг 2-3 основных аптек по стране

#### Фаза 2 (3-4 недели) - Enhanced Features:
- ✅ Система пользователей
- ✅ Избранное и price alerts
- ✅ Расширенный поиск и фильтры
- ✅ Добавление большего количества источников

#### Фаза 3 (2-3 недели) - Advanced:
- ✅ Геолокация и поиск аптек
- ✅ QR-код интеграция
- ✅ Аналитика и админка
- ✅ Оптимизация производительности

## Контактная информация

Для вопросов по техническому заданию:
- **Frontend Team:** доступен код React Native приложения
- **Data Samples:** примеры структур данных в Redux store
- **API Design:** текущие mock endpoints в коде

---

**Цель:** Создать надежную, масштабируемую систему для агрегации данных о лекарствах с актуальными ценами и наличием в реальном времени. 