import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zrqajodjasupjigxxieq.supabase.co'
const supabaseKey = process.env.REACT_APP_Supabase_Key
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase