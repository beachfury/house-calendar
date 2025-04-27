// src/pages/MealsPage.tsx
import {
  PlusCircle,
  Sunrise,
  Sun,
  Moon,
  User,
} from 'lucide-react';

interface DailyMeals {
  day: string;
  meals: { type: 'Breakfast' | 'Lunch' | 'Dinner'; name: string }[];
}

interface Suggestion {
  id: number;
  text: string;
  by: string;
}

// --- Sample data for the weekly grid ---
const sampleMeals: DailyMeals[] = [
  { day: 'Sunday',    meals: [{ type: 'Breakfast', name: 'Pancakes' }, { type: 'Lunch', name: 'Salad'     }, { type: 'Dinner', name: 'Spaghetti' }] },
  { day: 'Monday',    meals: [{ type: 'Breakfast', name: 'Oatmeal'  }, { type: 'Lunch', name: 'Tacos'     }, { type: 'Dinner', name: 'Stir‑Fry'  }] },
  { day: 'Tuesday',   meals: [{ type: 'Breakfast', name: 'Smoothie' }, { type: 'Lunch', name: 'Sandwich'  }, { type: 'Dinner', name: 'Tacos'     }] },
  { day: 'Wednesday', meals: [{ type: 'Breakfast', name: 'Bagel'    }, { type: 'Lunch', name: 'Sushi'     }, { type: 'Dinner', name: 'Curry'     }] },
  { day: 'Thursday',  meals: [{ type: 'Breakfast', name: 'Eggs'     }, { type: 'Lunch', name: 'Pizza'     }, { type: 'Dinner', name: 'Burrito'   }] },
  { day: 'Friday',    meals: [{ type: 'Breakfast', name: 'Yogurt'   }, { type: 'Lunch', name: 'Burger'    }, { type: 'Dinner', name: 'Salmon'    }] },
  { day: 'Saturday',  meals: [{ type: 'Breakfast', name: 'French Toast' }, { type: 'Lunch', name: 'Ramen' }, { type: 'Dinner', name: 'Steak' }] },
];

// --- Sample data for suggestions ---
const sampleSuggestions: Suggestion[] = [
  { id: 1, text: 'Taco Tuesday!',     by: 'Alice' },
  { id: 2, text: 'How about sushi?',  by: 'Bob'   },
  { id: 3, text: 'Pasta night soon',  by: 'Carol' },
];

export default function MealsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Weekly Meals */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Weekly Meals
          </h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <PlusCircle className="w-5 h-5" />
            <span>Add Meal</span>
          </button>
        </div>

        {/* Grid of days */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {sampleMeals.map(({ day, meals }) => (
            <div
              key={day}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition flex flex-col"
            >
              <h3 className="text-center font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {day}
              </h3>
              <ul className="space-y-2 flex-1">
                {['Breakfast','Lunch','Dinner'].map(type => {
                  const meal = meals.find(m => m.type === type)!;
                  return (
                    <li key={type} className="flex items-center space-x-2">
                      {type === 'Breakfast' && <Sunrise className="w-5 h-5 text-yellow-500" />}
                      {type === 'Lunch'     && <Sun     className="w-5 h-5 text-orange-500" />}
                      {type === 'Dinner'    && <Moon    className="w-5 h-5 text-blue-500"  />}
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{type}:</span> {meal.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Suggestions */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Meal Suggestions
          </h2>
          <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
            <PlusCircle className="w-4 h-4" />
            <span className="text-sm">Add Suggestion</span>
          </button>
        </header>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sampleSuggestions.map(s => (
            <li
              key={s.id}
              className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <User className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-4" />
              <div>
                <p className="text-gray-800 dark:text-gray-100">{s.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  — {s.by}
                </p>
              </div>
            </li>
          ))}
          {sampleSuggestions.length === 0 && (
            <li className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              No suggestions yet.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
