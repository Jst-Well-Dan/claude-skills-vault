import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PluginCard } from './components/PluginCard';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Package, Github } from 'lucide-react';
import marketplaceData from './marketplace.json';
import type { MarketplaceData } from './types';
import { Button } from './components/ui/button';

const data = marketplaceData as MarketplaceData;

function App() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(data.plugins.map(p => p.category));
    return Array.from(cats).sort();
  }, []);

  // Filter plugins based on search and category
  const filteredPlugins = useMemo(() => {
    return data.plugins.filter(plugin => {
      const matchesSearch =
        plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || plugin.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
                {t('app.title')}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex text-xs text-muted-foreground gap-4">
                 <span>v{data.version}</span>
                 <span>by {data.owner.name}</span>
              </div>
              <div className="h-4 w-[1px] bg-border hidden sm:block"></div>
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Jst-Well-Dan/claude-skills-vault" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        totalSkills={data.plugins.length} 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        
        {/* Category Filter */}
        <div className="mb-10 bg-card/50 backdrop-blur-md p-2 rounded-2xl border shadow-sm sticky top-20 z-40">
           <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
           />
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            {selectedCategory === 'all' 
              ? t('categories.allSkills', { defaultValue: 'All Skills' }) 
              : t(`categories.${selectedCategory}`, { defaultValue: selectedCategory })}
          </h2>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {filteredPlugins.length} {t('app.skills')}
          </span>
        </div>

        {/* Plugin Grid */}
        {filteredPlugins.length === 0 ? (
          <div className="text-center py-24 bg-card/30 rounded-3xl border border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Package className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('search.noResults')}</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {t('search.tryAdjusting')}
            </p>
            <Button 
              variant="link" 
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 text-primary"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.map((plugin, index) => (
              <PluginCard key={plugin.name} plugin={plugin} index={index} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
               <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                  {t('app.title')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {t('app.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:col-span-2">
               <div>
                  <h4 className="font-semibold mb-4">{t('footer.resources', {defaultValue: 'Resources'})}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                     <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                     <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                     <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-semibold mb-4">{t('footer.legal', {defaultValue: 'Legal'})}</h4>
                   <ul className="space-y-2 text-sm text-muted-foreground">
                     <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                     <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                  </ul>
               </div>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 {data.owner.name}. All rights reserved.</p>
            <div className="flex items-center gap-6">
               <a href="https://github.com/Jst-Well-Dan/claude-skills-vault" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;