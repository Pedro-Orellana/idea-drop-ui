import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { fetchAllIdeas } from "@/api/ideas";

//components
import IdeaCard from "@/components/idea-card";

//queryOptions
const allIdeasQueryOptions = () =>
  queryOptions({
    queryKey: ["ideas"],
    queryFn: async () => fetchAllIdeas(),
  });

export const Route = createFileRoute("/ideas/")({
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(allIdeasQueryOptions());
  },
  component: IdeasPage,
});

function IdeasPage() {
  const { data } = useSuspenseQuery(allIdeasQueryOptions());
  const ideas = data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ideas</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
