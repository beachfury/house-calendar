// src/utils/routeTitles.ts
export const routeTitles: Record<string, string> = {
    '':            'Dashboard',
    'calendar':    'Calendar',
    'chores':      'Chores',
    'paid-chores': 'Paid Chores',
    'meals':       'Meals',
    'shopping':    'Shopping',
    'budget':      'Budget',
    'todo':        'Todo',
    'notes':       'Notes',
    'users':       'Users',
    'settings':    'Settings',
  };
  
  export function titleFromPath(path: string): string {
    // take last segment, strip leading slash
    const segs = path.split('/').filter(Boolean);
    const last = segs[segs.length - 1] ?? '';
    return routeTitles[last] ?? last.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  