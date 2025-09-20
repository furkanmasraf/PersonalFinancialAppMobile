import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, TrendingDown, Calendar, Minus } from 'lucide-react-native';

export default function ExpensesScreen() {
  // Mock expenses data
  const expenses = [
    { id: 1, amount: 3500, category: 'Kira', date: '2024-01-01', description: 'Aylık kira ödemesi' },
    { id: 2, amount: 800, category: 'Market', date: '2024-01-15', description: 'Haftalık alışveriş' },
    { id: 3, amount: 250, category: 'Ulaşım', date: '2024-01-20', description: 'Aylık ulaşım kartı' },
    { id: 4, amount: 150, category: 'Eğlence', date: '2024-01-22', description: 'Sinema ve yemek' },
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categories = [
    { name: 'Kira', amount: 3500, color: '#EF4444', percentage: 73 },
    { name: 'Market', amount: 800, color: '#F97316', percentage: 17 },
    { name: 'Ulaşım', amount: 250, color: '#EAB308', percentage: 5 },
    { name: 'Eğlence', amount: 150, color: '#8B5CF6', percentage: 5 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Giderlerim</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus color="#FFFFFF" size={20} />
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <TrendingDown color="#EF4444" size={24} />
            <Text style={styles.summaryTitle}>Bu Ay Toplam Gider</Text>
          </View>
          <Text style={styles.summaryAmount}>₺{totalExpenses.toLocaleString('tr-TR')}</Text>
          <Text style={styles.summarySubtext}>Geçen aya göre %8 azalış</Text>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Kategori Dağılımı</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <View style={styles.categoryAmounts}>
                  <Text style={styles.categoryAmount}>₺{category.amount.toLocaleString('tr-TR')}</Text>
                  <Text style={styles.categoryPercentage}>%{category.percentage}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Son Giderler</Text>
          {expenses.map((expense) => (
            <View key={expense.id} style={styles.expenseItem}>
              <View style={styles.expenseIcon}>
                <Minus color="#EF4444" size={20} />
              </View>
              <View style={styles.expenseDetails}>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
                <Text style={styles.expenseDescription}>{expense.description}</Text>
                <View style={styles.expenseDate}>
                  <Calendar color="#6B7280" size={14} />
                  <Text style={styles.expenseDateText}>{expense.date}</Text>
                </View>
              </View>
              <Text style={styles.expenseAmount}>-₺{expense.amount.toLocaleString('tr-TR')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.budgetSection}>
          <Text style={styles.sectionTitle}>Aylık Bütçe</Text>
          <View style={styles.budgetCard}>
            <View style={styles.budgetProgress}>
              <View style={styles.budgetBar}>
                <View style={[styles.budgetFill, { width: '68%' }]} />
              </View>
              <Text style={styles.budgetText}>₺{totalExpenses.toLocaleString('tr-TR')} / ₺7.000</Text>
            </View>
            <Text style={styles.budgetRemaining}>Kalan: ₺{(7000 - totalExpenses).toLocaleString('tr-TR')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#EF4444',
    marginBottom: 4,
  },
  summarySubtext: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  categoriesSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  categoryAmounts: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  categoryPercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  recentSection: {
    padding: 20,
    paddingTop: 0,
  },
  expenseItem: {
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
  expenseIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FEE2E2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  expenseDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  expenseDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseDateText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EF4444',
  },
  budgetSection: {
    padding: 20,
    paddingTop: 0,
  },
  budgetCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetProgress: {
    marginBottom: 8,
  },
  budgetBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 8,
  },
  budgetFill: {
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  budgetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  budgetRemaining: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
    textAlign: 'center',
  },
});