import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  id: number;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  retailerName?: string;
  category: 'supermarket' | 'pharma' | 'electronics';
  onAddToCart?: () => void;
};

const ProductCard = ({
  id,
  image,
  name,
  price,
  originalPrice,
  retailerName,
  category,
  onAddToCart
}: ProductCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;
    
  const handleCardClick = () => {
    navigate(`/${category}/product/${id}`);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div 
      className="flex items-center p-3 my-2 bg-white rounded-xl shadow-sm cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="flex-1 ml-3">
        <p className="font-semibold text-gray-800">{name}</p>
        
        {retailerName && (
          <p className="text-xs text-gray-500">{retailerName}</p>
        )}
        
        <div className="flex items-baseline mt-1">
          <p className="text-lg font-bold text-gray-800">₪{price.toFixed(2)}</p>
          
          {originalPrice && originalPrice > price && (
            <div className="flex items-center ml-2">
              <p className="text-xs line-through text-gray-500">₪{originalPrice.toFixed(2)}</p>
              <span className="px-1.5 py-0.5 ml-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                -{discountPercentage}%
              </span>
            </div>
          )}
        </div>
      </div>
      
      {onAddToCart && (
        <button
          onClick={handleAddToCart}
          className="px-3 py-1.5 text-sm font-medium text-white rounded-full bg-primary hover:bg-primary/90"
        >
          {t('addToCart')}
        </button>
      )}
    </div>
  );
};

export default ProductCard;