import Image from "next/image";
import Link from "next/link";

export default function HomePageContent() {
  // Sample images for the gallery
    const galleryImages = [
        "https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg",
        "https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg",
        "https://images.pexels.com/photos/95215/pexels-photo-95215.jpeg",
        "https://images.pexels.com/photos/2987081/pexels-photo-2987081.jpeg",
        "https://images.pexels.com/photos/413735/pexels-photo-413735.jpeg",
        "https://images.pexels.com/photos/5529604/pexels-photo-5529604.jpeg",
      ];

  return (
    <div className="min-h-screen bg-[#F4F9F1] text-gray-900">
      {/* Hero Section */}
      <div className="text-center py-20 bg-green-100">
        <h1 className="text-5xl font-bold text-green-900">
          Cultivate Your Passion for Gardening
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Discover expert gardening tips, seasonal advice, and engage with a vibrant community of garden lovers.
        </p>
        <h1 className="text-5xl font-bold text-green-900">
        🌿 GardenWiz 🌿
        </h1>
      </div>

      {/* Image Gallery */}
      <div className="px-6 md:px-12 py-10">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image}
                alt={`Gardening Image ${index + 1}`}
                width={300}
                height={300}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="py-10 bg-green-50 text-center">
        <h2 className="text-3xl font-semibold text-green-900">
          Join the Gardening Community 🌱
        </h2>
        <p className="text-gray-700 mt-3">
          Share your gardening knowledge, upvote useful tips, and engage with fellow enthusiasts.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block bg-green-600 text-white px-5 py-2 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Join Now
        </Link>
      </div>

      {/* Premium Section */}
      <div className="py-10 text-center">
        <h2 className="text-3xl font-semibold text-green-900">
          Unlock Exclusive Gardening Content 🔒
        </h2>
        <p className="text-gray-700 mt-3">
          Get access to premium guides and expert gardening advice with a subscription.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block bg-yellow-500 text-white px-5 py-2 rounded-lg text-lg hover:bg-yellow-600 transition"
        >
          Subscribe Now
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-6 text-center">
        <p className="text-sm">© 2025 Gardening Tips & Advice Platform | All rights reserved.</p>
      </footer>
    </div>
  );
}
