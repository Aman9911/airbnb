"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import useRentModal from "../../hooks/useRentModal";

const UserMenu = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const handleRoute = useCallback(
    (route) => {
      router.push(`/${route}`);
      toggleOpen();
    },
    [router]
  );

  const handleModal = useCallback(
    (modal) => {
      if (modal === "rent") {
        rentModal.onOpen();
      }
      if (modal === "login") {
        loginModal.onOpen();
      }
      if (modal === "register") {
        registerModal.onOpen();
      }
      toggleOpen();
    },
    [router]
  );

  const handleSignOut = () => {
    signOut();
    toggleOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => handleRoute("trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => handleRoute("favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => handleRoute("reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => handleRoute("properties")}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => handleModal("rent")}
                  label="Airbnb my home"
                />
                <hr />
                <MenuItem onClick={handleSignOut} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleModal("login")} label="Login" />
                <MenuItem
                  onClick={() => handleModal("register")}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
