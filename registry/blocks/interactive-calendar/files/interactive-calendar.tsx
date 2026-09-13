"use client";

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// ─── Type Definitions ──────────────────────────────────────────────────────────

export type Theme = "dark" | "light";

export interface MarkedDateConfig {
  marked?: boolean;
  dotColor?: string;
  dots?: { color: string; key?: string }[];
}

export interface InteractiveCalendarProps {
  initialDate?: Date;
  selectedDate?: Date;
  theme?: Theme;
  accentColor?: string;
  markedDates?: Record<string, MarkedDateConfig>;
  onSelectDate?: (date: Date) => void;
  showTodayButton?: boolean;
}

const COLORS_DARK = {
  background: "#121217",
  border: "rgba(255, 255, 255, 0.08)",
  foreground: "#FFFFFF",
  muted: "#94A3B8",
  buttonBg: "rgba(255, 255, 255, 0.05)",
  buttonBorder: "rgba(255, 255, 255, 0.10)",
  todayBorder: "rgba(99, 102, 241, 0.4)",
  todayBg: "rgba(99, 102, 241, 0.1)",
  fadedDay: "rgba(255, 255, 255, 0.20)",
  iconColor: "#FFFFFF",
  defaultAccent: "#4F46E5",
};

const COLORS_LIGHT = {
  background: "#FFFFFF",
  border: "rgba(0, 0, 0, 0.08)",
  foreground: "#0F172A",
  muted: "#64748B",
  buttonBg: "rgba(0, 0, 0, 0.04)",
  buttonBorder: "rgba(0, 0, 0, 0.10)",
  todayBorder: "rgba(79, 70, 229, 0.4)",
  todayBg: "rgba(79, 70, 229, 0.08)",
  fadedDay: "rgba(0, 0, 0, 0.25)",
  iconColor: "#0F172A",
  defaultAccent: "#4F46E5",
};

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
  const colors = theme === "dark" ? COLORS_DARK : COLORS_LIGHT;
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
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      ]}
    >
      {/* ── Top Header Navigation Bar ───────────────────────────────── */}
      <View style={styles.headerBar}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>
            {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
            Select date
          </Text>
        </View>

        <View style={styles.headerControls}>
          {showTodayButton && (
            <TouchableOpacity
              style={[
                styles.todayBtn,
                {
                  backgroundColor: colors.buttonBg,
                  borderColor: colors.buttonBorder,
                },
              ]}
              onPress={handleToday}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Go to today"
            >
              <Text style={[styles.todayBtnText, { color: colors.foreground }]}>
                Today
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.navGroup}>
            <TouchableOpacity
              style={[
                styles.navBtn,
                {
                  backgroundColor: colors.buttonBg,
                  borderColor: colors.buttonBorder,
                },
              ]}
              onPress={handlePrev}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Previous month"
            >
              <ChevronLeftIcon color={colors.iconColor} size={15} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navBtn,
                {
                  backgroundColor: colors.buttonBg,
                  borderColor: colors.buttonBorder,
                },
              ]}
              onPress={handleNext}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Next month"
            >
              <ChevronRightIcon color={colors.iconColor} size={15} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ── Weekday Labels Header ───────────────────────────────────── */}
      <View style={styles.weekdayRow} aria-hidden={true}>
        {WEEKDAY_NAMES.map((w, idx) => (
          <Text
            key={idx}
            style={[styles.weekdayLabel, { color: colors.muted }]}
          >
            {w}
          </Text>
        ))}
      </View>

      {/* ── Month Days Grid ─────────────────────────────────────────── */}
      <View style={styles.gridMatrix} accessibilityRole="grid">
        {monthCalendarDays.map((item) => {
          const isSelected = isSameDay(item.date, activeSelectedDate);
          const isCurrentDay = isSameDay(item.date, today);
          const dateKey = toDateKey(item.date);
          const dayMarking = markedDates[dateKey];
          const dots = dayMarking?.dots || (dayMarking?.marked ? [{ color: dayMarking.dotColor || accentColor }] : []);
          const dayA11yLabel = `${MONTH_NAMES[item.date.getMonth()]} ${item.date.getDate()}, ${item.date.getFullYear()}${isCurrentDay ? ", today" : ""}${isSelected ? ", selected" : ""}`;

          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              onPress={() => handleSelectDay(item.date)}
              style={[
                styles.dayCell,
                isSelected && { backgroundColor: accentColor },
                isCurrentDay && !isSelected && {
                  borderWidth: 1,
                  borderColor: colors.todayBorder,
                  backgroundColor: colors.todayBg,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={dayA11yLabel}
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.dayCellText,
                  !item.isCurrentMonth && { color: colors.fadedDay },
                  item.isCurrentMonth && !isSelected && !isCurrentDay && { color: colors.foreground },
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
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
});

export default InteractiveCalendar;
