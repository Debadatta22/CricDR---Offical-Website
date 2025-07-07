import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Image,
  TextInput,
  Linking,
  Modal,
  Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bot, 
  Trophy, 
  Users, 
  TrendingUp, 
  Calendar,
  Play,
  Zap,
  Target,
  ShoppingBag,
  Search,
  BookOpen,
  User,
  ExternalLink,
  Linkedin,
  Instagram,
  Github,
  Mail,
  Globe,
  UserCheck,
  X,
  GraduationCap,
  Code,
  Heart,
  Award,
  MapPin,
  Calendar as CalendarIcon
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [modalAnimation] = useState(new Animated.Value(0));

  const quickActions = [
    {
      id: 1,
      title: 'AI Assistant',
      subtitle: 'Get instant cricket help',
      icon: Bot,
      color: '#3B82F6',
      gradient: ['#3B82F6', '#1D4ED8'],
      route: '/ai-assistant',
      keywords: ['ai', 'assistant', 'help', 'chat', 'bot', 'questions'],
    },
    {
      id: 2,
      title: 'CricDR Coach',
      subtitle: 'Personal AI cricket coach',
      icon: UserCheck,
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      route: 'external',
      url: 'https://gleeful-cucurucho-a61064.netlify.app/',
      keywords: ['coach', 'training', 'personal', 'ai', 'cricket', 'practice'],
    },
    {
      id: 3,
      title: 'Live Scores',
      subtitle: 'Current matches',
      icon: Trophy,
      color: '#EF4444',
      gradient: ['#EF4444', '#DC2626'],
      route: '/scores',
      keywords: ['scores', 'live', 'matches', 'cricket', 'results', 'news'],
    },
    {
      id: 4,
      title: 'Cricket Boards',
      subtitle: 'Official boards',
      icon: Users,
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      route: '/cricket-boards',
      keywords: ['boards', 'icc', 'bcci', 'official', 'cricket', 'organizations'],
    },
    {
      id: 5,
      title: 'Learning Hub',
      subtitle: 'Master cricket skills',
      icon: Target,
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
      route: '/learning',
      keywords: ['learn', 'learning', 'skills', 'batting', 'bowling', 'fielding', 'videos', 'tutorials'],
    },
    {
      id: 6,
      title: 'Cricket Shopping',
      subtitle: 'Premium equipment',
      icon: ShoppingBag,
      color: '#DC2626',
      gradient: ['#DC2626', '#B91C1C'],
      route: '/shopping',
      keywords: ['shop', 'shopping', 'equipment', 'bats', 'gear', 'brands', 'buy'],
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Learning',
      description: 'Get personalized cricket coaching with our advanced AI assistant',
    },
    {
      icon: TrendingUp,
      title: 'Live Updates',
      description: 'Stay updated with real-time scores and cricket news',
    },
    {
      icon: Calendar,
      title: 'Match Schedules',
      description: 'Never miss a match with comprehensive scheduling',
    },
    {
      icon: Play,
      title: 'Interactive Learning',
      description: 'Learn through interactive content and practice sessions',
    },
  ];

  const handleQuickActionPress = async (action: any) => {
    if (action.route === 'external') {
      try {
        const supported = await Linking.canOpenURL(action.url);
        if (supported) {
          await Linking.openURL(action.url);
        } else {
          console.log(`Don't know how to open this URL: ${action.url}`);
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    } else {
      router.push(action.route);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    
    // Find matching action based on keywords
    const matchingAction = quickActions.find(action =>
      action.keywords.some(keyword => keyword.includes(query) || query.includes(keyword))
    );

    if (matchingAction) {
      handleQuickActionPress(matchingAction);
      setSearchQuery('');
    }
  };

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

  const openAboutModal = () => {
    setAboutModalVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeAboutModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setAboutModalVisible(false);
    });
  };

  const filteredActions = searchQuery.trim() 
    ? quickActions.filter(action =>
        action.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quickActions;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Header with New Image */}
        <View style={styles.heroContainer}>
          <Image 
            source={require('@/assets/images/india-champions-trophy-2025-win-1741546873.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.heroGradient}
            />
          </View>
        </View>

        {/* Header */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#A855F7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appTitle}>CricDR</Text>
            <Text style={styles.subtitle}>Your Ultimate Cricket Learning Companion</Text>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#9CA3AF" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for AI Assistant, Coach, Scores, Learning, Shopping..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Go</Text>
              </TouchableOpacity>
            )}
          </View>
          {searchQuery.length > 0 && (
            <Text style={styles.searchHint}>
              {filteredActions.length} result{filteredActions.length !== 1 ? 's' : ''} found
            </Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery.trim() ? 'Search Results' : 'Quick Actions'}
          </Text>
          <View style={styles.quickActionsGrid}>
            {filteredActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity 
                  key={action.id} 
                  style={styles.quickActionCard}
                  onPress={() => handleQuickActionPress(action)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.quickActionGradient}
                  >
                    <IconComponent size={28} color="#FFFFFF" strokeWidth={2} />
                  </LinearGradient>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                  {action.route === 'external' && (
                    <View style={styles.externalBadge}>
                      <ExternalLink size={12} color="#FFFFFF" strokeWidth={2} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          
          {searchQuery.trim() && filteredActions.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Search size={48} color="#9CA3AF" strokeWidth={2} />
              <Text style={styles.noResultsTitle}>No results found</Text>
              <Text style={styles.noResultsText}>
                Try searching for: AI Assistant, Coach, Scores, Learning, Shopping, or Cricket Boards
              </Text>
            </View>
          )}
        </View>

        {/* Features Section */}
        {!searchQuery.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why Choose CricDR?</Text>
            <View style={styles.featuresContainer}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <View key={index} style={styles.featureCard}>
                    <View style={styles.featureIconContainer}>
                      <IconComponent size={24} color="#8B5CF6" strokeWidth={2} />
                    </View>
                    <View style={styles.featureContent}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDescription}>{feature.description}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Stats Section */}
        {!searchQuery.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cricket at a Glance</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Cricket Boards</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>6</Text>
                <Text style={styles.statLabel}>Main Features</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>24/7</Text>
                <Text style={styles.statLabel}>Support</Text>
              </View>
            </View>
          </View>
        )}

        {/* Call to Action */}
        {!searchQuery.trim() && (
          <View style={styles.section}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.ctaCard}
            >
              <Text style={styles.ctaTitle}>Start Your Cricket Journey</Text>
              <Text style={styles.ctaDescription}>
                Join thousands of cricket enthusiasts learning with CricDR
              </Text>
              <TouchableOpacity 
                style={styles.ctaButton}
                onPress={() => handleQuickActionPress(quickActions[4])}
              >
                <Text style={styles.ctaButtonText}>Get Started</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}

        {/* Designer Section */}
        {!searchQuery.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Designed By</Text>
            <View style={styles.designerCard}>
              <TouchableOpacity 
                style={styles.profileImageContainer}
                onPress={openAboutModal}
                activeOpacity={0.8}
              >
                <Image 
                  source={require('@/assets/images/Debadatta Rout.jpg')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                <View style={styles.profileOverlay}>
                  <Text style={styles.profileOverlayText}>Tap to learn more</Text>
                </View>
              </TouchableOpacity>
              
              <View style={styles.designerInfo}>
                <Text style={styles.designerName}>Debadatta Rout</Text>
                <Text style={styles.designerTitle}>Frontend Developer & Creator</Text>
                
                <TouchableOpacity 
                  style={styles.portfolioButton}
                  onPress={() => handleLinkPress('https://dazzling-parfait-1076ae.netlify.app/')}
                >
                  <Globe size={20} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.portfolioButtonText}>View Portfolio</Text>
                </TouchableOpacity>
                
                <Text style={styles.followText}>Follow me at:</Text>
                
                <View style={styles.socialLinks}>
                  <TouchableOpacity 
                    style={styles.socialLink}
                    onPress={() => handleLinkPress('http://www.linkedin.com/in/debadatta-rout-454935341')}
                  >
                    <Linkedin size={24} color="#0077B5" strokeWidth={2} />
                    <Text style={styles.socialLinkText}>LinkedIn</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.socialLink}
                    onPress={() => handleLinkPress('https://www.instagram.com/debadatta22rout?igsh=azJyb3N1b3k5Y2Qw')}
                  >
                    <Instagram size={24} color="#E4405F" strokeWidth={2} />
                    <Text style={styles.socialLinkText}>Instagram</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.socialLink}
                    onPress={() => handleLinkPress('https://github.com/Debadatta22')}
                  >
                    <Github size={24} color="#333" strokeWidth={2} />
                    <Text style={styles.socialLinkText}>GitHub</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.socialLink}
                    onPress={() => handleLinkPress('mailto:routdebadatta22@gmail.com')}
                  >
                    <Mail size={24} color="#EA4335" strokeWidth={2} />
                    <Text style={styles.socialLinkText}>Email</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* About Me Modal */}
      <Modal
        visible={aboutModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeAboutModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              {
                opacity: modalAnimation,
                transform: [{
                  scale: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                }],
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.modalHeaderGradient}
              >
                <View style={styles.modalHeaderContent}>
                  <Image 
                    source={require('@/assets/images/Debadatta Rout.jpg')}
                    style={styles.modalProfileImage}
                    resizeMode="cover"
                  />
                  <View style={styles.modalHeaderText}>
                    <Text style={styles.modalName}>Debadatta Rout</Text>
                    <Text style={styles.modalTitle}>Frontend Developer & Creator</Text>
                  </View>
                  <TouchableOpacity onPress={closeAboutModal} style={styles.closeButton}>
                    <X size={24} color="#FFFFFF" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            
            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.modalBody}>
                {/* Introduction */}
                <View style={styles.aboutSection}>
                  <View style={styles.aboutSectionHeader}>
                    <User size={20} color="#8B5CF6" strokeWidth={2} />
                    <Text style={styles.aboutSectionTitle}>About Me</Text>
                  </View>
                  <Text style={styles.aboutText}>
                    Hello! I'm Debadatta Rout, a passionate and dedicated final-year B.Tech Computer Science Engineering student at C.V. Raman Global University. With a deep love for technology and cricket, I've combined my technical expertise with my passion for the sport to create CricDR.
                  </Text>
                </View>

                {/* Education */}
                <View style={styles.aboutSection}>
                  <View style={styles.aboutSectionHeader}>
                    <GraduationCap size={20} color="#10B981" strokeWidth={2} />
                    <Text style={styles.aboutSectionTitle}>Education</Text>
                  </View>
                  <View style={styles.educationItem}>
                    <Text style={styles.educationDegree}>B.Tech Computer Science Engineering</Text>
                    <Text style={styles.educationInstitute}>C.V. Raman Global University</Text>
                    <View style={styles.educationDetail}>
                      <CalendarIcon size={16} color="#9CA3AF" strokeWidth={2} />
                      <Text style={styles.educationYear}>Final Year (2021-2025)</Text>
                    </View>
                  </View>
                </View>

                {/* Technical Skills */}
                <View style={styles.aboutSection}>
                  <View style={styles.aboutSectionHeader}>
                    <Code size={20} color="#3B82F6" strokeWidth={2} />
                    <Text style={styles.aboutSectionTitle}>Technical Expertise</Text>
                  </View>
                  <Text style={styles.aboutText}>
                    I specialize in frontend web development with extensive experience in modern web technologies. My internship experience has provided me with hands-on knowledge of building scalable, user-friendly applications that solve real-world problems.
                  </Text>
                  <View style={styles.skillsContainer}>
                    {[
                      'React & React Native',
                      'JavaScript/TypeScript',
                      'HTML5 & CSS3',
                      'Frontend Frameworks',
                      'UI/UX Design',
                      'Responsive Design',
                      'API Integration',
                      'Version Control (Git)'
                    ].map((skill, index) => (
                      <View key={index} style={styles.skillTag}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* CricDR Project */}
                <View style={styles.aboutSection}>
                  <View style={styles.aboutSectionHeader}>
                    <Heart size={20} color="#EF4444" strokeWidth={2} />
                    <Text style={styles.aboutSectionTitle}>The CricDR Vision</Text>
                  </View>
                  <Text style={styles.aboutText}>
                    CricDR is my passion project that represents the perfect fusion of my technical skills and love for cricket. This comprehensive platform is designed to be a one-stop solution for cricket enthusiasts of all levels.
                  </Text>
                  
                  <View style={styles.projectFeatures}>
                    <Text style={styles.featuresTitle}>What makes CricDR special:</Text>
                    {[
                      'Custom AI-powered cricket assistants built from scratch',
                      'Comprehensive learning resources with curated videos and articles',
                      'Real-time live scores and cricket news integration',
                      'Complete cricket board information and league updates',
                      'Premium cricket equipment shopping recommendations',
                      'Beginner-friendly interface with professional-grade features'
                    ].map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <Text style={styles.featureBullet}>•</Text>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Goals & Aspirations */}
                <View style={styles.aboutSection}>
                  <View style={styles.aboutSectionHeader}>
                    <Award size={20} color="#F59E0B" strokeWidth={2} />
                    <Text style={styles.aboutSectionTitle}>Goals & Aspirations</Text>
                  </View>
                  <Text style={styles.aboutText}>
                    My goal is to make cricket knowledge accessible to everyone, from beginners taking their first steps into the sport to seasoned players looking to refine their skills. Through CricDR, I aim to bridge the gap between technology and sports education.
                  </Text>
                  <Text style={styles.aboutText}>
                    I'm constantly working to improve and expand CricDR's capabilities, incorporating user feedback and the latest technologies to provide the best possible experience for cricket enthusiasts worldwide.
                  </Text>
                </View>

                {/* Contact */}
                <View style={styles.aboutSection}>
                  <View style={styles.aboutSectionHeader}>
                    <Mail size={20} color="#8B5CF6" strokeWidth={2} />
                    <Text style={styles.aboutSectionTitle}>Let's Connect</Text>
                  </View>
                  <Text style={styles.aboutText}>
                    I'm always excited to connect with fellow developers, cricket enthusiasts, and anyone interested in the intersection of technology and sports. Feel free to reach out through any of the social platforms below!
                  </Text>
                  
                  <View style={styles.modalSocialLinks}>
                    <TouchableOpacity 
                      style={styles.modalSocialLink}
                      onPress={() => {
                        closeAboutModal();
                        handleLinkPress('http://www.linkedin.com/in/debadatta-rout-454935341');
                      }}
                    >
                      <Linkedin size={20} color="#0077B5" strokeWidth={2} />
                      <Text style={styles.modalSocialText}>LinkedIn</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.modalSocialLink}
                      onPress={() => {
                        closeAboutModal();
                        handleLinkPress('https://github.com/Debadatta22');
                      }}
                    >
                      <Github size={20} color="#333" strokeWidth={2} />
                      <Text style={styles.modalSocialText}>GitHub</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.modalSocialLink}
                      onPress={() => {
                        closeAboutModal();
                        handleLinkPress('mailto:routdebadatta22@gmail.com');
                      }}
                    >
                      <Mail size={20} color="#EA4335" strokeWidth={2} />
                      <Text style={styles.modalSocialText}>Email</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
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
  heroContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroGradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 5,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  searchButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  searchHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    marginLeft: 4,
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
    transform: [{ scale: 1 }],
    position: 'relative',
  },
  quickActionGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  externalBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
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
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2D2D44',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  ctaCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
  designerCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#8B5CF6',
  },
  profileOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderBottomLeftRadius: 57,
    borderBottomRightRadius: 57,
    paddingVertical: 8,
    alignItems: 'center',
  },
  profileOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  designerInfo: {
    alignItems: 'center',
  },
  designerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  designerTitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  portfolioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  portfolioButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  followText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D44',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  socialLinkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 500,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  modalHeader: {
    overflow: 'hidden',
  },
  modalHeaderGradient: {
    padding: 20,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 16,
  },
  modalHeaderText: {
    flex: 1,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalBody: {
    padding: 20,
  },
  aboutSection: {
    marginBottom: 24,
  },
  aboutSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  aboutSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  aboutText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    marginBottom: 12,
  },
  educationItem: {
    backgroundColor: '#0F0F23',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  educationDegree: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  educationInstitute: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 8,
  },
  educationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  educationYear: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#2D2D44',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  projectFeatures: {
    backgroundColor: '#0F0F23',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D44',
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  featureText: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
    flex: 1,
  },
  modalSocialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  modalSocialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2D44',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    minWidth: 100,
    justifyContent: 'center',
  },
  modalSocialText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
