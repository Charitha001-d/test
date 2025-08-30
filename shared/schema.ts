import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const plantAnalyses = pgTable("plant_analyses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  imagePath: text("image_path").notNull(),
  diagnosis: text("diagnosis").notNull(),
  confidence: real("confidence").notNull(),
  severity: text("severity"), // 'low', 'moderate', 'high'
  description: text("description"),
  treatment: text("treatment"),
  isHealthy: boolean("is_healthy").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const diseaseReports = pgTable("disease_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  location: text("location").notNull(),
  disease: text("disease").notNull(),
  severity: text("severity").notNull(), // 'low', 'medium', 'high'
  description: text("description"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userFeedback = pgTable("user_feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  analysisId: integer("analysis_id").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const insertPlantAnalysisSchema = createInsertSchema(plantAnalyses).omit({
  id: true,
  createdAt: true,
});

export const insertDiseaseReportSchema = createInsertSchema(diseaseReports).omit({
  id: true,
  createdAt: true,
});

export const insertUserFeedbackSchema = createInsertSchema(userFeedback).omit({
  id: true,
  createdAt: true,
});

export const signinSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = insertUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type PlantAnalysis = typeof plantAnalyses.$inferSelect;
export type InsertPlantAnalysis = z.infer<typeof insertPlantAnalysisSchema>;
export type DiseaseReport = typeof diseaseReports.$inferSelect;
export type InsertDiseaseReport = z.infer<typeof insertDiseaseReportSchema>;
export type UserFeedback = typeof userFeedback.$inferSelect;
export type InsertUserFeedback = z.infer<typeof insertUserFeedbackSchema>;
export type SigninForm = z.infer<typeof signinSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
