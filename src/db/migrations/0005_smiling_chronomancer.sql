ALTER TABLE "projectMedia" DROP CONSTRAINT "projectMedia_projectId_properties_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projectMedia" ADD CONSTRAINT "projectMedia_projectId_projects_id_fk" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
