import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDark = false;

  toggleTheme(): void {
  this.isDark = !this.isDark;

  const html = document.documentElement; // <html> etiketi
  html.classList.toggle('dark', this.isDark);

  localStorage.setItem('preferredTheme', this.isDark ? 'dark' : 'light');
}

  initializeTheme(): void {
    const saved = localStorage.getItem('preferredTheme');
    if (saved === 'dark') {
      this.isDark = true;
      document.body.classList.add('dark-theme');
    }
  }

  isDarkMode(): boolean {
    return this.isDark;
  }
}
