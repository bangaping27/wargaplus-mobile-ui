import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Card,
  Button,
  ListItem,
  BottomSheet,
} from '../components';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: ${({ theme }) => theme.spacing[6]}px 0 ${({ theme }) => theme.spacing[4]}px 0;
`;

const IuranContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const IuranHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const IuranTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const IuranSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing[1]}px;
`;

const PPOBGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const PPOBRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const PPOBCard = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing[4]}px;
  margin: 0 ${({ theme }) => theme.spacing[1]}px;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.touchTargets.min}px;
  shadow-color: ${({ theme }) => theme.colors.shadow.medium};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border.light};
`;

const PPOBIcon = styled.View`
  background-color: ${({ theme, color = 'primary' }) => {
    switch (color) {
      case 'blue':
        return theme.colors.primary.blue;
      case 'yellow':
        return theme.colors.primary.yellow;
      case 'green':
        return theme.colors.primary.green;
      default:
        return theme.colors.primary.blue;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  width: ${({ theme }) => theme.spacing[10]}px;
  height: ${({ theme }) => theme.spacing[10]}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const PPOBLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

// Bottom Sheet Components
const BottomSheetTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const BillDetails = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const BillRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.spacing[2]}px;
`;

const BillLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BillValue = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TotalAmount = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.tosca};
  text-align: center;
  margin: ${({ theme }) => theme.spacing[4]}px 0;
`;

const PaymentMethods = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const MethodTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[3]}px;
`;

const MethodOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary.blue + '20' : 'transparent'
  };
  border-width: 1px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary.blue : theme.colors.border.light
  };
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const MethodIcon = styled.View`
  width: ${({ theme }) => theme.spacing[8]}px;
  height: ${({ theme }) => theme.spacing[8]}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing[3]}px;
