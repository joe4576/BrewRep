import { v4 as uuid } from "uuid";

export type SharedIds = {
  joesBreweryId: string;
  wetherspoonsId: string;
  premierSystemsId: string;
  stMarysId: string;
  westQuayId: string;
  tenantId: string;
  userId: string;
};

/**
 * Factory function that creates an object of new uuids.
 *
 * Used for resetting demo data, and seeding the database
 * in a dev environment.
 */
export function createSharedIds(): SharedIds {
  return {
    joesBreweryId: uuid(),
    wetherspoonsId: uuid(),
    premierSystemsId: uuid(),
    stMarysId: uuid(),
    westQuayId: uuid(),
    tenantId: uuid(),
    userId: uuid(),
  };
}
