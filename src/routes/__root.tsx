import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";

//components
import Header from "@/components/Header";

type RouterContext = {
  queryClient: QueryClient;
};

//not found page
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Ooops! The page you are looking for does not exist
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

const RootComponent = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HeadContent />
      <Header />
      <main className="flex justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <Outlet />
        </div>
      </main>

      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: "decription",
        content:
          "Share, explore and build on the best startup ideas and side hustles",
      },
      {
        title: "IdeaDrop - your idea hub",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});
