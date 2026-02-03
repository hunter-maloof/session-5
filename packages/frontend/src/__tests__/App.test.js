import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock todos data
const mockTodos = [
  { id: 1, title: 'Test Todo 1', completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Test Todo 2', completed: true, createdAt: new Date().toISOString() },
  { id: 3, title: 'Test Todo 3', completed: false, createdAt: new Date().toISOString() },
];

// Mock fetch for tests
global.fetch = jest.fn();

beforeEach(() => {
  // Default mock: return todos
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockTodos),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

describe('Delete Functionality', () => {
  test('should call DELETE API when delete button is clicked', async () => {
    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    // Find and click the delete button for the first todo
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // Verify DELETE request was made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/1'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });
});

describe('Stats Calculation', () => {
  test('should display correct count of incomplete todos', async () => {
    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    // Should show 2 incomplete items (id 1 and 3)
    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });

  test('should display correct count of completed todos', async () => {
    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    // Should show 1 completed item (id 2)
    expect(screen.getByText('1 completed')).toBeInTheDocument();
  });
});

describe('Empty State', () => {
  test('should display empty state message when no todos', async () => {
    // Mock empty todos array
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Should show empty state message
    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });
  });
});

describe('Error Handling', () => {
  test('should display error message when fetch fails', async () => {
    // Mock fetch failure
    global.fetch.mockRejectedValue(new Error('Failed to fetch'));

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('should display error message when API returns error status', async () => {
    // Mock API error response
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    const testQueryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
