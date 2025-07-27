# System Patterns - Numberland Adventures

## Architecture Patterns

### Frontend Architecture
**Pattern**: Component-Based Architecture with Feature Organization
- **Structure**: Feature-based folder organization
- **State Management**: React Context + useReducer for global state
- **Local State**: useState for component-specific state
- **Data Flow**: Unidirectional data flow with props and context
- **Testing**: **TDD approach with comprehensive test coverage**

### Backend Architecture
**Pattern**: Serverless with Firebase
- **Database**: Firestore (NoSQL document database)
- **Authentication**: Firebase Auth
- **Hosting**: Static hosting with serverless functions
- **Real-time**: Firestore real-time listeners
- **Testing**: **MSW for API mocking and integration tests**

## Design Patterns

### State Management Pattern
```typescript
// Global App State
interface AppState {
  user: Student | Teacher | null;
  currentQuest: Quest | null;
  isLoading: boolean;
  error: string | null;
}

// Action Types
type AppAction = 
  | { type: 'SET_USER'; payload: Student | Teacher }
  | { type: 'SET_QUEST'; payload: Quest }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };
```

### Component Composition Pattern
```typescript
// Base components for reusability
interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Specialized components
interface ProblemCardProps extends BaseCardProps {
  problem: MathProblem;
  onAnswer: (answer: number) => void;
  isAnswered: boolean;
}
```

### Data Fetching Pattern
```typescript
// Custom hooks for data fetching
const useStudentProgress = (studentId: string) => {
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'students', studentId),
      (doc) => {
        setProgress(doc.data() as StudentProgress);
        setLoading(false);
      }
    );
    
    return unsubscribe;
  }, [studentId]);
  
  return { progress, loading };
};
```

## TDD Patterns

### Test-First Development Pattern
```typescript
// 1. Write failing test first
describe('StudentLogin', () => {
  it('should validate student name input', () => {
    render(<StudentLogin />);
    const nameInput = screen.getByLabelText(/name/i);
    
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(screen.getByText(/start/i));
    
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });
});

// 2. Implement minimal code to pass test
const StudentLogin = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    // Continue with login logic
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && <span>{error}</span>}
      <button type="submit">Start</button>
    </form>
  );
};
```

### Component Testing Pattern
```typescript
// Test component with providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      <AppStateProvider>
        {component}
      </AppStateProvider>
    </AuthProvider>
  );
};

// Test utilities
const mockFirebase = () => {
  const mockDoc = jest.fn();
  const mockCollection = jest.fn();
  
  return {
    doc: mockDoc,
    collection: mockCollection,
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn()
  };
};

// MSW for API mocking
const handlers = [
  rest.post('/api/auth/student', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'student-123',
        name: 'Alice',
        classCode: 'ABC123'
      })
    );
  })
];
```

### Integration Testing Pattern
```typescript
// Test complete user flows
describe('Student Quest Flow', () => {
  it('should complete a daily quest', async () => {
    const { getByText, getByTestId } = renderWithProviders(<StudentApp />);
    
    // Login
    fireEvent.change(getByTestId('name-input'), { target: { value: 'Alice' } });
    fireEvent.click(getByText('Start Quest'));
    
    // Solve problems
    for (let i = 0; i < 5; i++) {
      const answer = getByTestId(`answer-${i}`);
      fireEvent.change(answer, { target: { value: '5' } });
      fireEvent.click(getByText('Submit'));
    }
    
    // Verify completion
    expect(getByText('Quest Complete!')).toBeInTheDocument();
  });
});
```

## UI/UX Patterns

### Mobile-First Design
- **Breakpoints**: Mobile (320px) → Tablet (768px) → Desktop (1024px)
- **Touch Targets**: Minimum 44px for interactive elements
- **Gestures**: Swipe, tap, and pinch interactions
- **Responsive**: Fluid layouts with flexible grids

### Accessibility Patterns
```typescript
// Accessible button component
interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  disabled?: boolean;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  disabled = false
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </button>
);
```

### Animation Patterns
```typescript
// Framer Motion for smooth animations
const FadeInUp: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);
```

## Data Flow Patterns

### Student Journey Flow
```
Login → Dashboard → Start Quest → Solve Problems → Get Rewards → Update Progress
```

### Teacher Journey Flow
```
Login → Dashboard → View Classes → Select Class → View Students → Monitor Progress
```

### Data Synchronization Pattern
```typescript
// Real-time data sync with optimistic updates
const useOptimisticUpdate = <T>(
  collection: string,
  documentId: string
) => {
  const [data, setData] = useState<T | null>(null);
  
  const updateOptimistically = async (updates: Partial<T>) => {
    // Optimistic update
    setData(prev => ({ ...prev, ...updates }));
    
    try {
      // Server update
      await updateDoc(doc(db, collection, documentId), updates);
    } catch (error) {
      // Revert on error
      setData(prev => ({ ...prev, ...updates }));
      throw error;
    }
  };
  
  return { data, updateOptimistically };
};
```

