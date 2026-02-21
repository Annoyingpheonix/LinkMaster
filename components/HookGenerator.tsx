import React, { useState } from 'react';
import { generateViralHooks } from '../services/geminiService';
import { HookIdea } from '../types';
import { Zap, Copy, RefreshCw } from 'lucide-react';

const HookGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [hooks, setHooks] = useState<HookIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    const res = await generateViralHooks(topic);
    setHooks(res);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Viral Hook Generator</h2>
        <p className="text-slate-500 text-sm md:text-base">Stop the scroll with AI-crafted opening lines.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (e.g., Salary Negotiation)"
          className="flex-1 p-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-base md:text-lg"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
            Generate
        </button>
      </div>

      <div className="grid gap-4">
        {hooks.map((hook) => (
          <div key={hook.id} className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-2">
              <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-widest">
                {hook.type}
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(hook.content)}
                className="text-slate-400 hover:text-blue-600 transition-colors"
                title="Copy Hook"
              >
                <Copy size={18} />
              </button>
            </div>
            <p className="text-base md:text-lg font-medium text-slate-800 leading-snug">
              {hook.content}
            </p>
          </div>
        ))}
        {hooks.length === 0 && !loading && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Enter a topic above to generate hooks.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default HookGenerator;