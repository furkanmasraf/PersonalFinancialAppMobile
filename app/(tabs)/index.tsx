import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet, TrendingUp, TrendingDown, CreditCard, CircleAlert as AlertCircle } from 'lucide-react-native';
import 'react-native-worklets';

export default function HomeScreen() {
  // Mock data
  const totalIncome = 15000;
  const totalExpenses = 8500;
  const balance = totalIncome - totalExpenses;
  const creditCardDebt = 3200;
  const upcomingPayments = 2;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Finans Özeti</Text>
          <Text style={styles.subtitle}>Merhaba! İşte genel durumunuz</Text>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Wallet color="#3B82F6" size={24} />
            <Text style={styles.balanceTitle}>Toplam Bakiye</Text>
          </View>
          <Text style={styles.balanceAmount}>₺{balance.toLocaleString('tr-TR')}</Text>
          <Text style={[styles.balanceChange, balance >= 0 ? styles.positive : styles.negative]}>
            {balance >= 0 ? '+' : ''}₺{Math.abs(balance - 5500).toLocaleString('tr-TR')} bu ay
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.incomeCard]}>
            <View style={styles.statHeader}>
              <TrendingUp color="#10B981" size={20} />
              <Text style={styles.statTitle}>Gelirler</Text>
            </View>
            <Text style={styles.statAmount}>₺{totalIncome.toLocaleString('tr-TR')}</Text>
            <Text style={styles.statPeriod}>Bu ay</Text>
          </View>

          <View style={[styles.statCard, styles.expenseCard]}>
            <View style={styles.statHeader}>
              <TrendingDown color="#EF4444" size={20} />
              <Text style={styles.statTitle}>Giderler</Text>
            </View>
            <Text style={styles.statAmount}>₺{totalExpenses.toLocaleString('tr-TR')}</Text>
            <Text style={styles.statPeriod}>Bu ay</Text>
          </View>
        </View>

        <View style={styles.creditCardSection}>
          <View style={styles.sectionHeader}>
            <CreditCard color="#3B82F6" size={20} />
            <Text style={styles.sectionTitle}>Kredi Kartları</Text>
          </View>
          <View style={styles.creditCard}>
            <Text style={styles.creditCardTitle}>Toplam Borç</Text>
            <Text style={styles.creditCardAmount}>₺{creditCardDebt.toLocaleString('tr-TR')}</Text>
            <View style={styles.creditCardFooter}>
              <AlertCircle color="#F59E0B" size={16} />
              <Text style={styles.creditCardWarning}>{upcomingPayments} kartın ödeme tarihi yaklaşıyor</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.actionsGrid}>
            <View style={styles.actionCard}>
              <TrendingUp color="#10B981" size={24} />
              <Text style={styles.actionText}>Gelir Ekle</Text>
            </View>
            <View style={styles.actionCard}>
              <TrendingDown color="#EF4444" size={24} />
              <Text style={styles.actionText}>Gider Ekle</Text>
            </View>
            <View style={styles.actionCard}>
              <CreditCard color="#3B82F6" size={24} />
              <Text style={styles.actionText}>Kart Ekle</Text>
            </View>
            <View style={styles.actionCard}>
              <Wallet color="#6B7280" size={24} />
              <Text style={styles.actionText}>Rapor Görüntüle</Text>
            </View>
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
  balanceCard: {
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
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  balanceChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  positive: {
    color: '#10B981',
  },
  negative: {
    color: '#EF4444',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
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
  incomeCard: {
    borderColor: '#10B981',
    borderWidth: 2,
  },
  expenseCard: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statPeriod: {
    fontSize: 12,
    color: '#6B7280',
  },
  creditCardSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  creditCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  creditCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  creditCardAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 12,
  },
  creditCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditCardWarning: {
    fontSize: 14,
    color: '#F59E0B',
    marginLeft: 6,
    fontWeight: '500',
  },
  quickActions: {
    padding: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
});