import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, ExternalLink, Zap, Globe, ChevronRight, Activity, BarChart3, Newspaper, AlertCircle } from 'lucide-react';

type NewsArticle = {
  title: string;
  link: string;
  pubDate: string;
  image_url?: string;
  description: string;
  source_id: string;
};

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;


  useEffect(() => {
    const fetchFinanceNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&language=en&size=10`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArticles(data.results || []);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch finance news. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceNews();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const articleDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - articleDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getSourceColor = (source: string) => {
    const colorMap: { [key: string]: string } = {
      'reuters': 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200',
      'bloomberg': 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200',
      'cnn': 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200',
      'bbc': 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200',
      'yahoo': 'bg-gradient-to-r from-violet-50 to-violet-100 text-violet-800 border-violet-200',
      'techcrunch': 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200'
    };
    return colorMap[source.toLowerCase()] || 'bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 border-slate-200';
  };

  const getInitials = (sourceName: string) => {
    return sourceName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-b-green-600 rounded-full animate-spin" style={{animationDelay: '0.6s'}}></div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-2">
                Loading Market Intelligence
              </h2>
              <p className="text-slate-500">Fetching latest financial insights from global sources...</p>
              <div className="flex justify-center mt-4 space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Connection Error</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[-30px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Market Intelligence
                  </h1>
                  <p className="text-slate-500 font-medium">Real-time financial insights & analysis</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-full shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-semibold tracking-wide">LIVE</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700 text-sm font-medium">Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Articles</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{articles.length}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Newspaper className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Sources</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{new Set(articles.map(a => a.source_id)).size}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Updated</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">Now</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Markets</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">Global</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <div className="space-y-8">
            {articles.map((article, index) => (
              <article 
                key={index} 
                className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/80"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold shadow-md ${getSourceColor(article.source_id)}`}>
                        {getInitials(article.source_id)}
                      </div>
                      <div>
                        <span className={`px-4 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${getSourceColor(article.source_id)}`}>
                          {article.source_id}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTimeAgo(article.pubDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {article.title}
                  </h2>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      <span className="text-lg">Read Full Analysis</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700 font-medium">Powered by Real-time Market Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;