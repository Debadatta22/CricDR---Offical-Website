import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Linking 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { Bot, MessageCircle, Mic, ArrowLeft, Smartphone, Brain, Target, ChartBar as BarChart3, Eye, Gamepad2, Users } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

type AgentType = 'standalone' | 'chatbot' | 'voice' | 'app' | null;

export default function AIAssistantScreen() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null);

  const myAgents = [
    {
      id: 'standalone',
      title: 'Standalone Agent',
      description: 'Full-featured cricket assistant with comprehensive knowledge base',
      icon: Bot,
      color: '#3B82F6',
      gradient: ['#6366F1', '#8B5CF6'],
      url: 'https://agent.jotform.com/0196f86b39ab78a3b92abb9c1e09ce325780',
    },
    {
      id: 'chatbot',
      title: 'Chatbot Agent',
      description: 'Interactive chat interface for quick cricket questions',
      icon: MessageCircle,
      color: '#10B981',
      gradient: ['#8B5CF6', '#A855F7'],
      url: 'https://agent.jotform.com/0196f86b39ab78a3b92abb9c1e09ce325780',
    },
    {
      id: 'voice',
      title: 'Voice Agent',
      description: 'Voice-powered cricket assistant for hands-free interaction',
      icon: Mic,
      color: '#F59E0B',
      gradient: ['#A855F7', '#C084FC'],
      url: 'https://agent.jotform.com/0196f86b39ab78a3b92abb9c1e09ce325780/voice',
    },
    {
      id: 'app',
      title: 'Agent App',
      description: 'Mobile app version of the cricket assistant',
      icon: Smartphone,
      color: '#8B5CF6',
      gradient: ['#C084FC', '#DDD6FE'],
      url: 'https://www.jotform.com/app/251556456042456',
    },
  ];

  const existingAIAssistants = [
    {
      id: 'gemini',
      title: 'Google Gemini',
      description: 'Use for accurate information using deep research and comprehensive cricket knowledge',
      icon: Brain,
      color: '#4285F4',
      gradient: ['#4285F4', '#34A853'],
      url: 'https://gemini.google.com/',
    },
    {
      id: 'fulltrack',
      title: 'Fulltrack AI',
      description: 'AI-powered ball tracking and analytics using iPhone/iPad for professional-grade performance data',
      icon: Target,
      color: '#FF6B35',
      gradient: ['#FF6B35', '#F59E0B'],
      url: 'https://www.fulltrack.ai/',
    },
    {
      id: 'cricketai',
      title: 'Cricket AI - Stats & Predictions',
      description: 'Specialized digital assistant for real-time statistics, player profiles, and predictive insights',
      icon: BarChart3,
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      url: 'https://www.yeschat.ai/gpts-2OToA3Qi1Y-Cricket-AI',
    },
    {
      id: 'visionai',
      title: 'Vision AI',
      description: 'Advanced ball tracking and video processing for precise cricket analysis and coaching insights',
      icon: Eye,
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#A855F7'],
      url: 'https://www.nvplay.com/visionai',
    },
    {
      id: 'gameface',
      title: 'GameFace AI',
      description: 'Data-driven video analysis platform for batting, bowling, fielding analysis and predictive recommendations',
      icon: Gamepad2,
      color: '#EF4444',
      gradient: ['#EF4444', '#DC2626'],
      url: 'https://gameface.ai/cricket',
    },
    {
      id: 'cricketcoach',
      title: 'AI CricketCoach',
      description: 'AI-powered cricket coaching app with personalized training programs and performance analysis',
      icon: Users,
      color: '#7C3AED',
      gradient: ['#7C3AED', '#8B5CF6'],
      url: 'https://aicricketcoach.com/',
    },
  ];

  const handleAgentPress = async (agent: any) => {
    try {
      const supported = await Linking.canOpenURL(agent.url);
      if (supported) {
        await Linking.openURL(agent.url);
      } else {
        console.log(`Don't know how to open this URL: ${agent.url}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const getWebViewSource = (agentType: AgentType) => {
    const agent = myAgents.find(a => a.id === agentType);
    if (!agent) return { uri: '' };

    if (agentType === 'chatbot') {
      return {
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; background: #0F0F23; }
                #chatbot-container { width: 100%; height: 100vh; }
              </style>
            </head>
            <body>
              <div id="chatbot-container"></div>
              <script src='https://cdn.jotfor.ms/agent/embedjs/0196f86b39ab78a3b92abb9c1e09ce325780/embed.js?skipWelcome=1&maximizable=1'></script>
            </body>
          </html>
        `
      };
    } else {
      const embedUrl = agentType === 'voice' 
        ? `${agent.url}?embedMode=iframe&background=1&shadow=1`
        : `${agent.url}?embedMode=iframe&background=1&shadow=1`;
      
      return {
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { margin: 0; padding: 0; background: #0F0F23; }
                iframe { width: 100%; height: 100vh; border: none; }
              </style>
            </head>
            <body>
              <iframe 
                src="${embedUrl}"
                title="CRICDR: Cricket GPT Assistant"
                allowtransparency="true" 
                allow="geolocation; microphone; camera; fullscreen"
                scrolling="no">
              </iframe>
              <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'></script>
            </body>
          </html>
        `
      };
    }
  };

  if (selectedAgent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webViewHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedAgent(null)}
          >
            <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.webViewTitle}>
            {myAgents.find(a => a.id === selectedAgent)?.title}
          </Text>
        </View>
        <WebView
          source={getWebViewSource(selectedAgent)}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>My AI Agent</Text>
          <Text style={styles.headerSubtitle}>
            Choose your preferred cricket assistant
          </Text>
        </LinearGradient>

        {/* My Designed AI Agents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Designed AI Agents</Text>
          <View style={styles.agentsContainer}>
            {myAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <TouchableOpacity
                  key={agent.id}
                  style={styles.agentCard}
                  onPress={() => handleAgentPress(agent)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={agent.gradient}
                    style={styles.agentIconContainer}
                  >
                    <IconComponent size={32} color="#FFFFFF" strokeWidth={2} />
                  </LinearGradient>
                  <View style={styles.agentContent}>
                    <Text style={styles.agentTitle}>{agent.title}</Text>
                    <Text style={styles.agentDescription}>{agent.description}</Text>
                  </View>
                  <View style={styles.agentArrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Existing AI Assistants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Existing AI Assistants & Websites</Text>
          <View style={styles.agentsContainer}>
            {existingAIAssistants.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <TouchableOpacity
                  key={agent.id}
                  style={styles.agentCard}
                  onPress={() => handleAgentPress(agent)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={agent.gradient}
                    style={styles.agentIconContainer}
                  >
                    <IconComponent size={32} color="#FFFFFF" strokeWidth={2} />
                  </LinearGradient>
                  <View style={styles.agentContent}>
                    <Text style={styles.agentTitle}>{agent.title}</Text>
                    <Text style={styles.agentDescription}>{agent.description}</Text>
                  </View>
                  <View style={styles.agentArrow}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Our AI Can Help With</Text>
          <View style={styles.featuresGrid}>
            {[
              'Cricket Rules & Regulations',
              'Batting Techniques',
              'Bowling Strategies',
              'Fielding Positions',
              'Match Analysis',
              'Player Statistics',
              'Tournament Information',
              'Training Tips',
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureText}>• {feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Bot size={24} color="#8B5CF6" strokeWidth={2} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Powered by Advanced AI</Text>
              <Text style={styles.infoDescription}>
                Our cricket AI agents are trained on comprehensive cricket knowledge 
                to provide accurate and helpful assistance for all your cricket-related queries.
              </Text>
            </View>
          </View>
        </View>

        {/* Usage Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use</Text>
          <View style={styles.instructionsContainer}>
            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Choose your preferred AI agent from the options above</Text>
            </View>
            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Tap on the agent card to open it in your browser</Text>
            </View>
            <View style={styles.instructionStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Start asking your cricket-related questions and get instant help</Text>
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
  agentsContainer: {
    gap: 16,
  },
  agentCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2D2D44',
    transform: [{ scale: 1 }],
  },
  agentIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentContent: {
    flex: 1,
  },
  agentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  agentDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  agentArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2D2D44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
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
  instructionsContainer: {
    gap: 16,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    flex: 1,
  },
  webViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  webViewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
});
