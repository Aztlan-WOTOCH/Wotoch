import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined');
}

// Cliente público (para operaciones de cliente)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Cliente con service role (para operaciones administrativas)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase;
