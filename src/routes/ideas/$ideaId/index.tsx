import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from "@tanstack/react-query";
import { fetchSingleIdea, deleteIdea } from "@/api/ideas";

import { useAuth } from "@/context/AuthContext";

//queryOptions is used to not pass directly into useQuery or useSuspenseQuery
//the values of queryKey and queryFn. It takes that step away from it

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ["idea", ideaId],
    queryFn: () => fetchSingleIdea(ideaId),
  });

export const Route = createFileRoute("/ideas/$ideaId/")({
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },

  component: IdeaDetailsPage,
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const navigate = useNavigate();

  //get current user logged in
  const { user } = useAuth();

  const { mutateAsync: deleteIdeaAsync, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: "/ideas" });
    },
  });

  const handleDeleteClick = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this idea?"
    );
    if (confirmation) {
      await deleteIdeaAsync();
    }
  };

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-500 underline block mb-4">
        Back to Ideas
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>

      {user && user.id === idea.user && (
        <>
          <Link
            to="/ideas/$ideaId/edit"
            params={{ ideaId: ideaId }}
            className="bg-yellow-500 text-white px-3 py-2 rounded-lg inline-block me-4 hover:bg-yellow-700"
          >
            Edit
          </Link>

          <button
            disabled={isPending}
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-3 py-2 rounded-lg mt-4 hover:bg-red-700"
          >
            {isPending ? "Deleting..." : "delete idea"}
          </button>
        </>
      )}
    </div>
  );
}
