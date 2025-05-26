// src/app/components/user-card/user-card.component.ts
import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { ProjectListComponent } from '../project-list/project-list.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { DomSanitizer } from '@angular/platform-browser';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { ThemeService } from '../../services/theme.service';
import { SkillListComponent } from '../skill-list/skill-list.component';
import { Skill } from '../../services/skill.service';
import { SkillFormComponent } from '../skill-form/skill-form.component';
import { JsonUploadComponent } from "../json-upload/json-upload.component";
import { HttpHeaders } from '@angular/common/http';
import { faGithub, faLinkedin, faTwitter, faInstagram, faBehance, faDribbble,faMedium, faStackOverflow, IconDefinition, } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, RouterModule, ProfileEditComponent, QrModalComponent, SkillListComponent, JsonUploadComponent,FontAwesomeModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  icons: { [key: string]: IconDefinition } = {
  GitHub: faGithub,
  LinkedIn: faLinkedin,
  Twitter: faTwitter,
  Instagram: faInstagram,
   Medium: faMedium,
  StackOverflow: faStackOverflow
};

  user!: User;
  // Modal kontrol değişkenleri
  showProfileModal = false;
  contactModalOpen = false;
  editable: boolean = false;
  


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private themeService: ThemeService
  ) { }

showQr = false;
qrCodeUrl = '';

  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  ngOnInit(): void {
  const routeData = this.route.snapshot.data;
  this.editable = routeData['editable'] || false;

  const routeUsername = this.route.snapshot.paramMap.get('username');

  if (routeUsername) {
    // /cards/:username → başkasının profili

    // 🌍 Konumu alıp API'ye birlikte gönder
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.userService.getUserByUsernameWithLocation(routeUsername, lat, lon).subscribe({
            next: (data) => {
              this.user = data;
            },
            error: (err) => {
              console.error('Kullanıcı bulunamadı:', err);
              this.router.navigate(['/auth/login']);
            }
          });
        },
        (error) => {
          console.warn('Konum alınamadı:', error.message);
          // konum alınamazsa konumsuz gönder
          this.userService.getUserByUsername(routeUsername).subscribe({
            next: (data) => {
              this.user = data;
            },
            error: (err) => {
              console.error('Kullanıcı bulunamadı:', err);
              this.router.navigate(['/auth/login']);
            }
          });
        }
      );
    } else {
      console.warn('Tarayıcı geolocation desteklemiyor.');
      this.userService.getUserByUsername(routeUsername).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Kullanıcı bulunamadı:', err);
          this.router.navigate(['/auth/login']);
        }
      });
    }

  } else {
    // /profile → giriş yapmış kullanıcı
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      const userId = userObj.id;
      this.qrCodeUrl = `http://192.168.1.69:8080/api/users/qr/username/${userObj.username}`;

      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => console.error('Kullanıcı yüklenemedi:', err)
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}



toggleTheme(): void {
  this.themeService.toggleTheme();
}

closeQrModal = () => {
  this.showQr = false;
};

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  openProfileModal(): void {
    if (this.editable) this.showProfileModal = true;
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
  }

  openContactModal(): void {
    this.contactModalOpen = true;
  }

  closeContactModal(): void {
    this.contactModalOpen = false;
  }


  downloadQr(imgEl: HTMLImageElement): void {
    const link = document.createElement('a');
    link.href = imgEl.src;
    link.download = 'qr-kod.png';
    link.click();
  }

  shareQr(): void {
    if (navigator.share) {
      fetch(this.qrCodeUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'qr-kod.png', { type: blob.type });
          navigator.share({
            title: 'Dijital Kartım',
            text: 'Profilime göz at!',
            files: [file]
          }).catch(err => console.log('Paylaşım iptal edildi', err));
        });
    } else {
      alert('Tarayıcınız paylaşım özelliğini desteklemiyor.');
    }
  }

}

