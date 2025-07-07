import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Linking,
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ShoppingBag, 
  ExternalLink, 
  Star, 
  Search,
  Shield,
  Truck,
  CreditCard,
  Award,
  Target,
  Users,
  Globe
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ShoppingScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const cricketBrands = [
    {
      id: 1,
      name: 'SG (Sanspareils Greenlands)',
      description: 'Premium cricket equipment with heritage and quality',
      website: 'https://shop.teamsg.in/collections/cricket-store',
      category: 'Premium Brand',
      color: '#DC2626',
      gradient: ['#DC2626', '#EF4444'],
      speciality: 'Bats, Pads, Gloves',
      country: 'India',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'GM (Gunn & Moore)',
      description: 'English cricket heritage with modern innovation',
      website: 'https://gmcricket.in/',
      category: 'Heritage Brand',
      color: '#059669',
      gradient: ['#059669', '#10B981'],
      speciality: 'Professional Bats',
      country: 'England/India',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'SS/TON Cricket',
      description: 'Trusted by professionals worldwide',
      website: 'https://www.sstoncricket.com/',
      category: 'Professional',
      color: '#7C3AED',
      gradient: ['#7C3AED', '#8B5CF6'],
      speciality: 'Bats, Equipment',
      country: 'India',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Gray-Nicolls',
      description: 'Innovation in cricket equipment since 1855',
      website: 'https://www.gray-nicolls.co.uk/',
      category: 'Innovation Leader',
      color: '#1E40AF',
      gradient: ['#1E40AF', '#3B82F6'],
      speciality: 'Bats, Protective Gear',
      country: 'England',
      rating: 4.8,
    },
    {
      id: 5,
      name: 'Kookaburra',
      description: 'Australian excellence in cricket equipment',
      website: 'https://www.kookaburrasport.com.au/',
      category: 'Sports Excellence',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#FBBF24'],
      speciality: 'Balls, Bats, Equipment',
      country: 'Australia',
      rating: 4.9,
    },
    {
      id: 6,
      name: 'Masuri',
      description: 'Leading protective equipment specialists',
      website: 'https://www.masuri.com/',
      category: 'Safety Specialist',
      color: '#EF4444',
      gradient: ['#EF4444', '#F87171'],
      speciality: 'Helmets, Protection',
      country: 'England',
      rating: 4.6,
    },
    {
      id: 7,
      name: 'Shrey Sports',
      description: 'Quality cricket equipment for all levels',
      website: 'https://www.shreysports.in/catalogues',
      category: 'Quality Choice',
      color: '#10B981',
      gradient: ['#10B981', '#34D399'],
      speciality: 'Complete Range',
      country: 'India',
      rating: 4.5,
    },
  ];

  const ecommercePlatforms = [
    {
      id: 1,
      name: 'Amazon India',
      description: 'Vast selection of cricket equipment with fast delivery',
      website: 'https://www.amazon.in/cricket-equipment/s?k=cricket+equipment',
      category: 'E-commerce Giant',
      color: '#FF9900',
      gradient: ['#FF9900', '#FFB84D'],
      features: ['Fast Delivery', 'Easy Returns', 'Wide Selection'],
      rating: 4.3,
    },
    {
      id: 2,
      name: 'Flipkart',
      description: 'India\'s leading e-commerce platform for cricket gear',
      website: 'https://www.flipkart.com/cricket/pr?sid=dep,v5l,w5e',
      category: 'Indian Leader',
      color: '#047BD6',
      gradient: ['#047BD6', '#0EA5E9'],
      features: ['Local Delivery', 'EMI Options', 'Quality Assured'],
      rating: 4.2,
    },
  ];

  const specialtyRetailers = [
    {
      id: 1,
      name: 'Cricket Store Online',
      description: 'International cricket retailer with premium selection',
      website: 'https://cricketstoreonline.com/',
      category: 'International',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#A78BFA'],
      features: ['Global Shipping', 'Expert Advice', 'Premium Brands'],
      rating: 4.7,
    },
    {
      id: 2,
      name: 'Cricket Direct',
      description: 'UK-based cricket specialist with worldwide shipping',
      website: 'https://cricketdirect.co.uk/',
      category: 'UK Specialist',
      color: '#DC2626',
      gradient: ['#DC2626', '#F87171'],
      features: ['UK Quality', 'Expert Service', 'Fast Shipping'],
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Pro Direct Cricket',
      description: 'Professional cricket equipment supplier',
      website: 'https://www.prodirectcricket.com/',
      category: 'Professional',
      color: '#059669',
      gradient: ['#059669', '#34D399'],
      features: ['Pro Equipment', 'Team Discounts', 'Custom Orders'],
      rating: 4.6,
    },
    {
      id: 4,
      name: 'Top Cricket Store',
      description: 'Premium cricket equipment and accessories',
      website: 'https://topcricketstore.com/',
      category: 'Premium Store',
      color: '#7C3AED',
      gradient: ['#7C3AED', '#A78BFA'],
      features: ['Premium Quality', 'Expert Curation', 'Fast Service'],
      rating: 4.5,
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

  const filteredBrands = cricketBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEcommerce = ecommercePlatforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRetailers = specialtyRetailers.filter(retailer =>
    retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    retailer.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={12} color="#F59E0B" strokeWidth={2} fill="#F59E0B" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={12} color="#F59E0B" strokeWidth={2} fill="#F59E0B" />
      );
    }

    return stars;
  };

  const renderBrandCard = (brand: any) => (
    <TouchableOpacity
      key={brand.id}
      style={styles.brandCard}
      onPress={() => handleLinkPress(brand.website)}
    >
      <LinearGradient
        colors={brand.gradient}
        style={styles.brandHeader}
      >
        <View style={styles.brandHeaderContent}>
          <Text style={styles.brandName}>{brand.name}</Text>
          <ExternalLink size={20} color="#FFFFFF" strokeWidth={2} />
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{brand.category}</Text>
        </View>
      </LinearGradient>
      
      <View style={styles.brandContent}>
        <Text style={styles.brandDescription}>{brand.description}</Text>
        
        <View style={styles.brandDetails}>
          <View style={styles.detailRow}>
            <Target size={16} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.detailText}>{brand.speciality}</Text>
          </View>
          <View style={styles.detailRow}>
            <Globe size={16} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.detailText}>{brand.country}</Text>
          </View>
        </View>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(brand.rating)}
          </View>
          <Text style={styles.ratingText}>{brand.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPlatformCard = (platform: any) => (
    <TouchableOpacity
      key={platform.id}
      style={styles.platformCard}
      onPress={() => handleLinkPress(platform.website)}
    >
      <LinearGradient
        colors={platform.gradient}
        style={styles.platformHeader}
      >
        <View style={styles.platformHeaderContent}>
          <Text style={styles.platformName}>{platform.name}</Text>
          <ExternalLink size={20} color="#FFFFFF" strokeWidth={2} />
        </View>
      </LinearGradient>
      
      <View style={styles.platformContent}>
        <Text style={styles.platformDescription}>{platform.description}</Text>
        
        <View style={styles.featuresContainer}>
          {platform.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(platform.rating)}
          </View>
          <Text style={styles.ratingText}>{platform.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Cricket Shopping</Text>
          <Text style={styles.headerSubtitle}>
            Premium cricket equipment from trusted brands
          </Text>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#9CA3AF" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search brands, equipment, or stores..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Shield size={24} color="#10B981" strokeWidth={2} />
            <Text style={styles.featureLabel}>Authentic Products</Text>
          </View>
          <View style={styles.featureItem}>
            <Truck size={24} color="#3B82F6" strokeWidth={2} />
            <Text style={styles.featureLabel}>Fast Delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <CreditCard size={24} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.featureLabel}>Secure Payment</Text>
          </View>
          <View style={styles.featureItem}>
            <Award size={24} color="#8B5CF6" strokeWidth={2} />
            <Text style={styles.featureLabel}>Quality Assured</Text>
          </View>
        </View>

        {/* Cricket Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Cricket Brands</Text>
          <Text style={styles.sectionSubtitle}>Official brand stores and authorized dealers</Text>
          <View style={styles.cardsContainer}>
            {filteredBrands.map(renderBrandCard)}
          </View>
        </View>

        {/* E-commerce Platforms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>E-commerce Platforms</Text>
          <Text style={styles.sectionSubtitle}>Major online marketplaces with cricket equipment</Text>
          <View style={styles.cardsContainer}>
            {filteredEcommerce.map(renderPlatformCard)}
          </View>
        </View>

        {/* Specialty Retailers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialty Cricket Retailers</Text>
          <Text style={styles.sectionSubtitle}>Expert cricket equipment specialists</Text>
          <View style={styles.cardsContainer}>
            {filteredRetailers.map(renderPlatformCard)}
          </View>
        </View>

        {/* Shopping Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping Tips</Text>
          <View style={styles.tipsContainer}>
            {[
              'Always check product authenticity and seller ratings',
              'Compare prices across multiple platforms for best deals',
              'Read customer reviews before making purchases',
              'Check return and warranty policies',
              'Consider shipping costs and delivery times',
              'Look for seasonal sales and discounts',
            ].map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipNumber}>{index + 1}</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <ShoppingBag size={24} color="#8B5CF6" strokeWidth={2} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Shop with Confidence</Text>
              <Text style={styles.infoDescription}>
                All listed stores are reputable cricket equipment suppliers. 
                Always verify seller authenticity and read reviews before purchasing.
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
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 16,
  },
  brandCard: {
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
  brandHeader: {
    padding: 20,
  },
  brandHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  brandContent: {
    padding: 20,
  },
  brandDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  brandDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  platformCard: {
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
  platformHeader: {
    padding: 20,
  },
  platformHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  platformContent: {
    padding: 20,
  },
  platformDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  featureTag: {
    backgroundColor: '#2D2D44',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8B5CF6',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    flex: 1,
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
