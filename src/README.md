Technical decisions:
- Avoided adding extra libraries (e.g., React Hook Form) to respect CodeSandbox's pre-installed dependencies.
- Kept inputs as inline components instead of extracting to a FormInput component to prevent over-engineering for this challenge scope.

1) Email input type
I use type="text" for email, as suggested by the interviewer instead of relying on the browser's built–in email validation, 


2) Controlled vs uncontrolled form
Options:
- Controlled
- Uncontrolled

I chose a controlled form so the behaviour does not depend on browser-specific form handling. All values and validation live in React state, which makes the form predictable and easier to adapt if browser behaviour changes.


3) Validation strategy
Options:
- Validate on each input change (onChange) or on blur (onBlur)
- Validate all fields together on submit

I chose to validate on submit because:
- This is a short form with only two fields, so showing all errors at once is not overwhelming
- Only after all client-side validations pass, I call the mock API to check errors

3) Validations:
Options:
- On input change (onBlur)
- On submit, validate all together
I chose onSubmite validation as this is a short form  

4) Error state management
Options:
- Store errors together with each field value: { email: { value: "...", error: "..." } }
- Keep a separate errors object: { email: "...", password: [...] }

I chose a separate errors object because:
- This is a small form, so keeping errors separate from values keeps the code simpler
- It makes it easier to clear errors independently