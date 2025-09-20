import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, CreditCard, TriangleAlert as AlertTriangle, Calendar } from 'lucide-react-native';

export default function CardsScreen() {
  // Mock credit card data
  const cards = [
    {
      id: 1,
      name: 'Garanti BBVA',
      last4: '4523',
      balance: 2500,
      limit: 15000,
      dueDate: '2024-02-15',
      statement: 3200,
      minPayment: 320,
      daysUntilDue: 8,
    },
    {
      id: 2,
      name: 'İş Bankası',
      last4: '7891',
      balance: 850,
      limit: 10000,
      dueDate: '2024-02-20',
      statement: 1200,
      minPayment: 120,
      daysUntilDue: 13,
    },
    {
      id: 3,
      name: 'Akbank',
      last4: '2456',
      balance: 0,
      limit: 8000,
      dueDate: '2024-02-25',
      statement: 450,
      minPayment: 45,
      daysUntilDue: 18,
    },
  ];

  const totalDebt = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);
  const availableCredit = totalLimit - totalDebt;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Kredi Kartlarım</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus color="#FFFFFF" size={20} />
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Toplam Borç</Text>
            <Text style={styles.debtAmount}>₺{totalDebt.toLocaleString('tr-TR')}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Kullanılabilir Limit</Text>
            <Text style={styles.creditAmount}>₺{availableCredit.toLocaleString('tr-TR')}</Text>
          </View>
        </View>

        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Kartlarım</Text>
          {cards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <View style={styles.cardHeader}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <Text style={styles.cardNumber}>**** {card.last4}</Text>
                </View>
                <View style={styles.cardBalance}>
                  <Text style={styles.balanceLabel}>Bakiye</Text>
                  <Text style={[styles.balanceAmount, card.balance > 0 ? styles.debt : styles.noDebt]}>
                    ₺{card.balance.toLocaleString('tr-TR')}
                  </Text>
                </View>
              </View>

              <View style={styles.cardProgress}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(card.balance / card.limit) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  ₺{card.balance.toLocaleString('tr-TR')} / ₺{card.limit.toLocaleString('tr-TR')}
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.dueInfo}>
                  <Calendar color="#6B7280" size={16} />
                  <Text style={styles.dueText}>
                    Son ödeme: {card.dueDate} ({card.daysUntilDue} gün kaldı)
                  </Text>
                </View>
                {card.daysUntilDue <= 10 && (
                  <View style={styles.warning}>
                    <AlertTriangle color="#F59E0B" size={16} />
                  </View>
                )}
              </View>

              <View style={styles.paymentInfo}>
                <View style={styles.paymentItem}>
                  <Text style={styles.paymentLabel}>Ekstre Tutarı</Text>
                  <Text style={styles.paymentAmount}>₺{card.statement.toLocaleString('tr-TR')}</Text>
                </View>
                <View style={styles.paymentItem}>
                  <Text style={styles.paymentLabel}>Asgari Ödeme</Text>
                  <Text style={styles.paymentAmount}>₺{card.minPayment.toLocaleString('tr-TR')}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Yaklaşan Ödemeler</Text>
          <View style={styles.upcomingCard}>
            {cards
              .filter(card => card.daysUntilDue <= 15)
              .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
              .map((card) => (
                <View key={card.id} style={styles.upcomingItem}>
                  <View style={styles.upcomingInfo}>
                    <Text style={styles.upcomingCardName}>{card.name}</Text>
                    <Text style={styles.upcomingAmount}>₺{card.minPayment.toLocaleString('tr-TR')}</Text>
                  </View>
                  <View style={styles.upcomingDate}>
                    <Text style={[
                      styles.upcomingDays,
                      card.daysUntilDue <= 7 ? styles.urgent : styles.normal
                    ]}>
                      {card.daysUntilDue} gün
                    </Text>
                  </View>
                </View>
              ))
            }
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
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
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
  summaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  debtAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#EF4444',
  },
  creditAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#10B981',
  },
  cardsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  cardItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  cardBalance: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: '700',
  },
  debt: {
    color: '#EF4444',
  },
  noDebt: {
    color: '#10B981',
  },
  cardProgress: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dueText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  warning: {
    padding: 4,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  paymentItem: {
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  upcomingSection: {
    padding: 20,
    paddingTop: 0,
  },
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  upcomingAmount: {
    fontSize: 14,
    color: '#6B7280',
  },
  upcomingDate: {
    alignItems: 'flex-end',
  },
  upcomingDays: {
    fontSize: 14,
    fontWeight: '600',
  },
  urgent: {
    color: '#EF4444',
  },
  normal: {
    color: '#F59E0B',
  },
});