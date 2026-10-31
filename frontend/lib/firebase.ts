import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  type Auth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  type ConfirmationResult 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAwl795W0Vb6-WrWj9g6djNeVXvLzsv3Uw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hackathon-7c018.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hackathon-7c018",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hackathon-7c018.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "100626274538",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:100626274538:web:c8e4913c5bcb5480e79f93",
};

/**
 * Returns true if the client environment has configured Firebase keys.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
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
 * 
 * Generates an isolated, fresh DOM element on every attempt to completely
 * prevent "reCAPTCHA has already been rendered in this element".
 */
export async function sendFirebaseOtp(
  phone10Digits: string,
  _containerId?: string
): Promise<ConfirmationResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error("Firebase Auth is not initialized or credentials are missing.");
  }

  // Format to E.164: +91XXXXXXXXXX
  const clean = phone10Digits.replace(/\D/g, "").slice(-10);
  const formattedPhone = `+91${clean}`;

  // 1. Destroy and clear any previous verifier instance
  if (typeof window !== "undefined" && (window as any).__yojanaRecaptchaVerifier) {
    try {
      (window as any).__yojanaRecaptchaVerifier.clear();
    } catch (_) {}
    (window as any).__yojanaRecaptchaVerifier = null;
  }

  // 2. Remove any previously created reCAPTCHA containers from DOM
  if (typeof document !== "undefined") {
    const oldContainers = document.querySelectorAll("[data-yojana-recaptcha]");
    oldContainers.forEach((el) => {
      try {
        el.remove();
      } catch (_) {}
    });
  }

  // 3. Create a brand new unique DOM container for this specific verification call
  const uniqueId = `recaptcha-widget-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const freshElement = document.createElement("div");
  freshElement.id = uniqueId;
  freshElement.setAttribute("data-yojana-recaptcha", "true");
  freshElement.style.position = "fixed";
  freshElement.style.bottom = "0";
  freshElement.style.right = "0";
  freshElement.style.zIndex = "-1";
  freshElement.style.opacity = "0";
  freshElement.style.pointerEvents = "none";
  document.body.appendChild(freshElement);

  // 4. Initialize fresh RecaptchaVerifier
  const appVerifier = new RecaptchaVerifier(auth, freshElement, {
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

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
    return confirmationResult;
  } catch (err: any) {
    try {
      appVerifier.clear();
    } catch (_) {}
    if (typeof window !== "undefined") {
      (window as any).__yojanaRecaptchaVerifier = null;
    }
    throw err;
  }
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
