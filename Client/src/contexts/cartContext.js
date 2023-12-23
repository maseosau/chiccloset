import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
//21520766 -  Đặng Quốc Duy
export function CartProvider({ children }) {
    const [quantityInCart, setQuantityInCart] = useState(0);
    return (
        <CartContext.Provider value={{
            quantityInCart,
            setQuantityInCart, 
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
