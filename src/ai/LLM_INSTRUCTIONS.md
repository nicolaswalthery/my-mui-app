# React Development Guidelines & Best Practices

This document outlines the coding standards, patterns, and best practices for React development in this project. AI assistants should reference this guide when generating code to ensure consistency and quality.

## Table of Contents

1. [Project Structure](#project-structure)
2. [TypeScript Standards](#typescript-standards)
3. [Component Guidelines](#component-guidelines)
4. [State Management](#state-management)
5. [Routing](#routing)
6. [Material-UI (MUI) Usage](#material-ui-mui-usage)
7. [Performance Optimization](#performance-optimization)
8. [Error Handling](#error-handling)
9. [Testing Guidelines](#testing-guidelines)
10. [Security Best Practices](#security-best-practices)
11. [Code Style](#code-style)
12. [Documentation](#documentation)

## Project Structure

### Directory Organization
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components (Button, Modal, etc.)
│   └── specific/       # Business-specific components
├── pages/              # Page components (route endpoints)
├── helpers/            # Utility functions and helpers
├── hooks/              # Custom React hooks
├── models/             # TypeScript interfaces and types
├── enums/              # TypeScript enums
├── config/             # Configuration files (routes, theme)
├── theme/              # Theme-related components and providers
├── services/           # API services and external integrations
├── assets/             # Static assets (images, fonts)
└── __tests__/          # Test files
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: PascalCase (e.g., `Dashboard.tsx`)
- **Utilities/Helpers**: camelCase (e.g., `userStorageManager.ts`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **Types/Interfaces**: PascalCase (e.g., `UserModel.ts`)
- **Enums**: PascalCase with 'Enum' suffix (e.g., `UserRoleEnum.ts`)
- **Constants**: UPPER_SNAKE_CASE in separate files

## TypeScript Standards

### Type Definitions
```typescript
// ✅ Good: Use interfaces for objects
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
}

// ✅ Good: Use type for unions and primitives
type ThemeMode = 'light' | 'dark';
type UserId = string | number;

// ❌ Bad: Avoid using 'any'
const data: any = fetchData(); // Use proper types or 'unknown'

// ✅ Good: Use generics for reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
```

### Component Props
```typescript
// ✅ Good: Define props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// ✅ Good: Use React.FC with explicit props
const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', disabled = false }) => {
  // Component implementation
};

// ✅ Good: Export prop types for reuse
export type { ButtonProps };
```

### Enums Usage
```typescript
// ✅ Good: Use const assertion for enums
export const UserRoleEnum = {
  Admin: 'admin',
  User: 'user',
  Guest: 'guest'
} as const;

export type UserRoleEnum = typeof UserRoleEnum[keyof typeof UserRoleEnum];
```

## Component Guidelines

### Functional Components
```typescript
// ✅ Good: Use functional components with hooks
import React, { useState, useEffect } from 'react';

interface UserListProps {
  department: string;
}

const UserList: React.FC<UserListProps> = ({ department }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers(department).then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, [department]);

  if (loading) return <Loading />;
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
```

### Component Organization
```typescript
// ✅ Good: Organize component structure
const Component: React.FC<Props> = (props) => {
  // 1. Hooks
  const [state, setState] = useState();
  const navigate = useNavigate();
  
  // 2. Derived state / memoized values
  const derivedValue = useMemo(() => computeValue(state), [state]);
  
  // 3. Effects
  useEffect(() => {
    // Side effects
  }, [dependency]);
  
  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 5. Render helpers (if needed)
  const renderItem = (item: Item) => <div>{item.name}</div>;
  
  // 6. Main render
  return <div>...</div>;
};
```

### Prop Destructuring
```typescript
// ✅ Good: Destructure props with defaults
const Card: React.FC<CardProps> = ({ 
  title, 
  description = 'No description', 
  actions = [] 
}) => {
  // Component logic
};

// ❌ Bad: Using props object directly
const Card: React.FC<CardProps> = (props) => {
  return <div>{props.title}</div>; // Harder to see dependencies
};
```

## State Management

### Local State
```typescript
// ✅ Good: Use appropriate state structure
const [user, setUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// ✅ Good: Update state immutably
setUser(prevUser => ({
  ...prevUser,
  name: newName
}));

// ❌ Bad: Mutating state directly
user.name = newName; // Never mutate state
setUser(user);
```

### Custom Hooks
```typescript
// ✅ Good: Extract complex logic into custom hooks
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}

// Usage
const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { user, loading, error } = useUser(userId);
  // Render logic
};
```

### Context Usage
```typescript
// ✅ Good: Type-safe context with custom hook
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## Routing

### Route Configuration
```typescript
// ✅ Good: Centralized route configuration
export const routeConfig: RouteConfig[] = [
  {
    path: AppRouteEnum.Dashboard,
    displayName: 'Dashboard',
    icon: DashboardIcon,
    component: DashboardPage,
    requiresAuth: true,
    roles: [UserRoleEnum.Admin, UserRoleEnum.User]
  }
];

// ✅ Good: Type-safe navigation
const navigate = useNavigate();
navigate(AppRouteEnum.Dashboard); // Use enum values
```

### Protected Routes
```typescript
// ✅ Good: Reusable protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to={AppRouteEnum.Auth} state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};
```

## Material-UI (MUI) Usage

### Theme Customization
```typescript
// ✅ Good: Consistent theme usage
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1)
  }
}));

// ✅ Good: Use sx prop for one-off styles
<Box sx={{ 
  display: 'flex', 
  gap: 2, 
  p: 3,
  bgcolor: 'background.default' 
}}>
```

### Component Props
```typescript
// ✅ Good: Extend MUI component props
interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  loading, 
  disabled, 
  children, 
  ...restProps 
}) => {
  return (
    <Button disabled={loading || disabled} {...restProps}>
      {loading ? <CircularProgress size={20} /> : children}
    </Button>
  );
};
```

## Performance Optimization

### Memoization
```typescript
// ✅ Good: Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ✅ Good: Memoize callbacks passed to children
const handleClick = useCallback((id: string) => {
  // Handle click
}, [dependency]);

// ✅ Good: Memoize components when appropriate
const MemoizedComponent = React.memo(ExpensiveComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
});
```

### Lazy Loading
```typescript
// ✅ Good: Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));

// ✅ Good: Use Suspense with fallback
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

### List Optimization
```typescript
// ✅ Good: Use keys properly
{items.map(item => (
  <ListItem key={item.id} item={item} /> // Stable, unique keys
))}

// ❌ Bad: Using index as key for dynamic lists
{items.map((item, index) => (
  <ListItem key={index} item={item} /> // Can cause issues
))}
```

## Error Handling

### Error Boundaries
```typescript
// ✅ Good: Implement error boundaries
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Async Error Handling
```typescript
// ✅ Good: Handle async errors properly
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await api.getData();
    setData(data);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error');
    console.error('Failed to fetch data:', error);
  } finally {
    setLoading(false);
  }
};
```

## Testing Guidelines

### Component Testing
```typescript
// ✅ Good: Test component behavior, not implementation
describe('UserCard', () => {
  it('should display user information', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
    render(<UserCard user={user} />);
    
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', async () => {
    const handleEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={handleEdit} />);
    
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(handleEdit).toHaveBeenCalledWith(mockUser.id);
  });
});
```

### Hook Testing
```typescript
// ✅ Good: Test custom hooks
describe('useUser', () => {
  it('should fetch user data', async () => {
    const { result } = renderHook(() => useUser('123'));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.user).toEqual(expectedUser);
    });
  });
});
```

## Security Best Practices

### Input Validation
```typescript
// ✅ Good: Validate and sanitize user input
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ✅ Good: Escape HTML content
const SafeContent: React.FC<{ html: string }> = ({ html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};
```

### Authentication
```typescript
// ✅ Good: Store sensitive data securely
// Never store sensitive data in localStorage
// Use httpOnly cookies or secure session storage

// ✅ Good: Implement proper authentication checks
const ProtectedComponent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!hasPermission(user, 'admin')) {
    return <AccessDenied />;
  }
  
  return <AdminPanel />;
};
```

## Code Style

### Import Organization
```typescript
// ✅ Good: Organize imports logically
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 3. Local imports - absolute paths
import { UserModel } from '@/models/UserModel';
import { useAuth } from '@/hooks/useAuth';

