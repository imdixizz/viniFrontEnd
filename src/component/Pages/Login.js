import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Input from "../extra/Input";
import { login } from "../../redux/slice/authSlice";
import { submitData } from "../util/fuction";
import Button from "../extra/Button";

const Login = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const isAuth = useSelector((state) => state.auth.isAuth);
  useEffect(() => {
    isAuth && navigate("/admin");
  }, [isAuth]);

  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    const loginData = submitData(e);
    console.log("loginData", loginData);

    try {
      let response = await dispatch(login(loginData)).unwrap();
      console.log(response.status, "  response.data.status");
      response.status ? navigate("/admin") : alert("SomeThing IS missing");
    } catch (err) {
      alert("someThing is Missing");
    }
  };


  return (
    <>
      <div className="mainLoginPage">
        <div className="loginDiv">
          <div className="loginPage pt-3 m-auto text-center" style={{ width: "400px" }}>
            <div className="loginTitle mb-3">
              <h1 className="fw-bold primeBlackColor">Log In</h1>
            </div>
            <form onSubmit={handleSubmit} id="loginForm">
              <div className="loginInput">
                <Input
                  type={`text`}
                  id={`email`}
                  label={`Email`}
                  placeholder={`Email`}
                  name={`email`}
                  errorMessage={`Enter Email`}
                  defaultValue={`admin@admin.com`}
                />
                <Input
                  type={`password`}
                  id={`password`}
                  label={`Password`}
                  placeholder={`Password`}
                  name={`password`}
                  errorMessage={`Enter Password`}
                  defaultValue={123456}
                />
              </div>
              <div className="forgetPassword themeFont">
                Forgot password?
              </div>
              <div className="loginButton">
                <Button
                  type={`submit`}
                  className={`bg-second text-light cursor-pointer m10-top`}
                  text={`Submit`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default Login;
