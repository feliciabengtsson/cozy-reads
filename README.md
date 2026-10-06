# 📚 CozyReads

CozyReads är en webbapp för bokcirklar – en mysig digital bokklubb där man kan bläddra bland böcker, läsa om dem och skapa eller gå med i bokcirklar för att läsa tillsammans med andra.

Det här är mitt **första fullstack-projekt**, byggt under utbildningen till frontendutvecklare på IT-Högskolan. Målet var att bygga en React-frontend som pratar med ett eget REST-API och en riktig databas.

> 💡 Appen är byggd mobile first och fungerar bäst på mobilstorlek, men skalar upp till desktop.

> 🗓️ **Obs:** Projektet lämnades in under utbildningen. Ändringarna under [Uppdateringar efter skolperioden](#-uppdateringar-efter-skolperioden) har gjorts i efterhand och var inte en del av inlämningen.

---

## ✨ Så fungerar appen

Appen har en navigation högst upp och en högst ner (som i en mobilapp):

| Plats | Ikon | Vad den gör |
| --- | --- | --- |
| Toppmeny | Logga | Tillbaka till startsidan |
| Toppmeny | 👤 Profil | Öppnar din profilsida |
| Toppmeny | ❓ Hjälp | Öppnar en modal som förklarar hur bokcirklarna fungerar |
| Toppmeny | ⚙️ Inställningar | Öppnar en modal där du kan byta ditt namn |
| Bottenmeny | 👥 Grupper | Översikt över bokcirklar |
| Bottenmeny | 🏠 Hem | Startsidan |
| Bottenmeny | 📚 Böcker | Bokbiblioteket |

### Sidor

- **Start (`/`)** – Introduktion till CozyReads och varför man ska gå med.
- **Böcker (`/books`)** – Månadens bok och ett bibliotek med bokomslag.
  - **Sök** på titel – filtreras direkt i webbläsaren medan du skriver.
  - **Filtrera på genre** – hämtar nya böcker från API:t (`GET /books?genre=...`).
  - Klicka på ett omslag för att se detaljer.
- **Bokdetaljer (`/books/:id`)** – Omslag, titel, författare, år, genre och sammanfattning.
- **Bokcirklar (`/bookcircles`)** – Alla bokcirklar som bilder. Klicka på en för att öppna den, eller på **+**-knappen för att skapa en ny.
- **Skapa bokcirkel (`/bookcircles/add`)** – Formulär med namn, mötesschema och en valfri bannerbild (URL) som förhandsvisas direkt. Skickas till API:t med `POST`.
- **Bokcirkel (`/bookcircles/:id`)** – Vad gruppen läser just nu, senaste kommentaren, lässchema och nästa träff. Här kan cirkeln också **tas bort** (en varning visas när du håller muspekaren över knappen).
- **Profil (`/profile`)** – Profilbild, namn, "My Circles" och "My books".

### Ett typiskt flöde

1. Gå till **Böcker** och sök eller filtrera fram en bok du gillar.
2. Gå till **Bokcirklar** och tryck på **+** för att skapa en egen cirkel.
3. Din nya cirkel dyker upp i listan – öppna den för att se detaljerna.
4. Byt namn på din profil via **⚙️ Inställningar**.

---

## 🛠️ Tekniker

**Frontend**

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/) som utvecklingsserver och byggverktyg
- [React Router](https://reactrouter.com/) för sidnavigering
- [styled-components](https://styled-components.com/) för CSS-in-JS och globala stilar (färger som CSS-variabler)
- [MUI](https://mui.com/) – `Alert`-komponenten vid borttagning
- React Context (`MyBooksContext`) och en egen hook (`useModal`)
- Google Fonts (Playfair Display) och Material Symbols för ikoner

**Backend**

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) + TypeScript (körs med `tsx`)
- [PostgreSQL](https://www.postgresql.org/) via `pg` – databasen ligger hos [Neon](https://neon.tech/)
- Backend är deployad på [Render](https://render.com/): `https://cozy-reads.onrender.com`

---

## 🧱 Arkitektur

```
┌──────────────────────┐   fetch (JSON)   ┌────────────────────────┐    SQL    ┌──────────────────┐
│  Frontend            │ ───────────────▶ │  Backend               │ ────────▶ │  PostgreSQL      │
│  React + Vite        │ ◀─────────────── │  Express REST-API      │ ◀──────── │  (Neon)          │
│  Frontend/src        │                  │  Backend/index.ts      │           │                  │
└──────────────────────┘                  └────────────────────────┘           └──────────────────┘
```

Frontend hämtar adressen till API:t från [Frontend/src/api/api.ts](Frontend/src/api/api.ts). Den använder miljövariabeln `VITE_API_URL` om den finns, annars den deployade backenden på Render.

### Databas

Databasen har fyra tabeller:

| Tabell | Innehåll |
| --- | --- |
| `books` | Titel, författare, genre, år, omslags-URL och sammanfattning |
| `circles` | Bokcirklar: namn, mötesschema, vilken bok de läser (`currently_reading` → `books`), senaste kommentar, nästa träff och bild |
| `users` | Användare med namn, adress och profilbild |
| `book_circles` | Kopplingstabell mellan användare och cirklar (många-till-många) |

Ett exempel på schema och testdata finns i [Backend/test.sql](Backend/test.sql) (skrivet för SQLite, som användes i början av projektet innan bytet till PostgreSQL).

### API-endpoints

| Metod | Endpoint | Beskrivning |
| --- | --- | --- |
| `GET` | `/books` | Alla böcker. Valfritt: `?genre=Fantasy` |
| `GET` | `/books/:id` | En bok |
| `POST` | `/books` | Lägg till en bok |
| `GET` | `/bookcircles` | Alla bokcirklar (med titel och omslag på boken de läser) |
| `GET` | `/bookcircles/:id` | En bokcirkel |
| `POST` | `/bookcircles` | Skapa bokcirkel (`name` och `schedule` krävs, `image` är valfri). Svarar `409` om namnet redan finns |
| `DELETE` | `/bookcircles/:id` | Ta bort en bokcirkel |
| `GET` | `/profile` | Alla användare |
| `PUT` | `/profile` | Uppdatera namn (`{ id, name }`) |

---

## 📁 Projektstruktur

```
cozy-reads/
├── Backend/
│   ├── index.ts            # Express-servern och alla API-routes
│   ├── test.sql            # Schema + testdata
│   └── package.json
└── Frontend/
    ├── index.html
    ├── public/             # Logga
    └── src/
        ├── api/api.ts          # API-adress
        ├── assets/images/      # Bannerbilder
        ├── components/         # Navigation, modaler, MyBooks
        ├── hooks/useModal.tsx  # Öppna/stänga modaler
        ├── pages/              # En komponent per sida/route
        ├── App.tsx             # Layout och routes
        ├── globalStyles.tsx    # Globala stilar och färgvariabler
        └── MyBooksContext.tsx  # Context för "My books"
```

---

## 🚀 Kom igång lokalt

**Krav:** Node.js 20+ och en PostgreSQL-databas (t.ex. ett gratiskonto på Neon).

### 1. Klona projektet

```bash
git clone <repo-url>
cd cozy-reads
```

### 2. Starta backend

```bash
cd Backend
npm install
```

Skapa tabellerna och lägg in data i din PostgreSQL-databas (utgå från `test.sql`). Sätt sedan miljövariabeln `DATABASE_URL` och starta servern:

```bash
# macOS / Linux / Git Bash
DATABASE_URL="postgres://user:password@host/db" npm start

# PowerShell
$env:DATABASE_URL="postgres://user:password@host/db"; npm start
```

Servern startar på `http://localhost:8080` (eller porten i `PORT`).

### 3. Starta frontend

Skapa filen `Frontend/.env.local` om du vill köra mot din lokala backend:

```
VITE_API_URL=http://localhost:8080
```

Starta sedan:

```bash
cd Frontend
npm install
npm run dev
```

Öppna adressen som Vite skriver ut (oftast `http://localhost:5173`).

> Utan `.env.local` använder frontend den deployade backenden på Render. Den kan ta upp till en minut att vakna första gången eftersom gratisplanen går i viloläge.

### Övriga skript (Frontend)

| Skript | Gör |
| --- | --- |
| `npm run build` | Typkontroll + produktionsbygge till `dist/` |
| `npm run preview` | Förhandsvisa produktionsbygget |
| `npm run lint` | Kör ESLint |

---

## 🎨 Design

- Varm, "mysig" färgpalett definierad som CSS-variabler i [globalStyles.tsx](Frontend/src/globalStyles.tsx):
  `--color-background #F5F1E7`, `--color-primary #BFA58A`, `--color-secondary #8B5E3C`, `--color-accent #3B3A30`
- Typsnitt: Playfair Display
- Mobile first med en fast bottenmeny som i en mobilapp. Den responsiva kolumnen (max 720px) och de skalande griddarna lades till efter skolperioden.

---

## 🔄 Uppdateringar efter skolperioden

Efter att kursen var slut har jag gått tillbaka till projektet och gjort följande förbättringar:

**Layout och CSS**

- Responsiv layout: innehållet ligger i en centrerad kolumn (max 720px) i stället för fasta 300px, så att inget längre sticker ut eller ger horisontell scroll på mobil.
- Bok- och cirkelgriddar skalar med skärmbredden och omslagen har samma proportioner (`aspect-ratio`).
- Bannerbilderna håller sig inom kolumnen i stället för att använda `100vw`.
- Innehållet får luft under sig så att det inte döljs bakom den fasta bottenmenyn.
- Modalerna ligger alltid mitt på skärmen och går att scrolla om innehållet är långt.
- "+"-knappen för att skapa en bokcirkel följer med när man scrollar.
- Sök- och genrefälten radbryts snyggt på små skärmar, och formuläret för att skapa en cirkel är responsivt.
- Globala stilar: ikonfärgen gäller bara ikoner (inte alla `span`), formulärfält ärver typsnittet och tangentbordsfokus syns tydligt.
- Rättad favicon och borttagen oanvänd ikonlänk i `index.html`.

**Buggfixar**

- Sidan för en enskild bokcirkel hämtade data från fel endpoint och visades tom.
- Genrefiltret har nu ett "All genres"-val som hämtar alla böcker igen.
- Texten för tom "My books"-lista visas nu när det inte finns några böcker.
- Saknade `key`-attribut i listor på profilsidan.

**Dokumentation**

- Den här README:n.

---

## 🔭 Begränsningar och vidareutveckling

Det här är ett skolprojekt och vissa delar är förenklade:

- **Ingen inloggning** – profilen visar alltid den första användaren i databasen.
- **"My Circles" och "My books"** på profilsidan visar de första cirklarna/böckerna i databasen, inte användarens egna ännu.
- Det går inte att **gå med** i en cirkel från gränssnittet än, även om databasen har stöd för det (`book_circles`).
- Diskussionsforumet visar bara den senaste kommentaren.

Idéer för framtiden: inloggning, gå med i/lämna cirklar, riktigt diskussionsforum, betyg och recensioner av böcker, samt laddningsindikatorer och felmeddelanden i gränssnittet.

---

## 📖 Vad jag lärt mig

- Bygga ett REST-API med Express och koppla det till en SQL-databas
- Skriva SQL med `JOIN`, parametriserade frågor och relationer mellan tabeller
- Hämta och skicka data från React med `fetch` (`GET`, `POST`, `PUT`, `DELETE`)
- Routing med React Router, inklusive dynamiska routes (`/books/:id`)
- State, Context och egna hooks i React
- Styling med styled-components och CSS-variabler
- Deploya en backend (Render) med en molndatabas (Neon)
