# Habit Tracker App 📱✅

A mobile application to track daily/weekly habits with progress tracking using AsyncStorage.

![App Screenshot](https://example.com/your-app-screenshot-url.png)  
_(Replace with your actual app screenshot URL)_

[![App Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

## Features ✨

- 🚀 **User Registration** - Start directly with registration
- 📋 **Habit Management** - CRUD operations for habits
- 📊 **Progress Tracking** - Visual completion percentages
- 🗂 **Category Organization** - Daily/Weekly categories
- 💾 **AsyncStorage** - Local data persistence
- 🔄 **Smooth Navigation** - Tab-based interface
- 🎨 **Interactive UI** - Intuitive icons and design

## App Flow 🔄

```mermaid
graph TD
    A[Register Screen] --> B[Home Screen]
    B --> C[View Habits]
    B --> D[Logout]
    C --> E[Habit List]
    E --> F[Create New]
    E --> G[Progress]
    E --> H[Settings]
```

## installation

- Clone repository

git clone https://github.com/jeyjenushan/HabitTrackingApp.git
cd habit-tracker-app

- Install dependencies

npm install

- Install pods (iOS)

cd ios && pod install && cd ..

- Run Android

npx react-native run-android

- Run iOS

npx react-native run-ios
