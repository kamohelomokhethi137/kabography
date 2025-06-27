import ArtGallery from "../components/ArtGallery";

const Shop = () => {
  return (
    <section className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-black">Art Gallery Wall Design Prints for Sale</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Premium photographic artwork and framed prints to elevate your space. Secure checkout, local delivery.
          </p>
        </div> */}

        {/* Featured Component */}
        <ArtGallery />

        {/* Additional components like bestsellers, categories, or info sections can be added here */}
        {/* <BestSellers /> */}
        {/* <FramingOptions /> */}
        {/* <Testimonials /> */}
      </div>
    </section>
  );
};

export default Shop;
