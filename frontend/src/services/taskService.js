import { supabase } from "../lib/supabaseClient";

export const getTasks = async () => {
  return await supabase.from("tasks").select("*");
};

export const addTask = async (task) => {
  return await supabase.from("tasks").insert(task);
};

export const deleteTask = async (id) => {
  return await supabase.from("tasks").delete().eq("id", id);
};

export const completeTask = async (id) => {
  return await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("id", id);
};