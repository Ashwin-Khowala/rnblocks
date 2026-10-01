"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleSheet } from "react-native";

export function ReactNativeWebRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  useServerInsertedHTML(() => {
    // Extract server-rendered StyleSheet from react-native-web
    // @ts-expect-error - getSheet is a react-native-web method
    const sheet = StyleSheet.getSheet();
    return (
      <style
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    );
  });

  return <>{children}</>;
}
