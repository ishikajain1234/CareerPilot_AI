import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_q3mOJyBCu2MH@ep-solitary-cloud-a45wes7h-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
  }
});