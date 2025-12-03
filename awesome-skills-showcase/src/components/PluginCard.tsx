import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import type { Plugin } from '../types';

interface PluginCardProps {
  plugin: Plugin;
}

export function PluginCard({ plugin }: PluginCardProps) {
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'creative-media': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'business-marketing': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'productivity-organization': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'communication-writing': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'collaboration-project-management': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      'data-analysis': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'document-processing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  // Get translated skill name and description
  const skillName = i18n.language === 'zh-CN'
    ? t(`skills.${plugin.name}.name`, { defaultValue: plugin.name })
    : plugin.name;

  const skillDescription = i18n.language === 'zh-CN'
    ? t(`skills.${plugin.name}.description`, { defaultValue: plugin.description })
    : plugin.description;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold">{skillName}</CardTitle>
          <Badge className={getCategoryColor(plugin.category)} variant="secondary">
            {formatCategory(plugin.category)}
          </Badge>
        </div>
        <CardDescription className="text-sm mt-2 line-clamp-3">
          {skillDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-xs text-muted-foreground">
          <span className="font-mono bg-muted px-2 py-1 rounded">
            {plugin.source}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCopy}
          className="w-full"
          variant={copied ? "secondary" : "default"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              {t('card.copied')}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              {t('card.copyCommand')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
