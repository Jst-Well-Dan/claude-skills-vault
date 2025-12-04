import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import type { Plugin } from '../types';

interface PluginCardProps {
  plugin: Plugin;
  index: number;
}

export function PluginCard({ plugin, index }: PluginCardProps) {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const installCommand = `/plugin install ${plugin.name}`;
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCategory = (category: string) => {
    return t(`categories.${category}`, {
      defaultValue: category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    });
  };

  // Category color mapping for left border and badge
  const getCategoryColors = (category: string) => {
    const colorMap: Record<string, { border: string; badge: string; bg: string }> = {
      'code-development': {
        border: 'border-l-blue-500',
        badge: 'bg-blue-50 text-blue-700 border-blue-200',
        bg: 'from-blue-50/30'
      },
      'content-creation': {
        border: 'border-l-purple-500',
        badge: 'bg-purple-50 text-purple-700 border-purple-200',
        bg: 'from-purple-50/30'
      },
      'learning-research': {
        border: 'border-l-emerald-500',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        bg: 'from-emerald-50/30'
      },
      'office-documents': {
        border: 'border-l-amber-500',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        bg: 'from-amber-50/30'
      },
      'version-control': {
        border: 'border-l-cyan-500',
        badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        bg: 'from-cyan-50/30'
      },
      'creative-media': {
        border: 'border-l-pink-500',
        badge: 'bg-pink-50 text-pink-700 border-pink-200',
        bg: 'from-pink-50/30'
      },
      'business-marketing': {
        border: 'border-l-orange-500',
        badge: 'bg-orange-50 text-orange-700 border-orange-200',
        bg: 'from-orange-50/30'
      },
      'data-analysis': {
        border: 'border-l-indigo-500',
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        bg: 'from-indigo-50/30'
      },
    };
    return colorMap[category] || {
      border: 'border-l-gray-500',
      badge: 'bg-gray-50 text-gray-700 border-gray-200',
      bg: 'from-gray-50/30'
    };
  };

  const skillName = i18n.language === 'zh-CN'
    ? t(`skills.${plugin.name}.name`, { defaultValue: plugin.name })
    : plugin.name;

  const skillDescription = i18n.language === 'zh-CN'
    ? t(`skills.${plugin.name}.description`, { defaultValue: plugin.description })
    : plugin.description;

  const categoryColors = getCategoryColors(plugin.category);

  return (
    <div
      className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Card className={`group relative h-full flex flex-col overflow-hidden border-l-4 ${categoryColors.border} border-r border-t border-b border-border bg-gradient-to-br ${categoryColors.bg} via-white to-white shadow-md transition-all duration-300 hover:shadow-2xl hover:border-l-4 hover:-translate-y-1`}>
        {/* Subtle hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Copy button in top-right corner */}
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-border shadow-sm text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
          title={copied ? t('card.copied') : t('card.copyCommand')}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between gap-2 mb-3">
            <Badge className={`${categoryColors.badge} border transition-colors`}>
              {formatCategory(plugin.category)}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors">
            {skillName}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {skillDescription}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}