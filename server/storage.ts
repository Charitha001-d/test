import { users, plantAnalyses, diseaseReports, userFeedback, type User, type InsertUser, type PlantAnalysis, type InsertPlantAnalysis, type DiseaseReport, type InsertDiseaseReport, type UserFeedback, type InsertUserFeedback } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Plant analysis operations
  createPlantAnalysis(analysis: InsertPlantAnalysis): Promise<PlantAnalysis>;
  getPlantAnalysesByUser(userId: number): Promise<PlantAnalysis[]>;
  getPlantAnalysisById(id: number): Promise<PlantAnalysis | undefined>;
  
  // Disease report operations
  createDiseaseReport(report: InsertDiseaseReport): Promise<DiseaseReport>;
  getDiseaseReports(): Promise<DiseaseReport[]>;
  getDiseaseReportsByLocation(location: string): Promise<DiseaseReport[]>;
  
  // User feedback operations
  createUserFeedback(feedback: InsertUserFeedback): Promise<UserFeedback>;
  getFeedbackByAnalysis(analysisId: number): Promise<UserFeedback[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private plantAnalyses: Map<number, PlantAnalysis>;
  private diseaseReports: Map<number, DiseaseReport>;
  private userFeedback: Map<number, UserFeedback>;
  private currentUserId: number;
  private currentAnalysisId: number;
  private currentReportId: number;
  private currentFeedbackId: number;

  constructor() {
    this.users = new Map();
    this.plantAnalyses = new Map();
    this.diseaseReports = new Map();
    this.userFeedback = new Map();
    this.currentUserId = 1;
    this.currentAnalysisId = 1;
    this.currentReportId = 1;
    this.currentFeedbackId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser,
      id, 
      createdAt: new Date(),
      email: insertUser.email ?? null,
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null
    };
    this.users.set(id, user);
    return user;
  }

  async createPlantAnalysis(insertAnalysis: InsertPlantAnalysis): Promise<PlantAnalysis> {
    const id = this.currentAnalysisId++;
    const analysis: PlantAnalysis = { 
      ...insertAnalysis, 
      id, 
      createdAt: new Date(),
      description: insertAnalysis.description ?? null,
      severity: insertAnalysis.severity ?? null,
      treatment: insertAnalysis.treatment ?? null,
      isHealthy: insertAnalysis.isHealthy ?? false
    };
    this.plantAnalyses.set(id, analysis);
    return analysis;
  }

  async getPlantAnalysesByUser(userId: number): Promise<PlantAnalysis[]> {
    return Array.from(this.plantAnalyses.values())
      .filter(analysis => analysis.userId === userId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getPlantAnalysisById(id: number): Promise<PlantAnalysis | undefined> {
    return this.plantAnalyses.get(id);
  }

  async createDiseaseReport(insertReport: InsertDiseaseReport): Promise<DiseaseReport> {
    const id = this.currentReportId++;
    const report: DiseaseReport = { 
      ...insertReport, 
      id, 
      createdAt: new Date(),
      description: insertReport.description ?? null,
      latitude: insertReport.latitude ?? null,
      longitude: insertReport.longitude ?? null
    };
    this.diseaseReports.set(id, report);
    return report;
  }

  async getDiseaseReports(): Promise<DiseaseReport[]> {
    return Array.from(this.diseaseReports.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getDiseaseReportsByLocation(location: string): Promise<DiseaseReport[]> {
    return Array.from(this.diseaseReports.values())
      .filter(report => report.location.toLowerCase().includes(location.toLowerCase()))
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createUserFeedback(insertFeedback: InsertUserFeedback): Promise<UserFeedback> {
    const id = this.currentFeedbackId++;
    const feedback: UserFeedback = { 
      ...insertFeedback, 
      id, 
      createdAt: new Date(),
      comment: insertFeedback.comment ?? null
    };
    this.userFeedback.set(id, feedback);
    return feedback;
  }

  async getFeedbackByAnalysis(analysisId: number): Promise<UserFeedback[]> {
    return Array.from(this.userFeedback.values())
      .filter(feedback => feedback.analysisId === analysisId);
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createPlantAnalysis(insertAnalysis: InsertPlantAnalysis): Promise<PlantAnalysis> {
    const result = await db.insert(plantAnalyses).values(insertAnalysis).returning();
    return result[0];
  }

  async getPlantAnalysesByUser(userId: number): Promise<PlantAnalysis[]> {
    return await db.select().from(plantAnalyses).where(eq(plantAnalyses.userId, userId));
  }

  async getPlantAnalysisById(id: number): Promise<PlantAnalysis | undefined> {
    const result = await db.select().from(plantAnalyses).where(eq(plantAnalyses.id, id));
    return result[0];
  }

  async createDiseaseReport(insertReport: InsertDiseaseReport): Promise<DiseaseReport> {
    const result = await db.insert(diseaseReports).values(insertReport).returning();
    return result[0];
  }

  async getDiseaseReports(): Promise<DiseaseReport[]> {
    return await db.select().from(diseaseReports);
  }

  async getDiseaseReportsByLocation(location: string): Promise<DiseaseReport[]> {
    // This would need a more sophisticated location search in production
    return await db.select().from(diseaseReports);
  }

  async createUserFeedback(insertFeedback: InsertUserFeedback): Promise<UserFeedback> {
    const result = await db.insert(userFeedback).values(insertFeedback).returning();
    return result[0];
  }

  async getFeedbackByAnalysis(analysisId: number): Promise<UserFeedback[]> {
    return await db.select().from(userFeedback).where(eq(userFeedback.analysisId, analysisId));
  }
}

export const storage = new DatabaseStorage();
