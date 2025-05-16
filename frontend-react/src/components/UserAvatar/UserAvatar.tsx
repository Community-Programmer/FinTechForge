import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserAvatar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [letter, setLetter] = useState("?");

  // Process user data to extract first letter
  useEffect(() => {
    if (user) {
      let firstLetter = "?";
      
      // If user has a name property
      if (user.name) {
        firstLetter = user.name.charAt(0).toUpperCase();
      } 
      // For array-like objects or direct string
      else {
        let userName = "";
        
        if (typeof user === "string") {
          userName = user;
        } else if (typeof user === "object") {
          userName = Object.values(user).join("");
        }
        
        if (userName && userName.trim().length > 0) {
          firstLetter = userName.trim().charAt(0).toUpperCase();
        }
      }
      
      setLetter(firstLetter);
    }
  }, [user]);

  return (
    <div className="flex items-center">
      {/* Avatar with first letter */}
      <div className="relative">
        <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-lg">
          {letter}
        </div>
        {/* Green online indicator */}
        <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
      </div>
    </div>
  );
};

export default UserAvatar;