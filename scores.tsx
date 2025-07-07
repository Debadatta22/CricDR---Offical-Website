import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Linking 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Trophy, 
  Clock, 
  Calendar, 
  TrendingUp,
  Users,
  Target,
  Activity,
  Star,
  ExternalLink,
  Play,
  Globe
} from 'lucide-react-native';

export default function ScoresScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'live' | 'news' | 'upcoming'>('live');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Live matches data - would be fetched from ESPNCricinfo API
  const liveMatches = [
    {
      id: 1,
      team1: 'India',
      team2: 'Australia',
      team1Score: '287/4',
      team2Score: '156/8',
      overs1: '45.2',
      overs2: '32.4',
      status: 'India batting',
      venue: 'MCG, Melbourne',
      format: 'ODI',
      isLive: true,
      matchUrl: 'https://www.espncricinfo.com/live-cricket-score',
      series: 'Australia vs India ODI Series 2025',
    },
    {
      id: 2,
      team1: 'England',
      team2: 'Pakistan',
      team1Score: '245',
      team2Score: '180/6',
      overs1: '50.0',
      overs2: '38.5',
      status: 'Pakistan chasing',
      venue: 'Lords, London',
      format: 'ODI',
      isLive: true,
      matchUrl: 'https://www.espncricinfo.com/live-cricket-score',
      series: 'England vs Pakistan ODI Series 2025',
    },
    {
      id: 3,
      team1: 'South Africa',
      team2: 'New Zealand',
      team1Score: '198/7',
      team2Score: '45/2',
      overs1: '20.0',
      overs2: '8.3',
      status: 'New Zealand batting',
      venue: 'Newlands, Cape Town',
      format: 'T20I',
      isLive: true,
      matchUrl: 'https://www.espncricinfo.com/live-cricket-score',
      series: 'South Africa vs New Zealand T20I Series 2025',
    },
  ];

  // Cricket news data - would be fetched from Cricbuzz API
  const cricketNews = [
    {
      id: 1,
      title: 'Virat Kohli becomes fastest to 13,000 ODI runs',
      summary: 'Indian batting maestro reaches another milestone in his illustrious career',
      time: '2 hours ago',
      source: 'Cricbuzz',
      category: 'Records',
      url: 'https://www.cricbuzz.com/cricket-news',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 2,
      title: 'ICC announces new T20 World Cup format for 2026',
      summary: 'Tournament to feature 20 teams with expanded group stage format',
      time: '4 hours ago',
      source: 'Cricbuzz',
      category: 'Tournament',
      url: 'https://www.cricbuzz.com/cricket-news',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 3,
      title: 'England announces squad for upcoming Ashes series',
      summary: 'Several changes made to the squad with focus on youth development',
      time: '6 hours ago',
      source: 'Cricbuzz',
      category: 'Team News',
      url: 'https://www.cricbuzz.com/cricket-news',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 4,
      title: 'IPL 2025 auction: Record-breaking bids expected',
      summary: 'Franchises prepare for mega auction with increased salary cap',
      time: '8 hours ago',
      source: 'Cricbuzz',
      category: 'IPL',
      url: 'https://www.cricbuzz.com/cricket-news',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 5,
      title: 'Women\'s cricket gets major boost with new league announcement',
      summary: 'New professional league to feature top international players',
      time: '12 hours ago',
      source: 'Cricbuzz',
      category: 'Women\'s Cricket',
      url: 'https://www.cricbuzz.com/cricket-news',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
  ];

  // Upcoming matches data - would be fetched from Cricbuzz API
  const upcomingMatches = [
    {
      id: 1,
      team1: 'Bangladesh',
      team2: 'Afghanistan',
      date: '2025-01-15',
      time: '14:30',
      venue: 'Shere Bangla Stadium, Dhaka',
      format: 'T20I',
      series: 'Bangladesh vs Afghanistan T20I Series',
      url: 'https://www.cricbuzz.com/cricket-schedule/upcoming-series/international',
    },
    {
      id: 2,
      team1: 'India',
      team2: 'England',
      date: '2025-01-18',
      time: '09:30',
      venue: 'Wankhede Stadium, Mumbai',
      format: 'Test',
      series: 'India vs England Test Series',
      url: 'https://www.cricbuzz.com/cricket-schedule/upcoming-series/international',
    },
    {
      id: 3,
      team1: 'Australia',
      team2: 'West Indies',
      date: '2025-01-20',
      time: '13:00',
      venue: 'Gabba, Brisbane',
      format: 'ODI',
      series: 'Australia vs West Indies ODI Series',
      url: 'https://www.cricbuzz.com/cricket-schedule/upcoming-series/international',
    },
    {
      id: 4,
      team1: 'Pakistan',
      team2: 'Sri Lanka',
      date: '2025-01-22',
      time: '15:00',
      venue: 'National Stadium, Karachi',
      format: 'T20I',
      series: 'Pakistan vs Sri Lanka T20I Series',
      url: 'https://www.cricbuzz.com/cricket-schedule/upcoming-series/international',
    },
  ];

  const handleLinkPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const renderLiveMatch = (match: any) => {
    return (
      <TouchableOpacity
        key={match.id}
        style={styles.matchCard}
        onPress={() => handleLinkPress(match.matchUrl)}
      >
        <View style={styles.matchHeader}>
          <View style={styles.liveBadge}>
            <Activity size={12} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <TouchableOpacity onPress={() => handleLinkPress(match.matchUrl)}>
            <ExternalLink size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.seriesText}>{match.series}</Text>
        
        <View style={styles.scoreContainer}>
          <View style={styles.teamScore}>
            <Text style={styles.teamName}>{match.team1}</Text>
            <Text style={styles.score}>{match.team1Score}</Text>
            <Text style={styles.overs}>({match.overs1} ov)</Text>
          </View>
          
          <View style={styles.teamScore}>
            <Text style={styles.teamName}>{match.team2}</Text>
            <Text style={styles.score}>{match.team2Score}</Text>
            <Text style={styles.overs}>({match.overs2} ov)</Text>
          </View>
        </View>
        
        <Text style={styles.liveStatus}>{match.status}</Text>
        <Text style={styles.venue}>{match.venue}</Text>
        
        <View style={styles.formatBadge}>
          <Text style={styles.formatText}>{match.format}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNewsItem = (news: any) => {
    return (
      <TouchableOpacity
        key={news.id}
        style={styles.newsCard}
        onPress={() => handleLinkPress(news.url)}
      >
        <View style={styles.newsContent}>
          <View style={styles.newsHeader}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{news.category}</Text>
            </View>
            <Text style={styles.newsTime}>{news.time}</Text>
          </View>
          
          <Text style={styles.newsTitle}>{news.title}</Text>
          <Text style={styles.newsSummary}>{news.summary}</Text>
          
          <View style={styles.newsFooter}>
            <Text style={styles.newsSource}>Source: {news.source}</Text>
            <ExternalLink size={16} color="#9CA3AF" strokeWidth={2} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderUpcomingMatch = (match: any) => {
    return (
      <TouchableOpacity
        key={match.id}
        style={styles.matchCard}
        onPress={() => handleLinkPress(match.url)}
      >
        <View style={styles.matchHeader}>
          <View style={styles.formatBadge}>
            <Text style={styles.formatText}>{match.format}</Text>
          </View>
          <TouchableOpacity onPress={() => handleLinkPress(match.url)}>
            <ExternalLink size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.seriesText}>{match.series}</Text>
        
        <View style={styles.teamsContainer}>
          <Text style={styles.teamName}>{match.team1}</Text>
          <Text style={styles.vsText}>vs</Text>
          <Text style={styles.teamName}>{match.team2}</Text>
        </View>
        
        <View style={styles.matchDetails}>
          <View style={styles.detailItem}>
            <Calendar size={16} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.detailText}>{match.date} at {match.time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Target size={16} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.detailText}>{match.venue}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#A855F7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Cricket Hub</Text>
          <Text style={styles.headerSubtitle}>
            Live scores, news & upcoming matches
          </Text>
        </LinearGradient>

        {/* Quick Access Links */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickLinksContainer}>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => handleLinkPress('https://www.espncricinfo.com/live-cricket-score')}
            >
              <Activity size={24} color="#EF4444" strokeWidth={2} />
              <Text style={styles.quickLinkText}>ESPNCricinfo Live</Text>
              <ExternalLink size={16} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => handleLinkPress('https://www.cricbuzz.com/cricket-schedule/upcoming-series/international')}
            >
              <Calendar size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.quickLinkText}>Cricbuzz Schedule</Text>
              <ExternalLink size={16} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => handleLinkPress('https://www.cricbuzz.com/cricket-news')}
            >
              <Globe size={24} color="#3B82F6" strokeWidth={2} />
              <Text style={styles.quickLinkText}>Cricbuzz News</Text>
              <ExternalLink size={16} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {[
            { key: 'live', label: 'Live Scores', icon: Activity },
            { key: 'news', label: 'Cricket News', icon: Globe },
            { key: 'upcoming', label: 'Upcoming', icon: Calendar },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
                  selectedTab === tab.key && styles.activeTab
                ]}
                onPress={() => setSelectedTab(tab.key as any)}
              >
                <IconComponent 
                  size={20} 
                  color={selectedTab === tab.key ? '#FFFFFF' : '#9CA3AF'} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.activeTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content */}
        <View style={styles.section}>
          {selectedTab === 'live' && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Live Cricket Scores</Text>
                <TouchableOpacity onPress={() => handleLinkPress('https://www.espncricinfo.com/live-cricket-score')}>
                  <Text style={styles.viewAllText}>View All on ESPNCricinfo</Text>
                </TouchableOpacity>
              </View>
              {liveMatches.map(renderLiveMatch)}
            </>
          )}
          
          {selectedTab === 'news' && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Latest Cricket News</Text>
                <TouchableOpacity onPress={() => handleLinkPress('https://www.cricbuzz.com/cricket-news')}>
                  <Text style={styles.viewAllText}>View All on Cricbuzz</Text>
                </TouchableOpacity>
              </View>
              {cricketNews.map(renderNewsItem)}
            </>
          )}
          
          {selectedTab === 'upcoming' && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Matches</Text>
                <TouchableOpacity onPress={() => handleLinkPress('https://www.cricbuzz.com/cricket-schedule/upcoming-series/international')}>
                  <Text style={styles.viewAllText}>View All on Cricbuzz</Text>
                </TouchableOpacity>
              </View>
              {upcomingMatches.map(renderUpcomingMatch)}
            </>
          )}
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Cricket Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <TrendingUp size={24} color="#EF4444" strokeWidth={2} />
              <Text style={styles.statNumber}>{liveMatches.length}</Text>
              <Text style={styles.statLabel}>Live Matches</Text>
            </View>
            <View style={styles.statCard}>
              <Globe size={24} color="#3B82F6" strokeWidth={2} />
              <Text style={styles.statNumber}>{cricketNews.length}</Text>
              <Text style={styles.statLabel}>News Updates</Text>
            </View>
            <View style={styles.statCard}>
              <Calendar size={24} color="#10B981" strokeWidth={2} />
              <Text style={styles.statNumber}>{upcomingMatches.length}</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
          </View>
        </View>

        {/* Data Sources Info */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Star size={24} color="#F59E0B" strokeWidth={2} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Powered by Leading Cricket Platforms</Text>
              <Text style={styles.infoDescription}>
                Live scores from ESPNCricinfo, schedules and news from Cricbuzz. 
                Tap on any match or news item to view full details on the respective platform.
              </Text>
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
  quickLinksSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  quickLinksContainer: {
    gap: 12,
  },
  quickLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginLeft: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1A1A2E',
    gap: 8,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  matchCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  formatBadge: {
    backgroundColor: '#2D2D44',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  formatText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  seriesText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 12,
  },
  scoreContainer: {
    gap: 12,
    marginBottom: 12,
  },
  teamScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  overs: {
    fontSize: 14,
    color: '#9CA3AF',
    width: 80,
    textAlign: 'right',
  },
  liveStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
    marginBottom: 4,
  },
  venue: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  matchDetails: {
    gap: 8,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  newsCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  newsContent: {
    flex: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  newsTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsSummary: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#FFFFFF',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
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
});
