import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 py-10">
        <h1 className="text-white text-4xl font-extrabold text-center">
          About Mnada Auctions
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-loose text-lg">
            Mnada Auctions is a premier online platform for conducting and managing
            auctions seamlessly. Our mission is to provide a secure, transparent, and
            user-friendly experience for auctioneers and clients alike. Whether you're
            buying or selling, Mnada Auctions is committed to ensuring fairness and
            efficiency at every step.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Our Services
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-loose">
            <li>Conducting live and online auctions.</li>
            <li>Secure bidding platform for buyers.</li>
            <li>Comprehensive dashboard for auctioneers and administrators.</li>
            <li>Real-time notifications and updates.</li>
            <li>Seamless integration with client management systems.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-loose text-lg">
            At Mnada Auctions, we envision a world where auctions are accessible to
            everyone, bridging the gap between technology and traditional auctioning
            methods. With innovation, trust, and customer satisfaction as our core
            values, we aim to revolutionize the auction industry.
          </p>
        </section>

        {/* Links to HomePage and Authentication */}
        <section className="mt-12 flex flex-col items-center space-y-4">
          <Link
            to="/"
            className="text-blue-600 text-lg font-semibold hover:underline"
          >
            Go to HomePage
          </Link>
          <Link
            to="/login"
            className="text-blue-600 text-lg font-semibold hover:underline"
          >
            Go to Login/Register
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Mnada Auctions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
