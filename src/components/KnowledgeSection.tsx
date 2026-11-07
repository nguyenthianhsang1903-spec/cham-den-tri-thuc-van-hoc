import React, { useState } from 'react';
import { KNOWLEDGE_TOPICS } from '../data/knowledgeData';
import { KnowledgeTopic } from '../types';
import { BookMarked, Search, Layers, Compass, PenTool, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const KnowledgeSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(KNOWLEDGE_TOPICS[0].id);

  const categories = [
    { id: 'all', label: 'Tất cả chủ đề' },
    { id: 'genre', label: 'Thể loại văn học' },
    { id: 'reading_comprehension', label: 'Phương pháp đọc hiểu' },
    { id: 'social_essay', label: 'Nghị luận xã hội' },
    { id: 'literary_essay', label: 'Nghị luận văn học' },
    { id: 'rhetoric', label: '12 Biện pháp tu từ' },
    { id: 'thpt_review', label: 'Bí kíp thi tốt nghiệp' },
  ];

  const filteredTopics = KNOWLEDGE_TOPICS.filter((topic) => {
    const matchCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.keyPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5C76A]/20 text-[#25234A] text-xs font-semibold">
          <BookMarked className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Mục 2: Thư viện kiến thức</span>
        </div>
        <h1 className="font-serif-literary text-3xl sm:text-4xl font-bold text-[#25234A]">
          Thư viện kỹ năng & Phương pháp văn học
        </h1>
        <p className="text-sm text-[#25234A]/80 leading-relaxed">
          Tổng hợp toàn diện kỹ năng đọc hiểu văn bản, công thức viết văn nghị luận, cẩm nang 12 biện pháp
          tu từ và sơ đồ tư duy ôn thi tốt nghiệp THPT theo định hướng phát triển phẩm chất, năng lực.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white p-5 rounded-2xl border border-[#25234A]/10 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#25234A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm kỹ năng, công thức làm bài hoặc biện pháp tu từ..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#25234A]/15 text-sm focus:outline-none focus:border-[#8B5CF6] bg-[#FFF9F0]/30"
          />
        </div>

        {/* Categories segmented bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#25234A]/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#25234A] text-white shadow-xs'
                  : 'bg-[#FFF9F0] text-[#25234A]/80 hover:bg-[#A78BFA]/20 border border-[#25234A]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Cards List */}
      <div className="space-y-5">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedId === topic.id;
          return (
            <div
              key={topic.id}
              className={`rounded-2xl bg-white border transition-all duration-200 overflow-hidden ${
                isExpanded ? 'border-[#8B5CF6] shadow-md ring-1 ring-[#8B5CF6]/20' : 'border-[#25234A]/10 hover:border-[#8B5CF6]/50'
              }`}
            >
              {/* Collapsible Header */}
              <button
                onClick={() => toggleExpand(topic.id)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FFF9F0]/40 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8B5CF6]">
                    <span>{topic.categoryTitle}</span>
                  </div>
                  <h3 className="font-serif-literary text-2xl font-bold text-[#25234A]">
                    {topic.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#25234A]/80 leading-relaxed max-w-3xl">
                    {topic.summary}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#25234A]/5 text-[#25234A] shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-6 sm:p-8 pt-0 border-t border-[#25234A]/10 space-y-6 bg-white animate-in fade-in duration-150">
                  {/* Key points */}
                  <div className="space-y-3 pt-4">
                    <h4 className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#25234A] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F5C76A]" />
                      <span>Trọng tâm kiến thức cần ghi nhớ</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {topic.keyPoints.map((point, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-[#FFF9F0] border border-[#25234A]/10 text-sm sm:text-base text-[#25234A]/90 leading-relaxed">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps or Formula if present */}
                  {topic.stepsOrFormula && (
                    <div className="space-y-3">
                      <h4 className="text-xs sm:text-sm uppercase tracking-wider font-bold text-[#25234A] flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-[#8B5CF6]" />
                        <span>Công thức & Các bước thực hiện</span>
                      </h4>
                      <div className="p-5 rounded-2xl bg-[#25234A]/5 border border-[#25234A]/10 space-y-2.5">
                        {topic.stepsOrFormula.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#25234A]/90">
                            <span className="w-6 h-6 rounded-full bg-[#25234A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Examples or Model Analysis */}
                  {topic.examples && (
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-[#25234A] flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#D97706]" />
                        <span>Bài tập mẫu & Hướng dẫn phân tích</span>
                      </h4>
                      {topic.examples.map((ex, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-[#FFF9F0] border border-[#25234A]/15 space-y-2 text-xs">
                          {ex.prompt && (
                            <p className="font-semibold text-[#25234A]">
                              Đề bài: {ex.prompt}
                            </p>
                          )}
                          {ex.sample && (
                            <div className="p-3 rounded-lg bg-white border border-[#25234A]/10 italic text-[#25234A]/85 font-serif-literary leading-relaxed">
                              “{ex.sample}”
                            </div>
                          )}
                          {ex.analysis && (
                            <p className="text-[#25234A]/80">
                              <strong>Phân tích:</strong> {ex.analysis}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Visual Mindmap Overview if present */}
                  {topic.mindmapOverview && (
                    <div className="p-4 rounded-xl bg-[#25234A] text-white space-y-3">
                      <h5 className="text-xs uppercase tracking-wider font-bold text-[#F5C76A] flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>Sơ đồ tư duy thu gọn</span>
                      </h5>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-white/20 text-xs font-bold">
                          {topic.mindmapOverview.root}
                        </span>
                        <span className="text-[#F5C76A]">➔</span>
                        {topic.mindmapOverview.leaves.map((leaf, lIdx) => (
                          <span key={lIdx} className="px-2.5 py-1 rounded-md bg-white/10 text-xs text-white/90">
                            {leaf}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
