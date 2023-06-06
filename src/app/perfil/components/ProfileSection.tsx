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
    <div>
      <HeaderProfile 
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
      <div>
        {
          isEditMode ? (
            <div>
              <h1>edit mode</h1>
            </div>
          ) : (
            <div>
              <h1>view mode</h1>
            </div>
          )
        }
      </div>
      <div>
        <h1>{user?.name}</h1>
        <h2>{user?.email}</h2>
      </div>
    </div>
  );
};

export default ProfileSection;
