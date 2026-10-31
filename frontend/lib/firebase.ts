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
 * Safely resets DOM containers to prevent "reCAPTCHA has already been rendered in this element".
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

  // 1. Destroy and clear any previous verifier instance
  if (typeof window !== "undefined" && (window as any).__yojanaRecaptchaVerifier) {
    try {
      (window as any).__yojanaRecaptchaVerifier.clear();
    } catch (_) {}
    (window as any).__yojanaRecaptchaVerifier = null;
  }

  // 2. Ensure pristine container element by replacing old container with clean clone
  let targetElement: HTMLElement;
  const existingEl = typeof document !== "undefined" ? document.getElementById(containerId) : null;
  
  if (existingEl && existingEl.parentNode) {
    // Clone without children to completely purge any previous reCAPTCHA widget / iframe
    const freshEl = existingEl.cloneNode(false) as HTMLElement;
    existingEl.parentNode.replaceChild(freshEl, existingEl);
    targetElement = freshEl;
  } else {
    targetElement = document.createElement("div");
    targetElement.id = containerId;
    targetElement.style.position = "fixed";
    targetElement.style.bottom = "0";
    targetElement.style.right = "0";
    targetElement.style.zIndex = "-1";
    targetElement.style.opacity = "0";
    document.body.appendChild(targetElement);
  }

  // 3. Initialize fresh RecaptchaVerifier
  const appVerifier = new RecaptchaVerifier(auth, targetElement, {
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
