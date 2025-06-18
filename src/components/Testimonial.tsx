"use client";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Testimonial = () => {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Reasons Why Thousands of Customers Love Us!
        </h2>
      </div>

      {/* Card Stack */}
      <div className="relative max-w-xl mx-auto h-auto">
        {/* Layer 2 */}
        <div className="absolute inset-0 translate-y-6 scale-95 bg-white rounded-xl shadow-md z-0" />
        {/* Layer 1 */}
        <div className="absolute inset-0 translate-y-3 scale-98 bg-white rounded-xl shadow-lg z-10" />

        {/* Main Testimonial Card */}
        <div className="relative bg-white rounded-xl shadow-xl p-8 text-center z-20">
          {/* Avatar */}
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white -mt-16">
            <Image
              src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
              alt="User"
              width={70}
              height={70}
              className="object-cover rounded-full w-[70px] h-[70px]"
            />
          </div>

          <h3 className="mt-4 font-semibold text-lg">Ralph Edwards</h3>

          {/* Stars */}
          <div className="text-yellow-500 my-2 text-lg">★★★★★</div>

          {/* Testimonial */}
          <p className="text-gray-600">
            I received my beautiful new electric bikes this week and am
            absolutely thrilled with them. I have been impressed with the
            customer service. The bike is easy to use, and the controls are
            intuitive.
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center mt-12 gap-4 z-30">
        <button className="bg-white border rounded-full p-2 shadow hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <button className="bg-red-500 text-white rounded-full p-2 shadow hover:bg-red-600">
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Floating Circular Avatars */}
      <div className="pointer-events-none absolute inset-0 rounded-full">
        <Image
          src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
          alt="avatar"
          width={80}
          height={80}
          className="absolute top-20 left-10 w-[70px] h-[70px] rounded-full object-cover"
        />
        <Image
          src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740"
          alt="avatar"
          width={60}
          height={60}
          className="rounded-full absolute top-10 right-12 object-cover w-[60px] h-[60px]"
        />
        <Image
          src="https://t3.ftcdn.net/jpg/01/86/40/16/360_F_186401650_6tXxwc5x3pwuA9bYjJG65l9pCFRIAu06.jpg"
          alt="avatar"
          width={60}
          height={60}
          className="rounded-full absolute bottom-20 left-20 object-cover w-[70px] h-[70px]"
        />
        <Image
          src="https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
          alt="avatar"
          width={60}
          height={60}
          className="rounded-full absolute bottom-50 left-50 object-cover w-[70px] h-[70px]"
        />

        <Image
          src="https://media.istockphoto.com/id/613557584/photo/portrait-of-a-beautifull-smiling-man.jpg?s=612x612&w=0&k=20&c=hkCg5CrmTKOApePbPOyo1U9GexEfIJOJqoLXJIvcN8E="
          alt="avatar"
          width={60}
          height={60}
          className="rounded-full absolute bottom-50 right-50 object-cover w-[70px] h-[70px]"
        />

        <Image
          src="https://media.istockphoto.com/id/507995592/photo/pensive-man-looking-at-the-camera.jpg?s=612x612&w=0&k=20&c=fVoaIqpHo07YzX0-Pw51VgDBiWPZpLyGEahSxUlai7M="
          alt="avatar"
          width={60}
          height={60}
          className="rounded-full absolute bottom-12 right-16 object-cover w-[60px] h-[60px]"
        />
      </div>
    </section>
  );
};

export default Testimonial;
