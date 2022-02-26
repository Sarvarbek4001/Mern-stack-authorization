import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.message==="Please fill all the fields"){
          toast.error(data.message);
        }
          else if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("token",data.user._id)
          toast.success(data.message);
          navigate("/");
          window.location.reload();
        }
      });
  };

  return (
    <>
      <div className="text-center w-25 m-auto">
        <main className="form-signin">
          <form onSubmit={submitHandler}>
            <h1 className="h3 mb-3 fw-normal">Please Log IN</h1>


            <div className="form-floating my-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating my-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Log in
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