// 4. Local imports - relative paths
import CustomButton from './CustomButton';
import './styles.css';
```

### Naming Conventions
```typescript
// ✅ Good: Descriptive and consistent naming
const isUserLoggedIn = true; // Boolean with 'is', 'has', 'should'
const handleSubmit = () => {}; // Event handlers with 'handle'
const getUserById = () => {}; // Functions describe action

// ❌ Bad: Unclear or inconsistent naming
const flag = true; // What does this represent?
const submit = () => {}; // Is this a handler or action?
const data = {}; // Too generic
```

### Comments and Documentation
```typescript
// ✅ Good: Document complex logic
/**
 * Calculates the user's permission level based on their role and department.
 * @param user - The user object containing role and department info
 * @returns Permission level from 0-10
 */
function calculatePermissionLevel(user: User): number {
  // Complex logic with explanation
  // Admin users always get level 10
  if (user.role === UserRoleEnum.Admin) return 10;
  
  // Department heads get level 7
  if (user.isDepartmentHead) return 7;
  
  // Regular users get level based on tenure
  return Math.min(user.yearsOfService * 2, 5);
}
```

## Documentation

### Component Documentation
```typescript
/**
 * UserCard displays user information in a card format.
 * 
 * @example
 * <UserCard 
 *   user={currentUser}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 *   showActions={isAdmin}
 * />
 */
