import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {
  media,
  organizations,
  projects,
  properties,
  propertyManagers,
  propertyManagersRelations,
  users,
  vendors,
  vendorsRelations,
} from './schema';
import { addresses } from './schema/addresses.schema';
import { bids } from './schema/bids.schema';
import {
  projectMedia,
  projectMediaRelations,
} from './schema/joinTables/projectMedia.schema';
import {
  propertyMedia,
  propertyMediaRelations,
} from './schema/joinTables/propertyMedia.schema';
import {
  vendorServices,
  vendorServicesRelations,
} from './schema/joinTables/vendorServices.schema';
import { organizationsRelations } from './schema/organization.schema';
import { places } from './schema/places.schema';
import { projectsRelations } from './schema/projects.schema';
import { propertiesRelations } from './schema/properties.schema';

const sql = postgres(
  'postgresql://zack-ashen:nrd7lLqIUtM1@ep-yellow-silence-a5oy9sna-pooler.us-east-2.aws.neon.tech/estimax?sslmode=require',
  { ssl: 'require' }
);
const db = drizzle(sql, {
  schema: {
    media,
    organizations,
    organizationsRelations,
    projects,
    properties,
    propertiesRelations,
    propertyManagers,
    propertyManagersRelations,
    users,
    vendors,
    vendorsRelations,
    projectMedia,
    projectMediaRelations,
    propertyMedia,
    propertyMediaRelations,
    vendorServices,
    vendorServicesRelations,
    addresses,
    bids,
    places,
    projectsRelations,
  },
});

export default db;
