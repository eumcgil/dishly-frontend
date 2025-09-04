# Dishly.pro - Recipes. Clean & Simple.

A beautiful, minimal recipe frontend that transforms any recipe URL into a clean, distraction-free format.

## Features

- 🎯 **Clean Interface**: Distraction-free recipe viewing
- 📱 **Mobile-First**: Responsive design that works on all devices
- 🖨️ **Print-Ready**: Optimized layouts for printing recipes
- 🌙 **Dark Mode**: Toggle between light and dark themes
- ⚡ **Fast Loading**: Smooth animations with Framer Motion
- 🎨 **Modern UI**: Built with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Homepage**: Paste any recipe URL into the input form
2. **Recipe View**: View the parsed recipe in a clean, readable format
3. **Print**: Use the print button to get a printer-friendly version
4. **Dark Mode**: Toggle between light and dark themes using the button in the navbar

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes for recipe parsing
│   ├── recipe/[id]/      # Dynamic recipe pages
│   ├── globals.css       # Global styles with print CSS
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx        # Navigation with dark mode toggle
│   ├── Footer.tsx        # Simple footer
│   ├── InputForm.tsx     # Recipe URL input form
│   ├── RecipeView.tsx    # Main recipe display component
│   ├── Loader.tsx        # Loading states and skeletons
│   ├── RecipeCard.tsx    # Recipe preview cards
│   └── theme-provider.tsx # Dark mode theme provider
└── lib/
    └── utils.ts          # Utility functions
```

## API Integration

The app includes mock API routes for development:

- `POST /api/parse` - Parse a recipe URL (returns mock data)
- `GET /api/recipe/[id]` - Fetch a specific recipe

To integrate with a real backend:

1. Update the API endpoints in `InputForm.tsx` and `RecipePage.tsx`
2. Replace mock data with actual API calls
3. Update the `Recipe` interface as needed

## Customization

### Styling
- Modify `tailwind.config.ts` for custom colors and spacing
- Update CSS variables in `globals.css` for theme colors
- Print styles are included for recipe pages

### Components
- All components are fully typed with TypeScript
- Framer Motion animations can be customized in each component
- shadcn/ui components can be extended or replaced

## Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## Future Enhancements

- [ ] Real backend integration for recipe parsing
- [ ] Recipe saving and favorites
- [ ] Recipe search functionality
- [ ] Social sharing features
- [ ] Recipe rating system
- [ ] Ingredient scaling calculator

## License

MIT License - feel free to use this project as a starting point for your own recipe application.