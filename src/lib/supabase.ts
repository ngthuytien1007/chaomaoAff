import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Sử dụng Service Role Key để có quyền ghi data từ Backend mà không bị chặn bởi RLS
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
