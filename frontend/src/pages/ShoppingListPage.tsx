// src/pages/ShoppingListPage.tsx
import { useState } from 'react';
import {
  PlusCircle,
  CheckSquare,
  Square,
  MapPin,
  ShoppingCart,
} from 'lucide-react';

interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  price: number;
  purchased: boolean;
  store: string;    // new store field
}

const sampleItems: ShoppingItem[] = [
  { id: 1, name: 'Milk',              quantity: '1 gal',    price: 3.49,  purchased: false, store: 'Whole Foods' },
  { id: 2, name: 'Eggs',              quantity: '1 doz',    price: 2.99,  purchased: true,  store: 'Trader Joe’s' },
  { id: 3, name: 'Bread',             quantity: '2 loaves', price: 4.50,  purchased: false, store: 'Whole Foods' },
  { id: 4, name: 'Apples',            quantity: '6 pcs',    price: 3.00,  purchased: false, store: 'Safeway' },
  { id: 5, name: 'Almond Milk',       quantity: '1 gal',    price: 4.25,  purchased: false, store: 'Trader Joe’s' },
];

// Gather unique stores
const allStores = Array.from(new Set(sampleItems.map(i => i.store)));

export default function ShoppingListPage() {
  const [filterStore, setFilterStore] = useState<string>('All');

  // Filter items by store if needed
  const visibleItems = filterStore === 'All'
    ? sampleItems
    : sampleItems.filter(i => i.store === filterStore);

  // Group by store
  const itemsByStore: Record<string, ShoppingItem[]> = {};
  visibleItems.forEach(i => {
    (itemsByStore[i.store] ??= []).push(i);
  });

  // currency formatter
  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

  // Compute grand total
  const grandTotal = visibleItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
          <ShoppingCart className="w-6 h-6" />
          <span>Shopping List</span>
        </div>
        <button className="flex items-center space-x-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
          <PlusCircle className="w-5 h-5" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Store filter pills */}
      <div className="flex flex-wrap gap-2">
        {['All', ...allStores].map(store => (
          <button
            key={store}
            onClick={() => setFilterStore(store)}
            className={`px-3 py-1 rounded-full text-sm transition
              ${filterStore === store
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-medium'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            {store}
          </button>
        ))}
      </div>

      {/* Grouped sections */}
      {Object.entries(itemsByStore).map(([store, items]) => {
        const storeTotal = items.reduce((sum, i) => sum + i.price, 0);
        return (
          <section key={store} className="space-y-4">
            {/* Store header */}
            <div className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
              <MapPin className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <span>{store}</span>
              <span className="ml-auto text-sm font-medium text-gray-600 dark:text-gray-400">
                Subtotal: {fmt(storeTotal)}
              </span>
            </div>

            {/* Items list */}
            <ul className="space-y-2">
              {items.map(item => (
                <li
                  key={item.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center space-x-4">
                    {item.purchased
                      ? <CheckSquare className="w-6 h-6 text-green-500" />
                      : <Square      className="w-6 h-6 text-gray-400" />}
                    <div>
                      <div className={`text-lg font-medium ${
                        item.purchased
                          ? 'line-through text-gray-400 dark:text-gray-600'
                          : 'text-gray-800 dark:text-gray-100'
                      }`}>
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.quantity} &middot; <span className="font-semibold">{fmt(item.price)}</span>
                      </div>
                    </div>
                  </div>
                  <ShoppingCart className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* Grand total */}
      <div className="flex justify-end pt-4 border-t dark:border-gray-700 space-x-4">
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Grand Total:
        </span>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {fmt(grandTotal)}
        </span>
      </div>
    </div>
  );
}
