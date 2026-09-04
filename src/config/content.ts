// ============================================================
// Octova — Content Configuration
// ============================================================
// All section copy, FAQ items, features, pricing, and form
// options live here. Edit content without touching components.
// ============================================================

import type {
  FAQItem,
  Feature,
  PricingTier,
  UseCase,
  ProblemCard,
  LanguageCard,
  HowItWorksStep,
  CreatorType,
  VideoVolume,
} from '@/types';

// ---- Trust Strip ----
export const trustCategories = ['Creators', 'Podcasters', 'Coaches', 'Agencies', 'Educators'];

// ---- Problem Section ----
export const problems: ProblemCard[] = [
  {
    title: 'Captions take too long',
    description: 'Manual timing, styling, and correction slow down every upload.',
    icon: 'Clock',
  },
  {
    title: 'Hinglish needs context',
    description: 'Literal transcription often misses the way Indian creators actually speak.',
    icon: 'MessageCircle',
  },
  {
    title: 'Consistency is hard',
    description: 'Different fonts, colors, and layouts make every video look disconnected.',
    icon: 'Layers',
  },
];

// ---- How It Works ----
export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: 'Upload or add an idea',
    description: 'Drop a clip or start from a script.',
    icon: 'Upload',
    miniPanel: 'Upload clip.mp4',
  },
  {
    title: 'Style your captions',
    description: 'Choose Hinglish-aware caption presets.',
    icon: 'Type',
    miniPanel: 'Hinglish caption style selected',
  },
  {
    title: 'Export for Reels & Shorts',
    description: 'Download your 9:16 Short ready to post.',
    icon: 'Download',
    miniPanel: '9:16 Short ready',
  },
];

// ---- Use Cases ----
export const useCases: UseCase[] = [
  {
    title: 'Faceless creators',
    description: 'Turn scripts and ideas into consistent short-form content.',
    icon: 'Monitor',
  },
  {
    title: 'Podcasters',
    description: 'Transform long conversations into captioned highlight clips.',
    icon: 'Mic',
  },
  {
    title: 'Coaches & educators',
    description: 'Make lessons easier to follow with clear, styled captions.',
    icon: 'GraduationCap',
  },
  {
    title: 'Small agencies',
    description: 'Create repeatable branded Shorts for multiple clients.',
    icon: 'Users',
  },
];

// ---- Language Cards ----
export const languageCards: LanguageCard[] = [
  {
    language: 'Hindi',
    sample: 'ये वीडियो अब और बेहतर दिखेगा',
    script: 'devanagari',
  },
  {
    language: 'Hinglish',
    sample: 'Bhai, ye 3 mistakes mat karna.',
    script: 'latin',
  },
  {
    language: 'English',
    sample: 'Make your next Short easier to watch.',
    script: 'latin',
  },
];

// ---- Features ----
export const availableFeatures: Feature[] = [
  {
    title: 'Hinglish-aware caption workflow',
    description: 'Captions that understand how Indian creators actually speak.',
    icon: 'Captions',
    available: true,
  },
  {
    title: 'Vertical 9:16 layouts',
    description: 'Templates built for Reels, Shorts, and vertical content.',
    icon: 'Smartphone',
    available: true,
  },
  {
    title: 'Caption style presets',
    description: 'Pick from creator-tested styles and customize easily.',
    icon: 'Palette',
    available: true,
  },
  {
    title: 'Simple export flow',
    description: 'Export your Short in a few clicks, ready to upload.',
    icon: 'Download',
    available: true,
  },
  {
    title: 'Creator-focused templates',
    description: 'Layouts designed for the way short-form content works.',
    icon: 'LayoutTemplate',
    available: true,
  },
];

export const roadmapFeatures: Feature[] = [
  {
    title: 'Auto clip suggestions',
    description: 'Let AI find the most engaging moments in your footage.',
    icon: 'Scissors',
    available: false,
  },
  {
    title: 'Hook & title suggestions',
    description: 'AI-assisted hooks to improve first-second retention.',
    icon: 'Sparkles',
    available: false,
  },
  {
    title: 'Brand kits',
    description: 'Save your brand colors, fonts, and logo for consistent Shorts.',
    icon: 'Brush',
    available: false,
  },
  {
    title: 'Batch generation',
    description: 'Generate multiple Shorts from one long video.',
    icon: 'Copy',
    available: false,
  },
  {
    title: 'AI voiceovers',
    description: 'Add natural-sounding voiceovers in Hindi or English.',
    icon: 'AudioLines',
    available: false,
  },
  {
    title: 'Script-to-video workflows',
    description: 'Turn a text script into a complete Short with captions.',
    icon: 'FileText',
    available: false,
  },
];

// ---- Pricing ----
export const pricingTiers: PricingTier[] = [
  {
    name: 'Free Preview',
    description: 'Test the workflow with limited exports.',
    features: ['Limited exports', 'Watermarked previews', 'Early product testing'],
    badge: 'Start here',
  },
  {
    name: 'Creator',
    description: 'For individual creators who post regularly.',
    features: ['More exports', 'More caption styles', 'Early access to new tools'],
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Agency',
    description: 'For teams managing multiple creator brands.',
    features: ['Multiple projects', 'Brand styles', 'Batch workflow (planned)'],
    badge: 'Coming soon',
  },
];

// ---- FAQ ----
export const faqItems: FAQItem[] = [
  {
    question: 'What is Octova?',
    answer:
      'Octova is an early-stage AI-assisted short-form video tool focused first on Hinglish, Hindi, and English caption workflows.',
  },
  {
    question: 'Is the product available now?',
    answer: 'It is being released gradually through early access.',
  },
  {
    question: 'Do I need editing experience?',
    answer:
      'No. The first workflow is designed to be simple for creators who want polished captions without spending hours styling them.',
  },
  {
    question: 'Will it replace a full video editor?',
    answer:
      'Not initially. The MVP focuses on a fast caption and short-video workflow, with more editing capabilities planned later.',
  },
  {
    question: 'Which languages are supported?',
    answer:
      'The first focus is Hindi, Hinglish, and English. Actual support may improve during the early-access period.',
  },
  {
    question: 'Is it free?',
    answer:
      'Early users may receive free access or limited testing credits. Final pricing will be announced after feedback.',
  },
  {
    question: 'Can agencies use it?',
    answer:
      'Agencies are part of the target audience, but agency features will be added progressively.',
  },
];

// ---- Form Options ----
export const creatorTypes: CreatorType[] = [
  'Creator',
  'Podcaster',
  'Coach',
  'Educator',
  'Agency',
  'Other',
];

export const videoVolumes: VideoVolume[] = ['1–5', '6–20', '21–50', '50+'];

// ---- Floating Preview Labels ----
export const floatingPills = ['Hinglish captions', '9:16 ready', 'Brand styles', 'Fast export'];
export const miniCards = ['Script', 'Voice', 'Captions', 'Export'];
