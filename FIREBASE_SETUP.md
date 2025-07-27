# Firebase Setup for Numberland Adventures

## Prerequisites
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore in your Firebase project

## Configuration Steps

### 1. Create Environment File
Create a `.env.local` file in the root directory with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 2. Get Firebase Configuration
1. Go to your Firebase Console
2. Click on the gear icon (⚙️) next to "Project Overview"
3. Select "Project settings"
4. Scroll down to "Your apps" section
5. Click "Add app" and choose "Web"
6. Copy the configuration values to your `.env.local` file

### 3. Enable Authentication Methods
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" for teachers
4. Enable "Anonymous" for students

### 4. Set up Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users

### 5. Security Rules (Optional)
For production, you'll want to set up proper security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow teachers to read student data in their classes
    match /classes/{classId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing the Login System

### Student Login
- Students can log in anonymously with just their name and class code
- No Firebase account required for students
- Perfect for classroom use

### Teacher Login
- Teachers need to be created in Firebase Authentication
- Use email/password authentication
- Contact your administrator to create teacher accounts

## Development Notes

- The app uses anonymous authentication for students to respect privacy
- Teacher accounts need to be manually created in Firebase Console
- All data is stored in Firestore for real-time updates
- The app is designed to be COPPA compliant for children under 13 