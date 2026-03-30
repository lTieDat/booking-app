import { Link, useNavigate } from '@tanstack/react-router';
import { ErrorState } from '../shared/ui/error-state';
import { Button } from '../shared/ui/button';

export function RouterErrorBoundary(props: { error: unknown; reset: () => void }) {
  const message =
    props.error instanceof Error ? props.error.message : 'Something went wrong while loading this route.';

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <ErrorState
        title="This screen could not be loaded"
        description={message}
        actionLabel="Try again"
        onAction={props.reset}
      />
    </div>
  );
}

export function RouterNotFound() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <ErrorState
        title="Page not found"
        description="The route you requested does not exist in the new application structure."
      />
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={() => navigate({ to: '/' })}>Go home</Button>
        <Link to="/login">
          <Button variant="secondary">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
