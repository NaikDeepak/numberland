# Numberland Adventures 🎮📚

A gamified daily math app for primary grade students (ages 5-10) that transforms math practice into engaging 5-minute daily quests.

## 🎯 Project Overview

**Numberland Adventures** helps children practice foundational math in a fun, rewarding, and low-pressure environment. It supports both individual student use and basic classroom management for teachers.

### Core Features
- **Daily Quests**: 5-minute math challenges with 5 problems per day
- **Gamification**: Coin rewards, streak tracking, and level progression
- **Student Dashboard**: Progress visualization and achievement tracking
- **Teacher Dashboard**: Class management and student progress monitoring
- **Adaptive Learning**: Problems adjust based on student performance

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **Testing**: Jest, React Testing Library, MSW (TDD approach)
- **Deployment**: Vercel
- **State Management**: React Context + useReducer

## 📋 Development Approach

This project follows **Test-Driven Development (TDD)** methodology:

1. **Write Failing Test**: Define expected behavior with comprehensive test
2. **Write Minimal Code**: Implement just enough to make test pass
3. **Refactor**: Clean up code while keeping tests green
4. **Repeat**: Move to next feature with same process

## 🏗️ Project Structure

```
numberland/
├── README.md                 # Project documentation
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Testing configuration
├── .github/workflows/      # CI/CD pipeline
├── memory-bank/            # Project documentation
│   ├── projectbrief.md     # Core mission and goals
│   ├── productContext.md   # User journeys and experience
│   ├── techContext.md      # Technology stack and architecture
│   ├── systemPatterns.md   # Design patterns and TDD approach
│   ├── activeContext.md    # Current work focus and next steps
│   └── progress.md         # Progress tracking and status
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Next.js pages
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── tests/             # Test files
└── public/                # Static assets
```

## 🎮 User Experience

### For Students (Ages 5-10)
- **Simple Login**: Name and class code entry
- **Daily Quests**: 5 problems per day with immediate feedback
- **Rewards System**: Coins, badges, and streak tracking
- **Progress Visualization**: Clear indicators of growth and achievement
- **Kid-Friendly UI**: Large touch targets, bright colors, simple navigation

### For Teachers
- **Class Management**: Create classes and invite students
- **Progress Monitoring**: View student accuracy and streaks
- **Analytics Dashboard**: Class performance insights
- **Simple Setup**: Minimal configuration required

## 📊 Development Timeline

### Week 1: Foundation & Core Features
- [x] Project planning and documentation
- [ ] Project setup with testing framework
- [ ] Student authentication with TDD
- [ ] Daily quest system implementation
- [ ] Basic reward and progress tracking

### Week 2: Teacher Experience & Polish
- [ ] Teacher dashboard with analytics
- [ ] Class management system
- [ ] Integration tests and E2E testing
- [ ] Performance optimization
- [ ] Production deployment

## 🧪 Testing Strategy

- **Unit Tests**: Component rendering, utility functions, data transformations
- **Integration Tests**: Authentication flow, database operations, API endpoints
- **E2E Tests**: Complete user flows, cross-browser compatibility
- **Test Coverage**: Target >90% for critical paths

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NaikDeepak/numberland.git
   cd numberland
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Firebase configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   npm run test:coverage
   ```

## 📈 Success Metrics

### Technical Metrics
- **Load Time**: <3 seconds on mobile
- **Test Coverage**: >90% for critical paths
- **Error Rate**: <5% user errors
- **Performance**: Lighthouse score >90

### User Experience Metrics
- **Engagement**: 5-minute average session time
- **Completion Rate**: 95% quest completion
- **Retention**: 80% daily return rate
- **Satisfaction**: Positive user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests first (TDD approach)
4. Implement the feature
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and Firebase
- Testing with Jest and React Testing Library
- Styled with Tailwind CSS
- Deployed on Vercel

---

**Ready to transform math learning into an adventure! 🎮📚** 