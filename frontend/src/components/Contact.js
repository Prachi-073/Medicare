import React from "react";

export default function Contact() {
  return (
    <section id="Contact" className="py-16 px-8 bg-[#E0ECDE]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="p-3 border rounded w-full" />
              <input type="text" placeholder="Phone Number" className="p-3 border rounded w-full" />
            </div>
            <input type="email" placeholder="Email" className="p-3 border rounded w-full" />
            <textarea placeholder="Message" className="p-3 border rounded w-full h-32"></textarea>
            <button className="bg-[#2C6975] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6BB2A0]">
              SEND
            </button>
          </form>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <p>Google Map Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
