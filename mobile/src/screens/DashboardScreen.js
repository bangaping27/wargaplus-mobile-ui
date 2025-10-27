import React, { useState } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Card,
  StatusCard,
  ActionCard,
  AnnouncementCard,
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

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const HeaderLeft = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const WelcomeText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Logo = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary.tosca};
`;

const SectionTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: ${({ theme }) => theme.spacing[6]}px 0 ${({ theme }) => theme.spacing[4]}px 0;
`;

const ActionGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const ActionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
`;

const AnnouncementList = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const ScheduleList = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing[6]}px;
`;

const ScheduleContainer = styled(Card)`
  margin: 0 0 ${({ theme }) => theme.spacing[3]}px 0;
`;

const DashboardScreen = () => {
  // Mock data for demonstration
  const [userName] = useState('Ahmad');

  const actions = [
    { id: 1, title: 'Bayar Iuran', icon: 'card', iconColor: 'primary' },
    { id: 2, title: 'Air', icon: 'water', iconColor: 'info' },
    { id: 3, title: 'PPOB', icon: 'phone-portrait', iconColor: 'secondary' },
    { id: 4, title: 'Lapor', icon: 'document-text', iconColor: 'warning' },
    { id: 5, title: 'Kegiatan', icon: 'calendar', iconColor: 'success' },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Pengumuman: Pemadaman Listrik Terjadwal',
      description: 'Akan ada pemadaman listrik pada hari Sabtu, 28 Oktober 2024 pukul 09:00 - 15:00 WIB untuk pemeliharaan rutin.',
      date: '2 hari lalu',
      badge: 'Penting',
      badgeVariant: 'warning',
    },
    {
      id: 2,
      title: 'Jadwal Piket Kebersihan Bulan Ini',
      description: 'Berikut adalah jadwal piket kebersihan untuk bulan Oktober. Mohon kesediaannya untuk ikut serta menjaga kebersihan lingkungan.',
      date: '5 hari lalu',
      badge: 'Info',
      badgeVariant: 'info',
    },
  ];

  const schedules = [
    {
      id: 1,
      title: 'Shift Keamanan Malam',
      subtitle: 'Pos A - Gerbang Utama',
      date: 'Hari ini, 20:00 - 02:00',
      status: 'Aktif',
      statusVariant: 'success',
    },
    {
      id: 2,
      title: 'Shift Kebersihan Pagi',
      subtitle: 'Area Blok A dan B',
      date: 'Besok, 06:00 - 12:00',
      status: 'Terjadwal',
      statusVariant: 'info',
    },
    {
      id: 3,
      title: 'Rapat RT Bulanan',
      subtitle: 'Aula Serbaguna',
      date: 'Minggu ini, 19:00',
      status: 'Akan Datang',
      statusVariant: 'warning',
    },
  ];

  const handleActionPress = (action) => {
    console.log(`Action pressed: ${action.title}`);
    // TODO: Navigate to appropriate screen based on action
  };

  const renderAnnouncementCard = (item) => (
    <AnnouncementCard
      key={item.id}
      title={item.title}
      description={item.description}
      date={item.date}
      badge={item.badge}
      badgeVariant={item.badgeVariant}
    />
  );

  const renderScheduleItem = (item) => (
    <ScheduleContainer key={item.id} padding="md">
      <ListItem
        title={item.title}
        subtitle={item.subtitle}
        date={item.date}
        status={item.status}
        statusVariant={item.statusVariant}
      />
    </ScheduleContainer>
  );

  // Group actions into rows of 2-3 items
  const actionRows = [];
  for (let i = 0; i < actions.length; i += 3) {
    if (i + 2 < actions.length) {
      // Row of 3 items
      actionRows.push(
        <ActionRow key={i}>
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <ActionCard
              title={actions[i].title}
              icon={actions[i].icon}
              iconColor={actions[i].iconColor}
              onPress={() => handleActionPress(actions[i])}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <ActionCard
              title={actions[i + 1].title}
              icon={actions[i + 1].icon}
              iconColor={actions[i + 1].iconColor}
              onPress={() => handleActionPress(actions[i + 1])}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <ActionCard
              title={actions[i + 2].title}
              icon={actions[i + 2].icon}
              iconColor={actions[i + 2].iconColor}
              onPress={() => handleActionPress(actions[i + 2])}
            />
          </View>
        </ActionRow>
      );
    } else if (i + 1 < actions.length) {
      // Row of 2 items
      actionRows.push(
        <ActionRow key={i}>
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <ActionCard
              title={actions[i].title}
              icon={actions[i].icon}
              iconColor={actions[i].iconColor}
              onPress={() => handleActionPress(actions[i])}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <ActionCard
              title={actions[i + 1].title}
              icon={actions[i + 1].icon}
              iconColor={actions[i + 1].iconColor}
              onPress={() => handleActionPress(actions[i + 1])}
            />
          </View>
        </ActionRow>
      );
    } else {
      // Row of 1 item
      actionRows.push(
        <ActionRow key={i}>
          <View style={{ flex: 1, marginHorizontal: 4 }}>
            <ActionCard
              title={actions[i].title}
              icon={actions[i].icon}
              iconColor={actions[i].iconColor}
              onPress={() => handleActionPress(actions[i])}
            />
          </View>
        </ActionRow>
      );
    }
  }

  return (
    <Container>
      <ScrollContainer>
        <Header>
          <HeaderLeft>
            <Title>Dashboard</Title>
            <WelcomeText>Selamat datang, {userName}</WelcomeText>
          </HeaderLeft>
          <Logo>warga+</Logo>
        </Header>

        <StatusCard
          status="Belum bayar"
          amount="Rp150.000"
          description="Iuran September"
        />

        <SectionTitle>Aksi Cepat</SectionTitle>
        <ActionGrid>
          {actionRows}
        </ActionGrid>

        <SectionTitle>Pengumuman Terbaru</SectionTitle>
        <AnnouncementList>
          {announcements.map(renderAnnouncementCard)}
        </AnnouncementList>

        <SectionTitle>Jadwal & Tugas</SectionTitle>
        <ScheduleList>
          {schedules.map(renderScheduleItem)}
        </ScheduleList>
      </ScrollContainer>
    </Container>
  );
};

export default DashboardScreen;