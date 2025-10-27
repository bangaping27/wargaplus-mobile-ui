import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, FlatList, RefreshControl, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InfoCard } from '../components';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[4]}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FilterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing[2]}px ${({ theme }) => theme.spacing[3]}px;
  flex-direction: row;
  align-items: center;
  min-height: ${({ theme }) => theme.touchTargets.min}px;
`;

const FilterText = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-right: ${({ theme }) => theme.spacing[1]}px;
`;

const FilterIcon = styled(Ionicons)`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]}px;
`;

const EmptyIcon = styled.View`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  width: ${({ theme }) => theme.spacing[20]}px;
  height: ${({ theme }) => theme.spacing[20]}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
`;

const EmptyTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]}px;
  text-align: center;
`;

const EmptyDescription = styled.Text`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.base}px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const LoadingSpinner = styled.ActivityIndicator`
  margin: ${({ theme }) => theme.spacing[4]}px;
`;

const FeedScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for demonstration
  const [feedData] = useState([
    {
      id: 1,
      category: 'announcement',
      title: 'Pengumuman: Jadwal Vaksinasi COVID-19 Dosis Lanjutan',
      description: 'Dalam rangka meningkatkan kekebalan komunal, Puskesmas Kelurahan akan menyelenggarakan vaksinasi COVID-19 dosis lanjutan (booster) pada tanggal 5-7 November 2024. Pendaftaran dapat dilakukan secara online melalui aplikasi atau datang langsung ke lokasi.',
      date: '2 jam lalu',
      author: 'Admin RT',
    },
    {
      id: 2,
      category: 'news',
      title: 'Program Baru: Pengolahan Sampah Rumah Tangga',
      description: 'Mulai bulan depan, kita akan memulai program pengolahan sampah rumah tangga dengan sistem 3R (Reduce, Reuse, Recycle). Setiap rumah akan diberikan kantong sampah berwarna untuk memudahkan pemilahan.',
      date: '5 jam lalu',
      author: 'Ketua RT',
    },
    {
      id: 3,
      category: 'warning',
      title: 'Waspada: Curah Hujan Tinggi Diprediksi Minggu Ini',
      description: 'Berdasarkan informasi dari BMKG, wilayah kita diprediksi akan mengalami curah hujan tinggi pada minggu ini. Warga diimbau untuk membersihkan saluran air dan waspada terhadap potensi banjir.',
      date: '1 hari lalu',
      author: 'Satgas Bencana',
    },
    {
      id: 4,
      category: 'info',
      title: 'Jadwal Pemeliharaan Air PDAM',
      description: 'PDAM akan melakukan pemeliharaan rutin pada hari Rabu, 30 Oktober 2024 pukul 09:00 - 15:00 WIB. Distribusi air akan terhenti sementara di beberapa wilayah. Mohon menampung air sebelumnya.',
      date: '1 hari lalu',
      author: 'Admin RT',
    },
    {
      id: 5,
      category: 'announcement',
      title: 'Undangan: Rapat Koordinasi Keamanan Lingkungan',
      description: 'Diundang kepada seluruh warga untuk menghadiri rapat koordinasi keamanan lingkungan yang akan dibahas pada hari Sabtu, 2 November 2024 pukul 19:00 di Aula Serbaguna.',
      date: '2 hari lalu',
      author: 'Ketua Keamanan',
    },
  ]);

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'announcement', label: 'Pengumuman' },
    { id: 'news', label: 'Berita' },
    { id: 'warning', label: 'Peringatan' },
    { id: 'info', label: 'Info' },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleInfoPress = (item) => {
    console.log(`Info card pressed: ${item.title}`);
    // TODO: Navigate to detail screen or open modal
  };

  const handleFilterPress = () => {
    console.log('Filter pressed');
    // TODO: Show filter modal or navigation
  };

  const filteredData = selectedCategory === 'all'
    ? feedData
    : feedData.filter(item => item.category === selectedCategory);

  const renderInfoCard = ({ item }) => (
    <InfoCard
      category={item.category}
      title={item.title}
      description={item.description}
      date={item.date}
      author={item.author}
      onPress={() => handleInfoPress(item)}
    />
  );

  const renderEmptyState = () => (
    <EmptyState>
      <EmptyIcon>
        <Ionicons name="document-text-outline" size={40} color="#8E8E8E" />
      </EmptyIcon>
      <EmptyTitle>Belum Ada Informasi</EmptyTitle>
      <EmptyDescription>
        Belum ada informasi terbaru untuk kategori ini. Coba lagi nanti atau periksa kategori lain.
      </EmptyDescription>
    </EmptyState>
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <Container>
      <ContentContainer>
        <Header>
          <Title>Info</Title>
          <FilterButton onPress={handleFilterPress}>
            <FilterText>Filter</FilterText>
            <FilterIcon name="funnel-outline" size={16} />
          </FilterButton>
        </Header>

        <FlatList
          data={filteredData}
          renderItem={renderInfoCard}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={{
            paddingBottom: 20,
            ...(filteredData.length === 0 && { flex: 1 }),
          }}
          onEndReached={() => {
            if (!loading && filteredData.length > 0) {
              // TODO: Load more data
              console.log('Load more data');
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <LoadingSpinner size="small" color="#3DA58A" /> : null
          }
        />
      </ContentContainer>
    </Container>
  );
};

export default FeedScreen;