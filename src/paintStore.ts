import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  litersPerCan: number;
  quantity: number;
  dp: number;
  billPercent: number;
  cdPercent: number;
  gstPercent: number;
}

export interface Sale {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantitySold: number;
  litersPerCan: number;
  ratePerCan: number;
  totalLiters: number;
  totalAmount: number;
  calculations: {
    baseDp: number;
    billDiscountAmount: number;
    cdDiscountAmount: number;
    gstAmount: number;
  };
}

interface PaintStore {
  products: Product[];
  sales: Sale[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  getProduct: (id: string) => Product | undefined;
}

export const usePaintStore = create<PaintStore>()(
  persist(
    (set, get) => ({
      products: [],
      sales: [],
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: crypto.randomUUID() },
          ],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      addSale: (sale) => {
        const newSale = {
          ...sale,
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
        };
        
        // Update stock automatically
        const product = get().products.find((p) => p.id === sale.productId);
        if (product) {
          get().updateProduct(product.id, {
            quantity: product.quantity - sale.quantitySold,
          });
        }

        set((state) => ({
          sales: [newSale, ...state.sales],
        }));
      },
      getProduct: (id) => get().products.find((p) => p.id === id),
    }),
    {
      name: 'paint-shop-storage',
      partialize: (state) => ({ products: state.products ?? [], sales: state.sales ?? [] }),
    }
  )
);
