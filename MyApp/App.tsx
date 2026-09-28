import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

type WeatherData = {
  temperature: number;
  humidity: number;
  windspeed: number;
  weathercode: number;
};

const getWeatherDescription = (code: number) => {
  if (code === 0) return 'Trời quang ☀️';
  if (code === 1 || code === 2) return 'Có mây nhẹ 🌤️';
  if (code === 3) return 'Nhiều mây ☁️';
  if (code >= 45 && code <= 48) return 'Sương mù 🌫️';
  if (code >= 51 && code <= 57) return 'Mưa phùn 🌦️';
  if (code >= 61 && code <= 67) return 'Trời mưa 🌧️';
  if (code >= 71 && code <= 77) return 'Tuyết ❄️';
  if (code >= 80 && code <= 82) return 'Mưa rào 🌦️';
  if (code >= 95) return 'Dông ⛈️';

  return 'Không xác định';
};

export default function App() {
  const [city, setCity] = useState('Hà Nội');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên thành phố');
      return;
    }

    try {
      setLoading(true);

      // 1. Tìm tọa độ thành phố
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=vi&format=json`
      );

      const locationData = await locationResponse.json();

      if (!locationData.results || locationData.results.length === 0) {
        Alert.alert('Không tìm thấy', 'Không tìm thấy thành phố này');
        setLoading(false);
        return;
      }

      const location = locationData.results[0];

      // 2. Lấy thời tiết
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      );

      const weatherData = await weatherResponse.json();

      setLocationName(
        `${location.name}${location.country ? `, ${location.country}` : ''}`
      );

      setWeather({
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windspeed: weatherData.current.wind_speed_10m,
        weathercode: weatherData.current.weather_code,
      });
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Lỗi',
        'Không thể lấy dữ liệu thời tiết. Hãy kiểm tra kết nối mạng.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌤️ Thời tiết</Text>

      <Text style={styles.subtitle}>
        Tra cứu thời tiết hiện tại
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập thành phố..."
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={getWeather}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={getWeather}
        >
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>
            Đang lấy dữ liệu...
          </Text>
        </View>
      )}

      {!loading && weather && (
        <View style={styles.weatherCard}>
          <Text style={styles.location}>📍 {locationName}</Text>

          <Text style={styles.weatherIcon}>
            {weather.weathercode === 0
              ? '☀️'
              : weather.weathercode >= 61
              ? '🌧️'
              : weather.weathercode >= 95
              ? '⛈️'
              : '☁️'}
          </Text>

          <Text style={styles.temperature}>
            {Math.round(weather.temperature)}°C
          </Text>

          <Text style={styles.description}>
            {getWeatherDescription(weather.weathercode)}
          </Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>💧</Text>
              <Text style={styles.infoTitle}>Độ ẩm</Text>
              <Text style={styles.infoValue}>
                {weather.humidity}%
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>💨</Text>
              <Text style={styles.infoTitle}>Gió</Text>
              <Text style={styles.infoValue}>
                {weather.windspeed} km/h
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={getWeather}
          >
            <Text style={styles.refreshText}>
              🔄 Cập nhật thời tiết
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !weather && (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🌍</Text>
          <Text style={styles.emptyText}>
            Nhập thành phố để xem thời tiết
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF4FF',
    padding: 20,
    alignItems: 'center',
  },

  title: {
    marginTop: 40,
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1D3557',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#667085',
    marginBottom: 25,
  },

  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 25,
  },

  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },

  searchButton: {
    width: 70,
    height: 52,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loading: {
    alignItems: 'center',
    marginTop: 40,
  },

  loadingText: {
    marginTop: 12,
    color: '#667085',
    fontSize: 16,
  },

  weatherCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  location: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D3557',
    textAlign: 'center',
  },

  weatherIcon: {
    fontSize: 80,
    marginTop: 15,
  },

  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#007AFF',
  },

  description: {
    fontSize: 20,
    color: '#475467',
    marginTop: 5,
    marginBottom: 25,
  },

  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoBox: {
    width: '48%',
    backgroundColor: '#F2F8FF',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 28,
  },

  infoTitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#667085',
  },

  infoValue: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
  },

  refreshButton: {
    marginTop: 25,
    width: '100%',
    height: 50,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  refreshText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  empty: {
    marginTop: 70,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 70,
  },

  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#667085',
    textAlign: 'center',
  },
});