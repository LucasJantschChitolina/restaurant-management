import { useQuery } from '@tanstack/react-query';

async function fetchFacebookRepos() {
  const response = await fetch('https://api.github.com/orgs/facebook/repos');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function FacebookRepos() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['facebookRepos'],
    queryFn: fetchFacebookRepos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Facebook Organization Repositories</h1>
      <ul>
        {data.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacebookRepos;