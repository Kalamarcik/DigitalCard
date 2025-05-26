# 📇 Dijital Kart Uygulaması

Bu proje, kullanıcıların dijital profil kartlarını oluşturabildiği, sosyal medya bağlantıları ekleyebildiği, tema seçimi yapabildiği ve QR kod ile profil paylaşımı gerçekleştirebildiği tam yığınlı bir web uygulamasıdır.

---

## 🧰 Kullanılan Teknolojiler

### Backend (Spring Boot)
- Spring Boot
- Spring Security + JWT (kimlik doğrulama)
- PostgreSQL
- JPA / Hibernate
- RESTful API
- Dosya yükleme desteği (`/uploads` klasörü)

### Frontend (Angular)
- Angular 17 (Standalone Components)
- Tailwind CSS
- Font Awesome
- Tema (Açık/Karanlık) desteği
- QR kod görüntüleme

---

## 📁 Proje Yapısı

```
📦 digital-card-project
 ┣ 📁 backend         → Spring Boot API
 ┣ 📁 frontend        → Angular standalone uygulama
 ┗ 📄 README.md
```

---

## ⚙️ Kurulum Talimatları

### ✅ Gereksinimler

- Java 17+
- Node.js (18+ önerilir)
- Angular CLI (`npm install -g @angular/cli`)
- PostgreSQL

---

### 🔧 Backend (Spring Boot)

1. PostgreSQL üzerinde bir veritabanı oluştur:  
   `digitalcarddb`

2. `backend/src/main/resources/application.properties` dosyasındaki ayarlar:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/digitalcarddb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
project.image.upload-dir=uploads
```

3. Projeyi çalıştır:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Sunucu adresi: `http://localhost:8080`

---

### 🌐 Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Tarayıcıdan aç: [http://localhost:4200](http://localhost:4200)  
📡 Yerel ağdan erişim: [http://192.168.x.x:4200](http://192.168.x.x:4200)

---

## 🔐 Giriş Bilgileri

```txt
Varsayılan kullanıcı: testuser@example.com / 123456
(ya da kendi kayıt sistemi ile kullanıcı oluşturabilirsiniz)
```

---

## 📡 API Rotaları (Örnekler)

> Daha fazlası için Postman collection veya Swagger entegrasyonu önerilir.

- `POST /api/auth/login`  
- `POST /api/users/register`  
- `GET /api/users/{id}`  
- `PUT /api/users/update/{id}`  
- `POST /api/users/image-upload/{id}`  
- `GET /api/users/cards/{username}`  
- `GET /api/users/qr/{username}`  
- `GET /uploads/{filename}`  

---

## ✨ Özellikler

- 📱 QR Kod ile profil paylaşımı
- 🌓 Tema seçimi (karanlık / açık mod)
- 🔗 Sosyal medya bağlantıları ekleyebilme
- 📝 Profil düzenleme (ad, biyografi, avatar, yetkinlik vs.)
- 🖼️ Görsel yükleme desteği
- 📦 Dosya boyutu sınırlamaları (10MB’a kadar)

---

## 📝 Lisans

MIT License © 2025

---

## 🤝 Katkıda Bulunmak

1. Bu repoyu forklayın  
2. Yeni bir branch oluşturun: `git checkout -b feature/yeni-özellik`  
3. Değişikliklerinizi commit’leyin  
4. Pull request gönderin  

---

> 📌 Bu belge senin proje için özel hazırlanmıştır. İleride yeni özellikler ekledikçe güncellemen yeterli olur.
