import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class JsonDataService {
  private baseUrl = 'http://localhost:8080/api/json';

  constructor(private http: HttpClient) {}

  exportUserData(userId: number): void {
    this.http.get(`${this.baseUrl}/export/${userId}`, { responseType: 'blob' })
      .subscribe(blob => {
        saveAs(blob, `user-${userId}-data.json`);
      });
  }

  importUserData(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/import`, formData, { responseType: 'text' });
  }
}
