# Map Pinboard Application

##  Project Overview

This project is a map-based pinboard application that allows users to interact with an interactive map by adding, viewing, and managing location-based pins.

Users can drop pins on the map, view their coordinates and corresponding addresses, and manage them through a dynamic list interface. The application is designed with responsiveness and usability in mind, supporting both desktop and mobile experiences.

---

## Tech Stack

* **Frontend:** React + TypeScript
* **Styling:** TailwindCSS
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Map Library:** React Leaflet (Leaflet)
* **Geocoding API:** OpenStreetMap Nominatim API

---

## Core Features (As Required)

### 1. Map Rendering

* Interactive map powered by Leaflet
* Supports zooming and panning

### 2. Add Pins

* Users can click anywhere on the map to add a new pin
* Pins are dynamically rendered on the map

### 3. Delete Pins

* Pins can be removed via the Pin List
* Deletion is synchronized between the list and the map

### 4. Hover Interaction

* Hovering over a pin in the list highlights the corresponding marker on the map
* A tooltip displays:

  * Pin name (e.g., "Pin #1")
  * Real address

### 5. Reverse Geocoding

* Converts latitude and longitude into a human-readable address
* Uses OpenStreetMap Nominatim API
* Displays address in the Pin List (fallback to coordinates if unavailable)

---

## Additional Features (Beyond Requirements)

### Clear All Pins

* One-click functionality to remove all pins

### Responsive Design

* **Desktop / Landscape Mode:**

  * Floating sidebar on the left
* **Mobile Portrait Mode:**

  * Bottom sheet UI

### Local Storage Persistence

* Pins are saved in local storage
* Data persists after page refresh

### Hover Enhancement

* Marker visually enlarges when hovered from the list
* Improves user feedback and interaction clarity

### Drag & Drop Pins

* Pins can be repositioned by dragging
* Coordinates and address update dynamically after drag

### Fly-To Animation

* Clicking a pin in the list smoothly moves the map to that location
* Enhances navigation experience

---

## Design & Architecture Highlights

* **State Lifting:**
  Centralized state management in the root component ensures synchronization between the map and the list.

* **Separation of Concerns:**

  * `MapView` handles map rendering and interactions
  * `PinList` handles UI and user actions

* **Asynchronous Handling:**
  Reverse geocoding is handled with proper loading states and error handling.

* **User Experience Focus:**
  Includes animations, hover feedback, and responsive layouts to mimic real-world map applications.

---

## Notes (important)

* The Nominatim API is rate-limited by OpenStreetMap Nominatim API; requests are handled carefully to avoid excessive calls (recommend 1 click per second).
* Address loading is asynchronous and may briefly display a loading state.

---

## Installation & Setup

```bash
npm install
npm run dev
```

---

## Deployment

*(To be added after deployment)*

---

## Demo

*(To be added after recording)*

---

## Project Structure (Simplified)

```
src/
├── components/
│   ├── MapView.tsx
│   ├── PinList.tsx
├── services/
│   ├── geocoding.ts
├── App.tsx
├── main.tsx
```

---

## Final Notes

This project focuses on building a clean, interactive, and responsive map-based UI while demonstrating practical frontend engineering skills such as:

* API integration
* State synchronization
* Responsive design
* Interactive UI/UX patterns

---

Thank you for reviewing this project.
