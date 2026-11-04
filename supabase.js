const supabaseUrl = "https://rdvmqbimxtcwzldlntji.supabase.co";
const supabaseKey = "sb_publishable_DXP7lEN3ntD3vdtk6B46xw_m99mnwhh";

const db = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
console.log("Supabase connected!");
