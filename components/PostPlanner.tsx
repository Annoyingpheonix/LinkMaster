import React, { useState, useRef, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Post, ResearchResult } from '../types';
import { improvePostContent, generatePostIdeas, researchTopic, generatePostImage } from '../services/geminiService';
import { Wand2, Calendar as CalendarIcon, Save, Copy, Check, Globe, Search, MoreHorizontal, ThumbsUp, MessageSquare, Share2, Send, Smartphone, Monitor, Image as ImageIcon, Type as TypeIcon, Bold, Italic, Sparkles } from 'lucide-react';

const PostPlanner: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [researchData, setResearchData] = useState<ResearchResult | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(true);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const handleSavePost = () => {
    if (!currentPost.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      content: currentPost,
      date: selectedDate,
      status: 'scheduled',
      tags: [],
    };
    setPosts([...posts, newPost]);
    alert("Post scheduled successfully!");
  };

  const handleImproveAI = async () => {
    if (!currentPost.trim()) return;
    setIsGenerating(true);
    const improved = await improvePostContent(currentPost);
    setCurrentPost(improved);
    setIsGenerating(false);
  };

  const handleGenerateIdeas = async () => {
    if (!topic) return;
    setLoadingIdeas(true);
    const generatedIdeas = await generatePostIdeas(topic, audience || 'professionals');
    setIdeas(generatedIdeas);
    setLoadingIdeas(false);
  };

  const handleResearch = async () => {
    if (!topic) return;
    setIsResearching(true);
    const data = await researchTopic(topic);
    setResearchData(data);
    setIsResearching(false);
  };

  const handleGenerateImage = async () => {
    if (!currentPost && !topic) return;
    setIsGeneratingImage(true);
    const url = await generatePostImage(currentPost.slice(0, 100) || topic);
    setGeneratedImageUrl(url);
    setIsGeneratingImage(false);
  };

  const applyUnicodeStyle = (type: 'bold' | 'italic') => {
    if (!textareaRef.current) return;
    const { selectionStart, selectionEnd } = textareaRef.current;
    const selectedText = currentPost.substring(selectionStart, selectionEnd);
    if (!selectedText) return;

    const map: Record<string, string> = type === 'bold' ? {
      'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷','k':'𝗸','l':'𝗹','m':'𝗺','n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁','u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇',
      'A':'𝗔','B':'𝗕','C':'𝗖','D':'𝗗','E':'𝗘','F':'𝗙','G':'𝗚','H':'𝗛','I':'𝗜','J':'𝗝','K':'𝗞','L':'𝗟','M':'𝗠','N':'𝗡','O':'𝗢','P':'𝗣','Q':'𝗤','R':'𝗥','S':'𝗦','T':'𝗧','U':'𝗨','V':'𝗩','W':'𝗪','X':'𝗫','Y':'𝗬','Z':'𝗭',
      '0':'𝟬','1':'𝟭','2':'𝟮','3':'𝟯','4':'𝟰','5':'𝟱','6':'𝟲','7':'𝟳','8':'𝟴','9':'𝟵'
    } : {
      'a':'italic_a','b':'italic_b' // Simplified for space, usually follows specific unicode offsets
    };

    // A real implementation would use charCode offsets
    // For now, let's just use a simple bold example to demonstrate the feature
    const transformed = selectedText.split('').map(char => {
      const code = char.charCodeAt(0);
      if (type === 'bold') {
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5D4 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5EE + (code - 97));
      } else {
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D434 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D44E + (code - 97));
      }
      return char;
    }).join('');

    const newText = currentPost.substring(0, selectionStart) + transformed + currentPost.substring(selectionEnd);
    setCurrentPost(newText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPostsForDate = (date: Date) => posts.filter(p => isSameDay(p.date, date));

  const LinkedInPreview = () => {
    const lines = currentPost.split('\n');
    const displayLines = lines.slice(0, 4);
    const hasMore = lines.length > 4 || currentPost.length > 200;

    return (
      <div className={`mx-auto transition-all duration-300 w-full ${previewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-[550px]'}`}>
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden text-left">
          {/* Header */}
          <div className="p-3 flex items-start justify-between">
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex-shrink-0 border border-slate-50 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer">John Doe</span>
                  {isVerified && (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#0a66c2]" fill="currentColor">
                      <path d="M22.5 12.5c0-1.58-.8-3.04-2.14-3.88.26-1.58-.18-3.2-.84-4.56-1.35-.67-2.95-.91-4.46-.66-.84-1.34-2.3-2.14-3.88-2.14s-3.04.8-3.88 2.14c-1.51-.25-3.11-.01-4.46.66-.66 1.36-1.1 2.98-.84 4.56-1.34.84-2.14 2.3-2.14 3.88s.8 3.04 2.14 3.88c-.26 1.58.18 3.2.84 4.56 1.35.67 2.95.91 4.46.66.84 1.34 2.3 2.14 3.88 2.14s3.04-.8 3.88-2.14c1.51.25 3.11.01 4.46-.66.66-1.36 1.1-2.98.84-4.56 1.34-.84 2.14-2.3 2.14-3.88zM15.82 9.02l-5.5 5.5-2.14-2.14c-.39-.39-1.03-.39-1.42 0s-.39 1.03 0 1.42l2.85 2.85c.39.39 1.03.39 1.42 0l6.21-6.21c.39-.39.39-1.03 0-1.42s-1.03-.39-1.42 0z"/>
                    </svg>
                  )}
                  <span className="text-xs text-slate-400 font-normal">• 1st</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">Senior Product Manager @ AI Solutions | LinkedIn Growth Creator</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <span>Just now</span>
                  <span>•</span>
                  <Globe size={10} />
                </div>
              </div>
            </div>
            <MoreHorizontal size={18} className="text-slate-500 cursor-pointer" />
          </div>

          {/* Content */}
          <div className="px-3 pb-3">
            <p className="text-sm text-slate-900 whitespace-pre-wrap leading-normal">
              {displayLines.join('\n')}
              {hasMore && <span className="text-slate-400 cursor-pointer font-semibold ml-1">...see more</span>}
            </p>
          </div>

          {/* Image */}
          {generatedImageUrl && (
            <div className="border-y border-slate-100 bg-slate-50">
              <img src={generatedImageUrl} alt="Post asset" className="w-full h-auto object-cover max-h-[300px]" />
            </div>
          )}

          {/* Stats */}
          <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white">
                  <ThumbsUp size={8} className="text-white" />
                </div>
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="white" className="text-white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">242</span>
            </div>
            <div className="flex gap-2 text-[10px] text-slate-500 font-medium">
              <span>58 comments</span>
              <span>•</span>
              <span>12 shares</span>
            </div>
          </div>

          {/* Actions */}
          <div className="px-1 border-t border-slate-100 flex items-center justify-around py-1">
            <button className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors">
              <ThumbsUp size={18} />
              <span className="text-xs font-bold">Like</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors">
              <MessageSquare size={18} />
              <span className="text-xs font-bold">Comment</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors">
              <Share2 size={18} />
              <span className="text-xs font-bold">Repost</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors">
              <Send size={18} />
              <span className="text-xs font-bold">Send</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-12 items-start">
      {/* Sidebar: Planner & Ideas (4/12) */}
      <div className="xl:col-span-4 space-y-6">
        
        {/* Calendar Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon size={18} className="text-blue-500" /> Planner
            </h3>
            <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-lg uppercase tracking-widest">Next 7 Days</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dayPosts = getPostsForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`relative p-2.5 rounded-2xl flex flex-col items-center group transition-all duration-300 ${
                    isSelected ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'hover:bg-slate-50 text-slate-400'
                  } ${isToday && !isSelected ? 'ring-2 ring-blue-500/10' : ''}`}
                >
                  <span className="text-[10px] font-black uppercase mb-1">{format(day, 'EE').charAt(0)}</span>
                  <span className={`text-sm font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>{format(day, 'd')}</span>
                  {dayPosts.length > 0 && (
                    <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Research & Ideas Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 flex items-center gap-2 tracking-tight uppercase text-sm">
              <Search size={18} className="text-indigo-500" /> Market Intelligence
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Topic: e.g. SaaS Sales"
                className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <button
                onClick={handleResearch}
                disabled={isResearching || !topic}
                className="p-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
              >
                {isResearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Globe size={20} />}
              </button>
            </div>
          </div>

          {researchData && (
            <div className="p-5 bg-indigo-50/50 rounded-3xl border border-indigo-100 space-y-4 animate-fadeIn">
              <div>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Live Trend</p>
                <p className="text-xs font-bold text-indigo-900 leading-relaxed">{researchData.summary}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Angles</p>
                {researchData.contentAngles.map((angle, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPost(p => p + (p ? '\n\n' : '') + angle.replace('- ', ''))}
                    className="w-full text-left p-2.5 bg-white border border-indigo-100 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-600 hover:text-white transition-all group"
                  >
                    <span className="group-hover:text-indigo-200 mr-1 opacity-50">#</span> {angle.replace('- ', '')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-50 space-y-4">
             <button
              onClick={handleGenerateIdeas}
              disabled={loadingIdeas || !topic}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loadingIdeas ? 'Analyzing...' : <><Wand2 size={16}/> Brainstorm Hooks</>}
            </button>

            {ideas.length > 0 && (
              <div className="grid gap-2">
                {ideas.map((idea, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setCurrentPost(idea)}
                    className="p-4 bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-2xl text-xs font-bold text-slate-600 cursor-pointer transition-all leading-snug"
                  >
                    {idea}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor & Preview (8/12) */}
      <div className="xl:col-span-8 space-y-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden flex flex-col min-h-[650px]">
          {/* Toolbar */}
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Monitor size={16} />
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Smartphone size={16} />
                </button>
              </div>

              <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
                <button 
                  onClick={() => applyUnicodeStyle('bold')}
                  className="p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
                  title="Bold (Unicode)"
                >
                  <Bold size={16} />
                </button>
                <button 
                  onClick={() => applyUnicodeStyle('italic')}
                  className="p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
                  title="Italic (Unicode)"
                >
                  <Italic size={16} />
                </button>
              </div>

              <button 
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${generatedImageUrl ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}
              >
                {isGeneratingImage ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <ImageIcon size={16} />}
                {generatedImageUrl ? 'Regenerate Image' : 'Generate Asset'}
              </button>
            </div>

            <div className="flex gap-2">
               <button onClick={handleImproveAI} disabled={isGenerating || !currentPost} className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all active:scale-95">
                  <Sparkles size={14} /> Refine
               </button>
               <button onClick={handleSavePost} disabled={!currentPost} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                  <Save size={14} /> Schedule
               </button>
            </div>
          </div>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 h-full flex-1">
            {/* Editor */}
            <div className="p-8 lg:border-r border-slate-100 flex flex-col min-h-[400px]">
              <textarea
                ref={textareaRef}
                className="flex-1 w-full resize-none focus:outline-none text-slate-900 leading-relaxed text-lg font-bold placeholder:text-slate-200 custom-scrollbar"
                placeholder="Hook them with your first line... (Tip: use bold for emphasis)"
                value={currentPost}
                onChange={(e) => setCurrentPost(e.target.value)}
              />
              <div className="mt-6 flex items-center justify-between">
                 <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Chars</p>
                      <p className="text-sm font-black text-slate-800">{currentPost.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Reading Time</p>
                      <p className="text-sm font-black text-slate-800">{Math.max(1, Math.ceil(currentPost.split(' ').length / 200))}m</p>
                    </div>
                 </div>
                 <button onClick={copyToClipboard} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} 
                    {copied ? 'Copied' : 'Copy Text'}
                 </button>
              </div>
            </div>

            {/* LinkedIn Preview */}
            <div className="p-8 bg-slate-50/70 flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Feed Simulator</h4>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer" htmlFor="verified-toggle">Verified Badge</label>
                  <input 
                    id="verified-toggle"
                    type="checkbox" 
                    checked={isVerified} 
                    onChange={() => setIsVerified(!isVerified)} 
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-start justify-center">
                <LinkedInPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPlanner;