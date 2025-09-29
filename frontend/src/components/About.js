import React from "react";

export default function About() {
  return (
    <section id="About" className="py-16 px-8 bg-white grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
      <div>
        <img src="images/about-img.jpg" alt="About Us" className="rounded-lg shadow" />
      </div>
      <div>
        <h3 className="text-3xl font-bold mb-4">About Us</h3>
        <p className="mb-4">
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don’t look even slightly believable.
        </p>
        <button className="bg-[#6BB2A0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2C6975]">
          Read More
        </button>
      </div>
    </section>
  );
}
