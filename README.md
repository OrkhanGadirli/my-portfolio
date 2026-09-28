# My Portfolio

Orxanın portfoliosu üçün ilkin quruluş. Məzmun və son dizayn növbəti mərhələdə müəyyən ediləcək.

- GitHub: https://github.com/OrkhanGadirli/my-portfolio
- Firebase layihəsi: `orkhan-portfolio-2026`

## Yerli işə salma

1. `npm install`
2. `.env.example` faylını `.env.local` adı ilə kopyalayın və Firebase web app məlumatlarını daxil edin.
3. `npm run dev`

Firebase məlumatları daxil edilməsə, səhifə yenə açılır və bağlantının gözlənildiyini göstərir.

## Firebase

Frontend `projects` kolleksiyasında yalnız `published: true` olan sənədləri oxuyur. Sənəd nümunəsi:

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

## Personajlar

`public/mascots/` içində istifadəçinin göndərdiyi videodan ilhamlanan altı mərcan agent və ChatGPT üçün hazırlanmış iki orijinal nanə-firuzəyi personaj var. Emalatxanada səkkiz agent qonşu boş yerlər arasında öz yolu ilə gəzir. Yeriyərkən gövdə və ayaqlar ayrıca hərəkət edir; dayananda hərəsinin iş görünüşü qayıdır. Səhifənin digər hissələrində eyni anda dörd agent (telefonda iki) gəzir və növbə ilə dəyişir. Agentə toxunanda işi görünür. Hərəkəti dayandırmaq və gəzən agentləri gizlətmək mümkündür; cihazın hərəkəti azaltma ayarı da nəzərə alınır.
