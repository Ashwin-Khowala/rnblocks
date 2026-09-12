"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FloatingDocker } from "../../../blocks/floating-docker/files/floating-docker";

export function TeamsAndNetworkScreen() {
  const [activeTab, setActiveTab] = useState<"openings" | "network">("openings");
  const [filter, setFilter] = useState<"latest" | "for_you">("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDockTab, setActiveDockTab] = useState("team");

  return (
    <View style={styles.screenRoot}>
      {/* ─── Top Status & App Bar ────────────────────────────────────────── */}
      <View style={styles.topHeader}>
        {/* User Profile Avatar */}
        <TouchableOpacity activeOpacity={0.8} style={styles.avatarWrap}>
          <View style={styles.avatarInner}>
            {/* Stylized Avatar Illustration */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#2A2A2A" />
              <path
                d="M14 6C11.8 6 10 7.8 10 10C10 12.2 11.8 14 14 14C16.2 14 18 12.2 18 10C18 7.8 16.2 6 14 6ZM14 16C10.67 16 4 17.67 4 21V23H24V21C24 17.67 17.33 16 14 16Z"
                fill="#D1D5DB"
              />
            </svg>
          </View>
        </TouchableOpacity>

        {/* Screen Title */}
        <Text style={styles.headerTitle}>Teams & Network</Text>

        <View style={{ width: 34 }} />
      </View>

      {/* ─── Tabs & "My Team" Action Row ─────────────────────────────────── */}
      <View style={styles.tabNavRow}>
        <View style={styles.topTabs}>
          {/* Openings Tab */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("openings")}
            style={[styles.topTab, activeTab === "openings" && styles.topTabActive]}
          >
            <Text
              style={[
                styles.topTabText,
                activeTab === "openings" ? styles.topTabTextActive : styles.topTabTextInactive,
              ]}
            >
              Openings
            </Text>
          </TouchableOpacity>

          {/* Network Tab */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("network")}
            style={[styles.topTab, activeTab === "network" && styles.topTabActive]}
          >
            <Text
              style={[
                styles.topTabText,
                activeTab === "network" ? styles.topTabTextActive : styles.topTabTextInactive,
              ]}
            >
              Network
            </Text>
          </TouchableOpacity>
        </View>

        {/* "My Team" White Pill Button */}
        <TouchableOpacity activeOpacity={0.85} style={styles.myTeamButton}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
              fill="#000000"
            />
            <path
              d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <Text style={styles.myTeamButtonText}>My Team</Text>
        </TouchableOpacity>
      </View>

      {/* ─── Search Bar ──────────────────────────────────────────────────── */}
      <View style={styles.searchContainer}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#71717A" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 20L16.5 16.5" stroke="#71717A" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <TextInput
          style={styles.searchInput}
          placeholder="Search positions, startups, skills..."
          placeholderTextColor="#71717A"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* ─── Filter Pills ────────────────────────────────────────────────── */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFilter("latest")}
          style={[styles.filterChip, filter === "latest" ? styles.filterChipActive : styles.filterChipInactive]}
        >
          <Text style={[styles.filterChipText, filter === "latest" && styles.filterChipTextActive]}>
            Latest
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFilter("for_you")}
          style={[styles.filterChip, filter === "for_you" ? styles.filterChipActive : styles.filterChipInactive]}
        >
          <Text style={[styles.filterChipText, filter === "for_you" && styles.filterChipTextActive]}>
            For You
          </Text>
        </TouchableOpacity>
      </View>

      {/* ─── Scrollable Cards Content ────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CARD 1: Zarwa - Redefining Travel Safety */}
        <TouchableOpacity activeOpacity={0.85} style={styles.openingCard}>
          <View style={styles.cardHeader}>
            {/* Yellow Startup Logo */}
            <View style={styles.zarwaLogo}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#EAB308" />
                <path
                  d="M7 8H17L8 16H17"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </View>

            <View style={styles.cardHeaderInfo}>
              <Text style={styles.startupTitle}>Zarwa- Redefining Travel Safety</Text>
              <Text style={styles.startupSubtitle} numberOfLines={1}>
                At Zarwa, we believe that safety during travel isn't a luxury—it's a fundame...
              </Text>
            </View>
          </View>

          {/* Position Title */}
          <Text style={styles.positionTitle}>CTO</Text>

          {/* Meta Tags Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 21V19C16 16.79 14.21 15 12 15C9.79 15 8 16.79 8 19V21"
                  stroke="#8E8E93"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="7" r="4" stroke="#8E8E93" strokeWidth="2" />
              </svg>
              <Text style={styles.metaText}>1 position</Text>
            </View>

            <View style={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="14" rx="2" stroke="#8E8E93" strokeWidth="2" />
                <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" stroke="#8E8E93" strokeWidth="2" />
              </svg>
              <Text style={styles.metaText}>Unpaid</Text>
            </View>

            <View style={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                  stroke="#8E8E93"
                  strokeWidth="2"
                />
                <circle cx="12" cy="9" r="2.5" stroke="#8E8E93" strokeWidth="2" />
              </svg>
              <Text style={styles.metaText}>Remote</Text>
            </View>
          </View>

          {/* Footer Text */}
          <Text style={styles.applicationsText}>1 application</Text>
        </TouchableOpacity>

        {/* CARD 2: Curezy */}
        <TouchableOpacity activeOpacity={0.85} style={styles.openingCard}>
          <View style={styles.cardHeader}>
            {/* Teal/Blue Startup Logo */}
            <View style={styles.curezyLogo}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#0EA5E9" />
                <path
                  d="M12 7V17M7 12H17"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </View>

            <View style={styles.cardHeaderInfo}>
              <Text style={styles.startupTitle}>Curezy</Text>
              <Text style={styles.startupSubtitle} numberOfLines={1}>
                Curezy is a doctor-supervised primary healthcare platform that standard...
              </Text>
            </View>
          </View>

          {/* Position Title */}
          <Text style={styles.positionTitle}>CTO (AI/ML Engineer)</Text>

          {/* Match Score Badge */}
          <View style={styles.matchPill}>
            <Text style={styles.matchText}>0% Match</Text>
            <View style={styles.matchDot} />
            <Text style={styles.matchLabel}>Low</Text>
          </View>

          {/* Meta Tags Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 21V19C16 16.79 14.21 15 12 15C9.79 15 8 16.79 8 19V21"
                  stroke="#8E8E93"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="7" r="4" stroke="#8E8E93" strokeWidth="2" />
              </svg>
              <Text style={styles.metaText}>5 positions</Text>
            </View>

            <View style={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="7" width="18" height="14" rx="2" stroke="#8E8E93" strokeWidth="2" />
                <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" stroke="#8E8E93" strokeWidth="2" />
              </svg>
              <Text style={styles.metaText}>1-5% Equity</Text>
            </View>

            <View style={styles.metaItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
                  stroke="#8E8E93"
                  strokeWidth="2"
                />
                <circle cx="12" cy="9" r="2.5" stroke="#8E8E93" strokeWidth="2" />
              </svg>
              <Text style={styles.metaText}>Hybrid</Text>
            </View>
          </View>

          {/* Footer Text */}
          <Text style={styles.applicationsText}>3 applications</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ─── Bottom Floating Docker ──────────────────────────────────────── */}
      <View style={styles.floatingDockPositioner}>
        <FloatingDocker
          initialTab={activeDockTab}
          onTabChange={(id) => setActiveDockTab(id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: "#050505",
    paddingTop: 16,
    position: "relative",
    overflow: "hidden",
    minHeight: 590,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatarWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18.5,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
  tabNavRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  topTabs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  topTab: {
    paddingVertical: 4,
    position: "relative",
  },
  topTabActive: {
    borderBottomWidth: 2.5,
    borderBottomColor: "#32C798",
  },
  topTabText: {
    fontSize: 18,
    letterSpacing: -0.3,
  },
  topTabTextActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  topTabTextInactive: {
    color: "#71717A",
    fontWeight: "600",
  },
  myTeamButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  myTeamButtonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 14,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    gap: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13.5,
    padding: 0,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: "#32C798",
  },
  filterChipInactive: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222222",
  },
  filterChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#8E8E93",
  },
  filterChipTextActive: {
    color: "#000000",
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 94, // Space for bottom floating dock
    gap: 14,
  },
  openingCard: {
    backgroundColor: "#0D0D0D",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1A1A1A",
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  zarwaLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  curezyLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeaderInfo: {
    flex: 1,
  },
  startupTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 3,
  },
  startupSubtitle: {
    fontSize: 11.5,
    color: "#8E8E93",
    lineHeight: 16,
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  matchPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    backgroundColor: "#141414",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  matchText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D4D4D8",
  },
  matchDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: "#8E8E93",
  },
  matchLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "#A1A1AA",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
  },
  applicationsText: {
    fontSize: 11.5,
    color: "#71717A",
  },
  floatingDockPositioner: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
});

export default TeamsAndNetworkScreen;
