"use client";

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// ─── Authentic Fyndr Vector SVG Icons ──────────────────────────────────────────

function HomeIconSvg({ color, filled, size = 22 }: { color: string; filled: boolean; size?: number }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M20.04 6.81969L14.28 2.78969C12.71 1.68969 10.3 1.74969 8.78999 2.91969L3.77999 6.82969C2.77999 7.60969 1.98999 9.20969 1.98999 10.4697V17.3697C1.98999 19.9197 4.05999 21.9997 6.60999 21.9997H17.39C19.94 21.9997 22.01 19.9297 22.01 17.3797V10.5997C22.01 9.24969 21.14 7.58969 20.04 6.81969ZM12.75 17.9997C12.75 18.4097 12.41 18.7497 12 18.7497C11.59 18.7497 11.25 18.4097 11.25 17.9997V14.9997C11.25 14.5897 11.59 14.2497 12 14.2497C12.41 14.2497 12.75 14.5897 12.75 14.9997V17.9997Z"
          fill={color}
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22 10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V14.6802"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.9902V14.9902"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamIconSvg({ color, filled, size = 22 }: { color: string; filled: boolean; size?: number }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
          fill={color}
        />
        <path
          d="M14.08 14.1499C11.29 12.2899 6.73996 12.2899 3.92996 14.1499C2.65996 14.9999 1.95996 16.1499 1.95996 17.3799C1.95996 18.6099 2.65996 19.7499 3.91996 20.5899C5.31996 21.5299 7.15996 21.9999 8.99996 21.9999C10.84 21.9999 12.68 21.5299 14.08 20.5899C15.34 19.7399 16.04 18.5999 16.04 17.3599C16.03 16.1299 15.34 14.9899 14.08 14.1499Z"
          fill={color}
        />
        <path
          d="M19.9901 7.3401C20.1501 9.2801 18.7701 10.9801 16.8601 11.2101C16.8501 11.2101 16.8501 11.2101 16.8401 11.2101H16.8101C16.7501 11.2101 16.6901 11.2101 16.6401 11.2301C15.6701 11.2801 14.7801 10.9701 14.1101 10.4001C15.1401 9.4801 15.7301 8.1001 15.6101 6.6001C15.5401 5.7901 15.2601 5.0501 14.8401 4.4201C15.2201 4.2301 15.6601 4.1101 16.1101 4.0701C18.0701 3.9001 19.8201 5.3601 19.9901 7.3401Z"
          fill={color}
        />
        <path
          d="M21.99 16.5904C21.91 17.5604 21.29 18.4004 20.25 18.9704C19.25 19.5204 17.99 19.7804 16.74 19.7504C17.46 19.1004 17.88 18.2904 17.96 17.4304C18.06 16.1904 17.47 15.0004 16.29 14.0504C15.62 13.5204 14.84 13.1004 13.99 12.7904C16.2 12.1504 18.98 12.5804 20.69 13.9604C21.61 14.7004 22.08 15.6304 21.99 16.5904Z"
          fill={color}
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12.68 3.96C13.16 4.67 13.44 5.52 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16 14.56C1.74 16.18 1.74 18.82 4.16 20.43C6.91 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.92 12.73 4.16 14.56Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.34 20C19.06 19.85 19.74 19.56 20.3 19.13C21.86 17.96 21.86 16.03 20.3 14.86C19.75 14.44 19.08 14.16 18.37 14"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AIIconSvg({ color, filled, size = 22 }: { color: string; filled?: boolean; size?: number }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
          fill={color}
        />
        <path
          d="M19 3C19 4.65 17.65 6 16 6C17.65 6 19 7.35 19 9C19 7.35 20.35 6 22 6C20.35 6 19 4.65 19 3Z"
          fill={color}
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 3C19 4.65 17.65 6 16 6C17.65 6 19 7.35 19 9C19 7.35 20.35 6 22 6C20.35 6 19 4.65 19 3Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IdeaIconSvg({ color, filled, size = 22 }: { color: string; filled: boolean; size?: number }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M19.21 6.35952C18.17 4.25952 16.16 2.70952 13.83 2.19952C11.39 1.65952 8.88997 2.23952 6.97997 3.77952C5.05997 5.30952 3.96997 7.59952 3.96997 10.0495C3.96997 12.6395 5.51997 15.3495 7.85997 16.9195V17.7495C7.84997 18.0295 7.83997 18.4595 8.17997 18.8095C8.52997 19.1695 9.04997 19.2095 9.45997 19.2095H14.59C15.13 19.2095 15.54 19.0595 15.82 18.7795C16.2 18.3895 16.19 17.8895 16.18 17.6195V16.9195C19.28 14.8295 21.23 10.4195 19.21 6.35952Z"
          fill={color}
        />
        <path
          d="M15.2599 22.0004C15.1999 22.0004 15.1299 21.9904 15.0699 21.9704C13.0599 21.4004 10.9499 21.4004 8.93991 21.9704C8.56991 22.0704 8.17991 21.8604 8.07991 21.4904C7.96991 21.1204 8.18991 20.7304 8.55991 20.6304C10.8199 19.9904 13.1999 19.9904 15.4599 20.6304C15.8299 20.7404 16.0499 21.1204 15.9399 21.4904C15.8399 21.8004 15.5599 22.0004 15.2599 22.0004Z"
          fill={color}
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M19.0699 6.27018C21.1599 10.4702 18.9599 14.9302 15.7299 16.8802V18.0402C15.7299 18.3302 15.8399 19.0002 14.7699 19.0002H9.25986C8.15986 19.0002 8.29986 18.5702 8.29986 18.0402V16.8802C5.99986 15.4902 4.10986 12.7802 4.10986 9.90018C4.10986 4.95018 8.65986 1.07018 13.7999 2.19018C14.5499 2.36018 15.2799 2.63018 15.9399 3.00018"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 21.9992C10.79 21.3492 13.21 21.3492 15.5 21.9992"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FundIconSvg({ color, filled, size = 22 }: { color: string; filled: boolean; size?: number }) {
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M14.85 3.9498V7.7498H13.35V3.9498C13.35 3.6798 13.11 3.5498 12.95 3.5498C12.9 3.5498 12.85 3.5598 12.8 3.5798L4.87 6.56981C4.34 6.7698 4 7.2698 4 7.8398V8.5098C3.09 9.1898 2.5 10.2798 2.5 11.5098V7.8398C2.5 6.6498 3.23 5.5898 4.34 5.1698L12.28 2.1698C12.5 2.0898 12.73 2.0498 12.95 2.0498C13.95 2.0498 14.85 2.8598 14.85 3.9498Z"
          fill={color}
        />
        <path
          d="M21.4999 14.5V15.5C21.4999 15.77 21.2899 15.99 21.0099 16H19.5499C19.0199 16 18.5399 15.61 18.4999 15.09C18.4699 14.78 18.5899 14.49 18.7899 14.29C18.9699 14.1 19.2199 14 19.4899 14H20.9999C21.2899 14.01 21.4999 14.23 21.4999 14.5Z"
          fill={color}
        />
        <path
          d="M19.48 12.95H20.5C21.05 12.95 21.5 12.5 21.5 11.95V11.51C21.5 9.44 19.81 7.75 17.74 7.75H6.26C5.41 7.75 4.63 8.03 4 8.51C3.09 9.19 2.5 10.28 2.5 11.51V18.24C2.5 20.31 4.19 22 6.26 22H17.74C19.81 22 21.5 20.31 21.5 18.24V18.05C21.5 17.5 21.05 17.05 20.5 17.05H19.63C18.67 17.05 17.75 16.46 17.5 15.53C17.29 14.77 17.54 14.04 18.04 13.55C18.41 13.17 18.92 12.95 19.48 12.95ZM14 12.75H7C6.59 12.75 6.25 12.41 6.25 12C6.25 11.59 6.59 11.25 7 11.25H14C14.41 11.25 14.75 11.59 14.75 12C14.75 12.41 14.41 12.75 14 12.75Z"
          fill={color}
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M2.5 14.07V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2798 2.1703C13.5198 1.7003 14.8498 2.62033 14.8498 3.95033V7.75032"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.4099V7.83997C2.5 6.64997 3.23 5.58992 4.34 5.16992L8.31 3.66992"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5598 13.9702V16.0302C22.5598 16.5802 22.1198 17.0302 21.5598 17.0502H19.5998C18.5198 17.0502 17.5298 16.2602 17.4398 15.1802C17.3798 14.5502 17.3 13.9602 18.0398 13.5502C18.4098 13.1702 18.9198 12.9502 19.4798 12.9502H21.5598C22.1198 12.9702 22.5598 13.4202 22.5598 13.9702Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12H14"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Floating Docker Component ────────────────────────────────────────────────

export interface TabItem {
  id: string;
  label: string;
  renderIcon: (color: string, filled: boolean) => React.ReactNode;
}

export const DEFAULT_TABS: TabItem[] = [
  {
    id: "home",
    label: "Home",
    renderIcon: (color, filled) => <HomeIconSvg color={color} filled={filled} />,
  },
  {
    id: "team",
    label: "Team",
    renderIcon: (color, filled) => <TeamIconSvg color={color} filled={filled} />,
  },
  {
    id: "ai",
    label: "AI",
    renderIcon: (color, filled) => <AIIconSvg color={color} filled={filled} />,
  },
  {
    id: "idea",
    label: "Idea",
    renderIcon: (color, filled) => <IdeaIconSvg color={color} filled={filled} />,
  },
  {
    id: "funds",
    label: "Funds",
    renderIcon: (color, filled) => <FundIconSvg color={color} filled={filled} />,
  },
];

export const TABS = DEFAULT_TABS;

export type Theme = "dark" | "light";

const COLORS_DARK = {
  background: "rgba(15, 15, 15, 0.92)",
  border: "rgba(255, 255, 255, 0.14)",
  indicatorFill: "#FFFFFF",
  indicatorShadow: "#000000",
  activeText: "#0A0A0A",
  inactiveText: "#8E8E93",
  shadow: "#000000",
};

const COLORS_LIGHT = {
  background: "rgba(255, 255, 255, 0.95)",
  border: "rgba(0, 0, 0, 0.08)",
  indicatorFill: "#0F172A",
  indicatorShadow: "#0F172A",
  activeText: "#FFFFFF",
  inactiveText: "#64748B",
  shadow: "#0F172A",
};

export interface FloatingDockerProps {
  initialTab?: string;
  onTabChange?: (tabId: string) => void;
  theme?: Theme;
  tabs?: TabItem[];
}

export function FloatingDocker({
  initialTab = "team",
  onTabChange,
  theme = "dark",
  tabs = DEFAULT_TABS,
}: FloatingDockerProps) {
  const items = tabs && tabs.length > 0 ? tabs : DEFAULT_TABS;
  const [activeTab, setActiveTab] = useState<string>(initialTab || items[0]?.id || "home");
  const colors = theme === "dark" ? COLORS_DARK : COLORS_LIGHT;

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    onTabChange?.(id);
  };

  const activeIndex = Math.max(0, items.findIndex((t) => t.id === activeTab));
  const tabPercent = 100 / items.length;

  return (
    <View style={styles.outerCanvas}>
      {/* The Floating Docker Pill Bar */}
      <View
        style={[
          styles.dockerContainer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            shadowColor: colors.shadow,
          },
        ]}
        accessibilityRole="tablist"
      >
        {/* Unified track that bounds both the sliding indicator and tab buttons */}
        <View style={styles.dockTrack}>
          {/* Animated Active Sliding Indicator Capsule */}
          <View
            style={[
              styles.indicator,
              {
                width: `${tabPercent}%`,
                left: `${activeIndex * tabPercent}%`,
              },
            ]}
          >
            <View
              style={[
                styles.indicatorInner,
                {
                  backgroundColor: colors.indicatorFill,
                  shadowColor: colors.indicatorShadow,
                },
              ]}
            />
          </View>

          {/* Tab Buttons */}
          {items.map((tab) => {
            const isFocused = tab.id === activeTab;
            const iconColor = isFocused ? colors.activeText : colors.inactiveText;

            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.7}
                onPress={() => handleSelectTab(tab.id)}
                style={styles.tabButton}
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isFocused }}
              >
                <View style={styles.tabContent}>
                  <View style={styles.tabIconWrap}>
                    {tab.renderIcon(iconColor, isFocused)}
                  </View>
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: isFocused ? colors.activeText : colors.inactiveText },
                      isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCanvas: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dockerContainer: {
    borderRadius: 32,
    height: 72,
    width: "100%",
    maxWidth: 600,
    position: "relative",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  dockTrack: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    height: "100%",
    alignItems: "center",
  },
  indicator: {
    position: "absolute",
    height: "100%",
    top: 0,
    bottom: 0,
    paddingHorizontal: 2,
    transition: "left 0.24s cubic-bezier(0.25, 1, 0.5, 1)",
    zIndex: 1,
  } as any,
  indicatorInner: {
    width: "100%",
    height: "100%",
    borderRadius: 26,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  tabIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
    letterSpacing: -0.1,
    textAlign: "center",
  },
  tabLabelInactive: {
    fontWeight: "500",
  },
  tabLabelActive: {
    fontWeight: "700",
  },
});

export default FloatingDocker;
