DO $$ BEGIN
 CREATE TYPE "projectStatus" AS ENUM('Drafted', 'In Progress', 'Completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('Single Family', 'Multi Family', 'Apartment', 'Condo', 'Townhouse', 'Commercial', 'Industrial', 'Other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('propertyManager', 'vendor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lat" numeric(9, 6) NOT NULL,
	"long" numeric(9, 6) NOT NULL,
	"placeId" varchar(255) NOT NULL,
	"addressLine1" varchar(255) NOT NULL,
	"addressLine2" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bids" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" numeric(11, 2) NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkId" varchar(255) NOT NULL,
	"logo" varchar(255),
	"name" varchar(255) NOT NULL,
	"website" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "places" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"neLat" double precision NOT NULL,
	"neLong" double precision NOT NULL,
	"swLat" double precision NOT NULL,
	"swLong" double precision NOT NULL,
	"placeId" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"expirationDate" timestamp with time zone NOT NULL,
	"allowDynamicBidding" boolean DEFAULT false NOT NULL,
	"isPublic" boolean DEFAULT false NOT NULL,
	"description" text NOT NULL,
	"status" "projectStatus" DEFAULT 'In Progress' NOT NULL,
	"property" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "type" NOT NULL,
	"description" text,
	"organization" uuid,
	"address" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "propertyManagers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"isAdmin" boolean DEFAULT true NOT NULL,
	"organization" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"id" uuid PRIMARY KEY NOT NULL,
	"service" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cuid" varchar(255) NOT NULL,
	"firstName" varchar(60) NOT NULL,
	"lastName" varchar(60) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phoneNumber" varchar(15) NOT NULL,
	"phoneNumberVerified" boolean,
	"profilePhoto" varchar(255),
	"role" "role" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendors" (
	"id" uuid PRIMARY KEY NOT NULL,
	"searchRadius" integer DEFAULT 10 NOT NULL,
	"companyName" varchar(255) NOT NULL,
	"companyDescription" text,
	"place" uuid NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "orgCuidIdx" ON "organizations" ("clerkId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "usersCuidIdx" ON "users" ("cuid");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_property_properties_id_fk" FOREIGN KEY ("property") REFERENCES "properties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "properties" ADD CONSTRAINT "properties_organization_organizations_id_fk" FOREIGN KEY ("organization") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "properties" ADD CONSTRAINT "properties_address_addresses_id_fk" FOREIGN KEY ("address") REFERENCES "addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "propertyManagers" ADD CONSTRAINT "propertyManagers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "propertyManagers" ADD CONSTRAINT "propertyManagers_organization_organizations_id_fk" FOREIGN KEY ("organization") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendors" ADD CONSTRAINT "vendors_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendors" ADD CONSTRAINT "vendors_place_places_id_fk" FOREIGN KEY ("place") REFERENCES "places"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
