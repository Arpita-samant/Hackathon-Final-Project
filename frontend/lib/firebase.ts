import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  type Auth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  type ConfirmationResult 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Returns true if the client environment has configured Firebase keys.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

/**
 * Singleton Firebase App accessor
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null;
  if (!isFirebaseConfigured()) return null;
  try {
    if (getApps().length > 0) {
      return getApp();
    }
    return initializeApp(firebaseConfig);
  } catch (err) {
    console.warn("Failed to initialize Firebase app:", err);
    return null;
  }
}

/**
 * Singleton Firebase Auth accessor
 */
export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    return getAuth(app);
  } catch (err) {
    console.warn("Failed to get Firebase auth instance:", err);
    return null;
  }
}

/**
 * Dispatches an SMS verification code to an Indian mobile number (+91...)
 * via Firebase Phone Authentication with invisible reCAPTCHA.
 */
export async function sendFirebaseOtp(
  phone10Digits: string,
  containerId: string = "recaptcha-container"
): Promise<ConfirmationResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error("Firebase Auth is not initialized or credentials are missing.");
  }

  // Format to E.164: +91XXXXXXXXXX
  const clean = phone10Digits.replace(/\D/g, "").slice(-10);
  const formattedPhone = `+91${clean}`;

  // Ensure DOM container exists
  let containerEl = document.getElementById(containerId);
  if (!containerEl) {
    containerEl = document.createElement("div");
    containerEl.id = containerId;
    document.body.appendChild(containerEl);
  }

  // Clean previous verifier if exists
  if (typeof window !== "undefined" && (window as any).__yojanaRecaptchaVerifier) {
    try {
      (window as any).__yojanaRecaptchaVerifier.clear();
    } catch (_) {}
    (window as any).__yojanaRecaptchaVerifier = null;
  }

  const appVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      // reCAPTCHA solved
    },
    "expired-callback": () => {
      try {
        appVerifier.clear();
      } catch (_) {}
      if (typeof window !== "undefined") {
        (window as any).__yojanaRecaptchaVerifier = null;
      }
    },
  });

  if (typeof window !== "undefined") {
    (window as any).__yojanaRecaptchaVerifier = appVerifier;
  }

  const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
  return confirmationResult;
}

/**
 * Confirms an SMS OTP with the Firebase ConfirmationResult.
 */
export async function verifyFirebaseOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string
): Promise<{ user: any; idToken?: string }> {
  const userCredential = await confirmationResult.confirm(otpCode);
  const user = userCredential?.user;
  let idToken: string | undefined;
  if (user && typeof user.getIdToken === "function") {
    idToken = await user.getIdToken();
  }
  return { user, idToken };
}

export { RecaptchaVerifier, signInWithPhoneNumber };
export type { ConfirmationResult, Auth, FirebaseApp };
