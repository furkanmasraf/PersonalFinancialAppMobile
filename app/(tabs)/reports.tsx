import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, ChartPie as PieChart, TrendingUp, TrendingDown, Calendar } from 'lucide-react-native';

export default function ReportsScreen() {
  // Mock data for reports
  const monthlyData = [
    { month: 'Ocak', income: 15000, expenses: 8500, savings: 6500 },
    { month: 'Şubat', income: 14500, expenses: 9200, savings: 5300 },
    { month: 'Mart', income: 16000, expenses: 8800, savings: 7200 },
  ];

  const expenseCategories = [
    { name: 'Kira', amount: 3500, percentage: 41 },
    { name: 'Market', amount: 2400, percentage: 28 },
    { name: 'Ulaşım', amount: 800, percentage: 9 },
    { name: 'Eğlence', amount: 600, percentage: 7 },
    { name: 'Faturalar', amount: 1200, percentage: 15 },
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const savingsRate = ((currentMonth.savings / currentMonth.income) * 100).toFixed(1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Raporlar</Text>
          <Text style={styles.subtitle}>Finans analiz ve özetler</Text>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <TrendingUp color="#10B981" size={20} />
              <Text style={styles.summaryTitle}>Tasarruf Oranı</Text>
            </View>
            <Text style={styles.summaryValue}>%{savingsRate}</Text>
            <Text style={styles.summaryDescription}>Bu ay</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <BarChart3 color="#3B82F6" size={20} />
              <Text style={styles.summaryTitle}>Net Gelir</Text>
            </View>
            <Text style={styles.summaryValue}>₺{currentMonth.savings.toLocaleString('tr-TR')}</Text>
            <Text style={styles.summaryDescription}>Bu ay</Text>
          </View>
        </View>

        <View style={styles.trendsSection}>
          <Text style={styles.sectionTitle}>3 Aylık Trend</Text>
          <View style={styles.trendsCard}>
            <View style={styles.trendsHeader}>
              <Text style={styles.trendsColumnHeader}>Ay</Text>
              <Text style={styles.trendsColumnHeader}>Gelir</Text>
              <Text style={styles.trendsColumnHeader}>Gider</Text>
              <Text style={styles.trendsColumnHeader}>Tasarruf</Text>
            </View>
            {monthlyData.map((data, index) => (
              <View key={index} style={styles.trendsRow}>
                <Text style={styles.trendsMonth}>{data.month}</Text>
                <Text style={[styles.trendsValue, styles.incomeColor]}>
                  ₺{(data.income / 1000).toFixed(1)}k
                </Text>
                <Text style={[styles.trendsValue, styles.expenseColor]}>
                  ₺{(data.expenses / 1000).toFixed(1)}k
                </Text>
                <Text style={[styles.trendsValue, styles.savingsColor]}>
                  ₺{(data.savings / 1000).toFixed(1)}k
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Gider Kategorileri</Text>
          <View style={styles.categoriesCard}>
            <View style={styles.pieChartPlaceholder}>
              <PieChart color="#6B7280" size={60} />
              <Text style={styles.pieChartText}>Kategori Dağılımı</Text>
            </View>
            
            <View style={styles.categoriesLegend}>
              {expenseCategories.map((category, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={styles.legendInfo}>
                    <View style={[styles.legendDot, { backgroundColor: getColorByIndex(index) }]} />
                    <Text style={styles.legendName}>{category.name}</Text>
                  </View>
                  <View style={styles.legendValues}>
                    <Text style={styles.legendAmount}>₺{category.amount.toLocaleString('tr-TR')}</Text>
                    <Text style={styles.legendPercentage}>%{category.percentage}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>Hedefler</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalItem}>
              <Text style={styles.goalName}>Aylık Tasarruf Hedefi</Text>
              <View style={styles.goalProgress}>
                <View style={styles.goalBar}>
                  <View style={[styles.goalFill, { width: '73%' }]} />
                </View>
                <Text style={styles.goalText}>₺{currentMonth.savings.toLocaleString('tr-TR')} / ₺9.000</Text>
              </View>
            </View>

            <View style={styles.goalItem}>
              <Text style={styles.goalName}>Yıllık Tasarruf Hedefi</Text>
              <View style={styles.goalProgress}>
                <View style={styles.goalBar}>
                  <View style={[styles.goalFill, { width: '19%' }]} />
                </View>
                <Text style={styles.goalText}>₺19.000 / ₺100.000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Finansal İçgörüler</Text>
          <View style={styles.insightsCard}>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <TrendingUp color="#10B981" size={20} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Tasarruf artışı</Text>
                <Text style={styles.insightDescription}>
                  Bu ay geçen aya göre %22 daha fazla tasarruf yaptınız
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <TrendingDown color="#F59E0B" size={20} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Market harcamalarında artış</Text>
                <Text style={styles.insightDescription}>
                  Market harcamalarınız geçen aya göre %15 arttı
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Calendar color="#3B82F6" size={20} />
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>Ödeme hatırlatması</Text>
                <Text style={styles.insightDescription}>
                  2 kredi kartınızın ödeme tarihi bu hafta içinde
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getColorByIndex = (index: number) => {
  const colors = ['#EF4444', '#F97316', '#EAB308', '#8B5CF6', '#3B82F6'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  summaryDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  trendsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  trendsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trendsHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    marginBottom: 12,
  },
  trendsColumnHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textAlign: 'center',
  },
  trendsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  trendsMonth: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  trendsValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  incomeColor: {
    color: '#10B981',
  },
  expenseColor: {
    color: '#EF4444',
  },
  savingsColor: {
    color: '#3B82F6',
  },
  categoriesSection: {
    padding: 20,
    paddingTop: 0,
  },
  categoriesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pieChartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 20,
  },
  pieChartText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  categoriesLegend: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  legendValues: {
    alignItems: 'flex-end',
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  legendPercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  goalSection: {
    padding: 20,
    paddingTop: 0,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 20,
  },
  goalItem: {
    gap: 12,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  goalProgress: {
    gap: 8,
  },
  goalBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  goalFill: {
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  goalText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  insightsSection: {
    padding: 20,
    paddingTop: 0,
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});