"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../purchase/homePage/header';
import Footer from '../purchase/homePage/footer';

const Contact = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Customer Support</h2>
          <p>
            We’re here to help! If you have any issues with your purchase, need assistance with returns, or 
            have questions regarding your order, feel free to contact our customer support team.
          </p>
          <p>
            Email: <a href="mailto:support@snapSavvy.com">support@snapSavvy.com</a><br/>
            Phone: 1-800-123-4567<br/>
            Hours: Monday to Friday, 9 AM - 6 PM (EST)
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Return & Refund Policy</h2>
          <p>
            If you’re not satisfied with your purchase, we offer a 30-day return policy for any unused and undamaged items.
            Once the item is received and inspected, we will issue a full refund to your original payment method. Please
            note that the cost of return shipping is the responsibility of the customer.
          </p>
          <p>
            To initiate a return, please contact our support team with your order details, and we will provide instructions
            on how to return your item.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions (FAQ)</h2>
          <ul>
            <li><strong>Q: How can I track my order?</strong></li>
            <p>A: Once your order is shipped, you will receive an email with a tracking number and a link to track your package.</p>
            
            <li><strong>Q: What is the expected delivery time?</strong></li>
            <p>A: Most orders are delivered within 5-7 business days.</p>
            
            <li><strong>Q: Can I change my order after it’s placed?</strong></li>
            <p>A: If you need to make changes, please contact us within 24 hours of placing your order. After this period, 
               we may not be able to modify the order, but we’ll do our best to assist you.</p>
          </ul>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;
