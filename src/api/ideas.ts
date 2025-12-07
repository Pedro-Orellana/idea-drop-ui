import api from "@/lib/axios";
import type { Idea } from "@/types";

export const fetchAllIdeas = async (): Promise<Array<Idea>> => {
  const allIdeas = await api.get("/ideas");
  return allIdeas.data;
};

export const fetchSingleIdea = async (ideaId: string): Promise<Idea> => {
  const response = await api.get(`/ideas/${ideaId}`);
  return response.data;
};
