import { supabase } from "../lib/supabaseClient";


export const getTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch tasks error:", error.message);
    return [];
  }

  return data;
};


export const addTask = async (task) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select();   

  if (error) {
    console.error("Insert task error:", error.message);
    return [];
  }

  return data;
};


export const deleteTask = async (id) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error.message);
  }
};

export const completeTask = async (id) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: true })
    .eq("id", id)
    .select();  

  if (error) {
    console.error("Complete error:", error.message);
    return [];
  }

  return data;
};