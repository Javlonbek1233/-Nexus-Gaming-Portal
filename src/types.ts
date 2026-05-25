export interface Game {
  id: string;
  title: string;
  genre: string;
  description: string;
  rating: number;
  playtime?: string;
  status: 'Featured' | 'New' | 'Classic' | 'Update';
  imageUrl: string;
  videoPlaceholderUrl?: string;
  trailerTitle?: string;
  accentColor: string;
  platforms: string[];
  stats: {
    playersActive: string;
    achievementsUnlocked: string;
    fileSize: string;
  };
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'skins' | 'weapons' | 'hardware' | 'passes';
  price: string;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common';
  rarityColor: string;
  imageUrl: string;
  description: string;
  stats?: { label: string; value: string }[];
  inStock: boolean;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: number;
    badge: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  comments: {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
  }[];
  likedByCurrentUser?: boolean;
}

export interface SquadMember {
  id: string;
  name: string;
  avatar: string;
  level: number;
  status: 'online' | 'ingame' | 'offline';
  gameplaying?: string;
  ping: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'Open' | 'Resolved' | 'Escalated';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
}
