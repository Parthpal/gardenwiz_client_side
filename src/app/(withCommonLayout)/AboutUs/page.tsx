/* eslint-disable prettier/prettier */
"use client";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";


const teamMembers = [
    {
      name: "Partha Pal",
      role: "Junior MERN Stack Developer",
      img: "https://res.cloudinary.com/dfelm3bvn/image/upload/v1731528941/WhatsApp_Image_2024-11-14_at_1.39.31_AM_iwgnq4.jpg",
    },
  ];
  
  export default function About() {
    return (
<div className="min-h-screen bg-green-50 text-gray-800">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center py-16 px-6 bg-green-700 text-white">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="mt-3 text-lg max-w-2xl">
          Welcome to the Gardening Tips & Advice Platform, where gardening
          enthusiasts and experts share knowledge, tips, and experiences to
          cultivate a greener world.
        </p>
        <Button color="success" className="mt-5">
          Join Our Community
        </Button>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-green-800">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-700">
          We aim to build a community-driven platform where plant lovers and
          gardening professionals can share advice, explore seasonal guides,
          and learn new techniques to enhance their gardening journey.
        </p>
      </section>

      <Divider className="my-6 mx-auto w-3/4" />

      {/* Team Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-green-800">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
            <Avatar
            className="w-20 h-20 text-large"
            src={member.img}
            />
              <h3 className="mt-3 text-lg font-medium text-green-900">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider className="my-6 mx-auto w-3/4" />

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold text-green-900">
          Join Our Community Today!
        </h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Whether you're a beginner or an expert gardener, our platform has
          something for you. Share your knowledge, connect with others, and
          explore exclusive content.
        </p>
        <Button color="success" className="mt-5">
          Get Started
        </Button>
      </section>
    </div>
    );
  }