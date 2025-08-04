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

### Design System & Color Palette
```typescript
// Color constants for consistent theming
export const colors = {
  primary: '#4A90E2',    // Bright Blue - trust, friendly
  secondary: '#FFD93D',  // Sunny Yellow - fun, cheerful
  accent: '#6BCB77',     // Fresh Green - success, progress
  error: '#FF6B6B',      // Soft Red - playful, not scary
  background: '#F7F9FC', // Light Sky/Off-White
  text: '#2D3748',       // Dark gray for readability
  textLight: '#718096'   // Light gray for secondary text
};

// Typography scale for kid-friendly text
export const typography = {
  heading: 'text-3xl font-bold text-gray-800',
  subheading: 'text-xl font-semibold text-gray-700',
  body: 'text-lg text-gray-600',
  caption: 'text-sm text-gray-500'
};
```

### Kid-Friendly Component Patterns
```typescript
// Large, tappable button component
interface PlayfulButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const PlayfulButton: React.FC<PlayfulButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'lg',
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      rounded-2xl font-bold transition-all duration-200
      transform hover:scale-105 active:scale-95
      focus:outline-none focus:ring-4 focus:ring-opacity-50
      ${size === 'lg' ? 'px-8 py-4 text-xl' : 'px-6 py-3 text-lg'}
      ${variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
      ${variant === 'secondary' ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-500' : ''}
      ${variant === 'success' ? 'bg-green-500 text-white hover:bg-green-600' : ''}
      ${variant === 'error' ? 'bg-red-400 text-white hover:bg-red-500' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
);
```

### Card Component Patterns
```typescript
// Playful card component for math problems
interface ProblemCardProps {
  problem: MathProblem;
  onAnswer: (answer: number) => void;
  isAnswered: boolean;
  isCorrect?: boolean;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  onAnswer,
  isAnswered,
  isCorrect
}) => (
  <div className="
    bg-white rounded-3xl shadow-lg p-8
    border-4 border-blue-200
    transform transition-all duration-300
    hover:shadow-xl hover:scale-105
  ">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        {problem.question}
      </h2>
      
      {/* Illustrated objects for visual math */}
      <div className="flex justify-center items-center gap-4 mb-8">
        {renderMathObjects(problem)}
      </div>
      
      {/* Answer options */}
      <div className="grid grid-cols-2 gap-4">
        {problem.options?.map((option, index) => (
          <PlayfulButton
            key={index}
            onClick={() => onAnswer(option)}
            variant={isAnswered && option === problem.answer ? 'success' : 'secondary'}
            size="lg"
          >
            {option}
          </PlayfulButton>
        ))}
      </div>
    </div>
  </div>
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

// Confetti animation for rewards
const ConfettiAnimation: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 pointer-events-none z-50"
  >
    {/* Confetti particles */}
  </motion.div>
);

// Treasure chest animation for level-up
const TreasureChestAnimation: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <motion.div
    animate={{ 
      scale: isOpen ? [1, 1.2, 1] : 1,
      rotate: isOpen ? [0, 10, -10, 0] : 0
    }}
    transition={{ duration: 0.6 }}
    className="text-6xl"
  >
    🎁
  </motion.div>
);
```

### Progress Visualization Patterns
```typescript
// XP bar with stars
interface XPBarProps {
  currentXP: number;
  levelXP: number;
  level: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, levelXP, level }) => (
  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
    <motion.div
      className="bg-gradient-to-r from-blue-500 to-green-500 h-full"
      initial={{ width: 0 }}
      animate={{ width: `${(currentXP / levelXP) * 100}%` }}
      transition={{ duration: 1 }}
    />
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm font-semibold text-gray-600">
        Level {level}
      </span>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            ⭐
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Adventure map progress
interface AdventureMapProps {
  completedQuests: number;
  totalQuests: number;
}

const AdventureMap: React.FC<AdventureMapProps> = ({ completedQuests, totalQuests }) => (
  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-6">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Your Adventure Map</h3>
    <div className="flex justify-between items-center">
      {[...Array(totalQuests)].map((_, i) => (
        <motion.div
          key={i}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${i < completedQuests ? 'bg-green-500' : 'bg-gray-300'}
          `}
          animate={i < completedQuests ? { scale: [1, 1.2, 1] } : {}}
          transition={{ delay: i * 0.1 }}
        >
          {i < completedQuests ? '🏆' : '🗺️'}
        </motion.div>
      ))}
    </div>
  </div>
);
```

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