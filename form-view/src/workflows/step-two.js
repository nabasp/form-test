import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/main.css";
import axios from "axios";
import { baseUrl } from "../constants";

function StepTwo() {
  const { userId } = useParams();
  const [activeSection, setActiveSection] = useState("one");
  const [addesss, setAddresss] = useState([{ a1: "", a2: "", a3: "" }]);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const changeSection = (section) => {
    if (section) setActiveSection(section);
    else navigate("/thank-you");
  };
  const addAnotherAddress = () => {
    setAddresss([...addesss, { a1: "", a2: "", a3: "" }]);
  };
  const removeAdress = () => {
    addesss.pop();
    setAddresss([...addesss]);
  };

  const onAddessChange = (index, target) => {
    const { name, value } = target;
    console.log(name, value, index);
    const currentAddressList = addesss;
    const newAddressList = currentAddressList.map((item, i) => {
      if (i === index) return { ...item, [name]: value };
      return item;
    });
    console.log(newAddressList);
    setAddresss(newAddressList);
    setErrors(null);
  };

  const onSubmit = () => {
    setIsLoading(true);
    setErrors(null);

    const postData = { addressList: addesss };

    axios
      .post(`${baseUrl}/${userId}/addAddress`, postData)
      .then((response) => {
        setIsLoading(false);
        setErrors(null);
        navigate(`/thank-you`);
      })
      .catch((error) => {
        const { errors } = error?.response?.data || {};
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
                  <div id="slide03">
                    <h3>Do you have a Previous Address?</h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onChange={() => changeSection("two")}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label next02"
                        for="flexRadioDefault1"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onChange={() => changeSection()}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                      <label
                        className="form-check-label tothank"
                        for="flexRadioDefault2"
                      >
                        No
                      </label>
                    </div>
                  </div>
                )}
                {activeSection === "two" && (
                  <div id="slide04">
                    {addesss.map((item, index) => (
                      <>
                        <h3>Enter your Previous Address{index + 1}</h3>
                        <div className="mb-3 text-start">
                          <label className="form-label">
                            Previous Address 1
                          </label>
                          <input
                            type="text"
                            className="form-control mb-3"
                            name="a1"
                            value={item.a1}
                            placeholder="Address line 1"
                            onChange={(e) => onAddessChange(index, e.target)}
                          />
                          <input
                            type="text"
                            className="form-control mb-3"
                            name="a2"
                            value={item.a2}
                            placeholder="Address line 2"
                            onChange={(e) => onAddessChange(index, e.target)}
                          />
                          <input
                            type="text"
                            className="form-control mb-3"
                            name="a3"
                            value={item.a3}
                            placeholder="Address line 3"
                            onChange={(e) => onAddessChange(index, e.target)}
                          />
                        </div>
                      </>
                    ))}

                    <ul>
                      {errors && (
                        <span className="error">Fill all address Lines</span>
                      )}
                    </ul>

                    <div className="mb-3 text-center" id="submitoradd01">
                      <button
                        type="button"
                        className="btn btn-success tothank"
                        onClick={onSubmit}
                        disabled={isLoading || errors}
                      >
                        {isLoading ? "Loading.." : "Submit"}
                      </button>
                      {addesss.length <= 2 && (
                        <p>
                          <span onClick={addAnotherAddress}>Add Another Address</span>
                        </p>
                      )}
                      {addesss.length <= 1 && (
                        <p>
                          <span onClick={() => changeSection("one")}> Back</span>
                        </p>
                      )}
                      {addesss.length > 1 && (
                        <p>
                          <span onClick={removeAdress}> romove addesss</span>
                        </p>
                      )}
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

export default StepTwo;
