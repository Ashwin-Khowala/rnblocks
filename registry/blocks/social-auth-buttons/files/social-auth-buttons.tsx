"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export interface SocialAuthButtonsProps {
  onApplePress?: () => void | Promise<void>;
  onGooglePress?: () => void | Promise<void>;
  onGithubPress?: () => void | Promise<void>;
  showDivider?: boolean;
  dividerText?: string;
  theme?: "dark" | "light";
  disabled?: boolean;
}

export function SocialAuthButtons({
  onApplePress,
  onGooglePress,
  onGithubPress,
  showDivider = true,
  dividerText = "OR CONTINUE WITH",
  theme = "dark",
  disabled = false,
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handlePress = async (
    provider: "apple" | "google" | "github",
    cb?: () => void | Promise<void>
  ) => {
    if (disabled || loadingProvider) return;
    setLoadingProvider(provider);
    try {
      if (cb) {
        await cb();
      } else {
        await new Promise((res) => setTimeout(res, 900));
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  const isDark = theme === "dark";

  return (
    <View style={styles.container}>
      {showDivider && (
        <View style={styles.dividerRow}>
          <View
            style={[
              styles.dividerLine,
              isDark ? styles.dividerLineDark : styles.dividerLineLight,
            ]}
          />
          <Text
            style={[
              styles.dividerLabel,
              isDark ? styles.dividerLabelDark : styles.dividerLabelLight,
            ]}
          >
            {dividerText}
          </Text>
          <View
            style={[
              styles.dividerLine,
              isDark ? styles.dividerLineDark : styles.dividerLineLight,
            ]}
          />
        </View>
      )}

      <View style={styles.buttonsStack}>
        {/* Apple Button */}
        <TouchableOpacity
          style={[
            styles.socialBtn,
            isDark ? styles.appleBtnDark : styles.appleBtnLight,
            disabled && styles.btnDisabled,
          ]}
          onPress={() => handlePress("apple", onApplePress)}
          activeOpacity={0.85}
          disabled={disabled || loadingProvider !== null}
        >
          {loadingProvider === "apple" ? (
            <ActivityIndicator
              size="small"
              color={isDark ? "#000000" : "#FFFFFF"}
            />
          ) : (
            <>
              {/* Apple SVG Logo */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 170 170"
                fill={isDark ? "#000000" : "#FFFFFF"}
              >
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-7.98-12.24-14.7-5.99-9.04-10.74-19.78-14.25-32.22-3.51-12.45-5.27-24.36-5.27-35.74 0-14.52 3.63-26.79 10.88-36.81s16.78-15.19 28.58-15.52c4.8 0 10.18 1.25 16.14 3.76 5.97 2.51 9.77 3.82 11.41 3.93 1.34-.11 5.3-1.47 11.89-4.08 6.59-2.61 12.25-3.79 16.98-3.54 12.98.65 23.36 5.47 31.13 14.46-11.23 6.83-16.71 16.13-16.44 27.91.27 9.4 4.02 17.27 11.24 23.61 7.23 6.34 15.82 9.88 25.79 10.63-2.18 6.74-4.85 13.43-8.01 20.08zM119.22 31.84c0-7.39 2.66-14.26 7.99-20.61 5.33-6.35 11.8-10.42 19.41-12.23.22 1.41.33 2.72.33 3.92 0 7.39-2.77 14.37-8.31 20.93-5.54 6.57-12.18 10.51-19.92 11.82-.11-1.3-.17-2.31-.17-3.02z" />
              </svg>
              <Text
                style={[
                  styles.btnText,
                  isDark ? styles.appleBtnTextDark : styles.appleBtnTextLight,
                ]}
              >
                Continue with Apple
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity
          style={[
            styles.socialBtn,
            isDark ? styles.googleBtnDark : styles.googleBtnLight,
            disabled && styles.btnDisabled,
          ]}
          onPress={() => handlePress("google", onGooglePress)}
          activeOpacity={0.85}
          disabled={disabled || loadingProvider !== null}
        >
          {loadingProvider === "google" ? (
            <ActivityIndicator
              size="small"
              color={isDark ? "#FFFFFF" : "#0F172A"}
            />
          ) : (
            <>
              {/* Google 4-Color SVG Logo */}
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <Text
                style={[
                  styles.btnText,
                  isDark ? styles.googleBtnTextDark : styles.googleBtnTextLight,
                ]}
              >
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* GitHub Button */}
        <TouchableOpacity
          style={[
            styles.socialBtn,
            isDark ? styles.githubBtnDark : styles.githubBtnLight,
            disabled && styles.btnDisabled,
          ]}
          onPress={() => handlePress("github", onGithubPress)}
          activeOpacity={0.85}
          disabled={disabled || loadingProvider !== null}
        >
          {loadingProvider === "github" ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              {/* GitHub SVG Invertocat */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <Text style={[styles.btnText, styles.githubBtnText]}>
                Continue with GitHub
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SocialAuthButtons;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    paddingVertical: 12,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerLineDark: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  dividerLineLight: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  dividerLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  dividerLabelDark: {
    color: "#64748B",
  },
  dividerLabelLight: {
    color: "#64748B",
  },
  buttonsStack: {
    gap: 10,
  },
  socialBtn: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  btnText: {
    fontSize: 14,
    fontWeight: "600",
  },
  appleBtnDark: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
  },
  appleBtnTextDark: {
    color: "#000000",
  },
  appleBtnLight: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  appleBtnTextLight: {
    color: "#FFFFFF",
  },
  googleBtnDark: {
    backgroundColor: "#18181B",
    borderColor: "#27272A",
  },
  googleBtnTextDark: {
    color: "#F8FAFC",
  },
  googleBtnLight: {
    backgroundColor: "#FFFFFF",
    borderColor: "#CBD5E1",
  },
  googleBtnTextLight: {
    color: "#0F172A",
  },
  githubBtnDark: {
    backgroundColor: "#161B22",
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  githubBtnLight: {
    backgroundColor: "#24292F",
    borderColor: "#24292F",
  },
  githubBtnText: {
    color: "#FFFFFF",
  },
  btnDisabled: {
    opacity: 0.5,
  },
});
