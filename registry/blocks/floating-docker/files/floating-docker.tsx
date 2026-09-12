"use client";

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TabItem {
  id: string;
  label: string;
  icon: string;
  badge?: boolean;
}

const TABS: TabItem[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "team", label: "Team", icon: "👥", badge: true },
  { id: "ai", label: "AI", icon: "✨" },
  { id: "ideas", label: "Ideas", icon: "💡" },
  { id: "profile", label: "Profile", icon: "👤" },
];

export function FloatingDocker() {
  const [activeTab, setActiveTab] = useState<string>("ai");

  const activeIndex = TABS.findIndex((t) => t.id === activeTab);
  // Calculate left offset percentage for the active sliding capsule
  const tabWidthPercent = 100 / TABS.length;

  return (
    <View style={styles.outerContainer}>
      {/* Background ambient mock screen */}
      <View style={styles.screenMock}>
        <View style={styles.screenMockHeader}>
          <Text style={styles.screenMockTitle}>
            {activeTab.toUpperCase()} TAB ACTIVE
          </Text>
          <Text style={styles.screenMockSub}>
            Tap any tab below to test the floating dock transition
          </Text>
        </View>
        <View style={styles.mockContentBox}>
          <Text style={styles.mockIcon}>
            {TABS.find((t) => t.id === activeTab)?.icon}
          </Text>
          <Text style={styles.mockLabel}>
            Currently viewing {TABS.find((t) => t.id === activeTab)?.label}
          </Text>
        </View>
      </View>

      {/* Floating Dock Container */}
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {/* Animated Active Indicator Capsule */}
          <View
            style={[
              styles.indicator,
              {
                width: `${tabWidthPercent}%`,
                left: `${activeIndex * tabWidthPercent}%`,
              },
            ]}
          >
            <View style={styles.indicatorInner} />
          </View>

          {/* Tab Buttons */}
          {TABS.map((tab) => {
            const isFocused = tab.id === activeTab;
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab.id)}
                style={styles.tabButton}
              >
                <View style={styles.tabContent}>
                  <View style={styles.iconWrapper}>
                    <Text style={styles.tabIcon}>{tab.icon}</Text>
                    {tab.badge && !isFocused && <View style={styles.badgeDot} />}
                  </View>
                  <Text
                    style={[
                      styles.tabLabel,
                      isFocused && styles.tabLabelActive,
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
  outerContainer: {
    width: "100%",
    minHeight: 380,
    position: "relative",
    justifyContent: "space-between",
    padding: 16,
  },
  screenMock: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  screenMockHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  screenMockTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#a1a1aa",
    letterSpacing: 1.5,
  },
  screenMockSub: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
    textAlign: "center",
  },
  mockContentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 280,
  },
  mockIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  mockLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f4f4f5",
  },
  tabBarContainer: {
    width: "100%",
    paddingHorizontal: 6,
    paddingBottom: 6,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(18, 18, 20, 0.95)",
    borderRadius: 30,
    height: 64,
    position: "relative",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 4,
    overflow: "hidden",
  },
  indicator: {
    position: "absolute",
    height: 52,
    top: 5,
    paddingHorizontal: 3,
    transition: "left 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
  } as any,
  indicatorInner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 26,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
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
    height: 48,
  },
  iconWrapper: {
    position: "relative",
  },
  tabIcon: {
    fontSize: 18,
  },
  badgeDot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10b981",
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#71717a",
    marginTop: 2,
  },
  tabLabelActive: {
    color: "#09090b",
    fontWeight: "800",
  },
});

export default FloatingDocker;
