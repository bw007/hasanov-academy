# 🎓 Hasanov Academy

Online kurslar platformasi.

### ✨ Asosiy xususiyatlar

- 🎥 Video darsliklar
- 📚 Kurslar katalogi va qidiruv tizimi
- 📱 Responsive dizayn (mobil va desktop)
- 🔐 Xavfsiz autentifikatsiya va avtorizatsiya

## 🛠️ Texnologiyalar

### Frontend
- **Angular 20** - asosiy framework
- **TypeScript** - dasturlash tili
- **Tailwind CSS** - styling
- **RxJS** - reactive programming
- **PrimeNG** - UI komponentlar

### Backend (API)
- **Node.js + Express** - server
- **MongoDB** - ma'lumotlar bazasi
- **JWT** - authentication

### DevOps
- **Netlify** - frontend hosting
- **Render** - backend hosting
- **Git/GitHub** - version control

## 🚀 O'rnatish va ishga tushirish

### Talablar

- Node.js 18+ va npm
- Git

### Lokal ishga tushirish

1. **Repositoriyani clone qiling:**
```bash
git clone https://github.com/bw007/hasanov-academy.git
cd hasanov-academy
```

2. **Dependencies o'rnating:**
```bash
npm install
```

3. **Environment o'rnating:**

`src/environments/environment.development.ts` faylini yarating:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
```

4. **Development server ishga tushiring:**
```bash
ng serve
```

Brauzerda `http://localhost:4200` ochiladi.

### Production build

```bash
ng build
```

## 🌐 Deploy

Loyiha **Netlify** orqali avtomatik deploy qilinadi:

- **Production URL:** https://hasanov-academy.netlify.app
- Har bir `main` branch'ga push avtomatik deploy qiladi
- Pull request'lar uchun preview deployments yaratiladi

## 👨‍💻 Muallif

**Lazizbek Hasanov**
- GitHub: [@bw007](https://github.com/bw007)
- Email: me.khasanov02@gmail.com
- Website: https://hasanov-academy.netlify.app

⭐ Loyiha yoqsa, GitHub'da star qo'yishni unutmang!

##  Kelajak rejalar

-    Backend API dokumentatsiyasi: `https://api.hasanov-academy.com/docs`
- 👤 Foydalanuvchi profili va progress tracking
- 💳 To'lov tizimi integratsiyasi
- 📊 O'qituvchilar uchun statistika dashboard
- 💬 Savol-javob va izohlar tizimi
