import Card from "@/components/card";

export default async function ProjectList() {
  const response = await fetch(
    "https://api.github.com/users/alihanayd/repos"
    // { cache: 'no-store' }
  );
  const repos = await response.json();

  interface Repo {
    id: number;
    name: string;
    stargazers_count: number;
    description: string;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo: Repo) => (
        <li key={repo.id} className="mb-4">
          <Card className="font-mono h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold">{repo.name}</div>
              <div>🌟{repo.stargazers_count}</div>
            </div>

            <div>{repo.description}</div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
