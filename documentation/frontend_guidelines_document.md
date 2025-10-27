# Warga+ Mobile App Frontend Guidelines

This document describes the frontend setup, design principles, and technologies for the Warga+ React Native mobile app. It’s written in everyday language so anyone can understand how the app is built and maintained.

## 1. Frontend Architecture

### 1.1 Overall Structure
- Framework: React Native (with TypeScript) for building a cross-platform mobile app (iOS and Android).  
- Bundler: Metro Bundler, which handles module resolution and bundling for React Native.  
- Package Management: Yarn or npm to install and manage dependencies.  
- Code Organization:
  • `src/` — source code root  
  • `src/components/` — reusable UI components  
  • `src/screens/` — screen-level components (Dashboard, Payments, Feed, Profile)  
  • `src/navigation/` — React Navigation setup  
  • `src/context/` or `src/store/` — app-level state (Context API or Redux)  
  • `src/hooks/` — custom React hooks  
  • `src/theme/` — colors, typography, and global styles  
  • `src/api/` — API service layer (fetch or axios)  

### 1.2 Scalability, Maintainability, and Performance
- Modular code: each feature lives in its own folder, making it easy to add, remove, or update features.  
- TypeScript: catches errors early and enables sharing types with the backend.  
- Service layer (e.g., `src/api/`) abstracts away direct calls to `fetch` or `axios`, so you can mock or swap implementations.  
- Metro’s lazy loading and React.lazy allow splitting code into smaller bundles, improving initial load time.  

## 2. Design Principles

### 2.1 Usability
- Keep screens simple and focused on a single task.  
- Use clear labels, icons, and visual cues so users know where they are and what actions they can take.  

### 2.2 Accessibility
- Ensure text has sufficient color contrast (WCAG AA standard).  
- Support dynamic font sizes (React Native’s `AccessibilityInfo` and scaled font sizes).  
- Add accessibility labels to buttons and images for screen readers.  

### 2.3 Responsiveness
- Use Flexbox for flexible layouts that adapt to different screen sizes and orientations.  
- Test on both small and large devices (phones and tablets).  

### 2.4 Consistency
- Follow a design system with defined colors, typographic scales, and spacing.  
- Reuse common components like buttons, cards, and headers.  

## 3. Styling and Theming

### 3.1 Styling Approach
- Library: styled-components/native for writing CSS-in-JS.  
- Benefits: scoped styles, theming support, conditional styling, and better maintainability.  

### 3.2 CSS Methodology
- Organize styled components by feature.  
- Use naming conventions that match component names, e.g. `StyledButton`, `HeaderContainer`.  

### 3.3 Theming
- Use a centralized `ThemeProvider` to supply colors, font sizes, and spacing.  
- Theme file structure (`src/theme/theme.ts`):
  • colors: primary, secondary, background, text, border  
  • fonts: fontFamily, fontSizes (small, medium, large)  
  • spacing: margin and padding scales  

### 3.4 Visual Style
- Style: Modern flat design with subtle shadows and rounded corners.  
- Glassmorphism elements can be used sparingly (e.g., translucent bottom sheet backgrounds).  

### 3.5 Color Palette
- Primary Blue: #4A90E2  
- Secondary Green: #50E3C2  
- Accent Orange: #F5A623  
- Background Light: #FFFFFF  
- Background Dark: #F7F7F7  
- Text Primary: #4A4A4A  
- Text Secondary: #9B9B9B  

### 3.6 Typography
- Font Family: “Inter” (system fallback: “Roboto” on Android, “San Francisco” on iOS)  
- Font Sizes:
  • Small: 12px  
  • Base: 16px  
  • Large: 20px  
  • Extra Large: 24px  

## 4. Component Structure

- **Atomic Design**: break UI into atoms (Button, Text), molecules (Card, ListItem), and organisms (StatusCard, AnnouncementSection).  
- **Reusable Components**: keep logic- and style-driven variations under `components/common/`.  
- **Feature Components**: screen-specific UI under `components/dashboard/`, `components/payments/`, etc.  
- Benefits: easier testing, consistent look and feel, faster development of new features.  

## 5. State Management

### 5.1 Global State
- Library: React Context API + useReducer for light state (user auth status, theme toggles).  
- For more complex scenarios or very large state trees, consider Redux Toolkit.  

### 5.2 Server State
- Use a data-fetching library like React Query (optional) to cache API responses, handle loading/error states, and refetch data automatically.  
- Alternatively, manage API calls manually in a service layer and store results in local component state or Context.  

### 5.3 Local State
- Use React’s useState and useReducer within components for UI-specific state (form inputs, toggles, modals).  

## 6. Routing and Navigation

- Library: React Navigation (Bottom Tab Navigator + Stack Navigator).  
- Navigation Structure:
  • Bottom Tabs: Dashboard, Payments, Feed, Profile  
  • Each tab has its own stack for nested screens (e.g., PaymentDetails).  
- Setup: configure `NavigationContainer` at app root, define `createBottomTabNavigator`, then embed stacks via `createStackNavigator`.  
- Deep Linking: configure URL schemes (optional) for push notifications or external links.  

## 7. Performance Optimization

- **Lazy Loading**: use `React.lazy` and `Suspense` for large components or screens.  
- **Code Splitting**: leverage Metro’s support for dynamic imports to reduce initial bundle size.  
- **Asset Optimization**: resize and compress images, use `react-native-fast-image` for caching.  
- **Avoid Unnecessary Renders**: use `React.memo`, `useCallback`, and `useMemo` for pure components and handler functions.  
- **List Optimization**: use `FlatList` with proper `keyExtractor`, `getItemLayout`, and `initialNumToRender`.  
- **Monitoring**: integrate performance tooling like React Native Performance Monitor or Flipper.  

## 8. Testing and Quality Assurance

### 8.1 Unit Tests
- Tool: Jest with React Native preset.  
- Library: React Native Testing Library for component rendering and interaction.  

### 8.2 Integration Tests
- Combine Jest with React Native Testing Library to test how multiple components work together.  

### 8.3 End-to-End (E2E) Tests
- Tool: Detox for simulating user flows on real devices or emulators.  
- Scope: login flow, navigation between screens, form submissions.  

### 8.4 Linting and Formatting
- ESLint with a shared config (e.g., Airbnb + React Native rules).  
- Prettier for code formatting.  
- Husky + lint-staged to run checks before commits.  

## 9. Conclusion and Frontend Summary

These guidelines outline a clear path to building, scaling, and maintaining the Warga+ mobile app frontend. By:
- Organizing code with a modular architecture  
- Applying consistent design principles (usability, accessibility, responsiveness)  
- Using styled-components and a theme for a cohesive look  
- Structuring components for reuse and clarity  
- Managing state with Context API (and React Query for server state)  
- Navigating via React Navigation  
- Optimizing performance with lazy loading and memoization  
- Ensuring quality through testing and linting  

…the team can deliver a high-quality, maintainable, and user-friendly mobile experience.  

Feel free to refer back to this document as the central source of truth for all frontend decisions on the Warga+ mobile project.