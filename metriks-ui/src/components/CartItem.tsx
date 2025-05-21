import { useCart } from '../context/CartContext';

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CartItem = ({ id, name, price, image, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeItem(id);
    }
  };

  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <div className="flex items-center p-3 my-2 bg-white rounded-xl shadow-sm">
      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="flex-1 mx-3">
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-lg font-bold text-gray-800">₪{price.toFixed(2)}</p>
      </div>
      
      <div className="flex flex-col items-end">
        <button
          onClick={handleRemove}
          className="mb-2 text-gray-400 hover:text-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-2 border border-gray-300 rounded-full">
          <button
            onClick={handleDecrement}
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          
          <span className="w-6 text-center">{quantity}</span>
          
          <button
            onClick={handleIncrement}
            className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;