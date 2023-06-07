"use client";
import { useState } from "react";
import HeaderProfile from "./HeaderProfile";
import { UserProps } from "@/types";

interface ProfileSectionProps {
  user: UserProps;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="bg-white/5 h-full p-1 lg:p-4 rounded-lg">
      <HeaderProfile isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      <div>
        {isEditMode ? (
          <div className="w-full">
            <h1>edit mode</h1>
          </div>
        ) : (
          <div>
            <h1>view mode</h1>
          </div>
        )}
      </div>
      <div className="flex flex-col ">
        <div className="">
          {isEditMode ? (
            <div className="form-control p-2">
              <label className="label w-full ">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                className="input text-xl"
                defaultValue={user?.name}
              />
            </div>
          ) : (
            <div>
              <div className="form-control p-2">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <label className="input-ghost input flex items-center text-xl">
                  <span>{user?.name}</span>
                </label>
              </div>
            </div>
          )}
        </div>
        <div>
          <div>
            <div className="form-control p-2">
              <label className="label">
                <span className="label-text">Correo Electronico</span>
              </label>
              <label className="input-ghost input flex items-center text-xl">
                <span>
                  {user?.email}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
