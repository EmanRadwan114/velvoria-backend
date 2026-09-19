// Import category products
import { sofasProducts } from "./sofas.js";
import { storageUnitsProducts } from "./storageUnits.js";
import { bedsProducts } from "./beds.js";
import { diningTablesProducts } from "./diningTables.js";
import { officeDesksProducts } from "./officeDesks.js";
import { chairsProducts } from "./chairs.js";
import { outdoorSetsProducts } from "./outdoorSets.js";
import { decorsProducts } from "./decors.js";

// Import Lighting products
import { lightingProducts } from "./lighting.js";

// Export products grouped by category for easy seeding

export const SofasProducts = sofasProducts;
export const StorageUnitsProducts = storageUnitsProducts;
export const BedsProducts = bedsProducts;
export const DiningTablesProducts = diningTablesProducts;
export const OfficeDesksProducts = officeDesksProducts;
export const ChairsProducts = chairsProducts;
export const OutdoorSetsProducts = outdoorSetsProducts;
export const DecorsProducts = decorsProducts;
export const LightingProducts = lightingProducts;

// Master collection of all products by category
export const allProductCollections = {
  Sofas: sofasProducts,
  "Storage Units": storageUnitsProducts,
  Beds: bedsProducts,
  "Dining Tables": diningTablesProducts,
  "Office Desks": officeDesksProducts,
  Chairs: chairsProducts,
  "Outdoor Sets": outdoorSetsProducts,
  Decors: decorsProducts,
  Lighting: lightingProducts,
};
