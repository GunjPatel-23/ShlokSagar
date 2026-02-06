import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: string;
  slug?: string;
  name: string;
  hindiName: string;
  image: string;
  itemCount?: number;
}

export const CategoryCard = ({
  id,
  slug,
  name,
  hindiName,
  image,
  itemCount,
}: CategoryCardProps) => {
  // Debug log
  console.log('CategoryCard props:', { id, slug, name });
  
  return (
    <Link
      to={`/categories/${slug || id}`}
      className="group block card-sacred overflow-hidden hover:border-primary/30"
    >
      <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={`${name} - ${hindiName}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold font-devanagari text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-lg text-muted-foreground font-devanagari mt-1">
          {hindiName}
        </p>
        {itemCount !== undefined && (
          <p className="text-sm text-muted-foreground mt-2">
            {itemCount} items
          </p>
        )}
      </div>
    </Link>
  );
};
