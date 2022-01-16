import { useState ,useContext} from "react";
import { languageContext } from "./../../contexts/languageContext";

export default function Form() {
  const [Users, SetUsers] = useState({
    Name: "",
    Email: "",
    UserName: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [Errors, SetErrors] = useState({
    NameErrors: null,
    EmailErrors: null,
    UserNameErrors: null,
    PasswordErrors: null,
    ConfirmPasswordErrors: null,
  });
const { lang, setLang } = useContext(languageContext);
    const toggleLanguage = () => {
      setLang(lang == "en" ? "ar" : "en");
    };
  const handleChange = (e) => {
    console.log({ ...Users });
    SetUsers({
      ...Users,
      [e.target.name]: e.target.value,
    });
    const nameregular = /^[a-zA-Z]{4,10}$/;
    const usernameregular = /^[a-zA-Z]{4,10}(?!\s)$/;
    const emailregular = /^[a-zA-Z]{4,}(@)[a-zA-Z0-9]{3,}(?!\s)(.com)$/;
    const passwordregular = /^[a-z0-9]{1,}[A-Z]{1}[@%*#$]{1}$/;
    

    if (e.target.name == "UserName") {
      SetErrors({
        ...Errors,
        UserNameErrors:
          e.target.value.length == 0
            ? "This field is required"
            : !usernameregular.test(e.target.value)
            ? "Enter valid user name"
            : null,
      });
    }
    if (e.target.name == "Name") {
      SetErrors({
        ...Errors,
        NameErrors:
          e.target.value.length == 0
            ? "This field is required"
            : !nameregular.test(e.target.value)
            ? "Enter valid name"
            : null,
      });
    }
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
    if (e.target.name == "ConfirmPassword") {
      SetErrors({
        ...Errors,
        ConfirmPasswordErrors:
          e.target.value.length == 0
            ? "This field is required"
            : !(e.target.value == Users.Password)
            ? "Password not match"
            : null,
      });
    }

    
  };
  return (
    <>
    <div dir={lang == "en" ? "ltr" : "rtl"}>
      <div className="mt-5">
        <h1>Register</h1>
        <h1>{lang}</h1>
        <div className="form-floating mb-3">
          <input
            type="input"
            className="form-control col-sm-10"
            id="floatingInput"
            placeholder="Name"
            value={Users.Name}
            name="Name"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label for="floatingInput">Name</label>
          <small className="text-danger">{Errors.NameErrors}</small>
        </div>
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
            type="input"
            className="form-control"
            id="floatingInput"
            placeholder="UserName"
            value={Users.UserName}
            name="UserName"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label for="floatingInput">User Name</label>
          <small className="text-danger">{Errors.UserNameErrors}</small>
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
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder="Password"
            value={Users.ConfirmPassword}
            name="ConfirmPassword"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label for="floatingPassword">Confirm Password</label>
          <small className="text-danger">{Errors.ConfirmPasswordErrors}</small>
        </div>
        <div className="col-12 mt-3">
          <button className="btn btn-success" type="submit">
            Submit form
          </button>
          <button
          className="btn btn-success mx-3"
          onClick={() => {
            toggleLanguage();
          }}
        >
          change language
        </button>
        </div>
      </div>
      </div>
    </>
  );
}
