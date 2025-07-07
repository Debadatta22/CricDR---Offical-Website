import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Linking,
  Modal,
  Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ExternalLink, MapPin, Users, Radio, ChevronDown, X, Trophy } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CricketBoardsScreen() {
  const [leaguesModalVisible, setLeaguesModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));

  const cricketBoards = [
    {
      id: 1,
      name: 'ICC',
      fullName: 'International Cricket Council',
      country: 'Global',
      website: 'https://www.icc-cricket.com',
      description: 'The global governing body of cricket',
      color: '#1E40AF',
      gradient: ['#1E40AF', '#3B82F6'],
    },
    {
      id: 2,
      name: 'BCCI',
      fullName: 'Board of Control for Cricket in India',
      country: 'India',
      website: 'https://www.bcci.tv',
      description: 'Governing body of cricket in India',
      color: '#F97316',
      gradient: ['#F97316', '#FB923C'],
    },
    {
      id: 3,
      name: 'ECB',
      fullName: 'England and Wales Cricket Board',
      country: 'England & Wales',
      website: 'https://www.ecb.co.uk',
      description: 'Governing body of cricket in England and Wales',
      color: '#DC2626',
      gradient: ['#DC2626', '#EF4444'],
    },
    {
      id: 4,
      name: 'CA',
      fullName: 'Cricket Australia',
      country: 'Australia',
      website: 'https://www.cricket.com.au',
      description: 'Governing body of cricket in Australia',
      color: '#059669',
      gradient: ['#059669', '#10B981'],
    },
    {
      id: 5,
      name: 'PCB',
      fullName: 'Pakistan Cricket Board',
      country: 'Pakistan',
      website: 'https://www.pcb.com.pk',
      description: 'Governing body of cricket in Pakistan',
      color: '#7C3AED',
      gradient: ['#7C3AED', '#8B5CF6'],
    },
    {
      id: 6,
      name: 'SLC',
      fullName: 'Sri Lanka Cricket',
      country: 'Sri Lanka',
      website: 'https://www.srilankacricket.lk',
      description: 'Governing body of cricket in Sri Lanka',
      color: '#DC2626',
      gradient: ['#DC2626', '#F87171'],
    },
    {
      id: 7,
      name: 'CSA',
      fullName: 'Cricket South Africa',
      country: 'South Africa',
      website: 'https://www.cricket.co.za',
      description: 'Governing body of cricket in South Africa',
      color: '#15803D',
      gradient: ['#15803D', '#22C55E'],
    },
    {
      id: 8,
      name: 'BCB',
      fullName: 'Bangladesh Cricket Board',
      country: 'Bangladesh',
      website: 'https://www.tigercricket.com.bd',
      description: 'Governing body of cricket in Bangladesh',
      color: '#DC2626',
      gradient: ['#DC2626', '#16A34A'],
    },
    {
      id: 9,
      name: 'WICB',
      fullName: 'West Indies Cricket Board',
      country: 'West Indies',
      website: 'https://www.windiescricket.com',
      description: 'Governing body of cricket in the West Indies',
      color: '#B91C1C',
      gradient: ['#B91C1C', '#EF4444'],
    },
    {
      id: 10,
      name: 'NZC',
      fullName: 'New Zealand Cricket',
      country: 'New Zealand',
      website: 'https://www.nzc.nz',
      description: 'Governing body of cricket in New Zealand',
      color: '#1F2937',
      gradient: ['#1F2937', '#374151'],
    },
    {
      id: 11,
      name: 'ACB',
      fullName: 'Afghanistan Cricket Board',
      country: 'Afghanistan',
      website: 'https://www.acbofficials.com',
      description: 'Governing body of cricket in Afghanistan',
      color: '#DC2626',
      gradient: ['#DC2626', '#059669'],
    },
    {
      id: 12,
      name: 'ZC',
      fullName: 'Zimbabwe Cricket',
      country: 'Zimbabwe',
      website: 'https://www.zimcricket.org',
      description: 'Governing body of cricket in Zimbabwe',
      color: '#059669',
      gradient: ['#059669', '#FCD34D'],
    },
  ];

  const broadcastingChannels = [
    { name: 'Fox Sports', url: 'https://www.foxsports.com.au/media-centre/media-alerts/cricket', color: '#FF6B35' },
    { name: 'Sky Sports', url: 'https://www.skysports.com/cricket', color: '#00B4D8' },
    { name: 'ICC Broadcast', url: 'https://www.icc-cricket.com/about/broadcast/icc-tv/icc-cricket-360-country-guide', color: '#3B82F6' },
    { name: 'SuperSport', url: 'https://supersport.com/cricket', color: '#FFD60A' },
    { name: 'Star Sports', url: 'https://www.hotstar.com/in/sports/cricket', color: '#FF006E' },
  ];

  const cricketLeagues = [
    // Major Leagues
    { name: 'Indian Premier League (IPL)', country: 'India', url: 'https://www.iplt20.com/', color: '#FF6B35' },
    { name: 'Women\'s Premier League (WPL)', country: 'India', url: 'https://www.wplt20.com/', color: '#FF006E' },
    { name: 'Big Bash League (BBL)', country: 'Australia', url: 'https://www.bigbash.com.au/', color: '#00B4D8' },
    { name: 'Women\'s Big Bash League (WBBL)', country: 'Australia', url: 'https://www.bigbash.com.au/wbbl', color: '#8B5CF6' },
    { name: 'Pakistan Super League (PSL)', country: 'Pakistan', url: 'https://www.psl-t20.com/', color: '#10B981' },
    { name: 'Caribbean Premier League (CPL)', country: 'West Indies', url: 'https://www.cplt20.com/', color: '#F59E0B' },
    { name: 'SA20', country: 'South Africa', url: 'https://www.sa20.co.za/', color: '#EF4444' },
    { name: 'The Hundred', country: 'England', url: 'https://www.thehundred.com/', color: '#3B82F6' },
    { name: 'Bangladesh Premier League (BPL)', country: 'Bangladesh', url: 'https://bplt20.com.bd/', color: '#059669' },
    { name: 'Lanka Premier League (LPL)', country: 'Sri Lanka', url: 'https://www.lankapremierleaguet20.com/', color: '#DC2626' },
    { name: 'Super Smash', country: 'New Zealand', url: 'https://www.supersmash.co.nz/', color: '#1F2937' },
    { name: 'International League T20 (ILT20)', country: 'UAE', url: 'https://www.ilt20.ae/', color: '#7C3AED' },
    { name: 'Major League Cricket (MLC)', country: 'USA', url: 'https://www.majorleaguecricket.com/', color: '#B91C1C' },
    { name: 'Minor League Cricket', country: 'USA', url: 'https://www.minorleaguecricket.com/', color: '#6B7280' },
    { name: 'Global T20 Canada', country: 'Canada', url: 'https://gt20.ca/', color: '#DC2626' },
  ];

  const handleBoardPress = async (website: string) => {
    try {
      const supported = await Linking.canOpenURL(website);
      if (supported) {
        await Linking.openURL(website);
      } else {
        console.log(`Don't know how to open this URL: ${website}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const openLeaguesModal = () => {
    setLeaguesModalVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeLeaguesModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setLeaguesModalVisible(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#A855F7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Cricket Boards</Text>
          <Text style={styles.headerSubtitle}>
            Official cricket governing bodies worldwide
          </Text>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Cricket Boards</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100+</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1B+</Text>
            <Text style={styles.statLabel}>Cricket Fans</Text>
          </View>
        </View>

        {/* Boards Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Official Cricket Boards</Text>
          <View style={styles.boardsGrid}>
            {cricketBoards.map((board) => (
              <TouchableOpacity
                key={board.id}
                style={styles.boardCard}
                onPress={() => handleBoardPress(board.website)}
              >
                <LinearGradient
                  colors={board.gradient}
                  style={styles.boardHeader}
                >
                  <Text style={styles.boardName}>{board.name}</Text>
                  <ExternalLink size={20} color="#FFFFFF" strokeWidth={2} />
                </LinearGradient>
                
                <View style={styles.boardContent}>
                  <Text style={styles.boardFullName}>{board.fullName}</Text>
                  
                  <View style={styles.boardDetail}>
                    <MapPin size={16} color="#9CA3AF" strokeWidth={2} />
                    <Text style={styles.boardCountry}>{board.country}</Text>
                  </View>
                  
                  <Text style={styles.boardDescription}>{board.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Users size={24} color="#8B5CF6" strokeWidth={2} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>About Cricket Boards</Text>
              <Text style={styles.infoDescription}>
                Cricket boards are the governing bodies responsible for organizing, 
                promoting, and developing cricket in their respective countries. 
                They manage national teams, domestic leagues, and grassroots programs.
              </Text>
            </View>
          </View>
        </View>

        {/* Broadcasting Channels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Broadcasting Channels</Text>
          <View style={styles.quickLinksContainer}>
            {broadcastingChannels.map((channel, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickLinkCard, { borderLeftColor: channel.color }]}
                onPress={() => handleBoardPress(channel.url)}
              >
                <Radio size={20} color={channel.color} strokeWidth={2} />
                <Text style={styles.quickLinkText}>{channel.name}</Text>
                <ExternalLink size={18} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Cricket Resources</Text>
          <View style={styles.quickLinksContainer}>
            {[
              { name: 'Cricbuzz', url: 'https://www.cricbuzz.com', color: '#10B981' },
              { name: 'ESPNCricinfo', url: 'https://www.espncricinfo.com', color: '#DC2626' },
              { name: 'ICC Rankings', url: 'https://www.icc-cricket.com/rankings', color: '#3B82F6' },
              { name: 'Cricket World Cup', url: 'https://www.cricketworldcup.com', color: '#F59E0B' },
              { name: 'ICC WTC Standing', url: 'https://www.icc-cricket.com/tournaments/world-test-championship/standings', color: '#8B5CF6' },
            ].map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickLinkCard, { borderLeftColor: link.color }]}
                onPress={() => handleBoardPress(link.url)}
              >
                <Text style={styles.quickLinkText}>{link.name}</Text>
                <ExternalLink size={18} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            ))}
            
            {/* Leagues Button */}
            <TouchableOpacity
              style={[styles.quickLinkCard, { borderLeftColor: '#FF6B35' }]}
              onPress={openLeaguesModal}
            >
              <Trophy size={20} color="#FF6B35" strokeWidth={2} />
              <Text style={styles.quickLinkText}>Leagues</Text>
              <ChevronDown size={18} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Leagues Modal */}
      <Modal
        visible={leaguesModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeLeaguesModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              {
                opacity: modalAnimation,
                transform: [{
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                }],
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cricket Leagues Worldwide</Text>
              <TouchableOpacity onPress={closeLeaguesModal} style={styles.closeButton}>
                <X size={24} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              {cricketLeagues.map((league, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.leagueItem, { borderLeftColor: league.color }]}
                  onPress={() => {
                    handleBoardPress(league.url);
                    closeLeaguesModal();
                  }}
                >
                  <View style={styles.leagueInfo}>
                    <Text style={styles.leagueName}>{league.name}</Text>
                    <Text style={styles.leagueCountry}>{league.country}</Text>
                  </View>
                  <ExternalLink size={18} color="#9CA3AF" strokeWidth={2} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  boardsGrid: {
    gap: 16,
  },
  boardCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  boardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  boardContent: {
    padding: 20,
  },
  boardFullName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  boardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  boardCountry: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 6,
    fontWeight: '500',
  },
  boardDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  quickLinksContainer: {
    gap: 12,
  },
  quickLinkCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#2D2D44',
    gap: 12,
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A2E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2D44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollView: {
    padding: 20,
  },
  leagueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F0F23',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  leagueInfo: {
    flex: 1,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  leagueCountry: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
