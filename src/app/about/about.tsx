/* eslint-disable @next/next/no-img-element */
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../purchase/homePage/header';
import Footer from '../purchase/homePage/footer';

const About = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">About SnapSavvy</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            At SnapSavvy, our mission is to connect the world through photography, offering high-quality images that capture the most cherished moments in everyday life. We believe that every photograph tells a story, and we strive to provide a platform where those stories can be shared, bought, and appreciated by all.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p>
            Our vision is to become the leading eCommerce platform for photography, empowering photographers around the globe to showcase and sell their work. We aim to bridge the gap between creators and consumers by fostering a community built on creativity, authenticity, and innovation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Company Strategy</h2>
          <p>
            Our strategy focuses on leveraging cutting-edge technology to create a seamless shopping experience for photography enthusiasts. We are committed to building a robust platform that not only makes it easy for customers to discover unique photography but also provides photographers with the tools to succeed in a competitive marketplace.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Meet Our Executives</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <img src="/images/Darien_Portrait.jpeg" alt= "Darien Parker Portrait"/>
              <h3 className="text-xl font-bold mt-2">Darien Parker</h3>
              <p>
                <strong>Chief Project Architect</strong>
              </p>
              <p>
                <strong>Education: </strong> 
                BS, Computer Science & Engineering, The Ohio State University<br />
                <strong>Experience: </strong> 
                Software Engineering Intern at FactSet Research Systems <br />
                Internal Technology Services Intern at RSM US <br />
                <strong>Passion: </strong> 
                Learning more about different technologies and applying them to real-world problems.
            </p>

            </div>

            <div className="col-md-4 mb-4">
              <img src="" alt= "John Ali Portrait"/>
              <h3 className="text-xl font-bold mt-2">John Ali</h3>
              <p><strong>INSERT TITLE HERE</strong></p>
              <p>
                <strong>Education: </strong><br />
                <strong>Experience: </strong><br />
                <strong>Passion: </strong> 
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <img src="" alt= "Arvin Huang Portrait"/>
              <h3 className="text-xl font-bold mt-2">Arvin Huang</h3>
              <p><strong>INSERT TITLE HERE</strong></p>
              <p>
                <strong>Education: </strong><br />
                <strong>Experience: </strong><br />
                <strong>Passion: </strong> 
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
