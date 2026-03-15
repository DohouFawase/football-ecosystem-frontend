import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles, Trophy } from 'lucide-react';

const BlogPreview = () => {
  const articles = [
    {
      id: 1,
      category: "Management",
      title: "10 Tips for Running a Successful Championship",
      author: "Sarah Martinez",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=1000&auto=format&fit=crop",
      accent: "text-blue-600 bg-blue-50"
    },
    {
      id: 2,
      category: "Coaching",
      title: "How Team Managers Can Improve Squad Performance",
      author: "Coach James",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1526232759583-26f1dd3f7ee1?q=80&w=1000&auto=format&fit=crop",
      accent: "text-emerald-600 bg-emerald-50"
    },
    {
      id: 3,
      category: "Education",
      title: "Understanding Live Sports Betting: A Beginner's Guide",
      author: "Legal Team",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=1000&auto=format&fit=crop",
      accent: "text-orange-600 bg-orange-50"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <Sparkles size={14} /> Knowledge Hub
            </div>
            <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] text-slate-900">
              Learn, Grow, <br />
              <span className="text-blue-600">Succeed.</span>
            </h2>
            <p className="text-slate-500 mt-6 font-medium text-lg italic max-w-lg">
              &quot;Expert tips, guides, and stories from the ChampionHub community.&ldquo;
            </p>
          </div>
          
          <button className="flex items-center gap-3 text-slate-900 font-black uppercase italic tracking-widest text-xs hover:text-blue-600 transition-colors group">
            View all resources <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* --- ARTICLE GRID --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-[2rem] bg-gray-100">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full font-black uppercase text-[10px] tracking-widest ${article.accent}`}>
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="px-2">
                <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase mb-3">
                  <span className="flex items-center gap-1.5"><BookOpen size={12}/> By {article.author}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12}/> {article.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-black italic uppercase text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors tracking-tighter">
                  {article.title}
                </h3>
                
                <button className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all">
                  Read More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- DECORATION --- */}
        <div className="mt-20 h-px w-full bg-gray-100 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
             <Trophy size={24} className="text-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;