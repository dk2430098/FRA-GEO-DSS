# FRA-GEO-DSS Governance Framework
<p align="center">
  <a href="https://fra-geo-dss.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  &nbsp;&nbsp;
  <a href="https://github.com/dk2430098/FRA-GEO-DSS" target="_blank">
    <img src="https://img.shields.io/badge/GitHub%20Repo-View%20Code-black?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>


## Overview

**FRA-GEO-DSS Governance Framework** is a web-based Decision Support System (DSS) developed by **Team Mirai**. It is designed to assist in governance and risk assessment, featuring modules for claims management, geospatial visualization (WebGIS), and workflow tracking.

> **Note**: This project appears to be focused on **Forest Rights Act (FRA)** and utilizes geospatial data for decision support, as indicated by the initial project configuration.

## Features

- **Dashboard**: Centralized hub for monitoring key metrics and notifications.
- **Claims Management**: Create, track, and manage claims with document support.
- **WebGIS Interface**: Interactive map visualizations using Leaflet for geospatial analysis.
- **Workflow Automation**: Track processes through various stages with visual workflow indicators.
- **OCR Integration**: Built-in Optical Character Recognition (OCR) capabilities using Tesseract.js (likely for document processing).
- **Data Visualization**: Charts and analytics powered by Recharts.
- **Real-time Data**: Integration with Firebase Firestore for real-time data persistence.

## Tech Stack

### Frontend
- **React** (v18) with **TypeScript**
- **Vite** - High-performance build tool
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI Themes** - Accessible component library
- **Framer Motion** - Animation library
- **React Leaflet** - Maps and geospatial components

### Backend & Services
- **Firebase** - Authentication and Firestore Database
- **Supabase** - (Dependency listed, likely for alternative backend or storage)

### Utilities
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **Recharts** - Charting library
- **Tesseract.js** - OCR for images
- **Date-fns** - Date utility library

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dk2430098/FRA-GEO-DSS.git
   cd FRA-GEO-DSS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Ensure you have configured your Firebase/Supabase credentials in the appropriate configuration files (e.g., `src/firebase.ts` or `.env`).

### Running the Application

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```
The output will be in the `dist` directory.

## Project Structure

```
FRA-GEO-DSS/
├── src/
│   ├── components/      # Reusable UI components (StatsCard, WebGISMap, etc.)
│   ├── pages/           # Application pages (Home, Claims, WebGIS, Workflow)
│   ├── firebase.ts      # Firebase configuration
│   ├── seedData.js      # Data seeding script
│   └── ...
├── public/              # Static assets
├── index.html           # Entry HTML file
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Type-checks and builds the project for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.
- `npm run seed`: Runs the data seeding script.

## Authors

**Team Mirai**

