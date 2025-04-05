import React from "react";
import { FaAward, FaHandshake, FaShieldAlt } from "react-icons/fa";


const About = () => {
  const team = [
    {
      id: 1,
      name: "Aarav Sharma",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 2,
      name: "Meera Patel",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Rohan Verma",
      role: "Backend Developer",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    },
    {
      id: 4,
      name: "Priya Desai",
      role: "QA Engineer",
      avatar: "https://randomuser.me/api/portraits/women/39.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About TheAuctionPlace
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting collectors and enthusiasts with rare and unique items
          through trusted auctions.
        </p>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <div className="bg-[#f8fafc] p-8 rounded-xl shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2023, TheAuctionPlace began as a passion project for
                antique collectors and has grown into a premier online auction
                platform.
              </p>
              <p className="text-gray-600">
                We've facilitated over 10,000 successful auctions, helping
                buyers and sellers connect from around the world.
              </p>
            </div>
            <div className="rounded-lg h-64 flex items-center justify-center">
              <img
                src="/founder.png"
                alt="Founder"
                className="h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <FaAward className="text-4xl text-[#378870] mb-4 mx-auto" />
              ),
              title: "Quality",
              desc: "We curate only authentic, high-value items for our auctions.",
            },
            {
              icon: (
                <FaHandshake className="text-4xl text-[#378870] mb-4 mx-auto" />
              ),
              title: "Trust",
              desc: "Secure transactions and verified sellers ensure peace of mind.",
            },
            {
              icon: (
                <FaShieldAlt className="text-4xl text-[#378870] mb-4 mx-auto" />
              ),
              title: "Security",
              desc: "Your data and transactions are protected with industry-leading measures.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center">{item.icon}</div>{" "}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team (Optional) */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          Meet The Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-white p-4 rounded-lg shadow-sm">
              <img
                src={member.avatar}
                alt={member.name}
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-center">{member.name}</h3>
              <p className="text-gray-600 text-sm text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
