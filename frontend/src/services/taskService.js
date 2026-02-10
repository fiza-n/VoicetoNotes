

import { supabase } from "./supabaseClient";

export const addTask = async (task) => {
  return await supabase.from("tasks").insert([task]);
};

export const getTasks = async (userId) => {
  return await supabase.from("tasks").select("*").eq("user_id", userId);
};
