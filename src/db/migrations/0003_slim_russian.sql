CREATE TABLE IF NOT EXISTS "projectMedia" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid,
	"mediaId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "propertyMedia" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"propertyId" uuid,
	"mediaId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vendorServices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vendorId" uuid,
	"serviceId" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projectMedia" ADD CONSTRAINT "projectMedia_projectId_properties_id_fk" FOREIGN KEY ("projectId") REFERENCES "properties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projectMedia" ADD CONSTRAINT "projectMedia_mediaId_media_id_fk" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "propertyMedia" ADD CONSTRAINT "propertyMedia_propertyId_properties_id_fk" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "propertyMedia" ADD CONSTRAINT "propertyMedia_mediaId_media_id_fk" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendorServices" ADD CONSTRAINT "vendorServices_vendorId_vendors_id_fk" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vendorServices" ADD CONSTRAINT "vendorServices_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
