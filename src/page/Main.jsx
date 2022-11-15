import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Main = () => {
  const optioncoin = ["Coinsurance plan", "Schedule Plan", " Coplay Plan"];
  const optionsppo = ["PPO Plan", "MAC Plan", "Passive Plan"];
  const loaddata = () => {
    fetch("http://127.0.0.1:8000/get-mockup-data/", {
      method: "GET",
    })
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

      })
      .catch(error => {
        console.log('There was an error!', error);
      });
  };
  const formik = useFormik({
    initialValues: {
      planname: "",
      dropcoin: "Coinsurance plan",
      dropppo: "PPO Plan",
      startDate: new Date(),
      endDate: new Date(),
      period: "annual",
      individual: "individual",
      amtmax: 0,
      rollover: true,
      rolloverin: 0,
      expanding: true,
      expandingfrin: 0,
      expandingsein: 0,
      extended: true,
      extendedlowin: 0,
      extendedupin: 0,
      pposplit: true,
      ppoin: 0,
      oonin: 0,
    },
    validationSchema: Yup.object({
      planname: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too Long!")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("val : ", JSON.stringify(values));
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      };
      fetch("http://127.0.0.1:8000/save-mockup-data", requestOptions)
        .then(response => {
          console.log("response : ", response);
        })
        .then(data => console.log("data : ", data));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="content px-[20%]  w-full mx-auto">
        <div className="first py-[100px] items-center flex justify-between">
          <div className="font-helvetica ">
            <button type="button"
              className="bg-sky-500 font-bold text-3 leading-[23px] text-white px-[69.5px] py-[16px] rounded-[10px]"
              onClick={loaddata}
            >
              Load
            </button>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <input
                name="planname"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="planname"
                type="text"
                placeholder="Type Plan Name here..."
                value={formik.values.planname}
                onChange={formik.handleChange}
              />
              {formik.errors.planname && formik.touched.planname ? (
                <div>{formik.errors.planname}</div>
              ) : null}
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div className="relative">
                <select
                  name="dropcoin"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="dropcoin"
                  value={formik.values.dropcoin}
                  onChange={formik.handleChange}
                >
                  {optioncoin.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <div className="relative">
                <select
                  name="dropppo"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="dropppo"
                  value={formik.values.dropppo}
                  onChange={formik.handleChange}
                >
                  {optionsppo.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="font-helvetica ">
            <button
              type="submit"
              className="bg-sky-500 font-bold text-3 leading-[23px] text-white px-[69.5px] py-[16px] rounded-[10px]"
            >
              Save
            </button>
          </div>
        </div>
        <div className="second ">
          <div className="flex justify-center items-center">
            <div className="flex items-center">
              <span className="mx-4 text-gray-500">Start Date</span>
              <DatePicker
                name="startDate"
                selected={formik.values.startDate}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex items-center">
              <span className="mx-4 text-gray-500">End Date</span>
              <DatePicker
                name="endDate"
                selected={formik.values.endDate}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="third flex justify-start mt-14">
          <div className="mr-12 w-60 h-20 text-[36px] font-bold text-green-800 shadow-2xl">
            Maximums
          </div>
          <div>
            <div className="flex">
              <div className="mr-5">
                <div className="flex">
                  <fieldset className="mb-3 mr-5">
                    <div className="flex items-center mb-4">
                      <input
                        id="period"
                        type="radio"
                        name="period"
                        value="annual"
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                        checked={formik.values.period === "annual"}
                        onChange={formik.handleChange}
                      />
                      <label
                        for="pr-option-1"
                        className="text-sm font-medium text-gray-900 ml-2 block"
                      >
                        Annual
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        id="pr-option-2"
                        type="radio"
                        name="period"
                        value="lifetime"
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                        checked={formik.values.period === "lifetime"}
                        onChange={formik.handleChange}
                      />
                      <label
                        for="pr-option-2"
                        className="text-sm font-medium text-gray-900 ml-2 block"
                      >
                        Lifetime
                      </label>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div className="flex items-center mb-4">
                      <input
                        id="pr-option-3"
                        type="radio"
                        name="individual"
                        value="individual"
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                        checked={formik.values.individual === "individual"}
                        onChange={formik.handleChange}
                      />
                      <label
                        for="pr-option-3"
                        className="text-sm font-medium text-gray-900 ml-2 block"
                      >
                        Individual
                      </label>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        id="country-option-4"
                        type="radio"
                        name="individual"
                        value="family"
                        className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                        checked={formik.values.individual === "family"}
                        onChange={formik.handleChange}
                      />
                      <label
                        for="country-option-4"
                        className="text-sm font-medium text-gray-900 ml-2 block"
                      >
                        Family
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <input
                    name="amtmax"
                    className=" w-24 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="Amt Max Ar"
                    value={formik.values.amtmax}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="">
                <fieldset className="mb-5">
                  <div className="flex items-center  mb-4">
                    <input
                      id="checkbox-1"
                      name="rollover"
                      aria-describedby="checkbox-1"
                      type="checkbox"
                      className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                      checked={formik.values.rollover}
                      onChange={formik.handleChange}
                    />
                    <label
                      for="checkbox-1"
                      className="text-sm ml-3 font-medium text-gray-900"
                    >
                      Rollover
                    </label>
                  </div>
                </fieldset>
                <div>
                  <input
                    className=" w-24 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    name="rolloverin"
                    placeholder="Rollover %"
                    value={formik.values.rolloverin}
                    onChange={formik.handleChange}
                    disabled={formik.values.rollover ? "" : "disabled"}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mt-5">
                <fieldset className="mb-2">
                  <div className="flex items-center  mb-4">
                    <input
                      name="expanding"
                      id="checkbox-1"
                      aria-describedby="checkbox-1"
                      type="checkbox"
                      className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                      checked={formik.values.expanding}
                      onChange={formik.handleChange}
                    />
                    <label
                      for="checkbox-1"
                      className="text-sm ml-3 font-medium text-gray-900"
                    >
                      Expanding Maximum
                    </label>
                  </div>
                </fieldset>
                <div>
                  <input
                    name="expandingfrin"
                    className=" w-24 mb-1 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="Yr1 Exp Max "
                    value={formik.values.expandingfrin}
                    disabled={formik.values.expanding ? "" : "disabled"}
                    onChange={formik.handleChange}
                  />
                  <input
                    name="expandingsein"
                    className=" w-24 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="Yr2 Exp Max "
                    value={formik.values.expandingsein}
                    disabled={formik.values.expanding ? "" : "disabled"}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-20">
            <div className="">
              <fieldset className="mb-5">
                <legend className="sr-only">Checkbox variants</legend>
                <div className="flex items-center  mb-4">
                  <input
                    name="extended"
                    id="checkbox-1"
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                    checked={formik.values.extended}
                    onChange={formik.handleChange}
                  />
                  <label
                    for="checkbox-1"
                    className="text-sm ml-3 font-medium text-gray-900"
                  >
                    Extended Maximum
                  </label>
                </div>
              </fieldset>
              <div className="flex">
                <span>%</span>
                <input
                  name="extendedlowin"
                  className=" ml-1 w-24 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Enter"
                  disabled={formik.values.extended ? "" : "disabled"}
                  value={formik.values.extendedlowin}
                  onChange={formik.handleChange}
                />
                <span>UP to</span>
                <input
                  name="extendedupin"
                  className=" ml-1 w-24 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Enter"
                  disabled={formik.values.extended ? "" : "disabled"}
                  value={formik.values.extendedupin}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="">
              <fieldset className="my-5">
                <legend className="sr-only">Checkbox variants</legend>

                <div className="flex items-center  mb-4">
                  <input
                    name="pposplit"
                    id="checkbox-1"
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                    checked={formik.values.pposplit}
                    onChange={formik.handleChange}
                  />
                  <label
                    for="checkbox-1"
                    className="text-sm ml-3 font-medium text-gray-900"
                  >
                    PPO Split Maximum
                  </label>
                </div>
              </fieldset>
              <div>
                <input
                  name="ppoin"
                  className=" w-24  mb-1  appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="IN amount"
                  disabled={formik.values.pposplit ? "" : "disabled"}
                  value={formik.values.ppoin}
                  onChange={formik.handleChange}
                />
                <input
                  name="oonin"
                  className=" w-24 appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="OON amount"
                  disabled={formik.values.pposplit ? "" : "disabled"}
                  value={formik.values.oonin}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Main;
