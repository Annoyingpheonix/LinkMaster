import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import { TrendingUp, Users, Eye, MousePointerClick, ArrowUpRight, MessageSquare, Heart, Sparkles, BrainCircuit, Target, Lightbulb, Rocket, Zap, BarChart3 } from 'lucide-react';
import { AnalyticsData } from '../types';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'strategy'>('overview');

  const growthData: AnalyticsData[] = [
    { name: 'Mon', impressions: 4000, engagement: 240 },
    { name: 'Tue', impressions: 3000, engagement: 139 },
    { name: 'Wed', impressions: 2000, engagement: 980 },
    { name: 'Thu', impressions: 2780, engagement: 390 },
    { name: 'Fri', impressions: 1890, engagement: 480 },
    { name: 'Sat', impressions: 2390, engagement: 380 },
    { name: 'Sun', impressions: 3490, engagement: 430 },
  ];

  const velocityData = [
    { name: 'Week 1', velocity: 12 },
    { name: 'Week 2', velocity: 18 },
    { name: 'Week 3', velocity: 26 },
    { name: 'Week 4', velocity: 45 },
    { name: 'Week 5', velocity: 42 },
    { name: 'Week 6', velocity: 68 },
  ];

  const demographicsData = [
    { name: 'Founders', value: 35 },
    { name: 'Recruiters', value: 25 },
    { name: 'Product', value: 20 },
    { name: 'Engineers', value: 15 },
    { name: 'Others', value: 5 },
  ];
  const DEMO_COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#94a3b8'];

  const topPosts = [
    { 
      id: 1, 
      content: "Stop using generic AI hooks on LinkedIn. Here is the framework I used to gain 10k followers in 30 days...", 
      impressions: "45.2K", 
      likes: "1.2K", 
      comments: 342, 
      shares: 56,
      date: "2 days ago",
      type: "Opinion"
    },
    { 
      id: 2, 
      content: "Unpopular opinion: Remote work isn't killing culture, your bad management is.", 
      impressions: "32.1K", 
      likes: "890", 
      comments: 215, 
      shares: 120,
      date: "4 days ago",
      type: "Controversial"
    }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 cursor-default group">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
        <p className={`text-xs mt-2 font-black flex items-center gap-1.5 ${change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          {change.startsWith('+') ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
          {change} <span className="font-bold text-slate-300 ml-1">LW</span>
        </p>
      </div>
      <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Engine Active</span>
           </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Performance Hub</h2>
          <p className="text-slate-500 font-bold">Growth summary for <span className="text-slate-900">John Doe</span></p>
        </div>
        <div className="flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Insights
          </button>
          <button 
            onClick={() => setActiveTab('strategy')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'strategy' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <BrainCircuit size={14} /> Strategy
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Main Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Impressions" value="124.5K" change="+12.5%" icon={Eye} color="bg-blue-600" />
            <StatCard title="New Leads" value="124" change="+24.2%" icon={Users} color="bg-indigo-600" />
            <StatCard title="Engagement" value="9.2%" change="+1.8%" icon={Zap} color="bg-purple-600" />
            <StatCard title="Growth Score" value="88" change="+2" icon={Rocket} color="bg-emerald-600" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Reach Chart */}
            <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Impression Velocity</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily Traffic Distribution</p>
                </div>
                <div className="flex gap-2">
                   <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 7D View
                   </div>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px'}}
                      cursor={{stroke: '#3b82f6', strokeWidth: 3}}
                    />
                    <Area type="monotone" dataKey="impressions" stroke="#2563eb" strokeWidth={5} fillOpacity={1} fill="url(#colorImp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Audience Analysis */}
            <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Profile Visitors</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">By Professional Tier</p>
              </div>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="45%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DEMO_COLORS[index % DEMO_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {demographicsData.slice(0, 4).map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DEMO_COLORS[i] }} />
                    <div className="overflow-hidden">
                      <p className="text-[9px] font-black text-slate-400 uppercase truncate">{item.name}</p>
                      <p className="text-xs font-black text-slate-900">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase text-sm">Top Content Assets</h3>
              </div>
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Detailed Analytics</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50 text-[10px] text-slate-400 font-black uppercase tracking-widest text-left">
                  <tr>
                    <th className="p-6 pl-8">Post Segment</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Imp. Reach</th>
                    <th className="p-6">Conversion</th>
                    <th className="p-6 pr-8 text-right">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topPosts.map((post) => (
                    <tr key={post.id} className="group hover:bg-blue-50/30 transition-all cursor-pointer">
                      <td className="p-6 pl-8">
                        <p className="text-sm font-bold text-slate-800 line-clamp-1 max-w-sm group-hover:text-blue-600">{post.content}</p>
                      </td>
                      <td className="p-6">
                        <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                          {post.type}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                          <Eye size={16} className="text-blue-400"/> {post.impressions}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500"><Heart size={14} className="text-rose-400" fill="#fb7185"/> {post.likes}</span>
                          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500"><MessageSquare size={14} className="text-blue-400" fill="#60a5fa"/> {post.comments}</span>
                        </div>
                      </td>
                      <td className="p-6 pr-8 text-right">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{post.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* Strategy Roadmap */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                    <BrainCircuit size={32} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight">AI Strategy Advisor</h3>
                    <p className="text-indigo-300 font-bold uppercase text-xs tracking-widest mt-1">Niche: Product Management & AI</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
                        <Target size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Winning Format</span>
                    </div>
                    <h5 className="text-lg font-bold mb-2">Technical Deep-Dives</h5>
                    <p className="text-indigo-200 text-sm leading-relaxed opacity-80 font-medium">Your audience engagement is <span className="text-blue-400 font-black">+34% higher</span> on posts containing technical code snippets or architectural diagrams.</p>
                  </div>
                  
                  <div className="p-8 bg-white/5 backdrop-blur-sm rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 group-hover:scale-110 transition-transform">
                        <Lightbulb size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Content Gap</span>
                    </div>
                    <h5 className="text-lg font-bold mb-2">Lead Magnet Hook</h5>
                    <p className="text-indigo-200 text-sm leading-relaxed opacity-80 font-medium">There is currently low competition but high search volume for <span className="text-blue-400 font-black">"AI Ethics in Hiring"</span>. Post a carousel on this on Thursday.</p>
                  </div>
                </div>

                <div className="pt-6">
                  <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    <Sparkles size={24} /> Refresh Custom Strategy
                  </button>
                </div>
              </div>
              
              {/* Abstract decorative elements */}
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/20 blur-[120px]" />
              <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-600/20 blur-[120px]" />
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">Growth Velocity</h4>
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Steady Acceleration</span>
               </div>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={velocityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                      <Line type="monotone" dataKey="velocity" stroke="#3b82f6" strokeWidth={5} dot={{r: 6, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff'}} activeDot={{r: 8, strokeWidth: 0}} />
                    </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Smart Checklist</h4>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-sm shadow-emerald-100">
                    <MessageSquare size={16} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Reply to Top Comments</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 leading-snug">Boosts reach on current draft by ~22%</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-8 h-8 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm shadow-indigo-100">
                    <Users size={16} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Engage Niche Leaders</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 leading-snug">Comment on 5 posts from verified accounts</p>
                  </div>
                </div>
                <div className="flex gap-5 opacity-40 grayscale">
                  <div className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Profile Re-Optimization</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 leading-snug">Update About section for Q4 target</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200/50">
               <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-4">Current Streak</h4>
               <div className="flex items-end gap-2">
                  <span className="text-6xl font-black">12</span>
                  <span className="text-lg font-bold mb-2">Days</span>
               </div>
               <p className="text-sm font-bold text-indigo-100 mt-4 leading-relaxed">You're posting more consistently than <span className="text-white">92% of your peers</span>. Keep it up!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;