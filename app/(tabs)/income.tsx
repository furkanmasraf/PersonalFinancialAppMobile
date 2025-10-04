import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react-native';

interface Income {
  id: number;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export default function IncomeScreen() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Backend API URL (kendi .NET API adresinle değiştir)
  const API_URL = "https://10.0.2.2:5001/api/income"; // Android Emulator için
  // const API_URL = "http://localhost:5000/api/income"; // iOS Simulator için

  // API'den gelirleri çek
  const fetchIncomes = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setIncomes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  };

  // Yeni gelir ekle (POST)
  const addIncome = () => {
    const newIncome = {
      amount: 1500,
      category: "Freelance",
      date: new Date().toISOString(),
      description: "Mobil uygulama geliştirme",
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIncome),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gelir eklenemedi!");
        return res.json();
      })
      .then((data) => {
        Alert.alert("Başarılı ✅", "Yeni gelir eklendi!");
        setIncomes((prev) => [...prev, data]); // Ekrana yeni veriyi ekle
      })
      .catch((err) => {
        console.error("POST Error:", err);
        Alert.alert("Hata ❌", "Gelir eklenirken bir sorun oluştu.");
      });
  };

  // Sayfa açıldığında gelirleri yükle
  useEffect(() => {
    fetchIncomes();
  }, []);

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  // Kategorileri hesapla (dinamik)
  const categories = Object.values(
    incomes.reduce((acc: any, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { name: item.category, amount: 0, color: randomColor(item.category) };
      }
      acc[item.category].amount += item.amount;
      return acc;
    }, {})
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#10B981" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Gelirlerim</Text>
          <TouchableOpacity style={styles.addButton} onPress={addIncome}>
            <Plus color="#FFFFFF" size={20} />
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <TrendingUp color="#10B981" size={24} />
            <Text style={styles.summaryTitle}>Bu Ay Toplam Gelir</Text>
          </View>
          <Text style={styles.summaryAmount}>₺{totalIncome.toLocaleString('tr-TR')}</Text>
          <Text style={styles.summarySubtext}>Geçen aya göre %15 artış</Text>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category: any, index: number) => (
              <View key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIndicator, { backgroundColor: category.color }]} />
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryAmount}>₺{category.amount.toLocaleString('tr-TR')}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Son Gelirler</Text>
          {incomes.map((income) => (
            <View key={income.id} style={styles.incomeItem}>
              <View style={styles.incomeIcon}>
                <DollarSign color="#10B981" size={20} />
              </View>
              <View style={styles.incomeDetails}>
                <Text style={styles.incomeCategory}>{income.category}</Text>
                <Text style={styles.incomeDescription}>{income.description}</Text>
                <View style={styles.incomeDate}>
                  <Calendar color="#6B7280" size={14} />
                  <Text style={styles.incomeDateText}>
                    {new Date(income.date).toLocaleDateString('tr-TR')}
                  </Text>
                </View>
              </View>
              <Text style={styles.incomeAmount}>+₺{income.amount.toLocaleString('tr-TR')}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🔹 Basit kategori-renk eşleştirme
function randomColor(category: string) {
  const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#111827' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addButtonText: { color: '#FFFFFF', fontWeight: '600', marginLeft: 6 },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  summaryTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginLeft: 8 },
  summaryAmount: { fontSize: 36, fontWeight: '800', color: '#10B981', marginBottom: 4 },
  summarySubtext: { fontSize: 14, color: '#10B981', fontWeight: '500' },
  categoriesSection: { padding: 20, paddingTop: 0 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 12 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIndicator: { width: 4, height: 20, borderRadius: 2, marginBottom: 8 },
  categoryName: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 },
  categoryAmount: { fontSize: 16, fontWeight: '700', color: '#111827' },
  recentSection: { padding: 20, paddingTop: 0 },
  incomeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  incomeIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  incomeDetails: { flex: 1 },
  incomeCategory: { fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 2 },
  incomeDescription: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  incomeDate: { flexDirection: 'row', alignItems: 'center' },
  incomeDateText: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  incomeAmount: { fontSize: 18, fontWeight: '700', color: '#10B981' },
});
