import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalSkills: number;
}

export function Hero({ searchQuery, setSearchQuery, totalSkills }: HeroProps) {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-16 pb-12 lg:pt-24 lg:pb-16">
      <div className="absolute inset-0 bg-grid-black/5 bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,black)] dark:bg-grid-white/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            {totalSkills} {t('app.skillsAvailable')}
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
            {t('app.title')}
            <span className="block text-primary mt-1 text-3xl sm:text-5xl lg:text-6xl">
              {t('app.subtitle')}
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-10">
            {t('hero.description', { defaultValue: 'Supercharge your Claude experience with our curated marketplace of essential skills and plugins.' })}
          </p>
        </div>

        <div className="w-full max-w-2xl relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 h-14 text-lg bg-background/80 backdrop-blur-xl border-2 border-border/50 focus:border-primary/50 rounded-xl shadow-lg transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
