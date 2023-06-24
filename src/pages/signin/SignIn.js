import React from "react";
import "./style.css";

export default function SignIn() {
  return (
    // eslint-disable-next-line react/style-prop-object
    <div className="flex flex-col items-center justify-center h-screen">
      <div class="splitdiv" id="leftdiv">
        <div id="leftdivcard">
          <img src="../../assets/img/logo.png" alt="logo" />
          <h3 class="Welcome">Welcome Back!</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur. Eget venenatis commodo
            faucibus lorem ac egestas. Dolor nulla dui venenatis urna sed ipsum
            turpis. Mollis odio eleifend odio nulla diam donec lacus. Laoreet
            odio ornare dis volutpat. Mauris mauris elementum nec nibh id.
            Tincidunt sed augue quisque eget viverra lacus ornare. Nunc nisl
            gravida auctor lorem est phasellus
          </p>
        </div>
      </div>

      <div class="splitdiv" id="rightdiv">
        <div id="rightdivcard">
          <h3>Hello!</h3>
          <p class="p1">Sign in to your account</p>
          <div class="main1">
            <div class="signin">
              <form>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required=""
                />
                <i class="fa fa-envelope"></i>
                <input
                  type="password"
                  name="pswd"
                  placeholder="Enter your Password"
                  required=""
                />
                <i class="fa fa-key"></i>
                <button type="submit">
                  <a class="home" href="home.html">
                    SIGN IN{" "}
                  </a>
                </button>
              </form>
              <span class="s1">
                <a class="forgotpswd" href="forgotpswd.html">
                  Forgot password!
                </a>
              </span>
            </div>
            <div class="p3">
              <span>Don't have an account! </span>
              <span>
                <a class="signup" href="signup.html">
                  Sign Up
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
