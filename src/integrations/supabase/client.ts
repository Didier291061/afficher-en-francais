// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ahfveayssbgbwcythwys.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZnZlYXlzc2JnYndjeXRod3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMzk5MzIsImV4cCI6MjA0ODgxNTkzMn0.bVOu76Q8iWz8AVyP5eKAQ0V1YtulfdatFV25tqYRm5A";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);