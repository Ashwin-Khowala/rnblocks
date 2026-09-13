"use client";

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// ─── Type Definitions ──────────────────────────────────────────────────────────

export interface MarkedDateConfig {
  marked?: boolean;
  dotColor?: string;
  dots?: { color: string; key?: string }[];
}

export interface InteractiveCalendarProps {
  initialDate?: Date;
  selectedDate?: Date;
  theme?: "dark" | "light";
  accentColor?: string;
  markedDates?: Record<string, MarkedDateConfig>;
  onSelectDate?: (date: Date) => void;
  showTodayButton?: boolean;
}

// ─── Default Sample Marked Dates ──────────────────────────────────────────────

function getSampleMarkedDates(): Record<string, MarkedDateConfig> {
  const now = new Date();
  const formatKey = (offsetDays: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + offsetDays);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  return {
    [formatKey(0)]: {
      dots: [{ color: "#3B82F6" }, { color: "#10B981" }, { color: "#8B5CF6" }],
    },
    [formatKey(1)]: {
      dots: [{ color: "#EF4444" }, { color: "#3B82F6" }],
    },
    [formatKey(3)]: {
      dots: [{ color: "#10B981" }],
    },
    [formatKey(-2)]: {
      dots: [{ color: "#8B5CF6" }],
    },
    [formatKey(5)]: {
      dots: [{ color: "#F59E0B" }],
    },
  };
}

// ─── Authentic Vector SVG Icons ────────────────────────────────────────────────

