import { useState } from "react";

export default function Form() {
  const [Users, SetUsers] = useState({
    Email: "",
    Password: "",
  });
  const [Errors, SetErrors] = useState({
    EmailErrors: null,
    PasswordErrors: null,
  });

  const handleChange = (e) => {
    console.log({ ...Users });
    SetUsers({
      ...Users,
      [e.target.name]: e.target.value,
    });
    const emailregular = /^[a-zA-Z]{4,}(@)[a-zA-Z0-9]{3,}(?!\s)(.com)$/;
    const passwordregular = /^[a-z0-9]{1,}[A-Z]{1}[@%*#$]{1}$/;

    if (e.target.name == "Email") {
      SetErrors({
        ...Errors,
        EmailErrors:
          e.target.value.length == 0
            ? "This field is required"
            : !emailregular.test(e.target.value)
            ? "Enter valid email"
            : null,
      });
    }
    if (e.target.name == "Password") {
      SetErrors({
        ...Errors,
        PasswordErrors:
          e.target.value.length == 0
            ? "This field is required"
            : !passwordregular.test(e.target.value)
            ? "Enter valid password"
            : e.target.value.length > 10
            ? "You enter more characters"
            : null,
      });
    }
  };
  return (
    <>
      <div className="mt-5">
        <h1>Login</h1>
        <div className="form-floating mb-3">
          <input
            type="input"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={Users.Email}
            name="Email"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label for="floatingInput">Email</label>
          <small className="text-danger">{Errors.EmailErrors}</small>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={Users.Password}
            name="Password"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label for="floatingPassword">Password</label>
          <small className="text-danger">{Errors.PasswordErrors}</small>
        </div>
        <div className="col-12 mt-3">
          <button className="btn btn-success" type="submit">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
