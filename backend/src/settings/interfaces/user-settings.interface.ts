// backend/src/settings/interfaces/user-settings.interface.ts
export interface UserSettings {
  darkMode: boolean
  themeColor: string
  fontFamily: string
  fontSize: string
  backgroundImageUrl: string
  themeName: string;
  // + calendarView?: 'month'|'week'|'day'
  // + emailReminders?: boolean
  // …etc.
}
