import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zrqajodjasupjigxxieq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycWFqb2RqYXN1cGppZ3h4aWVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Nzk1NzAzMCwiZXhwIjoyMDEzNTMzMDMwfQ.zHXCCOtrPe2ejcBR9o4oFs-lrkVEwxgF3_40np-NBUU'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase