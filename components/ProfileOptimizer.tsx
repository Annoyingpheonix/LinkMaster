import React, { useState, useEffect } from 'react';
import { optimizeProfileSection } from '../services/geminiService';
import { OptimizationResult, GoalTemplate } from '../types';
import { User, Briefcase, Info, CheckCircle, AlertCircle, ArrowRight, UserCircle, GraduationCap, Award, Trophy, Star, Bookmark, Trash2, Copy, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const DEFAULT_TEMPLATES: GoalTemplate[] = [
  { id: '1', label: 'Recruiter Focus', goal: 'Attract recruiters for Senior Product Manager roles' },
  { id: '2', label: 'Client Lead Gen', goal: 'Get more leads for my marketing agency' },
  { id: '3', label: 'Thought Leader', goal: 'Establish authority and build a personal brand in AI' },
];

const ProfileOptimizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'headline' | 'about' | 'experience' | 'education' | 'skills' | 'accomplishments'>('headline');
  const [content, setContent] = useState('');
  const [goal, setGoal] = useState('Attract recruiters for Senior Product Manager roles');
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Goal Templates State
  const [templates, setTemplates] = useState<GoalTemplate[]>(() => {
    const saved = localStorage.getItem('goal_templates');
    return saved ? JSON.parse(saved) : DEFAULT_TEMPLATES;
  });

  useEffect(() => {
    localStorage.setItem('goal_templates', JSON.stringify(templates));
  }, [templates]);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await optimizeProfileSection(activeTab, content, goal);
    setResult(res);
    setLoading(false);
  };

  const handleSaveTemplate = () => {
    if (!goal.trim()) return;
    const isDuplicate = templates.some(t => t.goal === goal);
    if (isDuplicate) return;

    const newTemplate: GoalTemplate = {
      id: Date.now().toString(),
      label: goal.length > 25 ? goal.substring(0, 22) + '...' : goal,
      goal: goal,
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.rewrittenVersion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'headline', label: 'Headline', icon: User },
    { id: 'about', label: 'About', icon: Info },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'accomplishments', label: 'Accomplishments', icon: Trophy },
  ];

  // Helper for circular progress
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'stroke-emerald-500 text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'stroke-amber-500 text-amber-600 bg-amber-50';
    return 'stroke-rose-500 text-rose-600 bg-rose-50';
  };

  const ScoreGauge = ({ score }: { score: number }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const colors = getScoreColor(score);

    return (
      <div className="relative flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${colors.split(' ')[0]}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-black ${colors.split(' ')[1]}`}>{score}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Profile Optimizer</h2>
          <p className="text-slate-500 font-medium">Refine your digital presence with AI-powered expert feedback.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
          <Sparkles size={16} className="text-blue-600" />
          <span className="text-sm font-bold text-blue-700">Powered by Gemini 3 Pro</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configuration & Input (7/12) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Enhanced Tab Navigation */}
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
            <div className="flex min-w-max gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setResult(null);
                    setContent('');
                  }}
                  className={`flex items-center gap-2 py-3 px-5 text-sm font-bold rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              {/* Goal Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Optimization Goal</h4>
                  <button 
                    onClick={handleSaveTemplate}
                    className="text-xs flex items-center gap-1.5 text-blue-600 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <Bookmark size={14} />
                    Save Template
                  </button>
                </div>
                
                <div className="relative group">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-4 pr-12 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all"
                    placeholder="Describe your target outcome..."
                  />
                  <div className="absolute right-4 top-4 text-slate-300 group-focus-within:text-blue-500">
                    <Star size={24} fill={templates.some(t => t.goal === goal) ? "currentColor" : "none"} />
                  </div>
                </div>

                {/* Templates - Horizontal Scroll */}
                <div className="flex overflow-x-auto gap-2 py-2 no-scrollbar">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setGoal(t.goal)}
                      className={`group shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        goal === t.goal 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                      }`}
                    >
                      <span>{t.label}</span>
                      {!DEFAULT_TEMPLATES.some(dt => dt.id === t.id) && (
                        <Trash2 
                          size={12} 
                          className={`transition-opacity ${goal === t.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100 hover:text-red-400'}`}
                          onClick={(e) => handleDeleteTemplate(t.id, e)}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Current Content</h4>
                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl text-base font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none"
                    placeholder={`Paste your LinkedIn ${activeTab} section here to analyze...`}
                  />
                  <div className="absolute bottom-4 right-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {content.length} Characters
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || !content}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-blue-600 hover:shadow-blue-200 transition-all disabled:opacity-50 flex justify-center items-center gap-3 transform active:scale-[0.98]"
              >
                {loading ? (
                  <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Optimize My Profile <ArrowRight size={20} /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Results (5/12) */}
        <div className="lg:col-span-5 h-full">
          {result ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 animate-slideUp overflow-hidden flex flex-col h-full min-h-[600px]">
              {/* Result Header */}
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Expert Analysis</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">LinkedIn Personal Brand AI</p>
                </div>
                <ScoreGauge score={result.score} />
              </div>

              {/* Result Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {/* Critique */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle size={16} className="text-rose-500" />
                    Expert Critique
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium bg-rose-50/30 p-4 rounded-2xl border border-rose-100/50">
                    {result.critique}
                  </p>
                </div>

                {/* Suggestions */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-500" />
                    Key Recommendations
                  </h4>
                  <div className="grid gap-2">
                    {result.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-emerald-50/30 border border-emerald-100/50 rounded-2xl group hover:bg-emerald-50 transition-colors">
                        <div className="w-6 h-6 shrink-0 bg-white border border-emerald-100 rounded-lg flex items-center justify-center text-[10px] font-black text-emerald-600 shadow-sm">
                          {idx + 1}
                        </div>
                        <p className="text-sm font-semibold text-slate-700 leading-snug">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimized Version */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Star size={16} className="text-amber-500" />
                    The Perfect Version
                  </h4>
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 text-slate-900">
                    <div className="prose prose-slate prose-sm max-w-none font-bold italic leading-relaxed">
                      <ReactMarkdown>{result.rewrittenVersion}</ReactMarkdown>
                    </div>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                      copied 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200'
                    }`}
                  >
                    {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied to Clipboard!' : 'Copy Rewritten Version'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100/50 border-4 border-dashed border-slate-200 rounded-[3rem] h-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center group">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-slate-200 mb-6 group-hover:scale-110 transition-transform">
                <UserCircle size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Analysis Report Ready</h3>
              <p className="text-slate-500 font-medium max-w-xs mt-2">
                Input your content and goal to generate an expert optimization report.
              </p>
              <div className="mt-8 flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-full bg-slate-200 animate-pulse delay-${i * 200}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOptimizer;