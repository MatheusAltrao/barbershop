"use server";
import { prisma } from "@/lib/prisma";

export async function getServicesAction() {
  try {
    const services = await prisma.service.findMany({});
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to fetch services");
  }
}
