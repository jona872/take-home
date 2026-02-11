# React Signup Form - Take Home Challenge

## Technical Decisions

### Dependencies
- No external libraries added (React Hook Form, Zod, etc.) to respect CodeSandbox's pre-installed dependencies
- Inline input components instead of FormInput abstraction to avoid over-engineering for challenge scope

## Key Implementation Choices

### 1. Email Input Type
I use type="text" for email, as suggested by the interviewer instead of relying on the browser's built–in email validation, 

Why? Avoids browser-specific email validation inconsistencies

### 2. Controlled vs Uncontrolled Form
#### Options:
- Controlled
- Uncontrolled

I chose a controlled form so the behaviour does not depend on browser-specific form handling. All values and validation live in React state, which makes the form predictable and easier to adapt if browser behaviour changes.

### 3. Validation Strategy
#### Options:
- Validate on each input change (onChange) or on blur (onBlur)
- Validate all fields together on submit

I chose to validate on submit because:
- This is a short form with only two fields, so showing all errors at once is not overwhelming
- Only after all client-side validations pass, I call the mock API to check errors

### 4. Error State Management
#### Options:
- Store errors together with each field value: { email: { value: "...", error: "..." } }
- Keep a separate errors object: { email: "...", password: [...] }

I chose a separate errors object because:
- This is a small form, so keeping errors separate from values keeps the code simpler
- It makes it easier to clear errors independently


## Features Implemented
- Email validation: "@" + "."
- Password validation: 8+ chars, 1 number, 1 special char
- Mock API integration with loading states
- Accessible error messages (ARIA)
- Pure CSS styling (no Tailwind/CSS-in-JS)
- Form reset on successful submission

## Setup
npm create vite at latest - TypeScript + SWC (fastest)
## Run
```
npm install
npm run dev
```