function ChevronLeftIcon({ color = "#FFFFFF", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ color = "#FFFFFF", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// ─── Interactive Calendar Component ────────────────────────────────────────────

export function InteractiveCalendar({
  initialDate = new Date(),
  selectedDate: controlledSelectedDate,
  theme = "dark",
  accentColor = "#4F46E5",
  markedDates = getSampleMarkedDates(),
  onSelectDate,
  showTodayButton = true,
}: InteractiveCalendarProps) {
  const isDark = theme === "dark";
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date>(initialDate);

  const activeSelectedDate = controlledSelectedDate || internalSelectedDate;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation handlers
  const handlePrev = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() - 1);
    setCurrentDate(next);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setInternalSelectedDate(today);
    onSelectDate?.(today);
  };

  const handleSelectDay = (dayDate: Date) => {
    setInternalSelectedDate(dayDate);
    setCurrentDate(dayDate);
    onSelectDate?.(dayDate);
  };

  // Month grid calculations
  const monthCalendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { date: Date; isCurrentMonth: boolean; key: string }[] = [];

    // Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      days.push({
        date: new Date(year, month - 1, dayNum),
        isCurrentMonth: false,
        key: `prev-${dayNum}`,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        key: `curr-${i}`,
      });
    }

    // Next month leading days (fill up to 35 or 42 grid slots)
    const totalSlots = days.length > 35 ? 42 : 35;
    const remaining = totalSlots - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        key: `next-${i}`,
      });
    }

    return days;
  }, [year, month]);

  const today = new Date();

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      {/* ── Top Header Navigation Bar ───────────────────────────────── */}
      <View style={styles.headerBar}>
        <View>
          <Text style={[styles.headerTitle, isDark ? styles.textWhite : styles.textDark]}>
            {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <Text style={[styles.headerSubtitle, isDark ? styles.textMutedDark : styles.textMutedLight]}>
            Select date
          </Text>
        </View>

        <View style={styles.headerControls}>
          {showTodayButton && (
            <TouchableOpacity
              style={[
                styles.todayBtn,
                isDark ? styles.todayBtnDark : styles.todayBtnLight,
              ]}
              onPress={handleToday}
              activeOpacity={0.7}
            >
              <Text style={[styles.todayBtnText, isDark ? styles.textWhite : styles.textDark]}>
                Today
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.navGroup}>
            <TouchableOpacity
              style={[styles.navBtn, isDark ? styles.navBtnDark : styles.navBtnLight]}
              onPress={handlePrev}
              activeOpacity={0.7}
            >
              <ChevronLeftIcon color={isDark ? "#FFFFFF" : "#0F172A"} size={15} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navBtn, isDark ? styles.navBtnDark : styles.navBtnLight]}
              onPress={handleNext}
              activeOpacity={0.7}
            >
              <ChevronRightIcon color={isDark ? "#FFFFFF" : "#0F172A"} size={15} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ── Weekday Labels Header ───────────────────────────────────── */}
      <View style={styles.weekdayRow}>
        {WEEKDAY_NAMES.map((w, idx) => (
          <Text
            key={idx}
            style={[styles.weekdayLabel, isDark ? styles.textMutedDark : styles.textMutedLight]}
          >
            {w}
          </Text>
        ))}
      </View>

      {/* ── Month Days Grid ─────────────────────────────────────────── */}
      <View style={styles.gridMatrix}>
        {monthCalendarDays.map((item) => {
          const isSelected = isSameDay(item.date, activeSelectedDate);
          const isCurrentDay = isSameDay(item.date, today);
          const dateKey = toDateKey(item.date);
          const dayMarking = markedDates[dateKey];
          const dots = dayMarking?.dots || (dayMarking?.marked ? [{ color: dayMarking.dotColor || accentColor }] : []);

          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              onPress={() => handleSelectDay(item.date)}
              style={[
                styles.dayCell,
                isSelected && { backgroundColor: accentColor },
                isCurrentDay && !isSelected && (isDark ? styles.todayCellDark : styles.todayCellLight),
              ]}
            >
              <Text
                style={[
                  styles.dayCellText,
                  !item.isCurrentMonth && (isDark ? styles.fadedDayDark : styles.fadedDayLight),
                  item.isCurrentMonth && (isDark ? styles.textWhite : styles.textDark),
                  isSelected && styles.selectedDayText,
                  isCurrentDay && !isSelected && { color: accentColor, fontWeight: "700" },
                ]}
              >
                {item.date.getDate()}
              </Text>

              {dots.length > 0 && (
                <View style={styles.dotsContainer}>
                  {dots.slice(0, 3).map((dot, dIdx) => (
                    <View
                      key={dot.key || dIdx}
                      style={[
                        styles.eventDot,
                        { backgroundColor: isSelected ? "#FFFFFF" : dot.color },
                      ]}
                    />
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default InteractiveCalendar;

// ─── Stylesheet ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  containerDark: {
    backgroundColor: "#121217",
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  containerLight: {
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(0, 0, 0, 0.08)",
  },

  /* Header */
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  headerControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  todayBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  todayBtnDark: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  todayBtnLight: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  todayBtnText: {
    fontSize: 11,
    fontWeight: "600",
  },
  navGroup: {
    flexDirection: "row",
    gap: 4,
  },
  navBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  navBtnDark: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  navBtnLight: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  /* Weekday Header */
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
  },

  /* Days Grid */
  gridMatrix: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.285%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 2,
    position: "relative",
  },
  dayCellText: {
    fontSize: 13,
    fontWeight: "500",
  },
  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  todayCellDark: {
    borderWidth: 1,
    borderColor: "rgba(99, 102, 241, 0.4)",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
  },
  todayCellLight: {
    borderWidth: 1,
    borderColor: "rgba(79, 70, 229, 0.4)",
    backgroundColor: "rgba(79, 70, 229, 0.08)",
  },
  fadedDayDark: {
    color: "rgba(255, 255, 255, 0.2)",
  },
  fadedDayLight: {
    color: "rgba(0, 0, 0, 0.25)",
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 2,
    position: "absolute",
    bottom: 4,
  },
  eventDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
  },

  /* Common Color Utilities */
  textWhite: {
    color: "#FFFFFF",
  },
  textDark: {
    color: "#0F172A",
  },
  textMutedDark: {
    color: "#94A3B8",
  },
  textMutedLight: {
    color: "#64748B",
  },
});
