import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Linking,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BookOpen, 
  Play, 
  Target, 
  Users, 
  Trophy,
  ExternalLink,
  ChevronRight,
  Video,
  FileText,
  ArrowLeft,
  Clock,
  Star
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LearningScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'videos' | 'reading'>('videos');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<'batting' | 'bowling' | 'fielding' | 'keeping' | null>(null);
  const [selectedReadingCategory, setSelectedReadingCategory] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const videoCategories = [
    { id: 'batting', title: 'Batting', icon: Target, color: '#EF4444', gradient: ['#EF4444', '#DC2626'] },
    { id: 'bowling', title: 'Bowling', icon: Trophy, color: '#10B981', gradient: ['#10B981', '#059669'] },
    { id: 'fielding', title: 'Fielding', icon: Users, color: '#3B82F6', gradient: ['#3B82F6', '#1D4ED8'] },
    { id: 'keeping', title: 'Keeping', icon: Target, color: '#8B5CF6', gradient: ['#8B5CF6', '#7C3AED'] },
  ];

  const battingVideos = [
    {
      id: 1,
      title: 'SCORE MORE RUNS by LEARNING how to run between the wickets',
      description: 'In this video we will be teaching you the basics of how to run between the wickets. By improving your running between the wickets, you will put more pressure on the fielders and increase the amount of singles and twos you can get per innings, ultimately allowing you to score more runs!',
      url: 'https://youtu.be/o-4Kc-ECEBE?si=tkxKUv-aL8lv0AUA',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 2,
      title: 'How to hit more GAPS - Cricket Batting Basics',
      description: 'In this video we will be teaching you all how to hit more gaps when batting. Hitting gaps is a cricket batting basics skill that every player needs to work on to achieve greater success when at the crease.',
      url: 'https://youtu.be/OXSrxewFzaA?si=bMzr-fZwfICaU_sx',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 3,
      title: 'How to bat against LEG SPIN',
      description: 'In this video we will be covering how to bat against leg spin bowling. We will be covering the strike rotation options as well as the boundary scoring options.',
      url: 'https://youtu.be/RiZ7sSeldmw?si=Cgc_IUJeE9vg-L74',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 4,
      title: 'Cricket Grip and Stance Basics - Variations Explained',
      description: 'In this video we are going to look at some basic cricket grip and stance variations. We are going to explain what each grip and stance is used for.',
      url: 'https://youtu.be/ILdPV1IozS0?si=50a40kpptytaaLTS',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 5,
      title: 'Chapter 1: Get a Grip 🏏 From AB to 360',
      description: 'Learn the fundamentals of cricket grip from AB de Villiers, one of the greatest batsmen of all time.',
      url: 'https://www.youtube.com/embed/Q8WXoX2p3Ac?si=f0s107VQ33dRUoXW',
      credit: 'AB de Villiers 360',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 6,
      title: 'Chapter 2: Take a Stance 🏏 From AB to 360',
      description: 'Master the perfect batting stance with guidance from AB de Villiers.',
      url: 'https://www.youtube.com/embed/rYDEJN3PMTM?si=STn5NTtoveQpu0uN',
      credit: 'AB de Villiers 360',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 7,
      title: 'Decoding VIRAT KOHLI\'S Trigger Movement in Hindi',
      description: 'In this video we will help you increase your batting power. We will do this by taking you through 3 common mistakes made by players in their backlift swing and follow through.',
      url: 'https://www.youtube.com/embed/2c9GQNk8REQ?si=FSaxXUKZNKvvsYOz',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 8,
      title: 'Virat Kohli: The Complete Batsman | Batting masterclass',
      description: 'Nasser Hussain chats with India batting great Virat Kohli about his approach to batting, his mastering of the run chase, and his captaincy of India.',
      url: 'https://www.youtube.com/embed/m8u-18Q0s7I?si=eb-t3aBDbMlLSd4O',
      credit: 'Sky Sports',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 9,
      title: 'Teaching From Master Blaster Sachin Tendulkar',
      description: 'Learn batting techniques from the legendary Sachin Tendulkar.',
      url: 'https://www.youtube.com/embed/90CXYv2OkXc?si=mX-tJWEEtDFUMju2',
      credit: 'Sachin Tendulkar',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 10,
      title: 'How to JUDGE LENGTH - Cricket Batting Drills and Tips',
      description: 'In this video we will be covering some batting drills and tips that will help you all improve judging length when batting.',
      url: 'https://youtu.be/wH6fiC-P9Bo?si=ZObc2k7ps5DwiT5B',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 11,
      title: 'How to make a batting GAMEPLAN - Batting Mindset',
      description: 'In this video we are going to take you all through the process of making a batting gameplan.',
      url: 'https://youtu.be/MnpxzK2HYR8?si=aoxBlOtqeglo6Xmn',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 12,
      title: '5 CRICKET BATTING TIPS that will help YOU IMPROVE TODAY!!!',
      description: 'In this video we will cover 5 cricket batting tips. By focusing on these 5 tips and doing the batting drills at each, you can improve your batting today.',
      url: 'https://youtu.be/KY8gsVeKn0w?si=oF7109kS8r__RwMi',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 13,
      title: 'How to play SPIN BOWLING - Full Batting Guide',
      description: 'In this video we will teach you all how to play spin bowling. This full batting guide will help you to master batting against spin bowling.',
      url: 'https://youtu.be/Nx7gcnTT_Nw?si=9zekF89Ixil5wmzf',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 14,
      title: 'Learning to Bat from Scratch in Cricket',
      description: 'In this video Byron takes me through a full batting session as I attempt to learn how to bat left handed.',
      url: 'https://youtu.be/k2zkxcgIf5Q?si=OzGforDI9dTS57Sp',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 15,
      title: 'Improve YOUR POWER | 3 common SWING MISTAKES',
      description: 'In this video we will help you increase your batting power. We will do this by taking you through 3 common mistakes made by players in their backlift swing and follow through.',
      url: 'https://youtu.be/nE8mt-X5kxI?si=vPHm60exV8k8H0KO',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
  ];

  const bowlingVideos = [
    {
      id: 1,
      title: 'Bowling run up Basics | How to get your PERFECT run up',
      description: 'In this video we will teach you how to get your perfect bowling run up. This works for both fast bowling and spin bowling.',
      url: 'https://youtu.be/GHrx4sUhx9c?si=7tjGMfNzv_67sRE4',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 2,
      title: 'Improve bowling LINE and LENGTH for ALL BOWLERS',
      description: 'In this video we will give you some bowling drills that will help you improve your line and length ultimately making you a more consistent bowler.',
      url: 'https://youtu.be/xgSLPf-1ZHQ?si=SBCcJWkLeWsYbAAH',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 3,
      title: 'STOP BOWLING WIDES TODAY!!! - Do These Drills',
      description: 'In this video we will be covering some fast bowling drills that will help you to stop bowling wides.',
      url: 'https://youtu.be/2aS3AByjONY?si=UgqO3ikqMcNlMqqI',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 4,
      title: 'Developing a Bowling Gameplan - Spin Bowling & Fast Bowling',
      description: 'In this video we will be coving the development of a bowling gameplan. This is not limited to only spin bowling or fast bowling but covers bowling as a whole.',
      url: 'https://youtu.be/dC3Fl5nEUnw?si=iOgLtGRnwteRVzLK',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 5,
      title: 'FIX lower back pain when BOWLING | Fast Bowling Injury Prevention',
      description: 'In this video we will be covering 3 reasons as to why you get lower back pain when bowling. We will also cover some bowling drills that will help you prevent those bowling injuries in the future.',
      url: 'https://youtu.be/tOmZs3r9drg?si=l_YctsIZx4vPKQiO',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 6,
      title: '5 Reasons you are not taking wickets - Full bowling session',
      description: 'In this video we will cover 5 reasons you are not taking wickets. By focusing and improving on the 5 reasons mentioned in this video, you will take more wickets and become a better bowler.',
      url: 'https://youtu.be/dpMJu3IT5mQ?si=Gpho-mYFGnd0HHom',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 7,
      title: 'YOU CAN LEARN to bowl ANY VARIATION | Cricket Bowling Drills',
      description: 'In this video we will take you through a full cricket bowling drills session. By doing this full session and using the stages we covered, you can learn to bowl any variation is cricket.',
      url: 'https://youtu.be/CJNjCuJUVNM?si=sMhHdK0qy42F2ByO',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 8,
      title: 'The BEST way to PRACTICE BOWLING for Cricketers',
      description: 'This video will cover the absolute best way for you to practice your bowling as a aspiring cricket player.',
      url: 'https://youtu.be/dPOo79b1UcM?si=d6XSrKprx8_Y5-1Q',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 9,
      title: '5 MENTAL TIPS to help you improve your bowling | Bowling Mentality',
      description: 'In this video we will be covering 5 cricket bowling mental tips that can help you change the way you think about bowling.',
      url: 'https://youtu.be/lyrv2Qq6jrQ?si=CQjtfBT42haxlvpC',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 10,
      title: 'DEATH BOWLING TIPS - How to bowl YORKERS & Restrict Runs',
      description: 'In this video we will be covering how to bowl at the death as a fast bowler, specifically to players that like hitting towards the leg side.',
      url: 'https://youtu.be/HlDVCiU2JWE?si=JF13C2HZMhlDUNIS',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 11,
      title: 'Mastering SWING BOWLING an Ultimate FAST BOWLING Guide',
      description: 'In this video we will take you through a full fast bowling guide that will teach you everything you need to know about swing bowling.',
      url: 'https://youtu.be/CuyJMGyBSuw?si=MlKxX7ReQ68pjIA3',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 12,
      title: 'Improve SPEED & CONSISTENCY for FAST BOWLING',
      description: 'In this video we take you through a fast bowling drill set that will help you improve your speed and consistency when bowling.',
      url: 'https://youtu.be/hgMSJDYRY6o?si=yh7nUXP3CYCNZx7a',
      credit: '@coachcricxi',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 13,
      title: 'HOW TO AVOID INJURIES I BRETT LEE TV I CRICKET',
      description: 'Learn injury prevention techniques from fast bowling legend Brett Lee.',
      url: 'https://youtu.be/7LFeM-RZWA8?si=5QgEzYX1h5MRdX_f',
      credit: 'Brett Lee',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 14,
      title: 'Right Arm Off Spin & Variations Master Class',
      description: 'Master class on off spin bowling techniques and variations.',
      url: 'https://youtu.be/J1v3rDUTFbM?si=6hmptzN3D4yRyb78',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 15,
      title: 'Lyon Master Class: Off-spin',
      description: 'Learn off-spin bowling from Australian spinner Nathan Lyon.',
      url: 'https://youtu.be/0kH_QwWtF7U?si=33DrS5ozsYrRy7ba',
      credit: 'Nathan Lyon',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 16,
      title: 'Shane Warne - King Of Spin - Leg Spin Tutorial',
      description: 'Learn from the master of leg spin bowling with Shane Warne\'s comprehensive tutorial.',
      url: 'https://youtu.be/AyHX7GsrMlo?si=OWScXF_zqbm-uiOB',
      credit: 'Shane Warne',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
  ];

  const fieldingVideos = [
    {
      id: 1,
      title: 'Bailey Master Class: Fielding',
      description: 'Learn fielding techniques from one of the best fielders in cricket history.',
      url: 'https://youtu.be/pyjZ-9eO5FI?si=QiakYn92qVj3uHuF',
      credit: 'George Bailey',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 2,
      title: 'ULTIMATE Cricket Fielding GUIDE - PERFECT CRICKET FIELDING BASICS',
      description: 'Complete guide to cricket fielding basics and techniques for all positions.',
      url: 'https://youtu.be/zKo2vy4cjdo?si=gUMN2-ei35kPkZ9X',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 3,
      title: 'Secret Of Great Fielding',
      description: 'Discover the secrets behind great fielding and how to improve your fielding skills.',
      url: 'https://youtu.be/sODzH9SQj9w?si=1wWOQhzi43oSMUJc',
      credit: 'Cricket Expert',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 4,
      title: 'Improve Your Close Catching',
      description: 'Master the art of close catching with these essential tips and techniques.',
      url: 'https://youtu.be/4zClgpMvEG8?si=pwPTYtQqaPiT9lB0',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 5,
      title: 'Be A Great Close In Fielder',
      description: 'Learn the techniques to become an excellent close-in fielder.',
      url: 'https://youtu.be/o0TKDJITvH8?si=OR7OmczCdKCLgYKY',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 6,
      title: 'Attacking Field Drill To Become a Great Fielder',
      description: 'Practice attacking fielding drills to improve your overall fielding performance.',
      url: 'https://youtu.be/2pRxBl0o1rI?si=GSiiYjVN4oSCxITY',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 7,
      title: 'Basics Of High Catching',
      description: 'Master the fundamentals of high catching in cricket.',
      url: 'https://youtu.be/DYFQkkoCcbw?si=cyYMgbxMNz5PiWNm',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 8,
      title: 'Learn Powerful Accurate Throw',
      description: 'Develop powerful and accurate throwing techniques for better fielding.',
      url: 'https://youtu.be/UfaVeL923BU?si=A4Epz3HTWAUXabUZ',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 9,
      title: 'Cricket Fielding Drills: How To Dive In Cricket',
      description: 'Learn proper diving techniques and field the ball with perfect technique.',
      url: 'https://youtu.be/pnoigzECNn4?si=cUEezZASlE_PY-uA',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
  ];

  const keepingVideos = [
    {
      id: 1,
      title: 'WICKET KEEPING BASICS AND TECHNIQUES',
      description: 'Learn the fundamental techniques and basics of wicket keeping.',
      url: 'https://youtu.be/xEiQ_-gJmek?si=UBP8JdyFH6JehD_X',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 2,
      title: 'WICKET KEEPING ON SPINNER | WICKET KEEPING DRILLS FOR BEGINNERS',
      description: 'Specialized techniques for keeping to spin bowling with beginner-friendly drills.',
      url: 'https://youtu.be/oQHT4xysp3k?si=K31_VNoKvuXJRsE1',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 3,
      title: 'Drills for a Wicket Keeper',
      description: 'Essential drills to improve your wicket keeping skills.',
      url: 'https://youtu.be/qtWe17LbUh8?si=DSbU_mR2aTGgPf0l',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 4,
      title: 'WICKET KEEPING ON FAST BOWLING',
      description: 'Master the techniques required for keeping to fast bowling.',
      url: 'https://youtu.be/WieiKSttATA?si=Zeu9PqHgIxcHuZHA',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 5,
      title: 'Wicketkeeping BASICS & TECHNIQUES | How To Become A Better Wicketkeeper',
      description: 'Comprehensive guide to becoming a better wicketkeeper with essential techniques.',
      url: 'https://youtu.be/KqkGpG56p5w?si=ywXCt8FIDRqxQ9Xh',
      credit: 'Cricket Coach',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
    {
      id: 6,
      title: 'Wicketkeeping BASICS & TECHNIQUES | Deep Dasgupta Masterclass',
      description: 'Learn from former Indian wicket-keeper Deep Dasgupta in this comprehensive masterclass.',
      url: 'https://youtu.be/TbDXAmgQmg4?si=NLrOlf9oluyBCbEg',
      credit: 'Deep Dasgupta',
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg',
    },
  ];

  const readingCategories = [
    {
      id: 1,
      title: 'Cricket Rules & Regulations',
      description: 'Complete guide to cricket laws and regulations',
      icon: BookOpen,
      color: '#3B82F6',
      articles: 15,
      content: [
        {
          id: 1,
          title: 'Basic Cricket Rules for Beginners',
          readTime: '8 min read',
          difficulty: 'Beginner',
          content: `Cricket is a bat-and-ball game played between two teams of eleven players each. The game is played on a circular or oval-shaped field with a 22-yard pitch in the center.

**Basic Objective:**
The team that scores the most runs wins the match. One team bats while the other team bowls and fields.

**Key Components:**

1. **The Pitch:** A 22-yard long strip in the center of the field
2. **Wickets:** Three wooden stumps with two bails on top at each end
3. **Crease:** Lines marked on the pitch for batting and bowling

**Basic Rules:**

- Each team gets to bat and bowl
- The batting team tries to score runs
- The bowling team tries to get the batsmen out
- An innings ends when 10 batsmen are out or overs are completed
- The team with the most runs wins

**Ways to Get Out:**
- Bowled (ball hits the stumps)
- Caught (fielder catches the ball before it bounces)
- LBW (Leg Before Wicket)
- Run out (stumps broken while running)
- Stumped (wicket-keeper breaks stumps)

Understanding these basics will help you enjoy and follow cricket matches better.`
        },
        {
          id: 2,
          title: 'Understanding LBW (Leg Before Wicket)',
          readTime: '6 min read',
          difficulty: 'Intermediate',
          content: `LBW is one of the most complex rules in cricket. A batsman can be given out LBW if the ball hits their leg (or any part of their body) before hitting the bat, and the umpire believes the ball would have gone on to hit the stumps.

**Key Conditions for LBW:**

1. **Ball must pitch in line or outside off stump** (not outside leg stump)
2. **Ball must hit the batsman in line with the stumps** (between wicket and wicket)
3. **Ball must be going on to hit the stumps** (trajectory analysis)

**Exceptions:**
- If the ball pitches outside leg stump, it's not out
- If the batsman is well forward and the ball hits outside the line of off stump, and they're playing a shot, it's not out
- If the ball is clearly going over the stumps, it's not out

**DRS (Decision Review System):**
Modern cricket uses technology to help umpires make LBW decisions:
- Ball tracking shows the path of the ball
- Umpire's call applies when the decision is marginal
- Teams can review LBW decisions

Understanding LBW helps you appreciate the tactical battle between bowler and batsman.`
        },
        {
          id: 3,
          title: 'Cricket Field Positions and Their Names',
          readTime: '10 min read',
          difficulty: 'Intermediate',
          content: `Cricket has numerous fielding positions, each with specific names and purposes. Understanding these positions helps you follow the game's strategy.

**Close-in Positions (Near the Batsman):**
- **Slip:** Behind the batsman on the off side
- **Gully:** Between slip and point
- **Short leg:** Close to the batsman on the leg side
- **Silly point:** Very close on the off side

**Ring Field Positions:**
- **Cover:** On the off side, covering drives
- **Mid-off:** Straight on the off side
- **Mid-on:** Straight on the leg side
- **Square leg:** Side-on to the batsman on the leg side
- **Point:** Square on the off side

**Boundary Positions:**
- **Long-off:** Deep straight on the off side
- **Long-on:** Deep straight on the leg side
- **Deep cover:** Deep on the off side
- **Fine leg:** Deep behind square on the leg side
- **Third man:** Deep behind the wicket on the off side

**Strategic Positioning:**
- Attacking fields have more close catchers
- Defensive fields spread fielders to the boundary
- Captains adjust fields based on batsman's strengths
- Different formats require different field strategies

Learning these positions helps you understand the captain's tactical decisions during matches.`
        }
      ]
    },
    {
      id: 2,
      title: 'Batting Techniques',
      description: 'Master the art of batting with detailed guides',
      icon: Target,
      color: '#EF4444',
      articles: 12,
      content: [
        {
          id: 1,
          title: 'Perfect Batting Stance and Grip',
          readTime: '7 min read',
          difficulty: 'Beginner',
          content: `The foundation of good batting lies in having the correct stance and grip. These fundamentals determine your balance, timing, and shot execution.

**The Batting Grip:**

1. **Top Hand (Left hand for right-handed batsmen):**
   - Place the 'V' formed by thumb and forefinger pointing toward the right shoulder
   - Grip should be firm but not tight
   - This hand controls the direction of the shot

2. **Bottom Hand (Right hand for right-handed batsmen):**
   - 'V' should point between right shoulder and right ear
   - Provides power to the shots
   - Should complement the top hand, not dominate

**The Batting Stance:**

1. **Feet Position:**
   - Stand sideways to the bowler
   - Feet shoulder-width apart
   - Weight evenly distributed
   - Front foot pointing toward cover region

2. **Body Position:**
   - Shoulders parallel to the crease
   - Head steady and level
   - Eyes level and watching the bowler
   - Knees slightly bent for balance

3. **Bat Position:**
   - Bat should be held straight
   - Toe of the bat touching the ground
   - Hands at comfortable height

**Common Mistakes:**
- Gripping the bat too tightly
- Standing too square or too side-on
- Uneven weight distribution
- Moving before the ball is bowled

Practice these fundamentals regularly to build muscle memory and improve your batting consistency.`
        },
        {
          id: 2,
          title: 'Playing Spin Bowling Effectively',
          readTime: '9 min read',
          difficulty: 'Advanced',
          content: `Playing spin bowling requires different techniques compared to pace bowling. Success against spin depends on reading the ball, footwork, and shot selection.

**Reading the Spinner:**

1. **Watch the Hand:**
   - Observe the bowler's grip and wrist position
   - Look for variations in release point
   - Notice changes in arm speed

2. **Reading from the Pitch:**
   - Watch the ball's trajectory
   - Observe how much the ball turns
   - Note the bounce and pace off the pitch

**Footwork Against Spin:**

1. **Forward Defense:**
   - Get to the pitch of the ball
   - Smother the spin
   - Keep bat and pad close together

2. **Back Foot Play:**
   - Go deep in the crease
   - Allow the ball to turn
   - Play late with soft hands

3. **Use of Feet:**
   - Step out to drive
   - Go back to cut and pull
   - Stay balanced throughout

**Shot Selection:**

1. **Attacking Options:**
   - Drive when the ball is full
   - Sweep when the ball is on the stumps
   - Cut when the ball is short and wide

2. **Defensive Options:**
   - Forward defense for good length balls
   - Back foot defense for short balls
   - Leaving balls outside off stump

**Mental Approach:**
- Be patient and wait for loose balls
- Build pressure on the bowler
- Rotate strike regularly
- Don't let the bowler settle into a rhythm

Mastering spin bowling takes time and practice, but these techniques will help you become more confident against all types of spin.`
        }
      ]
    },
    {
      id: 3,
      title: 'Bowling Strategies',
      description: 'Learn different bowling techniques and strategies',
      icon: Trophy,
      color: '#10B981',
      articles: 10,
      content: [
        {
          id: 1,
          title: 'Fast Bowling Fundamentals',
          readTime: '8 min read',
          difficulty: 'Intermediate',
          content: `Fast bowling is about rhythm, accuracy, and generating pace. Success comes from perfecting your action and understanding how to use pace as a weapon.

**The Bowling Action:**

1. **Run-up:**
   - Smooth, rhythmic approach
   - Gradually build up speed
   - Consistent length and timing
   - Stay relaxed and balanced

2. **Delivery Stride:**
   - Front foot lands parallel to the crease
   - Knee drives toward the target
   - Back foot parallel to the crease
   - Maintain balance throughout

3. **Release:**
   - High arm action
   - Release the ball at the highest point
   - Follow through toward the target
   - Keep head steady and eyes on target

**Line and Length:**

1. **Good Length:**
   - Ball pitches 4-6 meters from the batsman
   - Forces batsman to make a decision
   - Creates uncertainty about forward or back

2. **Line Options:**
   - Off stump line: Forces edges
   - Middle stump: Targets the stumps
   - Leg stump: Cramps the batsman

**Bowling Variations:**

1. **Swing Bowling:**
   - Conventional swing: Ball moves in the air
   - Reverse swing: Ball moves opposite direction
   - Requires proper seam position and wrist action

2. **Seam Bowling:**
   - Ball moves off the pitch
   - Depends on seam position and pitch conditions
   - Effective on green or uneven surfaces

**Building Pressure:**
- Bowl consistent line and length
- Build dot ball pressure
- Force batsman into mistakes
- Use field placements strategically

Fast bowling requires dedication to fitness and technique, but mastering these fundamentals will make you a formidable bowler.`
        }
      ]
    },
    {
      id: 4,
      title: 'Fielding Positions',
      description: 'Understanding field placements and positions',
      icon: Users,
      color: '#F59E0B',
      articles: 8,
      content: [
        {
          id: 1,
          title: 'Strategic Field Placements',
          readTime: '6 min read',
          difficulty: 'Intermediate',
          content: `Field placement is a crucial tactical element in cricket. The captain must position fielders to maximize the chances of taking wickets while minimizing scoring opportunities.

**Attacking Field Settings:**

1. **For Pace Bowlers:**
   - Multiple slips for edges
   - Gully for thick edges
   - Short leg for inside edges
   - Close catchers around the bat

2. **For Spin Bowlers:**
   - Slip and close-in fielders
   - Short leg and silly point
   - Deep fielders for big shots
   - Leg slip for gloves and inside edges

**Defensive Field Settings:**

1. **Boundary Protection:**
   - Fielders on the boundary
   - Cover deep areas where batsman scores
   - Reduce boundary scoring opportunities
   - Force singles and twos

2. **Ring Field:**
   - Fielders in the circle
   - Cut off quick singles
   - Build pressure through dot balls
   - Force risky shots

**Format-Specific Fields:**

1. **Test Cricket:**
   - More attacking fields
   - Close catchers for wickets
   - Patience to build pressure
   - Field changes based on conditions

2. **Limited Overs:**
   - Balance between attack and defense
   - Powerplay restrictions
   - Death bowling fields
   - Protect boundaries in final overs

**Reading the Batsman:**
- Study batsman's strengths and weaknesses
- Adjust field for left/right-handed batsmen
- Change field based on match situation
- Communicate with bowler about plans

Effective field placement requires understanding of the game situation, bowler's strengths, and batsman's tendencies.`
        }
      ]
    },
    {
      id: 5,
      title: 'Match Analysis',
      description: 'Analyze matches and improve your game understanding',
      icon: Target,
      color: '#8B5CF6',
      articles: 6,
      content: [
        {
          id: 1,
          title: 'Understanding Match Situations',
          readTime: '10 min read',
          difficulty: 'Advanced',
          content: `Cricket is a game of situations. Understanding the context of each phase of play helps players make better decisions and fans appreciate the tactical nuances.

**Test Match Situations:**

1. **First Innings:**
   - Set a competitive total
   - Assess pitch conditions
   - Build partnerships
   - Patience is key

2. **Second Innings:**
   - Respond to opposition's total
   - Take the lead if possible
   - Consider declaration timing
   - Weather and time factors

3. **Third and Fourth Innings:**
   - Set a target or chase
   - Pitch deterioration factors
   - Pressure situations
   - Time management crucial

**Limited Overs Situations:**

1. **Powerplay Overs:**
   - Maximize scoring opportunities
   - Field restrictions in place
   - Balance aggression with wicket preservation
   - Set platform for middle overs

2. **Middle Overs:**
   - Consolidate and build
   - Rotate strike regularly
   - Assess required run rate
   - Plan for death overs

3. **Death Overs:**
   - Accelerate scoring
   - Take calculated risks
   - Target specific bowlers
   - Finish strongly

**Key Factors to Analyze:**

1. **Pitch Conditions:**
   - How is the pitch playing?
   - Is it getting easier or harder to bat?
   - What pace and bounce is available?
   - How much turn for spinners?

2. **Weather Conditions:**
   - Overcast conditions help swing
   - Bright sunshine can make batting easier
   - Wind direction affects bowling
   - Rain interruptions change dynamics

3. **Match Context:**
   - Series situation
   - Team rankings and form
   - Player milestones and records
   - Historical venue performance

**Decision Making:**
- Captains must read situations quickly
- Players adapt their game to match needs
- Coaches provide strategic input
- Fans can appreciate tactical battles

Developing situational awareness makes cricket more enjoyable and helps players perform under pressure.`
        }
      ]
    },
  ];

  const handleVideoPress = async (url: string) => {
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

  const getCurrentVideos = () => {
    switch (selectedVideoCategory) {
      case 'batting':
        return battingVideos;
      case 'bowling':
        return bowlingVideos;
      case 'fielding':
        return fieldingVideos;
      case 'keeping':
        return keepingVideos;
      default:
        return [];
    }
  };

  const getCurrentReadingCategory = () => {
    return readingCategories.find(cat => cat.id === selectedReadingCategory);
  };

  const renderVideoCard = (video: any) => (
    <TouchableOpacity
      key={video.id}
      style={styles.videoCard}
      onPress={() => handleVideoPress(video.url)}
    >
      <View style={styles.videoThumbnailContainer}>
        <Image 
          source={{ uri: video.thumbnail }}
          style={styles.videoThumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Play size={24} color="#FFFFFF" strokeWidth={2} fill="#FFFFFF" />
        </View>
      </View>
      
      <View style={styles.videoContent}>
        <Text style={styles.videoTitle}>{video.title}</Text>
        <Text style={styles.videoDescription} numberOfLines={3}>
          {video.description}
        </Text>
        <View style={styles.videoFooter}>
          <Text style={styles.videoCredit}>Credit: {video.credit}</Text>
          <ExternalLink size={16} color="#9CA3AF" strokeWidth={2} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderArticleCard = (article: any) => (
    <TouchableOpacity
      key={article.id}
      style={styles.articleCard}
      onPress={() => setSelectedArticle(article)}
    >
      <View style={styles.articleHeader}>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <View style={styles.articleMeta}>
          <View style={styles.metaItem}>
            <Clock size={14} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.metaText}>{article.readTime}</Text>
          </View>
          <View style={[styles.difficultyBadge, { 
            backgroundColor: article.difficulty === 'Beginner' ? '#10B981' : 
                           article.difficulty === 'Intermediate' ? '#F59E0B' : '#EF4444' 
          }]}>
            <Text style={styles.difficultyText}>{article.difficulty}</Text>
          </View>
        </View>
      </View>
      <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
    </TouchableOpacity>
  );

  const renderArticleContent = () => {
    if (!selectedArticle) return null;

    return (
      <View style={styles.section}>
        <View style={styles.articleContentHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedArticle(null)}
          >
            <ArrowLeft size={24} color="#8B5CF6" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.articleContentTitle}>{selectedArticle.title}</Text>
        </View>
        
        <View style={styles.articleContentMeta}>
          <View style={styles.metaItem}>
            <Clock size={16} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.metaText}>{selectedArticle.readTime}</Text>
          </View>
          <View style={[styles.difficultyBadge, { 
            backgroundColor: selectedArticle.difficulty === 'Beginner' ? '#10B981' : 
                           selectedArticle.difficulty === 'Intermediate' ? '#F59E0B' : '#EF4444' 
          }]}>
            <Text style={styles.difficultyText}>{selectedArticle.difficulty}</Text>
          </View>
        </View>

        <View style={styles.articleContentBody}>
          <Text style={styles.articleText}>{selectedArticle.content}</Text>
        </View>

        <View style={styles.articleFooter}>
          <TouchableOpacity 
            style={styles.backToListButton}
            onPress={() => setSelectedArticle(null)}
          >
            <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.backToListText}>Back to Articles</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // If an article is selected, show the article content
  if (selectedArticle) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderArticleContent()}
        </ScrollView>
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
          <Text style={styles.headerTitle}>Learning Hub</Text>
          <Text style={styles.headerSubtitle}>
            Master cricket skills with expert guidance
          </Text>
        </LinearGradient>

        {/* Category Tabs */}
        <View style={styles.categoryTabs}>
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === 'videos' && styles.activeCategoryTab
            ]}
            onPress={() => {
              setSelectedCategory('videos');
              setSelectedVideoCategory(null);
              setSelectedReadingCategory(null);
            }}
          >
            <Video size={20} color={selectedCategory === 'videos' ? '#FFFFFF' : '#9CA3AF'} strokeWidth={2} />
            <Text style={[
              styles.categoryTabText,
              selectedCategory === 'videos' && styles.activeCategoryTabText
            ]}>
              Video Lessons
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === 'reading' && styles.activeCategoryTab
            ]}
            onPress={() => {
              setSelectedCategory('reading');
              setSelectedVideoCategory(null);
              setSelectedReadingCategory(null);
            }}
          >
            <FileText size={20} color={selectedCategory === 'reading' ? '#FFFFFF' : '#9CA3AF'} strokeWidth={2} />
            <Text style={[
              styles.categoryTabText,
              selectedCategory === 'reading' && styles.activeCategoryTabText
            ]}>
              Reading Categories
            </Text>
          </TouchableOpacity>
        </View>

        {/* Video Lessons Section */}
        {selectedCategory === 'videos' && (
          <>
            {!selectedVideoCategory ? (
              /* Video Category Selection */
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choose Your Focus</Text>
                <View style={styles.videoCategoryGrid}>
                  {videoCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={styles.videoCategoryCard}
                        onPress={() => setSelectedVideoCategory(category.id as any)}
                      >
                        <LinearGradient
                          colors={category.gradient}
                          style={styles.videoCategoryGradient}
                        >
                          <IconComponent size={32} color="#FFFFFF" strokeWidth={2} />
                        </LinearGradient>
                        <Text style={styles.videoCategoryTitle}>{category.title}</Text>
                        <Text style={styles.videoCategorySubtitle}>
                          {category.id === 'batting' ? `${battingVideos.length} videos` :
                           category.id === 'bowling' ? `${bowlingVideos.length} videos` :
                           category.id === 'fielding' ? `${fieldingVideos.length} videos` :
                           `${keepingVideos.length} videos`}
                        </Text>
                        <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              /* Video List for Selected Category */
              <View style={styles.section}>
                <View style={styles.videoSectionHeader}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => setSelectedVideoCategory(null)}
                  >
                    <ArrowLeft size={24} color="#8B5CF6" strokeWidth={2} />
                  </TouchableOpacity>
                  <Text style={styles.sectionTitle}>
                    {videoCategories.find(cat => cat.id === selectedVideoCategory)?.title} Videos
                  </Text>
                </View>
                <View style={styles.videosContainer}>
                  {getCurrentVideos().map(renderVideoCard)}
                </View>
              </View>
            )}
          </>
        )}

        {/* Reading Categories Section */}
        {selectedCategory === 'reading' && (
          <>
            {!selectedReadingCategory ? (
              /* Reading Category Selection */
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reading Categories</Text>
                <View style={styles.readingCategoriesContainer}>
                  {readingCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={styles.readingCategoryCard}
                        onPress={() => setSelectedReadingCategory(category.id)}
                      >
                        <View style={[styles.readingCategoryIcon, { backgroundColor: category.color }]}>
                          <IconComponent size={24} color="#FFFFFF" strokeWidth={2} />
                        </View>
                        <View style={styles.readingCategoryContent}>
                          <Text style={styles.readingCategoryTitle}>{category.title}</Text>
                          <Text style={styles.readingCategoryDescription}>{category.description}</Text>
                          <Text style={styles.readingCategoryArticles}>{category.articles} articles</Text>
                        </View>
                        <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : (
              /* Article List for Selected Reading Category */
              <View style={styles.section}>
                <View style={styles.videoSectionHeader}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => setSelectedReadingCategory(null)}
                  >
                    <ArrowLeft size={24} color="#8B5CF6" strokeWidth={2} />
                  </TouchableOpacity>
                  <Text style={styles.sectionTitle}>
                    {getCurrentReadingCategory()?.title}
                  </Text>
                </View>
                <View style={styles.articlesContainer}>
                  {getCurrentReadingCategory()?.content?.map(renderArticleCard)}
                </View>
              </View>
            )}
          </>
        )}

        {/* Learning Tips */}
        {!selectedVideoCategory && !selectedReadingCategory && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Tips</Text>
            <View style={styles.tipsContainer}>
              {[
                'Practice regularly with focused sessions',
                'Watch videos multiple times to understand techniques',
                'Apply what you learn in actual practice',
                'Focus on one skill at a time for better results',
                'Get feedback from coaches or experienced players',
              ].map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View style={styles.tipNumber}>
                    <Text style={styles.tipNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
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
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  categoryTab: {
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
  activeCategoryTab: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeCategoryTabText: {
    color: '#FFFFFF',
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
  videoSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  videoCategoryGrid: {
    gap: 16,
  },
  videoCategoryCard: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D44',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  videoCategoryGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoCategoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  videoCategorySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  videosContainer: {
    gap: 16,
  },
  videoCard: {
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
  videoThumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContent: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 22,
  },
  videoDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 12,
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoCredit: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  readingCategoriesContainer: {
    gap: 16,
  },
  readingCategoryCard: {
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
  readingCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  readingCategoryContent: {
    flex: 1,
  },
  readingCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  readingCategoryDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  readingCategoryArticles: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  articlesContainer: {
    gap: 12,
  },
  articleCard: {
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
  articleHeader: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  articleContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  articleContentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  articleContentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D44',
  },
  articleContentBody: {
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2D2D44',
  },
  articleText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  articleFooter: {
    alignItems: 'center',
  },
  backToListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  backToListText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipNumberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    flex: 1,
  },
});