`;

const MethodText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PaymentScreen = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('transfer');

  // Mock data
  const iuranPayments = [
    {
      id: 1,
      title: 'Iuran September 2024',
      subtitle: 'Blok A RT 001',
      amount: 'Rp150.000',
      date: '30 September 2024',
      status: 'Belum Bayar',
      statusVariant: 'warning',
    },
    {
      id: 2,
      title: 'Iuran Agustus 2024',
      subtitle: 'Blok A RT 001',
      amount: 'Rp150.000',
      date: '31 Agustus 2024',
      status: 'Sudah Bayar',
      statusVariant: 'success',
    },
    {
      id: 3,
      title: 'Iuran Juli 2024',
      subtitle: 'Blok A RT 001',
      amount: 'Rp150.000',
      date: '31 Juli 2024',
      status: 'Sudah Bayar',
      statusVariant: 'success',
    },
  ];

  const ppobServices = [
    { id: 1, title: 'Air', icon: 'water', color: 'blue' },
    { id: 2, title: 'PLN', icon: 'flash', color: 'yellow' },
    { id: 3, title: 'Internet', icon: 'wifi', color: 'green' },
    { id: 4, title: 'Pulsa', icon: 'phone-portrait', color: 'blue' },
  ];

  const paymentMethods = [
    { id: 'transfer', label: 'Transfer Bank', icon: 'card' },
    { id: 'ewallet', label: 'E-Wallet', icon: 'wallet' },
    { id: 'cod', label: 'Bayar di Tempat', icon: 'cash' },
  ];

  const handlePaymentPress = (payment) => {
    setSelectedPayment(payment);
    setShowBottomSheet(true);
  };

  const handlePPOBPress = (service) => {
    console.log(`PPOB service pressed: ${service.title}`);
    // TODO: Navigate to PPOB payment screen
  };

  const handleConfirmPayment = () => {
    console.log(`Payment confirmed for: ${selectedPayment?.title}`);
    setShowBottomSheet(false);
    // TODO: Process payment
  };

  const renderIuranCard = (item) => (
    <IuranContainer key={item.id} padding="md">
      <IuranHeader>
        <View style={{ flex: 1 }}>
          <IuranTitle>{item.title}</IuranTitle>
          <IuranSubtitle>{item.subtitle}</IuranSubtitle>
        </View>
      </IuranHeader>
      <ListItem
        title="Jumlah"
        amount={item.amount}
        date={item.date}
        status={item.status}
        statusVariant={item.statusVariant}
        rightComponent={
          item.status === 'Belum Bayar' && (
            <Button
              size="sm"
              onPress={() => handlePaymentPress(item)}
              style={{ minWidth: 80 }}
            >
              Bayar
            </Button>
          )
        }
      />
    </IuranContainer>
  );

  const renderPPOBRow = (services) => (
    <PPOBRow key={services[0].id}>
      {services.map((service) => (
        <PPOBCard
          key={service.id}
          onPress={() => handlePPOBPress(service)}
          activeOpacity={0.7}
        >
          <PPOBIcon color={service.color}>
            <Ionicons name={service.icon} size={20} color="#FFFFFF" />
          </PPOBIcon>
          <PPOBLabel>{service.title}</PPOBLabel>
        </PPOBCard>
      ))}
    </PPOBRow>
  );

  // Group PPOB services into rows of 2
  const ppobRows = [];
  for (let i = 0; i < ppobServices.length; i += 2) {
    ppobRows.push(ppobServices.slice(i, i + 2));
  }

  return (
    <Container>
      <ScrollContainer>
        <Title>Pembayaran</Title>

        <SectionTitle>Iuran Wajib</SectionTitle>
        {iuranPayments.map(renderIuranCard)}

        <SectionTitle>Layanan PPOB</SectionTitle>
        <PPOBGrid>
          {ppobRows.map(renderPPOBRow)}
        </PPOBGrid>
      </ScrollContainer>

      {/* Payment Bottom Sheet */}
      <BottomSheet
        isVisible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <BottomSheetTitle>Detail Pembayaran</BottomSheetTitle>

        {selectedPayment && (
          <BillDetails padding="md">
            <BillRow>
              <BillLabel>Jenis Pembayaran</BillLabel>
              <BillValue>{selectedPayment.title}</BillValue>
            </BillRow>
            <BillRow>
              <BillLabel>Periode</BillLabel>
              <BillValue>{selectedPayment.subtitle}</BillValue>
            </BillRow>
            <BillRow>
              <BillLabel>Tanggal Jatuh Tempo</BillLabel>
              <BillValue>{selectedPayment.date}</BillValue>
            </BillRow>
            <BillRow
              style={{
                borderTopWidth: 1,
                borderTopColor: '#E5E5E5',
                paddingTop: 12,
                marginTop: 8,
              }}
            >
              <BillLabel style={{ fontWeight: '600' }}>Total Pembayaran</BillLabel>
              <BillValue style={{ fontWeight: '600' }}>
                {selectedPayment.amount}
              </BillValue>
            </BillRow>
          </BillDetails>
        )}

        <TotalAmount>{selectedPayment?.amount}</TotalAmount>

        <PaymentMethods>
          <MethodTitle>Pilih Metode Pembayaran</MethodTitle>
          {paymentMethods.map((method) => (
            <MethodOption
              key={method.id}
              selected={selectedMethod === method.id}
              onPress={() => setSelectedMethod(method.id)}
            >
              <MethodIcon>
                <Ionicons
                  name={method.icon}
                  size={16}
                  color={selectedMethod === method.id ? '#4A90E2' : '#6F6F6F'}
                />
              </MethodIcon>
              <MethodText>{method.label}</MethodText>
              {selectedMethod === method.id && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#4A90E2"
                  style={{ marginLeft: 'auto' }}
                />
              )}
            </MethodOption>
          ))}
        </PaymentMethods>

        <Button
          variant="primary"
          size="lg"
          onPress={handleConfirmPayment}
          style={{ marginBottom: 20 }}
        >
          Konfirmasi Bayar
        </Button>
      </BottomSheet>
    </Container>
  );
};

export default PaymentScreen;