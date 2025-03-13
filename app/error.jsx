"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

const ErrorState = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};
export default ErrorState;
