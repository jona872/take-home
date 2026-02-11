# React Signup Form - Take Home Challenge

## Technical Decisions

### Dependencies
- No external libraries added (React Hook Form, Zod, etc.) to respect CodeSandbox's pre-installed dependencies
- Inline input components instead of FormInput abstraction to avoid over-engineering for challenge scope

## Key Implementation Choices

### 1. Email Input Type
type="text" (as suggested by interviewer)

Why? Avoids browser-specific email validation inconsistencies

### 2. Controlled vs Uncontrolled Form
Option        | Pros                    | Cons                | Chosen
--------------|-------------------------|---------------------|--------
Controlled    | Predictable state       | More boilerplate    | X
Uncontrolled  | Less code               | Browser-dependent   | 

Rationale: React state centralizes validation and form logic

### 3. Validation Strategy
Timing       | Pros                       | Cons                   | Chosen
-------------|----------------------------|------------------------|--------
On Submit    | All errors visible at once | Single validation pass | X
OnChange/Blur| Real-time feedback         | Noisy UX for short form| 

Benefits for 2-field form:
- Non-overwhelming error display
- Client validation - API call only when valid

### 4. Error State Management
Approach              | Pros                       | Cons              | Chosen
----------------------|----------------------------|-------------------|--------
Separate errors object| Simple, independent clearing| Extra state      | X
Field-coupled         | Single source of truth     | Complex state    | 

## Features Implemented
- Email validation: @ + domain .
- Password validation: 8+ chars, 1 number, 1 special char
- Mock API integration with loading states
- Accessible error messages (ARIA)
- Pure CSS styling (no Tailwind/CSS-in-JS)
- Form reset on successful submission

## Setup
npm create vite at latest - TypeScript + SWC (fastest)
