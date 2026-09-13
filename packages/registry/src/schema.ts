import { z } from "zod";

export const RegistryItemFileSchema = z.object({
  path: z.string(),
  type: z.literal("registry:component"),
  target: z.string().optional(),
});

export const RegistryItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  type: z.enum(["block", "screen"]),

  author: z.string(),

  version: z.string().default("1.0.0"),

  category: z.string().default("general"),

  files: z.array(RegistryItemFileSchema).min(1, "At least one file must be declared"),

  dependencies: z.array(z.string()).default([]),

  registryDependencies: z.array(z.string()).default([]),

  platforms: z.array(z.enum(["ios", "android", "web"])).default(["ios", "android", "web"]),

  framework: z.enum(["expo", "react-native"]).default("react-native"),

  styling: z.array(z.string()).default(["StyleSheet"]),

  themes: z.array(z.enum(["dark", "light"])).optional(),
});

export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryItemFile = z.infer<typeof RegistryItemFileSchema>;

export const RegistryManifestSchema = z.object({
  version: z.string(),
  generatedAt: z.string(),
  items: z.array(RegistryItemSchema),
});

export type RegistryManifest = z.infer<typeof RegistryManifestSchema>;