## Error Handling Patterns

### Global Error Boundary
```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false })} />;
    }
    
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
// Consistent error handling across API calls
const handleApiError = (error: any, context: string) => {
  console.error(`${context} error:`, error);
  
  if (error.code === 'permission-denied') {
    return 'You don\'t have permission to perform this action.';
  }
  
  if (error.code === 'unavailable') {
    return 'Service temporarily unavailable. Please try again.';
  }
  
  return 'Something went wrong. Please try again.';
};
```

## Performance Patterns

### Code Splitting
```typescript
// Lazy load components
const TeacherDashboard = lazy(() => import('./TeacherDashboard'));
const StudentDashboard = lazy(() => import('./StudentDashboard'));

// Route-based splitting
const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/teacher/*" element={<TeacherDashboard />} />
      <Route path="/student/*" element={<StudentDashboard />} />
    </Routes>
  </Suspense>
);
```

### Memoization Pattern
```typescript
// Memoize expensive calculations
const useMemoizedProblems = (grade: number, difficulty: string) => {
  return useMemo(() => {
    return generateProblems(grade, difficulty);
  }, [grade, difficulty]);
};

// Memoize components
const ProblemCard = memo<ProblemCardProps>(({ problem, onAnswer }) => {
  // Component logic
});
```

## Security Patterns

### Authentication Pattern
```typescript
// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};
```

### Data Validation Pattern
```typescript
// Input validation with Zod
const studentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  classCode: z.string().length(6, 'Class code must be 6 characters'),
  grade: z.number().min(1).max(6, 'Grade must be between 1 and 6')
});

const validateStudent = (data: unknown) => {
  return studentSchema.safeParse(data);
};
```

## Testing Patterns

### Unit Testing Pattern
```typescript
// Test utility functions
describe('mathUtils', () => {
  it('should generate addition problems correctly', () => {
    const problem = generateAdditionProblem(1, 10);
    
    expect(problem.type).toBe('addition');
    expect(problem.answer).toBeGreaterThanOrEqual(1);
    expect(problem.answer).toBeLessThanOrEqual(20);
  });
});

// Test custom hooks
const renderHook = (hook: () => any) => {
  const result = { current: null };
  const TestComponent = () => {
    result.current = hook();
    return null;
  };
  render(<TestComponent />);
  return result;
};
```

### Integration Testing Pattern
```typescript
// Test Firebase integration
describe('Firebase Integration', () => {
  it('should save student progress', async () => {
    const mockSetDoc = jest.fn();
    jest.spyOn(firebase, 'setDoc').mockImplementation(mockSetDoc);
    
    await saveStudentProgress('student-123', { coins: 10, streak: 3 });
    
    expect(mockSetDoc).toHaveBeenCalledWith(
      expect.anything(),
      { coins: 10, streak: 3 }
    );
  });
});
```

### E2E Testing Pattern
```typescript
// Test complete user journey
describe('Complete Student Journey', () => {
  it('should allow student to complete daily quest', async () => {
    // Setup
    const { getByText, getByTestId } = renderWithProviders(<StudentApp />);
    
    // Login
    fireEvent.change(getByTestId('name-input'), { target: { value: 'Alice' } });
    fireEvent.change(getByTestId('class-code-input'), { target: { value: 'ABC123' } });
    fireEvent.click(getByText('Start Adventure'));
    
    // Complete quest
    for (let i = 0; i < 5; i++) {
      const problem = getByTestId(`problem-${i}`);
      const answer = getByTestId(`answer-${i}`);
      fireEvent.change(answer, { target: { value: '5' } });
      fireEvent.click(getByText('Submit'));
    }
    
    // Verify rewards
    expect(getByText('Quest Complete!')).toBeInTheDocument();
    expect(getByText('+10 coins')).toBeInTheDocument();
  });
});
```

### Test Data Patterns
```typescript
// Test data factories
const createMockStudent = (overrides = {}): Student => ({
  id: 'student-123',
  name: 'Alice',
  classCode: 'ABC123',
  grade: 2,
  coins: 50,
  streak: 3,
  totalXP: 150,
  level: 2,
  lastLogin: new Date(),
  completedQuests: [],
  ...overrides
});

const createMockProblem = (overrides = {}): MathProblem => ({
  id: 'problem-1',
  type: 'addition',
  question: 'What is 5 + 3?',
  answer: 8,
  options: [6, 7, 8, 9],
  difficulty: 1,
  ...overrides
});
``` 