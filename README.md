# Sightline Mobile

A decentralized physical infrastructure network (DePIN) gig and bounty platform where users can complete real-world tasks in exchange for crypto bounties escrowed on Solana.

> 🏆 **Built for the [Consensus 2026 Hackathon](https://consensus.coindesk.com/hackathon/)**

## Overview
Sightline enables a trustless crowdsourcing economy. Organizations or individuals can post "Gigs"—tasks that require on-the-ground verification (e.g., verifying a storefront is open, taking a picture of a pothole, or logging location-based data). Gig creators fund an escrow bounty in SOL, and specify acceptable submission formats like photo, video, audio, text, or geolocation. Users can accept tasks, complete the required proofs using their device's native hardware, and earn the bounty upon successful submission.

## Tech Stack
* **Framework:** React Native + Expo (Expo Router for file-based navigation)
* **Styling:** NativeWind (Tailwind CSS for React Native)
* **Web3 / Blockchain:** `@solana/web3.js` & Solana Mobile Wallet Adapter
* **Hardware APIs:** `expo-camera`, `expo-av` (Audio), `expo-location`
* **Icons:** `lucide-react-native`

## Project Structure
* `app/(tabs)/index.tsx` - The main feed showing available gigs nearby.
* `app/(tabs)/create.tsx` - Interface to create a new gig, select required media formats, and escrow the bounty.
* `app/(tabs)/profile.tsx` - User profile and connected Solana wallet status.
* `app/gig/[id].tsx` - Detailed view of a specific gig, bounty amount, and task instructions.
* `app/gig/submit/[id].tsx` - The interactive submission screen integrating the device's camera, microphone, geolocation overlays, and transaction signing.

## 🛠️ Local Setup Guide

> [!NOTE]
> Make sure you have [Node.js](https://nodejs.org/) installed on your machine before proceeding.

### For Mac Users

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **iOS Specific Tools (Optional but Recommended):**
   Install CocoaPods if you plan to build locally for iOS later (not required for Expo Go):
   ```bash
   sudo gem install cocoapods
   ```

3. **Start the Development Server:**
   ```bash
   npm run start
   ```
   > You can press `i` in the terminal to open the iOS simulator (requires Xcode), or scan the QR code with the Expo Go app on your physical iPhone.

### For Windows Users

1. **Install Dependencies:**
   ```powershell
   npm install
   ```

2. **Android Specific Tools (Optional but Recommended):**
   Ensure you have Android Studio installed and an Android Virtual Device (AVD) configured if you want to run an emulator locally.

3. **Start the Development Server:**
   ```powershell
   npm run start
   ```
   > You can press `a` in the terminal to open the Android emulator, or scan the QR code with the Expo Go app on your physical Android device.

### Web Only Output (Both Mac & Windows)
If you only want to run the web preview:
```bash
npm run dev
```

---

## 👥 The Team

Meet the builders behind Sightline for Consensus 2026:

| Name | Role / Contribution |
| :--- | :--- |
| **Abhishek Vishwakarma** | Blockchain Integration & Smart Contracts & Hardware APIs Integration|
| **Rachit Tyagi** | Planning, Operations and Analsis |
| **Parth Kanakiya** | UI & Backend |

Loom Video - https://www.loom.com/share/79aafa2a3c9a4b3fa979d040909354c2

Screen UI - https://stitch.withgoogle.com/projects/6497842501554690239
