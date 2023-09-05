import React, { useContext } from "react";
import { PublicationContext } from "../../Context/PublicationState";
import { useState } from "react";
import { useEffect } from "react";
import Confirmtion from "../Modals/Confirmtion";
import Successful from "../Modals/Successful";
import Error from "../Modals/Error";
const Setting = (props) => {
  const context = useContext(PublicationContext);
  const { openSetting, setOpenSetting } = props;
  const { name, email, department, designation, password, phone } =
    context.currentUser;
  const [updateData, setUpdatedData] = useState({});
  const [nam, setName] = useState(name);
  const [emai, setEmail] = useState(email);
  const [dep, setDepartment] = useState(department);
  const [des, setDesignation] = useState(designation);
  const [checkProfessor, setCheckProfessor] = useState(false);
  const [phon, setPhone] = useState(phone);
  const [checlAs, setCheckAs] = useState(false);
  useEffect(() => {
    if (designation == "Professor") setCheckProfessor(true);
    else setCheckAs(true);
  }, []);

  useEffect(() => {
    setUpdatedData({
      Name: nam,
      Email: emai,
      Department: dep,
      Designation: des,
      Phone: phon,
    });
  }, [nam, emai, phon, dep, checkProfessor]);
  
  if (openSetting) {
    return (
      <>
      <Confirmtion message='edit profile' data={updateData} url='/profile'/>
      <Error url='/profile'/>
      <Successful url='/profile'/>
        <div className="p-10 w-full lg:w-1/2 mx-auto h-max text-left grid gap-y-5">
          <div>
            <h1 className="font-bold text-2xl">Settings</h1>
          </div>
          <div>
            <p className="font-semibold text-lg">Profile</p>
            <span>
              This information will be displayed publicly so be careful what you
              share.
            </span>
          </div>
          <div>
            {/* details */}
            <div className="flex flex-col justify-around h-full gap-y-3 ">
              {/* name */}
              <div className="flex  justify-between">
                <div className="w-full">
                  <p>Name</p>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={nam}
                    type="text"
                    className="border-2 border-gray-400  rounded-md p-2 w-full outline-none "
                  />
                </div>
              </div>
              <div className="">
                <p>Department</p>
                <input
                  onChange={(e) => setDepartment(e.target.value)}
                  value={dep}
                  type="text"
                  className="border-2 border-gray-400 rounded-md p-2 w-full outline-none"
                />
              </div>
              <div className="flex gap-x-2 justify-around">
                <div className="border-2 border-gray-400 p-2 rounded-md-md w-full flex justify-around rounded-md bg-white">
                  <p>Professor</p>
                  <input
                    type="radio"
                    name="designation"
                    value="Professor"
                    checked={checkProfessor}
                    onChange={() => [
                      setCheckProfessor(true),
                      setCheckAs(false),
                      setDesignation("Professor"),
                    ]}
                  ></input>
                </div>
                <div className="border-2 border-gray-400 p-2 rounded-md-md w-full flex justify-around bg-white">
                  <p>As Professor</p>
                  <input
                    type="radio"
                    name="designation"
                    value="As Professor"
                    checked={checlAs}
                    onChange={() => [
                      setCheckProfessor(false),
                      setCheckAs(true),
                      setDesignation("As Professor"),
                    ]}
                  ></input>
                </div>
              </div>
              <div className="">
                <p>Phone</p>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phon}
                  type="number"
                  className="border-2 border-gray-400 rounded-md p-2 w-full outline-none"
                />
              </div>
              <div className="">
                <p>Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={emai}
                  type="email"
                  className="border-2 border-gray-400 rounded-md p-2 w-full outline-none"
                />
              </div>
              <div className="">
                <p>Password</p>
                <input
                  disabled
                  type="password"
                  className="border-2 border-gray-400 rounded-md p-2 w-full outline-none opacity-50"
                />
              </div>
            </div>
            <div className="flex justify-end gap-x-3">
              <button
                type="button"
                className="p-3 rounded-md-md w-max hover:bg-black hover:text-white transition-all ease-in duration-300  rounded-md"
                onClick={() => setOpenSetting(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 hover:opacity-70 rounded-md text-white bg-black w-max"
                onClick={()=>context.setWarningMessage('edit')}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default Setting;
