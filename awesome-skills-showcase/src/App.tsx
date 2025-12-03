import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PluginCard } from './components/PluginCard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package } from 'lucide-react';
import marketplaceData from './marketplace.json';
import type { MarketplaceData } from './types';

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

  const formatCategory = (category: string) => {
    return t(`categories.${category}`, {
      defaultValue: category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Package className="w-10 h-10 text-primary" />
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {t('app.title')}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {t('app.subtitle')}
                </p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold">{data.plugins.length}</span> {t('app.skillsAvailable')}
            <span className="mx-2">•</span>
            <span>{t('app.version')}{data.version}</span>
            <span className="mx-2">•</span>
            <span>{t('app.by')} {data.owner.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder={t('categories.all')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('categories.all')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {formatCategory(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            {t('app.showing')} {filteredPlugins.length} {t('app.of')} {data.plugins.length} {t('app.skills')}
          </div>
        </div>

        {/* Plugin Grid */}
        {filteredPlugins.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">{t('search.noResults')}</h3>
            <p className="text-muted-foreground">
              {t('search.tryAdjusting')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.map((plugin) => (
              <PluginCard key={plugin.name} plugin={plugin} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>{t('app.madeWith')} • {t('app.viewOnGithub')} <a href="https://github.com/ComposioHQ/awesome-claude-skills" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
