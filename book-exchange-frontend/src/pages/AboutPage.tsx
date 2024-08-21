import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 text-secondary-muted">
      <h1 className="text-4xl font-bold text-center mb-8">About TURNiX</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to TURNiX – Your Ultimate Book Exchange Platform
        </h2>
        <p className="text-lg leading-relaxed">
          At TURNiX, we believe in the power of stories and the endless journey
          of knowledge. Our mission is to connect book lovers around the world
          through a seamless and dynamic platform that makes exchanging books
          not just easy but also enjoyable.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg leading-relaxed">
          TURNiX was born out of a simple yet profound idea: books are meant to
          be shared. Whether you're a passionate reader, a casual browser, or
          someone looking to declutter your bookshelf, TURNiX provides the
          perfect space to exchange books with others who share your literary
          interests. We understand that every book has a story, not just in its
          pages but also in the hands it passes through. Our platform is
          designed to honor that journey.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose TURNiX?</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>
            <strong>User-Friendly Experience:</strong> With TURNiX, exchanging
            books has never been easier. Our intuitive interface allows you to
            browse, offer, and exchange books with just a few clicks.
          </li>
          <li>
            <strong>Vast Collection:</strong> Discover a diverse selection of
            books from different genres, authors, and cultures. Whether you're
            into fiction, non-fiction, mystery, romance, or sci-fi, TURNiX has
            something for everyone.
          </li>
          <li>
            <strong>Secure Transactions:</strong> Your safety is our priority.
            TURNiX ensures secure and transparent transactions, so you can
            exchange books with confidence.
          </li>
          <li>
            <strong>Community-Driven:</strong> Join a growing community of book
            enthusiasts. Engage in discussions, share reviews, and connect with
            others who love reading as much as you do.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside text-lg leading-relaxed">
          <li>
            <strong>Browse & Explore:</strong> Discover books available for
            exchange in our extensive collection.
          </li>
          <li>
            <strong>Offer & Exchange:</strong> Offer your books for exchange and
            connect with others interested in your collection.
          </li>
          <li>
            <strong>Transaction & Delivery:</strong> Complete the exchange
            through our secure transaction process, and enjoy your new read!
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          We envision a world where books flow freely, where every reader has
          access to the stories they crave, and where the exchange of knowledge
          transcends borders. TURNiX is not just a platform; it's a movement to
          keep the love for reading alive and thriving.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
        <p className="text-lg leading-relaxed">
          Become a part of the TURNiX community today. Start exchanging, start
          reading, and start sharing the stories that matter to you.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
