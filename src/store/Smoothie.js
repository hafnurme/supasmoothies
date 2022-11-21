import { defineStore } from "pinia";
import { ref } from "vue";
import supabase from "../config/supabaseClient";

export const useSmoothiesStore = defineStore("smoothies", () => {
  const smoothiesData = ref(null);
  const smoothiesError = ref(null);
  const smoothie = ref(null);

  const fetchSmoothies = async () => {
    const { data, error } = await supabase.from("smoothies").select();

    if (error) {
      smoothiesData.value = null;
      smoothiesError.value = "Cannot get the smoothies!";
      return;
    }

    smoothiesError.value = null;
    smoothiesData.value = data;
    console.log(smoothiesData.value);
  };

  fetchSmoothies();

  const getSmoothie = async (id) => {
    const { data, error } = await supabase
      .from("smoothies")
      .select()
      .eq("id", id)
      .single();

    smoothie.value = data;

    if (error) {
      console.log(error);
      smoothiesError.value = "Cannot get the smoothies!";
      return;
    }

    console.log(data);

    smoothiesError.value = null;
  };

  return {
    smoothiesData,
    smoothiesError,
    fetchSmoothies,
    smoothie,
    getSmoothie,
  };
});
