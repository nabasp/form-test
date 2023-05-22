import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/main.css";
import axios from "axios";
import {
  baseUrl,
  daysOptionsList,
  yearsOptionsList,
  monthOptionsList,
} from "./constants";

function StepOne() {
  const [activeSection, setActiveSection] = useState("one");
  const [disableBtn, setDisableBtn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeSection === "one") {
      if (
        firstName.length > 0 &&
        lastName.length > 0 &&
        day.length > 0 &&
        month.length > 0 &&
        year.length > 0
      )
        setDisableBtn(false);
      else setDisableBtn(true);
    } else {
      if (email.length > 0 && phone.length > 0) setDisableBtn(false);
      else setDisableBtn(true);
    }
  }, [activeSection, firstName, lastName, day, month, year, email, phone]);

  const submitForm = () => {
    setIsLoading(true);
    setErrors(null);
    const dob = new Date(day, month, year).toLocaleDateString();

    const postData = { firstName, lastName, email, phone, dateOfBirth: dob };

    axios
      .post(`${baseUrl}/createUser`, postData)
      .then((response) => {
        const { userId } = response.data;
        console.log("response", userId);
        setIsLoading(false);
        setErrors(null);
        navigate(`/step-2/${userId}`);
      })
      .catch((error) => {
        const { errors } = error?.response?.data;
        console.log(errors);
        setIsLoading(false);
        setErrors(errors);
      });
  };

  return (
    <section class="bnrsection">
      <div className="container">
        <div className="row">
          <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-12 text-center">
            <div className="formpart">
              <form action="">
                {activeSection === "one" && (
                  <div id="slide01">
                    <h3>Enter Your Personal Details</h3>
                    <div className="mb-3 text-start">
                      <label htmlFor="FormControlInput1" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="FormControlInput1"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="FormControlInput2" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="FormControlInput2"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="FormControlInput3" className="form-label">
                        Enter Your Date of Birth
                      </label>
                      <fieldset>
                        <legend> Date Of Birth</legend>
                        <div className="row">
                          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <select
                              name="lstDobDay"
                              id="lstDobDay"
                              className="form-control watermark"
                              value={day}
                              onChange={(e) => setDay(e.target.value)}
                            >
                              <option value="">Day </option>
                              {daysOptionsList.map((day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              ))}
                            </select>
                            <i
                              className="validate "
                              aria-hidden="true"
                              style={{ display: "none" }}
                            ></i>
                            <span
                              id="dobDay_err"
                              className="error_msg error"
                            ></span>
                          </div>
                          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12 ">
                            <select
                              name="lstDobMonth"
                              id="lstDobMonth"
                              className="form-control watermark"
                              value={month}
                              onChange={(e) => setMonth(e.target.value)}
                            >
                              <option value="">Month </option>
                              {monthOptionsList.map((month, i) => (
                                <option key={month} value={i + 1}>
                                  {month}
                                </option>
                              ))}
                            </select>
                            <i
                              className="validate "
                              aria-hidden="true"
                              style={{ display: "none" }}
                            ></i>
                            <span
                              id="dobMonth_err"
                              className="error_msg"
                            ></span>
                          </div>
                          <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12">
                            <select
                              name="lstDobYear"
                              id="lstDobYear"
                              className="form-control"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                            >
                              <option value="">Year</option>
                              {yearsOptionsList.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            <i
                              className="validate "
                              aria-hidden="true"
                              style={{ display: "none" }}
                            ></i>
                            <span id="dobYear_err" className="error_msg"></span>
                          </div>
                          <span id="dob_final_err" className="error_msg"></span>
                        </div>
                      </fieldset>
                    </div>
                    <div className="mb-3 text-center">
                      <button
                        type="button"
                        disabled={disableBtn}
                        className="btn btn-warning next01"
                        onClick={() => setActiveSection("two")}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {activeSection === "two" && (
                  <div id="slide02">
                    <h3>Enter Your Contact Details</h3>
                    <div className="mb-3 text-start">
                      <label htmlFor="FormControlInput4" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="FormControlInput4"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <ul>
                        {errors?.email &&
                          errors?.email?.map((e, i) => (
                            <li key={i}>
                              <span className="error">{e}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="FormControlInput5" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="FormControlInput5"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <ul>
                        {errors?.phone &&
                          errors?.phone?.map((e, i) => (
                            <li key={i}>
                              <span className="error">{e}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="mb-3 text-center">
                      <button
                        type="button"
                        className="btn btn-success"
                        id="submit_claim"
                        disabled={disableBtn || isLoading}
                        onClick={submitForm}
                      >
                        {isLoading ? "loading.." : "Submit"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StepOne;
