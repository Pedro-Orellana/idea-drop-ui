import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from "@tanstack/react-query";
import { useState } from "react";
import { fetchSingleIdea, updateIdea } from "@/api/ideas";

//query to get the idea information
const singleIdeaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["idea", id],
    queryFn: async () => fetchSingleIdea(id),
  });

export const Route = createFileRoute("/ideas/$ideaId/edit")({
  component: IdeaEditPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(singleIdeaQueryOptions(params.ideaId));
  },
});

function IdeaEditPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(singleIdeaQueryOptions(ideaId));

  const navigate = useNavigate();

  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tags, setTags] = useState(idea.tags.join(", "));

  //mutation to edit the idea
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () =>
      updateIdea(ideaId, {
        title,
        summary,
        description,
        tags: tags
          .trim()
          .split(", ")
          .map((t) => t.trim()),
      }),
    onSuccess: () => {
      navigate({ to: "/ideas/$ideaId", params: { ideaId } });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Edit your idea</h1>
        <Link
          to="/ideas/$ideaId"
          params={{ ideaId }}
          className="text-blue-500 underline"
        >
          Back to idea
        </Link>
      </div>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="text-gray-700 font-bold block">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="border rounded-lg px-2 py-2 w-full"
            placeholder="enter idea title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="summary" className="text-gray-700 font-bold block">
            Summary
          </label>
          <input
            id="summary"
            name="summary"
            type="text"
            className="border rounded-lg px-2 py-2 w-full"
            placeholder="enter idea summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-gray-700 font-bold block"
          >
            Description
          </label>
          <textarea
            rows={6}
            className="border rounded-lg px-2 py-2 w-full"
            placeholder="enter idea description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tags" className="text-gray-700 font-bold block">
            tags
          </label>
          <input
            type="text"
            className="border rounded-lg px-2 py-2 w-full"
            placeholder="enter tags, comma separated"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white w-full py-2 rounded-lg mt-8"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
