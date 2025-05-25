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

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, RouterModule, ProfileEditComponent, QrModalComponent, SkillListComponent, JsonUploadComponent],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

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

  ngOnInit(): void {
  const routeData = this.route.snapshot.data;
  this.editable = routeData['editable'] || false;

  const routeUsername = this.route.snapshot.paramMap.get('username');

  if (routeUsername) {
    // /cards/:username → başkasının profili
    this.userService.getUserByUsername(routeUsername).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Kullanıcı bulunamadı:', err);
        this.router.navigate(['/auth/login']);
      }
    });
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

