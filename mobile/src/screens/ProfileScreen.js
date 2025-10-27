import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Card,
  Button,
  ListItem,
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

const ProfileHeader = styled(Card)`
  align-items: center;
  padding: ${({ theme }) => theme.spacing[5]}px;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const AvatarContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const Avatar = styled.View`
  width: ${({ theme }) => theme.spacing[24]}px;
  height: ${({ theme }) => theme.spacing[24]}px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  background-color: ${({ theme }) => theme.colors.primary.blue};
  align-items: center;
  justify-content: center;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.background.card};
  shadow-color: ${({ theme }) => theme.colors.shadow.medium};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 6;
`;

const AvatarText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.white};
`;

const UserName = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[1]}px;
`;

const UserSubtitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: ${({ theme }) => theme.spacing[6]}px 0 ${({ theme }) => theme.spacing[3]}px 0;
`;

const InfoCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const ActionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const ActionButton = styled(Button)`
  flex: 1;
  margin: 0 ${({ theme }) => theme.spacing[1]}px;
`;

const LogoutButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[4]}px;
  margin-bottom: ${({ theme }) => theme.spacing[8]}px;
`;

const ProfileScreen = () => {
  // Mock user data
  const [userData] = useState({
    name: 'Ahmad Wijaya',
    houseNumber: 'A-15',
    rt: '001',
    rw: '002',
    address: 'Jl. Merdeka No. 45, Kelurahan Sukamaju',
    phone: '+62 812-3456-7890',
    email: 'ahmad.wijaya@email.com',
    familyMembers: 4,
  });

  // Mock payment history data
  const paymentHistory = [
    {
      id: 1,
      title: 'Iuran September 2024',
      amount: 'Rp150.000',
      date: '25 Sep 2024',
      status: 'Menunggu',
      statusVariant: 'warning',
    },
    {
      id: 2,
      title: 'Iuran Agustus 2024',
      amount: 'Rp150.000',
      date: '28 Agu 2024',
      status: 'Lunas',
      statusVariant: 'success',
    },
    {
      id: 3,
      title: 'Iuran Juli 2024',
      amount: 'Rp150.000',
      date: '30 Jul 2024',
      status: 'Lunas',
      statusVariant: 'success',
    },
    {
      id: 4,
      title: 'Biaya Kebersihan Q2',
      amount: 'Rp75.000',
      date: '15 Jun 2024',
      status: 'Lunas',
      statusVariant: 'success',
    },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLaporPress = () => {
    Alert.alert(
      'Laporkan Masalah',
      'Fitur pelaporan akan segera tersedia. Silakan hubungi pengurus RT langsung untuk sementara.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleHubungiPress = () => {
    Alert.alert(
      'Hubungi Pengurus',
      'Silakan menghubungi:\n\nKetua RT: +62 811-1234-5678\nSekretaris: +62 812-9876-5432\n\nEmail: rt001@sukamaju.desa.id',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Keluar',
      'Apakah Anda yakin ingin keluar dari aplikasi?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya', style: 'destructive', onPress: () => {
          // TODO: Implement logout logic
          console.log('User logged out');
        }},
      ]
    );
  };

  const renderPaymentHistoryItem = (item) => (
    <ListItem
      key={item.id}
      title={item.title}
      amount={item.amount}
      date={item.date}
      status={item.status}
      statusVariant={item.statusVariant}
    />
  );

  return (
    <Container>
      <ScrollContainer>
        <Title>Profil</Title>

        <ProfileHeader>
          <AvatarContainer>
            <Avatar>
              <AvatarText>{getInitials(userData.name)}</AvatarText>
            </Avatar>
          </AvatarContainer>
          <UserName>{userData.name}</UserName>
          <UserSubtitle>Rumah {userData.houseNumber} • RT {userData.rt}/{userData.rw}</UserSubtitle>
        </ProfileHeader>

        <SectionTitle>Informasi Rumah</SectionTitle>
        <InfoCard padding="md">
          <ListItem
            title="Alamat Lengkap"
            subtitle={userData.address}
          />
          <ListItem
            title="Nomor Rumah"
            subtitle={userData.houseNumber}
          />
          <ListItem
            title="RT/RW"
            subtitle={`${userData.rt}/${userData.rw}`}
          />
          <ListItem
            title="Jumlah Anggota Keluarga"
            subtitle={`${userData.familyMembers} orang`}
          />
        </InfoCard>

        <SectionTitle>Informasi Kontak</SectionTitle>
        <InfoCard padding="md">
          <ListItem
            title="Telepon"
            subtitle={userData.phone}
          />
          <ListItem
            title="Email"
            subtitle={userData.email}
          />
        </InfoCard>

        <SectionTitle>Riwayat Pembayaran</SectionTitle>
        {paymentHistory.map(renderPaymentHistoryItem)}

        <SectionTitle>Aksi</SectionTitle>
        <ActionButtonsContainer>
          <ActionButton
            variant="secondary"
            onPress={handleLaporPress}
          >
            Lapor
          </ActionButton>
          <ActionButton
            variant="secondary"
            onPress={handleHubungiPress}
          >
            Hubungi
          </ActionButton>
        </ActionButtonsContainer>

        <LogoutButton
          variant="danger"
          onPress={handleLogout}
        >
          Keluar
        </LogoutButton>
      </ScrollContainer>
    </Container>
  );
};

export default ProfileScreen;