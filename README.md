# BukkaIsland

A modern website for BukkaIsland - an authentic Nigerian restaurant in Houston, Texas, bringing the vibrant flavors of Lagos street food to the heart of Texas.

## Tech Stack

- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + CSS Keyframes
- **Backend:** Firebase (Authentication & Firestore)
- **Rich Text Editor:** Tiptap
- **Notifications:** React Hot Toast
- **Icons:** Lucide React

## Features

### Customer-Facing
- Hero section with video background and entrance animations
- Interactive menu browsing with dish details
- Online ordering (pickup & UberEats delivery integration)
- Blog section for food stories and updates
- Contact form and FAQ section
- Allergy and dietary information notices
- Responsive design for all devices

### Admin Dashboard
- Protected authentication system
- Blog post management (create, edit, delete)
- Menu item management with image uploads
- Rich text editor for blog content

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Forsyth01/BukkaIsland-Website.git
cd BukkaIsland-Website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── admin/           # Admin dashboard pages
│   │   ├── dashboard/   # Blog & menu management
│   │   └── login/       # Admin authentication
│   ├── blog/            # Blog pages
│   ├── menu/            # Menu page
│   ├── about/           # About page
│   ├── components/      # Reusable components
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── About.jsx
│   │   ├── MenuPreview.jsx
│   │   ├── BlogPreview.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   └── ...
│   ├── context/         # React context providers
│   ├── globals.css      # Global styles & animations
│   ├── layout.js        # Root layout
│   └── page.js          # Homepage
├── lib/
│   └── firebaseClient.js # Firebase configuration
└── public/
    ├── gallery/         # Gallery images
    ├── logo/            # Logo variants
    └── videos/          # Video assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is proprietary software for BukkaIsland restaurant.
