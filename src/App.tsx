import React, { useState } from 'react';
import { ProgressProvider } from './context/ProgressContext';
import { MusicProvider, useMusic } from './context/MusicContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeSection } from './components/HomeSection';
import { WorksSection } from './components/WorksSection';
import { MailboxSection } from './components/MailboxSection';
import { KnowledgeSection } from './components/KnowledgeSection';
import { GamesSection } from './components/GamesSection';
import { ExamsSection } from './components/ExamsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { LiteraryFortuneModal } from './components/LiteraryFortuneModal';
import { MusicPlayerModal } from './components/MusicPlayerModal';
import { FloatingMusicBar } from './components/FloatingMusicBar';

const MusicPlayerLayer: React.FC = () => {
  const { isModalOpen, closeModal } = useMusic();
  return (
    <>
      <MusicPlayerModal isOpen={isModalOpen} onClose={closeModal} />
      <FloatingMusicBar />
    </>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'works' | 'mailbox' | 'knowledge' | 'games' | 'exams' | 'achievements'>('home');
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const [isFortuneModalOpen, setIsFortuneModalOpen] = useState(false);

  const handleNavigate = (tab: 'home' | 'works' | 'mailbox' | 'knowledge' | 'games' | 'exams' | 'achievements') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWorkFromHome = (workId: string) => {
    setSelectedWorkId(workId);
    setActiveTab('works');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ProgressProvider>
      <MusicProvider>
        <div className="min-h-screen flex flex-col bg-[#FFF9F0] text-[#25234A] selection:bg-[#A78BFA]/30">
        {/* Navigation Bar conforming to Top Bar Contract */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenFortune={() => setIsFortuneModalOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {activeTab === 'home' && (
            <HomeSection
              onNavigate={handleNavigate}
              onSelectWork={handleSelectWorkFromHome}
              onOpenFortune={() => setIsFortuneModalOpen(true)}
            />
          )}

          {activeTab === 'works' && (
            <WorksSection
              initialSelectedWorkId={selectedWorkId}
              onClearInitialSelectedWork={() => setSelectedWorkId(null)}
            />
          )}

          {activeTab === 'mailbox' && <MailboxSection />}

          {activeTab === 'knowledge' && <KnowledgeSection />}

          {activeTab === 'games' && <GamesSection />}

          {activeTab === 'exams' && <ExamsSection />}

          {activeTab === 'achievements' && <AchievementsSection />}
        </main>

        {/* Literary Fortune Modal */}
        <LiteraryFortuneModal
          isOpen={isFortuneModalOpen}
          onClose={() => setIsFortuneModalOpen(false)}
        />

        {/* Footer with credits and literary theme */}
        <Footer onNavigate={handleNavigate} />

        {/* Music Player Modal & Floating Bar */}
        <MusicPlayerLayer />
      </div>
    </MusicProvider>
  </ProgressProvider>
  );
}
