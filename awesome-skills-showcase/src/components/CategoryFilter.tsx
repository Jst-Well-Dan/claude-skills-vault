import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { t } = useTranslation();

  const formatCategory = (category: string) => {
    if (category === 'all') return t('categories.all');
    return t(`categories.${category}`, {
      defaultValue: category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    });
  };

  const allCategories = ['all', ...categories];

  return (
    <ScrollArea className="w-full whitespace-nowrap pb-4">
      <div className="flex w-max space-x-2 p-1">
        {allCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "rounded-full transition-all duration-300 relative",
              selectedCategory === category 
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                : "bg-background hover:bg-muted hover:text-foreground text-muted-foreground border-transparent hover:border-border"
            )}
            size="sm"
          >
            {formatCategory(category)}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}
