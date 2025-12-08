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

export const createNewIdea = async (newIdea: {
  title: string;
  summary: string;
  description: string;
  tags: Array<string>;
}): Promise<Idea> => {
  const response = await api.post("/ideas", {
    ...newIdea,
    createdAt: new Date().toISOString(),
  });

  return response.data;
};

export const deleteIdea = async (ideaId: string): Promise<void> => {
  await api.delete(`/ideas/${ideaId}`);
};

export const updateIdea = async (
  ideaId: string,
  updatedIdea: {
    title: string;
    summary: string;
    description: string;
    tags: Array<string>;
  }
): Promise<Idea> => {
  const response = await api.put(`ideas/${ideaId}`, updatedIdea);
  return response.data;
};
