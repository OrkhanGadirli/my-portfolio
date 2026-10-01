# My Portfolio

Orxanın portfolio saytı. Ön ekranda orijinal pəncərə və kosmos səhnəsi var; oğlan, qız, ulduzlar və işıq kodla yüngül hərəkət edir. Terminal sətri bu repoya aid işlək `git clone` əmrini göstərir. İstinad şəklindəki Prime Intellect mətnləri, loqosu və videosu istifadə olunmur.

Hazırda portfolio, sınanmış üçüncü tərəf repoları, məqalələr və vizual bələdçilər üçün bölmə quruluşu var. Real layihə, repo və məqalə məzmunu istifadəçi tərəfindən seçildikcə əlavə olunacaq. Sınanmış repolar şəxsi portfolio işləri kimi təqdim edilmir.

- GitHub: https://github.com/OrkhanGadirli/my-portfolio
- Firebase layihəsi: `orkhan-portfolio-2026`

## Yerli işə salma

1. `npm install`
2. `.env.example` faylını `.env.local` adı ilə kopyalayın və Firebase web app məlumatlarını daxil edin.
3. `npm run dev`

Firebase məlumatları daxil edilməsə də ön səhifə açılır.

Ön səhnədə istifadəçinin təqdim etdiyi videodakı humanoid göstərilir: `public/scene/humanoid-scrub.mp4`. Mənbə: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4`. Video kursorla idarəetmə üçün 1080p ölçüsünə və qısa açar kadr aralığına uyğunlaşdırılıb. Masaüstündə kursorun üfüqi yeri başın sola və ya sağa dönməsini idarə edir; dar və toxunma ekranlarında video səssiz və dövrü oynayır. Səhnə ekrandan çıxanda video dayanır. Hərəkəti azaltma ayarında orta kadr sabit göstərilir.

## Firebase

`src/firebase.js` və Firebase konfiqurasiyası saxlanılıb. Gələcək portfolio bölməsi `projects` kolleksiyasında yalnız `published: true` olan sənədləri oxuya bilər. Sənəd nümunəsi:

```json
{
  "title": "Layihənin adı",
  "summary": "Qısa təsvir",
  "url": "https://example.com",
  "published": true
}
```

`firestore.rules` yalnız dərc olunmuş layihələrin oxunmasına icazə verir; saytdan yazma bağlıdır. Layihə yaradıldıqdan sonra qaydaları `firebase deploy --only firestore:rules --project <project-id>` ilə tətbiq edin.

## GitHub Pages

`main` budağına göndərilən kod `.github/workflows/deploy.yml` ilə yığılır və Pages-ə yerləşdirilir. GitHub repo ayarlarında Pages mənbəyi **GitHub Actions** olmalıdır. Firebase web app sahələrini repo **Settings → Secrets and variables → Actions → Variables** bölməsinə `.env.example`-dəki adlarla əlavə edin. Bu dəyərlər Firebase web konfiqurasiyasıdır; təhlükəsizlik `firestore.rules` vasitəsilə təmin edilir.

## Agent alətləri

- [Sepia](https://github.com/Nanako0129/sepia) `.agents/skills/sepia` içindədir; portfolio mətninin süni tonunu yoxlamaq üçün.
- [Scroll Craft](https://github.com/nateherkai/scroll-craft) `.agents/skills/scroll-craft` içindədir; son dizaynı planlayanda istifadə olunacaq.
- [Phone Harness](https://github.com/ShawnPana/phone-harness) `tools/phone-harness` içindədir; Android telefonda test üçün `python -m pip install -e tools/phone-harness`, sonra `adb` və telefon bağlantısı lazımdır. Bu kompüterdə iPhone üçün Mac tələb olunur.

Bu üç alət saytın işləmə vaxtı kitabxanası deyil. Mənbələri ayrıca saxlanılıb, lisenziyaları öz qovluqlarındadır.