interface UserCardProps {
  /** User object to display */
  user: User;
  /** Callback when edit button is clicked */
  onEdit?: (userId: string) => void;
  /** Callback when delete button is clicked */
  onDelete?: (userId: string) => void;
  /** Whether to show action buttons */
  showActions?: boolean;
}
```

### README Structure
```markdown
# Component Name

Brief description of the component's purpose.

## Usage

\```tsx
import { ComponentName } from '@/components/ComponentName';

<ComponentName prop1="value" prop2={42} />
\```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Description of prop1 |
| prop2 | number | 0 | Description of prop2 |

## Examples

### Basic Usage
\```tsx
<ComponentName prop1="example" />
\```

### Advanced Usage
\```tsx
<ComponentName 
  prop1="example"
  prop2={100}
  onAction={handleAction}
/>
\```
```

## Additional Guidelines

### Form Handling
```typescript
// ✅ Good: Use controlled components with proper types
interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and submit
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
      />
    </form>
  );
};
```

### API Integration
```typescript
// ✅ Good: Create reusable API services
class UserService {
  private baseUrl = '/api/users';
  
  async getUsers(): Promise<User[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  }
  
  async createUser(user: CreateUserDto): Promise<User> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  }
}

export const userService = new UserService();
```

### Accessibility
```typescript
// ✅ Good: Include proper ARIA labels and semantic HTML
<Button
  aria-label="Delete user John Doe"
  onClick={() => handleDelete(user.id)}
>
  <DeleteIcon />
</Button>

// ✅ Good: Keyboard navigation support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Clickable element
</div>
```

## Conclusion

Following these guidelines ensures:
- **Consistency**: Uniform code style across the project
- **Maintainability**: Easy to understand and modify code
- **Performance**: Optimized React applications
- **Type Safety**: Fewer runtime errors with TypeScript
- **Best Practices**: Modern React patterns and practices

When generating code, always prioritize:
1. Type safety
2. Component reusability
3. Clear naming
4. Proper error handling
5. Performance considerations
6. Accessibility

Remember: Code is written once but read many times. Write for the next developer (which might be you in 6 months)!