import db from '@/db';
import { organizations, projects, properties } from '@/db/schema';
import { NewOrganization, Organization, Project, Property } from '@/types';
import { clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

const organizationService = {
  async create(
    organization: NewOrganization,
    createdBy: string
  ): Promise<Organization> {
    const { name } = organization;
    const { id } = await clerkClient.organizations.createOrganization({
      name,
      createdBy,
    });

    // Insert organization into database
    const [newOrg] = await db
      .insert(organizations)
      .values({
        name,
        cuid: id,
      })
      .returning();

    return newOrg;
  },

  async get(id: string): Promise<Organization> {
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.id, id),
    });
    if (!org) {
      throw new Error('Organization not found');
    }

    return org;
  },

  async convertCuidToId(cuid: string): Promise<string> {
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.cuid, cuid),
    });
    if (!org) {
      throw new Error('Organization not found');
    }

    return org.id;
  },

  async getProperties(id: string): Promise<Property[]> {
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.cuid, id),
      with: {
        properties: {
          with: {
            address: true,
            projects: true,
          },
        },
      },
    });
    if (!org) {
      throw new Error('Organization not found');
    }

    const properties: Property[] = org.properties.map((property) => ({
      ...property,
      projects: property.projects.map((project) => ({
        ...project,
        media: [],
      })),
      media: [], // Ensure media is an array of strings
    }));

    return properties;
  },

  async getProperty(id: string, propertyId: string): Promise<Property> {
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.cuid, id),
      with: {
        properties: {
          where: eq(properties.id, propertyId),
          with: {
            address: true,
            projects: true,
          },
        },
      },
    });
    if (!org) {
      throw new Error('Organization not found');
    }

    const property = org.properties[0];
    if (!property) {
      throw new Error('Property not found');
    }

    const projects = property.projects.map((project) => ({
      ...project,
      media: [], // Ensure media is an array of strings
    }));

    return {
      ...property,
      projects,
      media: [], // Ensure media is an array of strings
    };
  },

  async getProject(id: string, projectId: string): Promise<Project> {
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.cuid, id),
      with: {
        projects: {
          where: eq(projects.id, projectId),
        },
      },
    });
    if (!org) {
      throw new Error('Organization not found');
    }

    const project = org.projects[0];
    if (!project) {
      throw new Error('Property not found');
    }

    return {
      ...project,
      media: [], // Ensure media is an array of strings
    };
  },
};

export default organizationService;
