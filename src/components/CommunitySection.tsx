import React, { useState } from 'react';
import { Users, Send, MessageSquare, ThumbsUp, Trophy, Radio, Target, ExternalLink } from 'lucide-react';
import { CommunityPost, SquadMember } from '../types';
import { COMMUNITY_POSTS, SQUAD_MEMBERS } from '../data';

interface CommunitySectionProps {
  onlinePlayers: number;
}

export default function CommunitySection({ onlinePlayers }: CommunitySectionProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard'>('feed');
  const [newPostContent, setNewPostContent] = useState('');
  
  // Custom Comment Storage matched by postId
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const [simulatedChallengeMsg, setSimulatedChallengeMsg] = useState<string | null>(null);

  // Global leaderboard mock high scores
  const leaderboard = [
    { rank: 1, name: 'Vortex_Specter', score: '1,424,900', level: 98, title: 'Cyber Siege 2', kd: '4.82' },
    { rank: 2, name: 'Shadow_Link', score: '1,289,200', level: 91, title: 'Cyber Siege 2', kd: '3.91' },
    { rank: 3, name: 'Hex_Vixen', score: '984,500', level: 84, title: 'Neon Overdrive', kd: '3.21' },
    { rank: 4, name: 'Chrono_Breaker', score: '824,100', level: 71, title: 'Star Drifter', kd: '2.84' },
    { rank: 5, name: 'Xeno_Slayer', score: '724,000', level: 42, title: 'Neon Overdrive', kd: '2.48' } // User!
  ];

  const handleLikePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const liked = !post.likedByCurrentUser;
          return {
            ...post,
            likedByCurrentUser: liked,
            likes: liked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Xeno_Slayer',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
        level: 42,
        badge: 'Hacking Sentinel'
      },
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      commentsCount: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleAddComment = (postId: string) => {
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: 'Xeno_Slayer',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
            content: commentText,
            timestamp: 'Just now'
          };
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const executeSimulatedChallenge = (member: SquadMember) => {
    setSimulatedChallengeMsg(`LOBBY INVITE SENT: Direct handshake sent to ${member.name}. Syncing gateway node...`);
    setTimeout(() => {
      setSimulatedChallengeMsg(null);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* Left side: Activity Feed & Forums / Local Leaderboards */}
      <div className="flex-[2] flex flex-col gap-5 overflow-y-auto pr-1">
        {/* Toggle subheads */}
        <div className="flex justify-between items-center bg-[#070710] border border-white/5 rounded-2xl p-4 shrink-0">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`text-xs uppercase tracking-widest font-black transition-colors cursor-pointer ${
                activeTab === 'feed' ? 'text-cyan-400' : 'text-slate-500 hover:text-white'
              }`}
            >
              Public Feed
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`text-xs uppercase tracking-widest font-black transition-colors cursor-pointer ${
                activeTab === 'leaderboard' ? 'text-purple-400' : 'text-slate-500 hover:text-white'
              }`}
            >
              Global Nodes Rankings
            </button>
          </div>
          
          <span className="text-[9px] font-mono text-slate-500">{onlinePlayers.toLocaleString()} AGENTS ACTIVE</span>
        </div>

        {activeTab === 'feed' ? (
          <>
            {/* Create new post section */}
            <form onSubmit={handleAddPost} className="bg-white/5 border border-white/5 rounded-3xl p-5 flex gap-4 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-cyan-900/40 border border-cyan-400/50 flex items-center justify-center font-mono font-black text-cyan-300">
                XS
              </div>
              
              <div className="flex-1 flex flex-col gap-3">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Broadcast message to the Aether Net..."
                  rows={2}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans resize-none placeholder:text-slate-500"
                />
                
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-slate-500">Character Level: 42</span>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-cyan-400 hover:bg-cyan-500 text-[#020204] font-black uppercase text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Transmit Signal
                  </button>
                </div>
              </div>
            </form>

            {/* List of microblog posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-[#0b0b13] border border-white/5 rounded-[2rem] p-6 hover:border-cyan-500/10 transition-colors">
                  {/* Author detail block */}
                  <div className="flex items-center gap-3 mb-4 justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-xl object-cover border border-white/10" referrerPolicy="no-referrer" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-slate-100">{post.author.name}</h4>
                          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-900/20 px-1.5 py-0.5 rounded border border-cyan-500/20">
                            Lv. {post.author.level}
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">{post.author.badge}</p>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-slate-600">{post.timestamp}</span>
                  </div>

                  {/* Body Text Content */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
                    {post.content}
                  </p>

                  {/* Likes/Comments counting bars */}
                  <div className="flex gap-4 border-t border-b border-white/5 py-3 text-xs mb-4">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        post.likedByCurrentUser ? 'text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" /> 
                      <span className="font-mono">{post.likes} Likes</span>
                    </button>
                    
                    <span className="text-slate-700">|</span>
                    
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount} Comments</span>
                    </div>
                  </div>

                  {/* Comments lists display */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="space-y-3 bg-black/40 rounded-2xl p-4 border border-white/5 mb-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 text-xs">
                          <img src={comment.avatar} alt={comment.author} className="w-7 h-7 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <div className="flex-1 bg-white/5 rounded-xl p-2.5">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-200">{comment.author}</span>
                              <span className="text-[8px] font-mono text-slate-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-slate-400 leading-normal">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Write comment input block */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Add encryption commentary..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono placeholder:text-slate-600"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="px-4 bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-400 hover:text-[#020204] rounded-xl transition-all font-bold text-[10px] uppercase cursor-pointer"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Leaderboard Tab Content */
          <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-2 mb-6">
              <Trophy className="w-4 h-4 text-purple-400" /> Layer-1 Grid Leaderboard
            </h3>

            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-2xl border ${
                    user.name === 'Xeno_Slayer' 
                      ? 'bg-cyan-400/5 border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                      : 'bg-black/30 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center font-mono font-black text-xs text-slate-400">
                      #{user.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">{user.name}</span>
                        {user.name === 'Xeno_Slayer' && <span className="text-[8px] bg-cyan-400 text-black font-black px-1.5 rounded uppercase">CURRENT</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">Primary Battleground: {user.title}</p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <p className="text-xs font-black text-cyan-400">{user.score} XP</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">K/D: {user.kd}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right side: Active Squad / challenge panel */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-1">
        {simulatedChallengeMsg && (
          <div className="bg-cyan-950/20 border border-cyan-400/30 rounded-2xl p-4 text-[10px] font-mono text-cyan-400 animate-pulse">
            {simulatedChallengeMsg}
          </div>
        )}

        <div className="bg-[#0b0b13] border border-white/5 rounded-[2.5rem] p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-cyan-400" /> Active System Squad
          </h3>

          <div className="space-y-4">
            {SQUAD_MEMBERS.map((member) => (
              <div key={member.id} className="flex justify-between items-center bg-black/20 p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 object-cover rounded-xl" referrerPolicy="no-referrer" />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#020204] ${
                      member.status === 'ingame' ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 
                      member.status === 'online' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-600'
                    }`}></div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-300">{member.name}</h4>
                    <p className="text-[9px] text-slate-400 capitalize mt-0.5 font-mono">
                      {member.status === 'ingame' ? `Playing: ${member.gameplaying}` : member.status === 'online' ? 'In Standby Lobby' : 'Offline'}
                    </p>
                  </div>
                </div>

                {member.status !== 'offline' ? (
                  <button
                    onClick={() => executeSimulatedChallenge(member)}
                    className="px-3 py-1 bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/40 text-[9px] font-black uppercase text-slate-300 hover:text-cyan-400 rounded-lg cursor-pointer transition-colors"
                  >
                    Challenge
                  </button>
                ) : (
                  <span className="text-[9px] text-slate-600 font-mono">Offline</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-white/5">
            <button className="w-full py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[9px] uppercase font-black tracking-widest hover:bg-white/10 transition-colors cursor-pointer text-center">
              Discover Global Hubs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
