import { Link } from "@tanstack/react-router";
import clsx from "clsx";

import type { Idea } from "@/types";

type IdeaCardProps = {
  idea: Idea;
  showLink?: boolean;
};

const IdeaCard = ({ idea, showLink = false }: IdeaCardProps) => {
  const linkClasses = clsx({
    "text-blue-600 hover:underline mt-3": showLink,
    "text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition":
      !showLink,
  });

  return (
    <div className="border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold">{idea.title}</h2>
        <p className="text-gray-700 mt-2">{idea.summary}</p>
      </div>

      <Link
        to="/ideas/$ideaId"
        params={{ ideaId: idea.id }}
        className={linkClasses}
      >
        {showLink ? "show more" : "view idea"}
      </Link>
    </div>
  );
};

export default IdeaCard;
