// qr-modal.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.css']
})
export class QrModalComponent {
  @Input() showQr: boolean = false;
  @Input() qrCodeUrl: string = '';
  @Input() close: () => void = () => {};

  isDesktop: boolean = true;


  ngOnInit(): void {
    const userAgent = navigator.userAgent;
    this.isDesktop = !/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
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
