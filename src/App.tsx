import React, { useState } from "react";
import "./style.css";

/*
This is the takehome version of the challenge Signup Form.

In this version, you are to design and build a reusable and extensible
Form component, and apply it to the use case of a Signup Form.

Signup Form:

Build a user Signup form in React with the following features.

1. An email and a password input
2. Email must have an “@” and the domain side must include a “.”
3. Password must include
    1.  at least one special character
    2. one number and be at least 8 characters
4. Submission request handling  
   1. Utilize the mock API function to handle submissions
5. Basic aesthetics with pure CSS
------------------------------------

*/

// Reusable form wrapper that centralizes layout.
// Accepts arbitrary children and delegates submit handling to parent.
function Form({ children, onSubmit, disabled }: { children: React.ReactNode; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; disabled?: boolean }) {
  return (
    <form onSubmit={onSubmit} noValidate className="d-flex flex-col gap-2 max-w-720 mx-auto" aria-busy={disabled}>
      {children}
    </form>
  );
}

// Mock API (provided)
// fix for take-home checker
interface ApiResponse { status: "OK"|"ERROR" }
function API(data: FormState) {
  return new Promise((res) => {
    const isRepeated = data.email === "repeated@gmail.com";
    setTimeout(() => res({
      status: isRepeated ? "ERROR" : "OK",
    }), 1000);
  }) as Promise<ApiResponse>;  // ← Cast al final
}
/* Shape of the signup form values. */
type FormState = { email: string; password: string };
/* Per-field and form-level error messages. */
type Errors = { email?: string; password?: string[]; form?: string };

export default function App() {
  const [form, setForm] = useState<FormState>({ email: "repeated@gmail.com", password: "1234qwe@2S" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  }

  /**
   * Validates signup form values.
   * - Email must have '@' and a domain with '.'
   * - Password: minimum 8 characters, at least one number and one special character.
   * Returns an object with error messages per field.
   */

  function validate(values: FormState): Errors {
    const result: Errors = {};

    // Normalize email for extra validations
    const email = values.email.trim().toLowerCase();

    // Email rules
    if (!email.includes("@")) {
      result.email = 'Email must include an "@" character';
    } else {
      const domain = email.split("@")[1] ?? "";
      if (!domain.includes(".")) {
        result.email = 'Email domain must include a "."';
      }
    }

    // Password rules
    const pwd = values.password || "";
    const passwordIssues: string[] = [];

    if (pwd.length < 8) {
      passwordIssues.push("Password must be at least 8 characters");
    }
    // For this simple case i will use regex101 because i've used it before:
    // ref here: https://regex101.com/r/YloHgy/1
    // search values between 0-9
    if (!/[0-9]/.test(pwd)) {
      passwordIssues.push("Include at least one number.");
    }

    // ref here: https://regex101.com/r/AxdTJq/1
    // search values with ^ operator, mean detect everything that are NOT between letters and numbers.
    if (!/[^A-Za-z0-9]/.test(pwd)) {
      passwordIssues.push("Include at least one special character.");
    }

    if (passwordIssues.length > 0) {
      result.password = passwordIssues;
    }

    return result;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    try {
      const normalizedForm = { email: form.email.trim().toLowerCase(), password: form.password };
      const res = await API(normalizedForm);
      if (res.status === "ERROR") {
        setErrors({ form: "Email already in use" });
      } else {
        setMessage("Signup successful ✅");
        setForm({ email: "", password: "" });
      }
    } catch (err) {
      console.error("Signup failed", err); // adding extra console error track
      setErrors({ form: "Unexpected error. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-720 rounded-2xl bg-secondary p-6 m-2 shadow-md">
      <h1 className="text-center text-2xl font-semibold">Signup Form</h1>

      <Form onSubmit={onSubmit} disabled={loading}>
        <label htmlFor="email" className="font-semibold mt-2">Email</label>
        <input
          className="input"
          id="email"
          name="email"
          type="text"
          value={form.email}
          onChange={onChangeHandler}
          required
          disabled={loading}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <div id="email-error" className="text-danger" role="alert">
            {errors.email}
          </div>
        )}

        <label htmlFor="password" className="font-semibold mt-2">Password</label>
        <input
          className="input"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChangeHandler}
          required
          disabled={loading}
          autoComplete="new-password"
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        <small className="text-muted">
          At least 8 characters, one number and one special character.
        </small>
        {/* Footer inputs results */}
        {errors.password && (
          <ul id="password-error" className="text-danger" role="alert">
            {errors.password.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        )}

        <button type="submit" disabled={loading}
          className="btn p-3 w-full mt-3 bg-primary hover-bg-primary text-white active-scale rounded-md"
        >
          {loading ? "Submitting…" : "Signup"}
        </button>

        {/* Footer form result, email repeated or success */}
        {errors.form && <div className="text-danger" role="alert">{errors.form}</div>}
        {message && <div className="text-success" role="status">{message}</div>}
      </Form>
    </div>
  );
}