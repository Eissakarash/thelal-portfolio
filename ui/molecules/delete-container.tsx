"use client";
import React from "react";
import { DeleteIcon } from "lucide-react";
function DeleteContainer({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onDelete}
        className="bg-red rounded-lg group-hover:flex hidden"
      >
        <DeleteIcon />
      </button>
      {children}
    </div>
  );
}

export default DeleteContainer;
