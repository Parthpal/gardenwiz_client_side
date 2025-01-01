import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  className?: string;
  disabled?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}

export interface Ipost{
  _id: string;
  title: string;
  content: string;
  userID: string;
  categoryID: string;
  images: string[];
  premium: boolean;
  upvotes: number;
  downvotes: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number;
}

export interface IUser {
  _id: string; // Assuming the _id is a string
  name: string;
  role: string; // Could be a specific type like "USER" | "ADMIN"
  email: string;
  password: string;
  status: string; // Could also be "BASIC" | "PREMIUM" or similar
  profilePhoto: string; // URL as a string
  followerIds: string[];
  followingIds: string[];
  __v: number; // Version field, typically a number
}