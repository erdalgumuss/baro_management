import React from "react";

export function AlertDialog({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDialogContent({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDialogHeader({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mb-4" {...props}>
      {children}
    </div>
  );
}

export function AlertDialogTitle({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className="text-lg font-bold" {...props}>
      {children}
    </h2>
  );
}

export function AlertDialogDescription({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className="text-gray-600" {...props}>
      {children}
    </p>
  );
}

export function AlertDialogFooter({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex justify-end space-x-4" {...props}>
      {children}
    </div>
  );
}

export function AlertDialogAction({
  children,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
